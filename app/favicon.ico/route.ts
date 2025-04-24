import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Obtener la ruta absoluta del favicon en la carpeta public
    const filePath = path.join(process.cwd(), 'public', 'favicon.ico');
    
    // Leer el archivo
    const fileBuffer = fs.readFileSync(filePath);
    
    // Servir el archivo con el tipo de contenido correcto
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving favicon:', error);
    return new NextResponse(null, { status: 404 });
  }
} 