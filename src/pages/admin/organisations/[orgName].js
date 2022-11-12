import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../layout/layout";

export default function Organisation() {
  const router = useRouter();
  const { orgName } = router.query;

  return (
    <Layout>
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
        <div>
          <br />
          <h1>Manage Users:</h1>
        </div>
      </div>
    </Layout>
  );
}
