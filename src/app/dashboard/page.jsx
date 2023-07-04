"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";

const Dashboard = () => {
  // const [ data,setData ] = useState([]);
  // const [ err,setErr ] = useState(false);
  // const [ isLoading,setIsLoading ] = useState(false)

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
  //       cache:"no-store",
  //     });

  //     if(!res.ok){
  //       setErr(true)
  //     }

  //    const data = await res.json();

  //    setData(data);
  //    setIsLoading(false);
  //   }
  //   getData()
  // },[]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at
          posuere eros. Interdum et malesuada fames ac ante ipsum primis in
          faucibus.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
