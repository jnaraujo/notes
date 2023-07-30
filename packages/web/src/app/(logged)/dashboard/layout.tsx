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
      <aside className="flex h-full md:w-56">
        <div className="group fixed z-10 hidden h-full w-full border-r-2 border-zinc-900/20 transition-all duration-100 md:block md:w-56">
          <DashboardNavbar user={loggedUser} />
        </div>
      </aside>
      <section className="mx-auto mt-12 h-fit flex-1 p-4 md:max-w-screen-md">
        {children}
      </section>
    </main>
  );
}
