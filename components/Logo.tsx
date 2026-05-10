import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2.5 group ${className}`}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    >
        <Image 
          src="/LOGO.png" 
          alt="Logo VozMayor" 
          width={50} 
          height={50} 
          className="object-cover"
        />
      <span className="text-2xl font-bold tracking-tight text-[#005A78]">
        Pensión<span className="text-[#008BB7]">Segura</span>
      </span>
    </Link>
  );
}