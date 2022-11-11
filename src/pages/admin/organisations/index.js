import Head from "next/head";
import Link from "next/link";

export default function ManageOrganisations() {
  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/admin/organisations/register-organisation"}
        >
          Register an Organisation
        </Link>
      </div>

      <div>
        <br />
        <h1>Manage an organisaton:</h1>
        {/* Get orgs from DB and display */}
        <Link href={"/admin/organisations/org1"}>Organisation 1</Link> <br />
        <Link href={"/admin/organisations/org2"}>Organisation 2</Link> <br />
        <Link href={"/admin/organisations/org3"}>Organisation 3</Link> <br />
      </div>

      {/* register org will go inside a link to each org */}

      {/* <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/admin/organisations/register-user"}
        >
          Register New Account
        </Link>
      </div> */}
    </div>
  );
}
