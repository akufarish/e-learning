import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work font-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/icon.png" alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="">
                  Logout
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span className="">{session.user.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button type="submit" className="">
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
