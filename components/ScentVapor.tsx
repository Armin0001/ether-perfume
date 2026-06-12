"use client";

import dynamic from "next/dynamic";

const VaporCanvas = dynamic(() => import("./VaporCanvas"), { ssr: false });

export default function ScentVapor({ colors }: { colors: [string, string] }) {
  return <VaporCanvas colors={colors} count={14000} />;
}
