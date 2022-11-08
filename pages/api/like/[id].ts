// pages/api/post/[id].ts

import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";

// DELETE /api/myphotos/:id

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = session?.user;
  if (!session || !user || user == undefined)
    return res.status(401).json({
      err: "You are not signed in"
    });

  const { id: photoId } = req.query;
  console.log(photoId, req.query);
  if (req.method != undefined && ["DELETE", "GET"].includes(req.method)) {
    if (photoId == undefined || photoId instanceof Array)
      return res.status(404).json({
        err: "Invalid query parameter"
      });

    const like = await prisma.likedPhoto.findFirst({
      where: { userId: user.id, photoId: photoId }
    });
    if (!like)
      return res.status(404).json({
        err: "The roussource that you have requested was not found"
      });
    if (req.method === "DELETE") {
      const deletedLike = await prisma.likedPhoto.delete({
        where: { id: like.id }
      });
      return res.json(deletedLike);
    }
    if (req.method === "GET") {
      return res.json(like);
    }
  } else {
    return res.status(405).json({
      err: "Method not allowed on this route"
    });
  }
}
