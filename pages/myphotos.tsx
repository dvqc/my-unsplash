import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { PhotoComponent, PhotosContainer } from "../components/Photo";
import React, { createRef, useState } from "react";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Separator from "../components/Separator";
import { DeleteModal, AddModal } from "../components/Modal";
import DefaultHeader, { HeaderButton } from "../components/Header";
import Signin from "../components/Signin";
import Empty from "../components/Empty";
import { usePagination } from "hooks";
import { PhotosWithOwner } from "types/prisma.types";
import DeleteButton from "@components/Photo/DeleteButton";
import Router from "next/router";
import { HeadLayout } from "@components/Layouts";

const MyPhotos: NextPage = () => {
  const { data: session, status } = useSession();
  const [deleteId, setDeleteId] = useState("");
  const [search, setSearch] = useState("");

  const addModalRef = createRef<HTMLDialogElement>();
  const deleteModalRef = createRef<HTMLDialogElement>();

  const PAGE_SIZE = 7;

  const { data, isEmpty, isReachingEnd, setSize, size } =
    usePagination<PhotosWithOwner>(
      "api/myphotos",
      PAGE_SIZE,
      search.length > 2 ? { label: search } : undefined
    );

  if (status == "loading") return <Loader />;

  if (status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <HeadLayout>
      {" "}
      <DefaultHeader
        username={session?.user?.name ?? "Anonymous"}
        userImg={session?.user?.image ?? "../public/images/person.svg"}
        setSearch={setSearch}
      >
        <HeaderButton onClick={() => addModalRef.current?.showModal()}>
          Add a photo
        </HeaderButton>
        <HeaderButton onClick={() => Router.push("/")}>Home</HeaderButton>
      </DefaultHeader>
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
              photos={[...(data ? data.flat() : [])].map((photo) => (
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
    </HeadLayout>
  );
};

export default MyPhotos;
