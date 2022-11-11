import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { PhotoComponent, PhotosContainer } from "@components/Photo";
import React, { createRef, useState } from "react";
import Loader from "@components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Separator from "@components/Separator";
import { AddModal } from "@components/Modal";
import DefaultHeader, { HeaderButton } from "@components/Header";
import Signin from "@components/Signin";
import Empty from "@components/Empty";
import { usePagination } from "hooks";
import { PhotosWithOwner } from "types/prisma.types";
import LikeButton from "@components/Photo/LikeButton";
import Router from "next/router";
import { HeadLayout } from "@components/Layouts";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  console.log(search);

  const addModalRef = createRef<HTMLDialogElement>();

  const PAGE_SIZE = 7;
  const user = session?.user;

  const {
    data,
    isEmpty,
    isLoadingInitialData,
    isReachingEnd,
    setSize,
    size,
    mutate
  } = usePagination<PhotosWithOwner>(
    "api/photos",
    PAGE_SIZE,
    search.length > 2 ? { label: search } : undefined
  );

  if (status == "loading") return <Loader />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <HeadLayout>
      <DefaultHeader
        setSearch={setSearch}
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
        {isLoadingInitialData ? (
          <Loader></Loader>
        ) : isEmpty || !data || data == undefined ? (
          <Empty></Empty>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd || false}
            loader={<Loader />}
            endMessage={<Separator text="There are no more images"></Separator>}
          >
            <PhotosContainer
              photoComponents={data.flat().map((photo) => (
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
                      isLiked={
                        photo.likes != undefined
                          ? photo.likes
                              .map((like) => like.userId)
                              .includes(user.id)
                          : false
                      }
                      photoId={photo.id}
                      onClick={() => mutate()}
                    ></LikeButton>
                  }
                />
              ))}
            />
          </InfiniteScroll>
        )}
        <AddModal ref={addModalRef}></AddModal>
      </main>
    </HeadLayout>
  );
};

export default Home;
