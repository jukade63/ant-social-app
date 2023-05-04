import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/getCurrentUser";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }

    console.log('edited');
    const { currentUser } = await serverAuth(req, res);
    console.log(currentUser);

    try {


        const { name, bio, image, coverImage } = req.body;

        if (!name) {
            throw new Error('Missing required field');
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                bio,
                image,
                coverImage
            }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}