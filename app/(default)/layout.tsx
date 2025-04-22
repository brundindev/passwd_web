import { metadata } from "./metadata";
import ClientLayout from "./client-layout";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <main className="relative flex flex-col">{children}</main>
    </ClientLayout>
  );
}

// Re-exportamos los metadatos para que Next.js los reconozca
export { metadata };
