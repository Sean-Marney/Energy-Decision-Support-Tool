import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Form.module.css";

export default function ManageOrganisations({ getOrganisations }) {
  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <div className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Admin Panel</h3>

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
            href={"/admin/organisations/register-organisation"}
          >
            Register an Organisation
          </Link>
        </div>
      </div>

      {/* Show all organisations as dynamic links to their own page */}
      <div className="text-xl text-center">
        <b>Manage Organisations:</b>
        <ul>
          {getOrganisations.map((organisation) => (
            <li key={organisation.id}>
              <Link
                className={styles.organisation}
                href={`/admin/organisations/${organisation.orgName}`}
              >
                {organisation.orgName}
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
  props["props"]["getOrganisations"] = await prisma.organisation.findMany();

  return props;
}
