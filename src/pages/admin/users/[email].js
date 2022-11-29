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
    <div className="text-center">
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

import authorityCheck from "/services/authorityCheck";

export async function getServerSideProps({ req }) {
  // Get all users from database
  const getUsers = await prisma.user.findMany();

  var props = await authorityCheck(await getSession({ req }), ["admin"]);
  props["props"]["getUsers"] = await prisma.user.findMany({});

  return props;
}
