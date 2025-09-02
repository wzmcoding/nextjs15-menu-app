import { PrismaClient } from '$/generated/prisma'

/**
 * 创建prisma client 单例
 */
const prismaClientSingleton =  () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton()
if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

export default db

