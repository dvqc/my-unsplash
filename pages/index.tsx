import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import prisma from "../lib/prisma";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Photo } from "@prisma/client";
import Header from "../components/Header";
import PhotoComponent from "../components/PhotoComponent";
import PhotosContainer from "../components/PhotosContainer";
import Modal from "../components/AddModal";
import { createRef } from "react";

type Feed = {
  feed: Photo[];
};

const Home: NextPage<Feed> = ({ feed }) => {
  const { data: session, status } = useSession();
  const modalRef = createRef<HTMLDialogElement>();

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
      <Header
        username={session?.user?.name ?? "Anonymous"}
        onAddPhoto={() => {
          modalRef.current?.showModal();
        }}
      />
      <main>
        <PhotosContainer photos={feed} />
        <Modal ref={modalRef}></Modal>
      </main>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

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
