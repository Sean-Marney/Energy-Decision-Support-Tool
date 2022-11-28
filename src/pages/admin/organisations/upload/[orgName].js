import Head from "next/head";
import styles from "../../../../styles/Form.module.css";
// npm install react-icons --save
import { useState } from "react";
// npm install formik --save
import { useRouter, router } from "next/router";
import { getSession } from "next-auth/react";
import { readSites } from "../../../../lib/database_functions";
import axios from 'axios';

export default function UploadEnergyData({data}) {
  const [selectedFile, setSelectedFile] = useState();
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const router = useRouter();
  const { orgName } = router.query;
  const sitesOption = data.map(site => <option value={site.name}>{site.name}</option>);
  let validFile, validSite;
  function onFileChange (){
    setSelectedFile(event.target.files[0]);
    // setCreateObjectURL(URL.createObjectURL(selectedFile));
    // if (event.target.files[0].type != "text/csv"){
    //   validFile = true;
    // }
  };


  async function uploadToServer(){
      try {
        const body = new FormData();
        body.append("file", selectedFile);
        body.append("site", form.site.value);
        body.append("organisation", orgName);
        body.append("title", form.title.value);
        const response = await fetch("http://localhost:3000/api/auth/uploadFile", {
          method: "POST",
          body
        });
        alert("All good");
      } catch (error) {
      }
  }

  // function validateInputs(){
  //   let valid = true;
  //   if (selectedFile.type != "text/csv"){
  //     valid = false;
  //   }
  //   if (form.site.value ==  "null"){
  //     valid = false;
  //   }
  // }



  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font-bold py-4">
            Uploading Energy Data
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">{orgName}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={uploadToServer} name = "form">
          <div
            className={`${styles.input_group} ${
              !{validFile}
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={"file"}
              name="file"
              placeholder="Energy Data"
              onChange={onFileChange}
            />
          </div>
          <div
            className={`${styles.input_group} ${
              !{validFile}
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={"text"}
              name="title"
              placeholder="File name"
            />
          </div>
          <div
            className={`${styles.input_group} ${
              false ? "border-rose-600" : ""
            }`}
          >
            <select
              className={styles.input_text}
              name="site"
            >
              <option value="null">Select A Site</option>
              {sitesOption}
            </select>
          </div>

          <div className="input-button">
            <button className={styles.button} type="submit">
              Upload
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Protects route
export async function getServerSideProps(context) {
  let req = context.req;
  const session = await getSession({req});
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
  // const { organisationID } = context.query;
  // Reads sites from the database
  let data = await readSites(context.params.orgName);
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
      props: {session, data}
    };
  }
}
