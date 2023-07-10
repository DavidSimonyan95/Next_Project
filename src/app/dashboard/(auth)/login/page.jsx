"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") {
      setLoading(!loading);
    }

    if (session.status === "authenticated") {
      router?.push("/dashboard");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className={styles.container}>
      {session.status === "unauthenticated" && (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="password"
              className={styles.input}
              required
            />
            <button className={styles.button}>Login</button>
          </form>
          <button
            className={styles.loginGoogle}
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
          <button
            className={styles.loginGoogle}
            onClick={() => router?.push("/dashboard/register")}
          >
            Register
          </button>
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

export default Login;
