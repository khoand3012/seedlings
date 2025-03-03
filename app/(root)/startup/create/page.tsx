import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

export default async function CreateStartupPage() {
  const session = await auth();
  if (!session || !(session as any).id) redirect("/");
  return (
    <>
      <section className="lime_container !min-h-[230px]">
        <h1 className="heading">Submit your startup</h1>
      </section>
      <section>
        <StartupForm />
      </section>
    </>
  );
}
