import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getSession, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      {/* If session is true, display user page, else display guest page */}
      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  );
}

function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/login"}
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}

// Authorised user - Will be admin page
function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Admin Panel</h3>

      <div className="details">
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/register"}
        >
          Register a New User
        </Link>
      </div>
    </main>
  );
}

// Only generate homepage if we have a user (session is in cookies), else redirect to login page
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Return login page if no session
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Else return session (return homepage)
  return {
    props: { session },
  };
}
