"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "loading") {
      setLoading(!loading);
    }
    if (session.status === "authenticated") {
      router?.push("/dashboard");
    }
  }, [session]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        res.status === 201 &&
          router.push("/dashboard/login?success=Acount has been created");
      } catch (err) {
        setErr(true);
      }
    },
  });

  return (
    <div className={styles.container}>
      {session.status === "unauthenticated" && (
        <>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="username"
              className={styles.input}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div className={styles.errors}>{formik.errors.name}</div>
            ) : null}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              className={styles.input}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className={styles.errors}>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              className={styles.input}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div className={styles.errors}>{formik.errors.password}</div>
            ) : null}
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
          {err && "Something went wrong!"}

          <Link href="/dashboard/login">Login with an existing account</Link>
        </>
      )}
      {loading && (
        <ClipLoader
          color="blue"
          loading={loading}
          className={styles.loading}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default Register;
