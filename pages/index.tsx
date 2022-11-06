import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { PhotosContainer } from "../components/Photo";
import React, { createRef, useState } from "react";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Separator from "../components/Separator";
import { DeleteModal, AddModal } from "../components/Modal";
import DefaultHeader from "../components/Header";
import Signin from "../components/Signin";
import Empty from "../components/Empty";
import { usePagination } from "hooks";
import { Photo } from "@prisma/client";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [deleteId, setDeleteId] = useState("");

  const addModalRef = createRef<HTMLDialogElement>();
  const deleteModalRef = createRef<HTMLDialogElement>();

  const PAGE_SIZE = 7;

  const { data, isEmpty, isReachingEnd, setSize, size } = usePagination<Photo>(
    "api/photos",
    PAGE_SIZE
  );

  if (status == "loading") return <Loader />;

  if (status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <>
      <DefaultHeader
        username={session?.user?.name ?? "Anonymous"}
        userImg={session?.user?.image ?? "../public/images/person.svg"}
        onAdd={() => addModalRef.current?.showModal()}
      />
      <main>
        {isEmpty ? (
          <Empty></Empty>
        ) : (
          <InfiniteScroll
            dataLength={data ? data?.length : 0}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd || false}
            loader={<Loader />}
            endMessage={<Separator text="There are no more images"></Separator>}
          >
            <PhotosContainer
              photos={[...(data ? data?.flat() : [])]}
              selectDelPhoto={setDeleteId}
              deleteModal={deleteModalRef}
            />
          </InfiniteScroll>
        )}
        <DeleteModal ref={deleteModalRef} id={deleteId}></DeleteModal>
        <AddModal ref={addModalRef}></AddModal>
      </main>
    </>
  );
};

export default Home;
