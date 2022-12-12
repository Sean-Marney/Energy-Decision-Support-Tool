import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import styles from "../../../styles/Form.module.css";

// TODO: Admin can type anything after /admin/organisations/ but should only be able to view existing organisations in database

export default function Organisation({ getUsers }) {
  function handleSignOut() {
    signOut();
  }

  // Gets name of organisation selected
  const router = useRouter();
  const { orgName } = router.query;

  // Creates array of users and filters by organisation
  const arrayOfOrgs = [];
  getUsers.map((user) => {
    if (user.organisation === orgName) {
      arrayOfOrgs.push(user);
    }
  });

  // TODO: Needs to only show users that match orgName
  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <div>
        <h1>{orgName}</h1>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={`/admin/organisations/register/${orgName}`}
        >
          Add New User
        </Link>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={`/admin/organisations/create-optimisation/${orgName}`}
        >
          Add New Optimisation
        </Link>
      </div>
      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={`/admin/organisations/upload/${orgName}`}
        >
          Upload Energy Data
        </Link>
      </div>

      <div className="text-xl text-center">
        <br />
        <b>Manage Users:</b>
        {/* Shows only users from selected organisation */}
        <ul>
          {arrayOfOrgs.map((user) => (
            <li key={user.id}>
              <Link
                className={styles.organisation}
                href={`/admin/users/${user.email}`}
              >
                {user.email}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import authorityCheck from "/services/authorityCheck";

export async function getServerSideProps({ req }) {
  var props = await authorityCheck(await getSession({ req }), ["admin"]);
  props["props"]["getUsers"] = await prisma.user.findMany({});

  return props;
}
