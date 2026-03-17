import { redirect } from 'next/navigation';

// Redirection automatique vers le français par défaut
// Cela évite les 404 sur les hébergements statiques comme OVH
export default function RootPage() {
  redirect('/fr');
}
