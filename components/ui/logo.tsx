import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Passwd">
      <Image src="/images/logo_passwd.JPEG" alt="Passwd Logo" width={40} height={40} className="rounded-full" />
    </Link>
  );
}
