import DashNavbar from "@/components/DashNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <aside className="group w-16 hover:w-48 bg-zinc-800 flex-shrink-0 shadow-lg z-10 transition-all duration-100">
        <DashNavbar />
      </aside>
      <section className="flex-1">
        {children}
      </section>
    </main >
  )
}