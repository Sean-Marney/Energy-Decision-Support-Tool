import { getSession } from "next-auth/react";

// Index page will route user to page, depending on their role
export default function Home() {}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // If admin, load admin panel
  if (session && user.role === "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  // If manager, load dashboard
  if (session && user.role === "manager") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // If read-only, load dashboard - Needs to be made read-only somehow
  if (session && user.role === "read-only") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // If not logged in, load login page
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
