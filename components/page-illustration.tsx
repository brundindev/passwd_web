"use client";

import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import Parallax from "@/components/ui/animation/parallax";
import { motion } from "framer-motion";

export default function PageIllustration({
  multiple = false,
}: {
  multiple?: boolean;
}) {
  return (
    <>
      <Parallax speed={0.3} direction="down" className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            className="max-w-none"
            src={Illustration}
            width={846}
            height={594}
            alt="Ilustración de página"
          />
        </motion.div>
      </Parallax>
      
      {multiple && (
        <>
          <Parallax speed={0.5} direction="left" className="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <Image
                className="max-w-none"
                src={BlurredShapeGray}
                width={760}
                height={668}
                alt="Forma difuminada"
              />
            </motion.div>
          </Parallax>
          
          <Parallax speed={0.7} direction="right" className="pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Image
                className="max-w-none"
                src={BlurredShape}
                width={760}
                height={668}
                alt="Forma difuminada"
              />
            </motion.div>
          </Parallax>
        </>
      )}
    </>
  );
}
