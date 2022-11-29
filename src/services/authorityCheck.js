export default async function (session, allowedRoles) {
  // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of 'get user' code to reduce repeated code

  var user = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  // TODO - If delete cookies while admin, returns error rather than redirect

  // Redirect the user to the homepage if they do not have authority to continue
  if (!allowedRoles.includes(user.role)) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}
