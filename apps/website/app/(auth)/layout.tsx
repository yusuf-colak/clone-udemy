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
    <body className={'flex w-screen  h-screen items-center justify-center'}>
      {children}
    </body>
  );
}
