import { useFormik } from "formik";
import { useRouter } from "next/router";
import styles from "../../../../styles/Form.module.css";
import { createOptimisationValidate } from "../../../../lib/validate";
import Head from "next/head";
import { HiAtSymbol } from "react-icons/hi";
import { getSession } from "next-auth/react";

export default function createOptimisation() {
  const router = useRouter();
  const { orgName } = router.query;
  console.log(orgName);
  const formik = useFormik({
    initialValues: {
      organisation: orgName,
      title: "",
      body: "",
      priority: "",
      archived: "",
    },
    validate: createOptimisationValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const submit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "http://localhost:3000/api/auth/create-optimisation",
      submit
    ).then((res) =>
      res.json().then((data) => {
        if (data)
          router.push(`http://localhost:3000/admin/organisations/${orgName}`);
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
            Create a New Optimisation
          </h1>
          <p className="w-3/4 mx-auto text-center text-gray-400">{orgName}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.title && formik.touched.title
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type="text"
              name="title"
              placeholder="Title"
              {...formik.getFieldProps("title")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.body && formik.touched.body ? "border-rose-600" : ""
            }`}
          >
            <input
              className={styles.input_text}
              type="text"
              name="body"
              placeholder="Body"
              {...formik.getFieldProps("body")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.priority && formik.touched.priority
                ? "border-rose-600"
                : ""
            }`}
          >
            <select
              className={styles.input_text}
              name="dropdownPriority"
              {...formik.getFieldProps("priority")}
            >
              <option value="">Select a Priority</option>
              <option value="1">High Priority</option>
              <option value="2">Medium Priority</option>
              <option value="3">Low Priority</option>
            </select>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.archived && formik.touched.archived
                ? "border-rose-600"
                : ""
            }`}
          >
            <select
              className={styles.input_text}
              name="dropdownArchived"
              {...formik.getFieldProps("archived")}
            >
              <option value="">Select an Option</option>
              <option value="1">Active</option>
              <option value="0">Archived</option>
            </select>
          </div>

          <div className="input-button">
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

import authorityCheck from "/services/authorityCheck";

export async function getServerSideProps({ req }) {
  return authorityCheck(await getSession({ req }), ["admin"]);
}
