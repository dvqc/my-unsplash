import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { PhotoComponent, PhotosContainer } from "../components/Photo";
import React, { createRef, useState } from "react";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Separator from "../components/Separator";
import { DeleteModal, AddModal } from "../components/Modal";
import DefaultHeader from "../components/Header";
import Signin from "../components/Signin";
import Empty from "../components/Empty";
import { usePagination } from "hooks";
import { PhotoWithOwner } from "types/prisma.types";
import DeleteButton from "@components/Photo/DeleteButton";

const MyPhotos: NextPage = () => {
  const { data: session, status } = useSession();
  const [deleteId, setDeleteId] = useState("");

  const addModalRef = createRef<HTMLDialogElement>();
  const deleteModalRef = createRef<HTMLDialogElement>();

  const PAGE_SIZE = 7;

  const { data, isEmpty, isReachingEnd, setSize, size } =
    usePagination<PhotoWithOwner>("api/myphotos", PAGE_SIZE);

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
              photos={[...(data ? data?.flat() : [])].map((photo) => (
                <PhotoComponent
                  key={photo.id}
                  url={photo.url}
                  label={photo.label}
                  owner={"You"}
                  button={
                    <DeleteButton
                      onButton={() => {
                        setDeleteId(photo.id);
                        deleteModalRef.current?.showModal();
                      }}
                    ></DeleteButton>
                  }
                />
              ))}
            />
          </InfiniteScroll>
        )}
        <DeleteModal ref={deleteModalRef} id={deleteId}></DeleteModal>
        <AddModal ref={addModalRef}></AddModal>
      </main>
    </>
  );
};

export default MyPhotos;
