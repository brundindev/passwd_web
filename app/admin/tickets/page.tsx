import TicketsAdminClient from './tickets-admin-client';

export const metadata = {
  title: 'Administración de Tickets - PASSWD',
  description: 'Panel de administración para gestionar tickets de soporte.',
}

export default function TicketsAdminPage() {
  return <TicketsAdminClient />;
} 