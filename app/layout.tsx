import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ChatBot from "@/components/ui/chatbot/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: "/fonts/Nacelle-Regular.woff2",
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata = {
  title: "PASSWD - Gestor de Contraseñas Seguro",
  description:
    "PASSWD es un gestor de contraseñas seguro y fácil de usar. Protege tus cuentas online con contraseñas fuertes y almacenamiento cifrado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-900 font-inter text-gray-100 tracking-tight`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
