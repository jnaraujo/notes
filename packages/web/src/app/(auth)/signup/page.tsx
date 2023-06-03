import SignUpForm from "@/components/SignUpForm";

export const metadata = {
  title: "Crie uma nova conta - AweNotes",
  description: "Crie uma nova conta no AweNotes.",
};

export default function SignUp() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-full flex-col gap-6 p-4 md:w-96">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-zinc-800">
            Crie uma nova conta 👌
          </h1>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
