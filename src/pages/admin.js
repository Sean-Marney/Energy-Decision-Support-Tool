import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Admin() {
  function handleSignOut() {
    signOut();
  }

  return (
    <div className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Admin Panel</h3>

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
          Register New Account
        </Link>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/dashboard"}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of this code to reduce repeated code
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  // Gets currently logged in user
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // If a non-admin tries to access admin panel, redirect them to dashboard (if they don't have access to dashboard, they are redirected to homepage)
  if (user.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
    // If admin, show page
  } else {
    return {
      props: { session },
    };
  }
}
