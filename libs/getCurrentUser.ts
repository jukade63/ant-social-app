import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import prisma from "@/libs/prismadb"

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    console.log('session', session);


    if (!session?.user?.email) {
        throw new Error("Not signed in")
    }
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    if (!currentUser) {
        throw new Error("Not signed in")
    }
    return { currentUser }
}

export default getCurrentUser