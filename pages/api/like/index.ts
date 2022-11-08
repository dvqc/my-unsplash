import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";

// POST /api/like

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const photoId = req.body?.photoId;
  const session = await getSession({ req });
  const user = session?.user;
  console.log(req.body);
  if (!session || !user || user == undefined)
    return res.status(401).json({
      err: "You are not signed in"
    });

  if (req.method === "POST") {
    if (photoId == "" || photoId == undefined)
      return res.status(400).json({
        err: "Invalid body content"
      });

    const likedPhoto = await prisma.photo.findUnique({
      where: {
        id: photoId
      }
    });
    if (likedPhoto) {
      try {
        const like = await prisma.likedPhoto.create({
          data: {
            userId: user.id,
            photoId: photoId
          }
        });
        return res.json(like);
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return res.status(409).json({
              err: "The roussource that you have tried to create already exists"
            });
          }
        }
      }
    } else {
      return res.status(404).json({
        err: "The roussource that you have requested was not found"
      });
    }
  } else
    return res.status(405).json({
      err: "Method not allowed on this route"
    });
}
