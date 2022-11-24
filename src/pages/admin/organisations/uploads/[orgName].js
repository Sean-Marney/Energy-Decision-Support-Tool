import Head from "next/head";
import styles from "../../../../styles/Form.module.css";
// npm install react-icons --save
import { useState } from "react";
// npm install formik --save
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { readSites } from "../../../../lib/database_functions";
import axios from 'axios';

export default function UploadEnergyData({data}) {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const router = useRouter();
  const { orgName } = router.query;
  const sitesOption = data.map(site => <option value={site.name}>{site.name}</option>);
  function onFileChange (){
    alert("File changed");
    setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
  };

  function onFileUpload() {
    alert("File uploaded");
    // Create an object of formData
    const formData = new FormData();
        
    // Update the formData object
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    // Request made to the backend api
    // Send formData object
    axios.post("/auth/uploadFile", formData);
  };
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

        <form className="flex flex-col gap-5" onSubmit={onFileUpload}>
          {/* <div
            className={`${styles.input_group} ${
              formik.errors.file && formik.touched.file
                ? "border-rose-600"
                : ""
            }`}
          > */}
            <input
              className={styles.input_text}
              type={"file"}
              name="file"
              placeholder="Energy Data"
              onChange={onFileChange}
            />
          {/* </div> */}

          {/* <div
            className={`${styles.input_group} ${
              formik.errors.site && formik.touched.site ? "border-rose-600" : ""
            }`}
          > */}
            <select
              className={styles.input_text}
              name="dropdown"
            >
              <option value="">Select A Site</option>
              {sitesOption}
            </select>
          {/* </div> */}

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
