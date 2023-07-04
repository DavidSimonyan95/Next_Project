import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            nulla laborum. Molestias minima quam maxime cumque excepturi nam,
            quas eius nobis omnis, quod obcaecati aperiam at ipsum dolore, magni
            labore saepe nisi sed odio! Fugiat.
          </p>
          <div className={styles.author}>
            <Image
              src="https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>John Doe</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptatem aut harum molestias accusamus nemo eaque dolorum est
          similique officia aliquam dignissimos illo reiciendis fugiat
          inventore, consequuntur doloribus at in laborum quis, illum nisi, quam
          repellat alias. Ad fuga inventore laboriosam eligendi?
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptatem aut harum molestias accusamus nemo eaque dolorum est
          similique officia aliquam dignissimos illo.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptatem aut harum molestias accusamus nemo eaque dolorum est
          similique officia aliquam dignissimos illo reiciendis fugiat
          inventore, consequuntur doloribus at in laborum quis, illum nisi, quam
          repellat alias. Ad fuga inventore laboriosam eligendi?
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
