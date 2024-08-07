import prisma from './prisma-client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'

export const adapter = new PrismaAdapter(prisma.session, prisma.user)

export default adapter
