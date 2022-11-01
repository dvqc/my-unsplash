import { Prisma } from "@prisma/client";
import { type } from "os";

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

const photosData = Prisma.validator<Prisma.PhotoArgs>()({});

type PhotosData = Prisma.PhotoGetPayload<typeof photosData>;

export type { PhotosData };
