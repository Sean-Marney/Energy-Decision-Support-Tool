import { getSession } from "next-auth/react";
import Link from "next/link";
import styles from "../../../styles/Form.module.css";

export default function Users({ getUsers }) {
  return (
    <div className="text-xl">
      <br />
      <b>Manage Users:</b>
      <ul>
        {getUsers.map((user) => (
          <li key={user.id}>
            <Link
              className={styles.organisation}
              // Should switch to IDs in links once done
              href={`/admin/users/${user.email}`}
            >
              {user.email} <b className="text-2xl">|</b> {user.organisation}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const getUsers = await prisma.user.findMany({});

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
