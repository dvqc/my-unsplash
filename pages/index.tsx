import type { NextPage } from "next";
import Head from "next/head";
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
import { PhotoWithOwner } from "types/prisma.types";
import LikeButton from "@components/Photo/LikeButton";
import Router from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [deleteId, setDeleteId] = useState("");
  const user = session?.user;

  const addModalRef = createRef<HTMLDialogElement>();
  const deleteModalRef = createRef<HTMLDialogElement>();

  const PAGE_SIZE = 7;

  const { data, isEmpty, isReachingEnd, setSize, size, mutate } =
    usePagination<PhotoWithOwner>("api/photos", PAGE_SIZE);

  if (status == "loading") return <Loader />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <>
      <DefaultHeader
        username={user.name ?? "Anonymous"}
        userImg={user.image ?? "../public/images/person.svg"}
      >
        <HeaderButton onClick={() => addModalRef.current?.showModal()}>
          Add a photo
        </HeaderButton>
        <HeaderButton onClick={() => Router.push("/myphotos")}>
          My photos
        </HeaderButton>
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
              photos={[...(data ? data?.flat() : [])].map((photo, i) => (
                <PhotoComponent
                  key={photo.id}
                  url={photo.url}
                  label={photo.label}
                  owner={
                    photo.ownerId == user.id ? "You" : photo.owner?.name ?? ""
                  }
                  button={
                    <LikeButton
                      likesNumber={photo._count?.likes}
                      photoId={photo.id}
                      isLiked={
                        photo.likes != undefined
                          ? photo.likes
                              .map((like) => like.userId)
                              .includes(user.id)
                          : false
                      }
                      onButton={() => {
                        mutate();
                      }}
                    ></LikeButton>
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

export default Home;
