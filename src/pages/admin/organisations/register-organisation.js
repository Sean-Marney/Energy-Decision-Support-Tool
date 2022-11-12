import Head from "next/head";
import Layout from "../../../layout/layout";
import styles from "../../../styles/Form.module.css";
// npm install react-icons --save
import { HiUsers } from "react-icons/hi";
// npm install formik --save
import { useFormik } from "formik";
import { registerOrgValidate } from "../../../lib/validate";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function RegisterOrganisation() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      orgName: "",
    },
    validate: registerOrgValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const submit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "http://localhost:3000/api/auth/signup-organisation",
      submit
    ).then((res) =>
      res.json().then((data) => {
        if (data) router.push("http://localhost:3000/admin/organisations");
      })
    );
  }

  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font-bold py-4">
            Register a New Organisation
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Empowering Energy Solutions
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.orgName && formik.touched.orgName
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type="text"
              name="orgName"
              placeholder="Organisation Name"
              {...formik.getFieldProps("orgName")}
            />
            <span className="icon flex items-center px-4">
              <HiUsers size={25} />
            </span>
          </div>

          <div className="input-button">
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of 'get user' code to reduce repeated code
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  // Gets current user
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // If a non-admin tries to access register page, redirect them to dashboard (if they don't have access to dashboard, they are redirected to homepage)
  if (user.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
    // If admin, show page
  } else {
    return {
      props: { session },
    };
  }
}
