import '@/libs/ui/globals.css';

export const metadata = {
  title: 'Dashboard',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}
