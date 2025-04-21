import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label="Passwd">
      <Image src="/images/logo_passwd.JPEG" alt="Passwd Logo" width={40} height={40} className="rounded-full" />
      <span className="font-semibold text-white text-lg">PASSWD.</span>
    </Link>
  );
}
