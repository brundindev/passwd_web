import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Panel de Administración - PASSWD',
  description: 'Panel de administración de PASSWD.',
}

export default function AdminPage() {
  redirect('/admin/tickets');
} 