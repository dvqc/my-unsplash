import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { isPositiveInteger } from "../../../utils";

// GET,POST /api/myphotos

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const label = req.body?.label;
  const url = req.body?.url;
  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({
      err: "You are not signed in"
    });

  if (req.method === "POST") {
    if (label == "" || label == undefined || url == "" || url == undefined)
      return res.status(400).json({
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
  } else if (req.method === "GET") {
    let { skip, take } = req.query;

    if (skip instanceof Array) skip = skip[0];
    if (take instanceof Array) take = take[0];

    const photos = await prisma.photo.findMany({
      skip: 0,
      take: 7,
      ...(skip && isPositiveInteger(skip) && { skip: parseInt(skip) }),
      ...(take && isPositiveInteger(take) && { take: parseInt(take) }),
      where: {
        ownerId: session.user?.id
      },
      orderBy: {
        id: "desc"
      }
    });
    res.json(photos);
  } else
    res.status(405).json({
      err: "Method not allowed on this route"
    });
}
