// pages/api/post/[id].ts

import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "DELETE") {
    if (id == undefined || id instanceof Array)
      return res.status(403).json({
        err: "Invalid query parameter"
      });

    const post = await prisma.photo.delete({
      where: { id: id }
    });
    res.json(post);
  } else {
    res.status(405).json({
      err: "Method not allowed on this route"
    });
  }
}
