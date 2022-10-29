import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { PhotosData } from "../types/prisma";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage<Record<string, PhotosData[]>> = ({ feed }) => {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <div>
          {feed.map((photo, i) => (
            <img key={i} src={photo.url}></img>
          ))}
        </div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
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
