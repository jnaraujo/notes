import DashNavbar from "@/components/DashNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <aside className="group z-10 w-16 flex-shrink-0 bg-zinc-800 shadow-lg transition-all duration-100 hover:w-48">
        <DashNavbar />
      </aside>
      <section className="mx-auto max-w-screen-xl flex-1 p-4 md:p-8">
        {children}
      </section>
    </main>
  );
}
