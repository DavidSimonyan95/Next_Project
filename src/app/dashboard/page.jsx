"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const session = useSession();

  const router = useRouter();

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  if (session.status === "authenticated") {
    return <div>Dashboard</div>;
  }
};

export default Dashboard;
