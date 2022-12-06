export async function getUsers(session) {
  let user;
    // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of 'get user' code to reduce repeated code
  try {
    user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    console.log(error);
  };
return user;
};  