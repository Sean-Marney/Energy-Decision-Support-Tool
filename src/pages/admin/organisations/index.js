import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Form.module.css";

import Card from "../../../components/ui/Card";
import {Button} from "../../../components/ui/Button";

export default function ManageOrganisations({ getOrganisations }) {
  function handleSignOut() {
    signOut();
  }

  return (
    <Card className="m-8 flex-col gap-6 w-full flex">
      <h1 className="afterline text-5xl mb-6">Admin panel</h1>
      <Link href="organisations/register-organisation"><Button>Register new organisation</Button></Link>
      {getOrganisations.map((organisation) => (<Link href={"admin/organisations/" + organisation.name}><Button>{organisation.name}</Button></Link>) )}

    </Card>

  );
}

import authorityCheck from "/services/authorityCheck";

export async function getServerSideProps({ req }) {
  var props = await authorityCheck(await getSession({ req }), ["admin"]);
  props["props"]["getOrganisations"] = await prisma.organisation.findMany();

  return props;
}
