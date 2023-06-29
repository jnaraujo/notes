import { User } from "@/@types/user";
import DashboardNavbar from "@/components/DashboardNavbar";
import { fetchUser } from "@/lib/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUser = (await fetchUser()) as User;

  return (
    <main className="flex h-screen">
      <aside className="group z-10 h-full w-56 flex-shrink-0 bg-zinc-900/20 transition-all duration-100">
        <DashboardNavbar user={loggedUser} />
      </aside>
      <section className="mx-auto mt-12 max-w-screen-md flex-1 p-4">
        {children}
      </section>
    </main>
  );
}
