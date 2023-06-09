import Head from "next/head";
import styles from "../../../../styles/Form.module.css";
import { useState, useRef } from "react";
import { useRouter} from "next/router";
import { FaFileCsv } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/Md';
import {GrMapLocation} from 'react-icons/Gr';
import React from "react";

export default function UploadEnergyData() {
  const [selectedFile, setSelectedFile] = useState();
  const [sitesOption, setSitesOption] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)
  const router = useRouter();
  const { orgName } = router.query;
  const title = useRef();
  const file = useRef();
  const site = useRef();
  let validTitle =  false;

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
       c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function getData(){
    fetch('http://localhost:3000/api/site/get?organisation=' + getCookie("organisation")).then(async (response) => {
      const body = await response.json()
      let sites = body.sites;
      setSitesOption(sites.map(site => <option value={site.name} id={site.name}>{site.name}</option>))
      setIsDownloading(false)
    })
  }
  React.useEffect(() => {
    if(!isLoaded){
      getData()
      setIsLoaded(true)
    }
  }, [])



  // Function to handle the file upload
  function onFileChange (){
    setSelectedFile(event.target.files[0]);
    validateFile(event.target.files[0]);
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
            body.append("title", title.current.value);
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
              ref = {file}
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
              ref = {title}
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
              ref={site}
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
