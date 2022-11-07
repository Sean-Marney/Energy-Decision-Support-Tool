import { getSession } from "next-auth/react";

export default function () {
  return (
    <section className="container mx-auto test-center">
      <h3 className="text-4xl font-bold">Profile Page</h3>
      <p>
        This page is here as an example of protecting a route via session. After
        signing out this page won't be accessible - we probably won't have a
        profile page here
      </p>
    </section>
  );
}

// Protect route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Unauthorised user returns redirect to login page
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Authorised user returns session
  return {
    props: { session },
  };
}
