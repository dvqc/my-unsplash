// pages/api/post/[id].ts

import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "@lib/prisma";

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

  const { id } = req.query;
  if (req.method === "DELETE") {
    if (id == undefined || id instanceof Array)
      return res.status(404).json({
        err: "Invalid query parameter"
      });

    const photo = await prisma.photo.findUnique({
      where: { id: id }
    });
    if (!photo)
      return res.status(404).json({
        err: "The roussource that you have requested was not found"
      });
    if (photo.ownerId == user.id) {
      const deletedPhoto = await prisma.photo.delete({
        where: { id: id }
      });
      res.json(deletedPhoto);
    } else {
      return res.status(403).json({
        err: "You do not have permission to do this operation on this ressource"
      });
    }
  } else {
    return res.status(405).json({
      err: "Method not allowed on this route"
    });
  }
}
