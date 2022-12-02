import Head from "next/head";
import styles from "../../../../styles/Form.module.css";
import { useState } from "react";
import { useRouter} from "next/router";
import { getSession } from "next-auth/react";
import { readSites } from "../../../../lib/database_functions";
import { FaFileCsv } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/Md';
import {GrMapLocation} from 'react-icons/Gr';

export default function UploadEnergyData({data}) {
  const [selectedFile, setSelectedFile] = useState();
  const router = useRouter();
  const { orgName } = router.query;
  const sitesOption = data.map(site => <option value={site.name}>{site.name}</option>);
  let validTitle =  false;

  // Function to handle the file upload
  function onFileChange (){
    setSelectedFile(event.target.files[0]);
    validateFile(event.target.files[0])
  };

  // Validation for the file uploaded
  function validateFile(file){
    if (file.type == "text/csv") {
      document.getElementById("fileMessage").style.display = "none";
      document.getElementById("fileBox").style.borderColor = "green";
      return true;
    }else{
      document.getElementById("fileMessage").style.display = "block";
      document.getElementById("fileBox").style.borderColor = "red";
      return false;
    }  
  }

  // Validation for the title
  function onTitleChange (){
    let regex = /^[a-zA-Z0-9{1,20}]+$/i;
    if (!regex.test(form.title.value)){
      document.getElementById("titleMessage").style.display = "block";
      document.getElementById("titleBox").style.borderColor = "red";
      validTitle = false;
    }else{
      document.getElementById("titleMessage").style.display = "none";
      document.getElementById("titleBox").style.borderColor = "green";
      validTitle = true;
    }
  };

  // Function to handle the form submission
  async function uploadToServer(){
    // Check if the file and title is valid
    if (validateFile(selectedFile) && validTitle){
      try{
        // Create a form data object with the file, site, title and orgName
            const body = new FormData();
            body.append("file", selectedFile);
            body.append("site", form.site.value);
            body.append("organisation", orgName);
            body.append("title", form.title.value);
        // Makes API call 
            const response = await fetch("http://localhost:3000/api/auth/uploadFile", {
              method: "POST",
              body
            }).then(
              (res) =>
                res.json().then((data) => {
                  if (data) router.push("http://localhost:3000/admin/organisations");
                })
            );
          } catch (error) {
            console.error(error);
          }
          }
    else{
      event.preventDefault();
    }
  }  

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
            className={styles.input_group}
            id = "fileBox"
          >
            <input
              className={styles.input_text}
              type={"file"}
              name="file"
              placeholder="Energy Data"
              onChange={onFileChange}
              required
            />
             <span className="icon flex items-center px-4">
              <FaFileCsv size={25} />
              </span>
          </div>
          <p className="text-rose-600" style={{display:"none"}} id = "fileMessage">File must be a CSV</p>
          <div
            className={`${styles.input_group}`}
            id = "titleBox"
          >
            <input
              className={styles.input_text}
              type={"text"}
              name="title"
              placeholder="File name"
              required
              onChange={onTitleChange}
            />
            <span className="icon flex items-center px-4">
              <MdDriveFileRenameOutline size={25} />
            </span>
          </div>
          <p className="text-rose-600" style={{display:"none"}} id = "titleMessage">Invalid file name, can not contain a space</p>
          <div
            className={`${styles.input_group}`}
          >
            <select
              className={styles.input_text}
              name="site"
              placeholder="Select a Site"
              required
            >
              {sitesOption}
            </select>
            <span className="icon flex items-center px-4">
              <GrMapLocation size={25} />
              </span>
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
