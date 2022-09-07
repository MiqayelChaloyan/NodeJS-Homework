import { prisma } from './prisma.js'


prisma.user.createMany({
    data: Array.from({ length: 100 }).map((_, i) => ({
        name: `User${i}`,
        email: `user${i}gmail@.com`,
    }))
})