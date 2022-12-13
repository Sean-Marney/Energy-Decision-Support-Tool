import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import Card from "../../components/ui/Card";
import {Button} from "../../components/ui/Button";

export default function Admin() {
  function handleSignOut() {
    signOut();
  }

  return (
    <Card className="m-8 flex-col gap-6 w-full">
      <h1 className="afterline text-5xl mb-6">Admin panel</h1>
      <Link href="admin/organisations"><Button>Manage organisations</Button></Link>
    </Card>
  );
}

import authorityCheck from "/services/authorityCheck";

export async function getServerSideProps({ req }) {
  var props = await authorityCheck(await getSession({ req }), ["admin"]);
  props["props"]["getUsers"] = await prisma.user.findMany({});

  return props;
}
