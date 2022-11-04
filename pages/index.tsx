import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import prisma from "../lib/prisma";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Photo } from "@prisma/client";
import Header from "../components/Header";
import PhotoComponent from "../components/PhotoComponent";
import PhotosContainer from "../components/PhotosContainer";
import AddModal from "../components/AddModal";
import { createRef, useState } from "react";
import DeleteModal from "../components/DeleteModal";

type Feed = {
  feed: Photo[];
};

const PHOTOS_PER_PAGE = 7;
const Home: NextPage<Feed> = ({ feed }) => {
  const { data: session, status } = useSession();

  const [page, setPage] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const addModalRef = createRef<HTMLDialogElement>();
  const deleteModalRef = createRef<HTMLDialogElement>();
  
  const fetchPhotos =() => {
    
  }
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
          addModalRef.current?.showModal();
        }}
      />
      <main>
        <PhotosContainer
          photos={feed}
          selectDelPhoto={setDeleteId}
          deleteModal={deleteModalRef}
        />
        <DeleteModal ref={deleteModalRef} id={deleteId}></DeleteModal>
        <AddModal ref={addModalRef}></AddModal>
      </main>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session != undefined) {
    const feed = await prisma.photo.findMany({
      take: PHOTOS_PER_PAGE,
      where: {
        ownerId: session.user?.id
      },
      orderBy: {
        id: "desc"
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
