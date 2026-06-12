"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vGlow;
  varying float vTint;

  // Ashima simplex noise 3D
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.06;

    // slow orbital drift around the vertical axis, speed varies per particle
    float ang = t * (0.18 + aSeed * 0.25);
    float ca = cos(ang); float sa = sin(ang);
    p.xz = mat2(ca, -sa, sa, ca) * p.xz;

    // layered noise displacement — vapor curl
    float n1 = snoise(p * 0.16 + vec3(0.0, t * 0.9, 0.0));
    float n2 = snoise(p * 0.45 + vec3(t * 0.6, 0.0, aSeed * 6.0));
    p.x += n1 * 2.6 + n2 * 0.9;
    p.y += snoise(p * 0.2 + vec3(t * 0.7)) * 2.2 + n2 * 0.6;
    p.z += n1 * 1.4;

    // breathing density: particles thin out and regather
    float density = snoise(p * 0.09 - vec3(0.0, t * 0.5, 0.0));
    vGlow = smoothstep(-0.55, 0.85, density);
    vTint = 0.5 + 0.5 * snoise(vec3(aSeed * 12.0, p.y * 0.07, t * 0.3));

    // radial falloff so the cloud feathers at the edges
    float r = length(p.xz) / 19.0;
    vGlow *= 1.0 - smoothstep(0.55, 1.0, r);
    vGlow *= 1.0 - smoothstep(5.5, 9.5, abs(p.y));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + aSeed * 2.4) * uPixelRatio * (26.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  varying float vTint;
  uniform vec3 uAmber;
  uniform vec3 uBone;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = 1.0 - smoothstep(0.18, 0.5, d);
    float a = disc * vGlow * 0.55;
    if (a < 0.003) discard;
    vec3 col = mix(uAmber, uBone, vTint * vTint);
    gl_FragColor = vec4(col, a);
  }
`;

const DEFAULT_COLORS: [string, string] = ["#b9883f", "#e8dcc4"];

export default function VaporCanvas({
  colors = DEFAULT_COLORS,
  count = 26000,
}: {
  /** [deep tint, pale tint] for the particles */
  colors?: [string, string];
  count?: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 24);

    // particle cloud: flattened ellipsoid volume
    const COUNT = count;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.55) * 17;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = Math.sin(theta) * radius * 0.6;
      seeds[i] = Math.random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: reducedMotion ? 40 : 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uAmber: { value: new THREE.Color(colors[0]) },
        uBone: { value: new THREE.Color(colors[1]) },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // mouse parallax (lerped)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const renderFrame = () => {
      material.uniforms.uTime.value += clock.getDelta();
      current.x += (target.x - current.x) * 0.03;
      current.y += (target.y - current.y) * 0.03;
      camera.position.x = current.x * 1.6;
      camera.position.y = 0.5 - current.y * 0.9;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.getDelta(); // flush time accumulated while paused
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reducedMotion) {
      renderFrame(); // single still frame of the cloud
    } else {
      start();
    }

    // pause when the hero is offscreen or the tab is hidden
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(mount);
    const onVisibility = () =>
      document.hidden ? stop() : !reducedMotion && start();
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      if (reducedMotion) renderFrame();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [colors, count]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 opacity-0 transition-opacity duration-[2000ms] ease-out [&:has(canvas)]:opacity-100"
    />
  );
}
