import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "@lib/prisma";
import { isPositiveInteger } from "@utils";

// Get /api/photo

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({
      err: "You are not signed in"
    });

  if (req.method === "GET") {
    let { skip, take, label } = req.query;
    if (label instanceof Array) label = label[0];
    if (skip instanceof Array) skip = skip[0];
    if (take instanceof Array) take = take[0];

    if (label && label != undefined) label = label.split(/ +/).join(" | ");

    const photos = await prisma.photo.findMany({
      include: {
        owner: true,
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: { likes: true }
        }
      },
      skip: 0,
      take: 7,
      ...(skip && isPositiveInteger(skip) && { skip: parseInt(skip) }),
      ...(take && isPositiveInteger(take) && { take: parseInt(take) }),
      where: {
        label: {
          search: label
        }
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
