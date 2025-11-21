
import { PrismaClient } from './generated/client/index'

const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }

// 直接导出Prisma生成的类型
export { UserRole } from './generated/client'
export * from './generated/client'
