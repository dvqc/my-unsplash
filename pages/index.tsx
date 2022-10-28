import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { PhotosData } from "../types/prisma";

const Home: NextPage<Record<string, PhotosData[]>> = ({ feed }) => {
  return (
    <div>
      {feed.map((photo, i) => (
        <img key={i} src={photo.url}></img>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feed = await prisma.photo.findMany({
    include: {
      owner: {
        select: { name: true }
      }
    }
  });
  return {
    props: { feed }
  };
};

export default Home;
