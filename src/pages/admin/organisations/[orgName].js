import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import styles from "../../../styles/Form.module.css";

// TODO: Admin can type anything after /admin/organisations/ but should only be able to view existing organisations in database

export default function Organisation({ getUsers }) {
  const router = useRouter();
  const { orgName } = router.query;

  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <div>
        <h1>{orgName}</h1>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={`/admin/organisations/register/${orgName}`}
        >
          Add New User
        </Link>
      </div>

      <div className="text-xl">
        <br />
        <b>Manage Users:</b>
        {/* <ul>
          {getUsers.map((user) => (
            <li key={user.id}>
              <Link
                className={styles.organisation}
                // Should switch to IDs in links once done
                href={`/admin/users/${user.email}`}
              >
                {user.email}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // const getUsers = await prisma.user.findMany({
  //   where: {
  //     organisation: "E2S",
  //   },
  // });

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
        // getUsers,
      },
    };
  }
}
