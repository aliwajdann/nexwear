// components/ConditionalHeader.tsx (client)
// import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ConditionalHeader() {
  // const pathname = usePathname();
  // return pathname === "/" ? <FixedHeader /> : <Header />;
  return <Header />;

}
