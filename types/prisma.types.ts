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

// const photosData = Prisma.validator<Prisma.PhotoArgs>()({});

// type PhotosData = Prisma.PhotoGetPayload<typeof photosData>;

const photoWithOwner = Prisma.validator<Prisma.PhotoArgs>()({
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

type PhotoWithOwner = Prisma.PhotoGetPayload<typeof photoWithOwner>;
type LikedPhoto = Prisma.LikedPhotoGetPayload<typeof likedPhoto>;

export type { PhotoWithOwner, LikedPhoto };
