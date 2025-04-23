import "./css/style.css";

import { Inter, Space_Grotesk } from "next/font/google";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ChatBot from "@/components/ui/chatbot/ChatBot";
import AnimationProvider from "@/components/ui/animation/animation-provider";
import CursorEffects from "@/components/ui/animation/cursor-effects";
import AuthProvider from "@/lib/auth/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
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
    <html lang="es" className="h-full">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-gray-900 font-inter text-gray-100 tracking-tight h-full`}
      >
        <AnimationProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="grow">{children}</main>
              <Footer />
            </div>
            <ChatBot />
          </AuthProvider>
          <CursorEffects />
        </AnimationProvider>
      </body>
    </html>
  );
}
