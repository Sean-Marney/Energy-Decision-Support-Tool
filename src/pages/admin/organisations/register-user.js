import Head from "next/head";
import styles from "../../../styles/Form.module.css";
// npm install react-icons --save
import { HiAtSymbol, HiEye } from "react-icons/hi";
import { useState } from "react";
// npm install formik --save
import { useFormik } from "formik";
import { registerValidate } from "../../../lib/validate";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function RegisterUser() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      role: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const submit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("http://localhost:3000/api/auth/signup", submit).then((res) =>
      res.json().then((data) => {
        if (data) router.push("http://localhost:3000");
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
            Register a New User
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Empowering Energy Solutions
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiEye size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiEye size={25} />
            </span>
          </div>

          <div className={styles.input_group}>
            <select
              className={styles.input_text}
              name="dropdown"
              {...formik.getFieldProps("role")}
            >
              <option value="">Select a Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="read-only">Read-Only</option>
            </select>
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
