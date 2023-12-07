import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


let router = express.Router()


// todo ask about after all

router.get('/:id', async function(request, response) {
  response.json(await prisma.user.findUnique({
    where: {
      id: +request.params.id,
    }
  }))
})

router.get('/', async function(request, response) {
  response.json(await prisma.user.findMany());
})

router.post('/', async function(request, response) {
  try {
    const user = await prisma.user.create(
      {
        data: request.body
      }
    )
    response.json(user);
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        response.json({'error': "Unique constraint failed: " + error.meta.target})
      }
    }
  }
})

router.put('/:id', async function(request, response) {
  try {
    const user = await prisma.user.update({
      where: {
        id: +request.params.id,
      },
      data: request.body
    })
    response.json(user);
  } catch (error) {
      console.log(request.originalUrl, ':', 'error: ', error.meta.cause)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.json({'error': error.meta.cause})
      }
    }
})


router.delete('/:id', async function(request, response) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: +request.params.id,
      },
    })
    response.json(user)
  } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.json({'error': error.meta.cause})
      }
    }
})

export default router
