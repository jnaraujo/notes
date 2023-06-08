import DashboardNavbar from "@/components/DashboardNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <aside className="group z-10 w-16 flex-shrink-0 border-r border-zinc-500 bg-zinc-900/20 transition-all duration-100 hover:w-48">
        <DashboardNavbar />
      </aside>
      <section className="mx-auto mt-8 max-w-screen-md flex-1 p-4 md:p-0">
        {children}
      </section>
    </main>
  );
}
