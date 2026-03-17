import { ReactNode } from 'react';

// Ce layout est nécessaire pour les pages racines hors de [locale]
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
