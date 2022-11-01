import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { PhotosData } from "../types/prisma.types";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Photo } from "@prisma/client";

type Feed = {
  feed: Photo[];
};

const Home: NextPage<Feed> = ({ feed }) => {
  const { data: session, status } = useSession();

  if (status == "loading") return <div>loading ...</div>;

  if (status == "unauthenticated") {
    return (
      <>
        <h1>Not signed in </h1>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return (
    <>
      Signed in as {session?.user?.name} <br />
      <div>
        {feed.map((photo, i) => (
          <img key={i} src={photo.url}></img>
        ))}
      </div>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session)
//     return {
//       redirect: {
//         destination: "api/auth/signin",
//         permanent: false
//       }
//     };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session != undefined) {
    const feed = await prisma.photo.findMany({
      where: {
        ownerId: session.user?.id
      }
    });
    return {
      props: { feed }
    };
  }
  return {
    props: { feed: [] }
  };
};

export default Home;
