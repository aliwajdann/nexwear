// components/ConditionalHeader.tsx (client)
"use client";

import { usePathname } from "next/navigation";
import FixedHeader from "@/components/FixedHeader";
// import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  // return pathname === "/" ? <FixedHeader /> : <Header />;
  return <FixedHeader />;
}
