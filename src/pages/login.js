import Head from "next/head";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";
// npm install react-icons --save
import { HiAtSymbol, HiEye } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
// npm install formik --save
import { useFormik } from "formik";
import loginValidate from "../lib/validate";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { hash } from "bcrypt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const submitStatus = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (submitStatus.ok) {
      router.push(submitStatus.url);
    }

    if (submitStatus.error) {
      toast.error("Invalid credentials provided");
    }
  }

  return (
    <Layout>
      {/* Invalid credentials toast message */}
      <div>
        <ToastContainer />
      </div>

      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font-bold py-4">Energy DSS</h1>
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
          {/* {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : (
            <></>
          )} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiEye size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )} */}

          <div className="input-button">
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

// On  loading /login, create default admin and manager user
export async function getStaticProps() {
  console.log("Creating default users");

  try {
    const defaultUsers = await prisma.user.create({
      data: {
        email: "admin@e2s.com",
        password: await hash("admin123", 12),
        role: "admin",
      },
      data: {
        email: "manager@cardiff.com",
        password: await hash("manager123", 12),
        role: "manager",
      },
    });
    return {
      props: {
        defaultUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        message: "Default users already created",
      },
    };
  }
}
