'use client'
import Link from "next/link";

interface ServiceCardProps {
  image: string;
  title: string;
  link: string;
}

const ServiceCard = ({ image, title, link }: ServiceCardProps) => {
  return (
    <Link
      href={link}
      className="relative group rounded-sm overflow-hidden shadow-md"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay text */}
      <div className="absolute bottom-3 left-3 text-white text-sm font-medium drop-shadow-md">
        {title}
      </div>
    </Link>
  );
};

export default function ServicesSection() {
  const services = [
    {
      // image: "https://sfra.production.calzedonia.coremedia.cloud/resource/image/683038/portrait_ratio1x1/600/600/2fcd2f3f363a057a1d505983c8c3ae7e/3D604F9E57492AFCC2F36F4FBC184BB0/all-hp-editorialbannerprimary-cw4123-myintimissimi-int.jpg",
      image: "",
      title: "",
      link: "/loyalty",
    },
    {
      // image: "https://sfra.production.calzedonia.coremedia.cloud/resource/image/683038/portrait_ratio1x1/600/600/2fcd2f3f363a057a1d505983c8c3ae7e/3D604F9E57492AFCC2F36F4FBC184BB0/all-hp-editorialbannerprimary-cw4123-myintimissimi-int.jpg",
      image: "",
      title: "",
      link: "/find-size",
    },
  ];

  return (
    <section className=" flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-4 md:w-[85%] mx-auto md:pl-12 py-12">
      {/* Left side text */}
      <div className="md:w-1/3 w-full">
        <h2 style={{lineHeight: "41px"}} className="text-[24px]  md:text-[32px] font-medium text-center  text-gray-900">
          Discover our <span className="text-emerald-800 inline text-[24px]  md:text-[32px] font-medium">services.</span>
        </h2>
      </div>

      {/* Right side cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:w-2/3 w-full">
        {services.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </section>
  );
}
