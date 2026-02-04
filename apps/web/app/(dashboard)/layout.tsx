import NavbarClient from "@/components/navbar/NavbarClient";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarClient />
      {children}
    </div>
  );
}
