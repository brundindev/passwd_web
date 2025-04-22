export const metadata = {
  title: "Mis Contraseñas - PASSWD",
  description: "Gestiona todas tus contraseñas guardadas en PASSWD",
};

import PasswordsClient from './passwords-client';

export default function Passwords() {
  return <PasswordsClient />;
} 