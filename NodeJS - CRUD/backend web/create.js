import {prisma} from './prisma.js'


async function main() {
    await prisma.car.create({
      data: {
        name: 'Car6',
        color: 'red',
        year: 1998,
        brandId: 3
      },
    })
  
    const cars = await prisma.car.findMany({
    })
    console.dir(cars, { depth: null })
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })