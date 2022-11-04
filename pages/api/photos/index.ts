import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";

// POST /api/photo

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const label = req.body?.label;
  const url = req.body?.url;
  const session = await getSession({ req });
  if (req.method != "POST")
    res.status(405).json({
      err: "Method not allowed on this route"
    });
  if (!session)
    res.status(401).json({
      err: "You are not signed in"
    });
  if (label == "" || label == undefined || url == "" || url == undefined)
    res.status(403).json({
      err: "Invalid body content"
    });

  const result = await prisma.photo.create({
    data: {
      label: label,
      url: url,
      ownerId: session?.user?.id
    }
  });
  res.json(result);
}
