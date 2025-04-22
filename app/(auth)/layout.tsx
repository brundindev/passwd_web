import PageIllustration from "@/components/page-illustration";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col flex-grow">
      <div className="absolute inset-0 overflow-hidden">
        <PageIllustration multiple />
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        {children}
      </div>
    </main>
  );
}
