import type { ReactNode } from "react";
import AdminSidebar from "./components/AdminSidebar";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="sv-dashboard">
  <AdminSidebar />
  <section className="sv-main">
    {children}
  </section>
</main>
  );
}