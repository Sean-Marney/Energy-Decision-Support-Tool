import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// Should be switched to ID later
export default function User({ getUsers }) {
  function handleSignOut() {
    signOut();
  }

  const router = useRouter();
  const { email } = router.query;

  // Getting current user's details to display
  const arrayOfUsers = [];
  getUsers.map((user) => {
    if (user.email === email) {
      arrayOfUsers.push(user);
    }
  });

  return (
    <div>
      <h1>
        User profile for <b>{email}</b>
      </h1>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className="text-2xl">
        <br />
        <b>ID:</b> {arrayOfUsers[0].id} <br />
        <b>Email:</b> {arrayOfUsers[0].email} <br />
        <b>Role:</b> {arrayOfUsers[0].role} <br />
        <b>Organisation:</b> {arrayOfUsers[0].organisation} <br />
      </div>
    </div>
  );
}

// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Get all users from database
  const getUsers = await prisma.user.findMany();

  // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of 'get user' code to reduce repeated code
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

  // Gets current user
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // If a non-admin tries to access register page, redirect them to dashboard (if they don't have access to dashboard, they are redirected to homepage)
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
      props: {
        session,
        getUsers,
      },
    };
  }
}
