import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo_passwd.JPEG";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Passwd">
      <Image src={logo} alt="Passwd Logo" width={40} height={40} className="rounded-full" />
    </Link>
  );
}
