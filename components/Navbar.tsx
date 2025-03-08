import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await auth();
  const providers = [
    { name: "github", alt: "Github logo" },
    { name: "google", alt: "Google logo" },
    { name: "facebook", alt: "Facebook logo" },
  ];

  const handleSignIn = async (formData: FormData) => {
    "use server";
    const provider = formData.get("provider") as string;
    await signIn(provider);
  };

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-5">
          <Image
            src={"/logo.png"}
            alt="site-logo"
            height={32}
            width={32}
          ></Image>
          <span className="font-work-sans text-xl font-bold">Seedlings</span>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden"></BadgePlus>
              </Link>
              <form action={handleSignOut} className="flex">
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${(session as any).id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.email || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-[16px]">
                <span className="text-bold">Sign in with:</span>
                <form
                  action={handleSignIn}
                  className="flex items-center gap-[12px]"
                >
                  {providers.map(({ alt, name }) => {
                    return (
                      <button
                        key={name}
                        type="submit"
                        value={name}
                        name="provider"
                      >
                        <Image
                          src={`/${name}.png`}
                          alt={alt}
                          height={32}
                          width={32}
                        />
                      </button>
                    );
                  })}
                </form>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
