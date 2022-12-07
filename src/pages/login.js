import Head from "next/head";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiEye } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import loginValidate from "../lib/validate";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { hash } from "bcrypt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";
import { Card } from "../components/ui/Card";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  var [email, setEmail] = useState("");

  async function onSubmit(values) {
    console.log("RIUN")

    const submitStatus = await signIn("credentials", {
      redirect: false,
      email: "",
      password: "",
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
    <>
      <div>
        {/* Invalid credentials toast message */}
        <ToastContainer />
      </div>

      <Head>
        <title>Login</title>
      </Head>

      <div className="grid grid-cols-12">
        <Card className="col-span-4 col-start-5 my-auto">
          <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title">
              <h1 className="text-4xl font-bold py-4 afterline">Welcome to DSS</h1>
            </div>

              <form className="flex flex-col gap-5" id="loginForm">
                <TextField placeholder="Email" type="email" value={email} /><br></br>
                <TextField placeholder="Password" type="password" /><br></br>
                <Button form="loginForm">Login</Button>
              </form>
              <span className="text-xs">The data held on this system is private property. Access to the data is only available for authorised users and authorised purposes. Unauthorised etry contravenes the Computer Misuse Act 1990 and may incur criminal penalties as well as adamages.</span>
              <span className="text-xs text-center">© Empowering Energy Solutions Ltd 2022</span>
          </section>
        </Card>
      </div>
    </>
  );
}

// On  loading /login, create default accounts
// TODO: Error occurs if the database has no default users and user navigates to index before /login

export async function getStaticProps() {
  console.log("Creating default accounts");

  try {
    const defaultUsers = await prisma.user.createMany({
      data: [
        {
          email: "admin@e2s.com",
          password: await hash("admin123", 12),
          role: "admin",
          organisation: "E2S",
        },
        {
          email: "manager@cardiff.com",
          password: await hash("manager123", 12),
          role: "manager",
          organisation: "Cardiff University",
        },
      ],
    });
    return {
      props: {
        defaultUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        message: "Default accounts already created",
      },
    };
  }
}
