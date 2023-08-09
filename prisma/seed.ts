import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const genresData = [
    {
      name: 'Detectives',
    },
    {
      name: 'SciFi',
    },
    {
      name: 'Action',
    },
    {
      name: 'Fantasy',
    },
    {
      name: 'Adventure',
    },
    {
      name: 'Comedy',
    },
    {
      name: 'Horror',
    },
    {
      name: 'Life',
    },
    {
      name: 'ForAdult',
    },
  ] as const

  for (const genreData of genresData) {
    await prisma.genres.create({
      data: genreData,
    })
  }

  console.log('Genres seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
