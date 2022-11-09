import { Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `Photo`
// const userWithPhotos = Prisma.validator<Prisma.UserArgs>()({
//   include: { photos: true }
// });

// // 2: Define a type that only contains a subset of the scalar fields
// const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
//   select: { email: true, name: true }
// });

// // 3: This type will include a user and all their posts
// type UserWithPosts = Prisma.UserGetPayload<typeof userWithPhotos>;

const photoData = Prisma.validator<Prisma.PhotoArgs>()({});

type PhotoData = Prisma.PhotoGetPayload<typeof photoData>;

const photoQuery = Prisma.validator<Prisma.PhotoArgs>()({
  select: {
    label: true
  }
});

type PhotoQuery = Prisma.PhotoGetPayload<typeof photoQuery>;

const photosWithOwner = Prisma.validator<Prisma.PhotoArgs>()({
  include: {
    likes: {
      select: {
        userId: true
      }
    },
    owner: true,
    _count: {
      select: { likes: true }
    }
  }
});

const likedPhoto = Prisma.validator<Prisma.LikedPhotoArgs>()({});

type PhotosWithOwner = Prisma.PhotoGetPayload<typeof photosWithOwner>;
type LikedPhoto = Prisma.LikedPhotoGetPayload<typeof likedPhoto>;

export type { PhotosWithOwner, LikedPhoto, PhotoData, PhotoQuery };
