// "use client";

// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// export default function SmoothScrollProvider({
//     children,
// }: {
//     children: React.ReactNode;
// }) {

//     const wrapper = useRef(null);

//     useGSAP(() => {

//         const smoother = ScrollSmoother.create({
//             wrapper: "#smooth-wrapper",
//             content: "#smooth-content",
//             smooth: 1.2,
//             effects: true,
//         });


//         return () => {
//             smoother.kill();
//         };

//     }, { scope: wrapper });


//     return (
//         <div ref={wrapper} id="smooth-wrapper">
//             <div id="smooth-content">
//                 {children}
//             </div>
//         </div>
//     );
// }