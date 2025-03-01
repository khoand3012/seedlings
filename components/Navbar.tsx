import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="site-logo"
            height={30}
            width={30}
          ></Image>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-[16px]">
                <span className="text-bold">Sign in:</span>
                <form
                  action={async () => {
                    "use server";
                    await signIn("github");
                  }}
                >
                  <button type="submit">
                    <Image
                      src="/github.png"
                      alt="github logo"
                      height={32}
                      width={32}
                    />
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <button type="submit">
                    <Image
                      src="/google.png"
                      alt="google logo"
                      height={32}
                      width={32}
                    />
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await signIn("facebook");
                  }}
                >
                  <button type="submit">
                    <Image
                      src="/facebook.png"
                      alt="facebook logo"
                      height={32}
                      width={32}
                    />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
