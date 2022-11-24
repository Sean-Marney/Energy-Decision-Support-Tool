import Head from "next/head";
import styles from "../../../../styles/Form.module.css";
// npm install react-icons --save
import { useState } from "react";
// npm install formik --save
import { useFormik } from "formik";
import { registerEnergyDataValidate } from "../../../../lib/validate";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { readSites } from "../../../../lib/database_functions";

export default function UploadEnergyData({data}) {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const router = useRouter();
  const { orgName } = router.query;
  const formik = useFormik({
    initialValues: {
      file: "",
      site: "",
      organisation: orgName,
    },
    onSubmit,
  });
  function changeHandler(event){
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
  }

  async function onSubmit(values) {
    // values.newfile = JSON.stringify(selectedFile);
    // alert(values.file);
    // const submit = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // };
    // await fetch("http://localhost:3000/api/auth/uploadFile", submit).then(
    //   (res) =>
    //     res.json().then((data) => {
    //       if (data) router.push("http://localhost:3000/admin/organisations");
    //     })
    // );
    let mainDirectory = path.join(process.cwd(),"/..");
    let organisation = req.body.organisation;
    let site = req.body.site;
    let file = req.body.file;
    const postsDirectory = path.join(mainDirectory, 'energyData/',organisation,"/",site,"/");
    const fullPath = path.join(postsDirectory,"/energyData.csv");
    const fileContents = selectedFile;
    try {
      if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation))) {
        fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation));
      }
      if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation,"/",site))) {
          fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation,"/",site));
      }
    } catch (err) {
      console.error(err);
  }
  fs.appendFile(fullPath, fileContents, err => {
      if (err) {
        console.error(err);
      }
  });


  }
  const sitesOption = data.map(site => <option value={site.name}>{site.name}</option>);
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

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.file && formik.touched.file
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={"file"}
              name="file"
              placeholder="Energy Data"
              onChange={changeHandler}
              // {...formik.getFieldProps("file")}
            />
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.site && formik.touched.site ? "border-rose-600" : ""
            }`}
          >
            <select
              className={styles.input_text}
              name="dropdown"
              {...formik.getFieldProps("site")}
            >
              <option value="">Select A Site</option>
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
