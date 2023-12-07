import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


let router = express.Router()


// todo ask about after all

router.get('/:id', async function(request, response) {
  response.json(await prisma.note.findUnique({
    where: {
      id: +request.params.id,
    }
  }))
})

router.get('/', async function(request, response) {
  response.json(await prisma.note.findMany());
})


router.post('/', async function(request, response) {
  try {
    const author_id = request.body['author']
    delete request.body['id']
    const note = await prisma.note.create(
      {
        data: {
          ...request.body,
          author: {
            connect: {
              id: author_id
            }
          }
        }
      }
    )
    response.json(note);
  }
  catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        response.json({'error': "Unique constraint failed: " + error.meta.target})
      }
      else {
        response.json({'error': error.meta.cause})
      }
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      response.json({'invalid': error.message})
    }
  }
})

router.put('/:id', async function(request, response) {
  try {
    const note = await prisma.note.update({
      where: {
        id: +request.params.id,
      },
      data: request.body
    })
    response.json(note);
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(request.originalUrl, ':', 'error: ', error.meta.cause)
      response.json({'error': error.meta.cause})
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      response.json({'invalid': error.message})
    }
  }
})

router.delete('/:id', async function(request, response) {
  try {
    const note = await prisma.note.delete({
      where: {
        id: +request.params.id,
      },
    })
    response.json(note)
  } catch (error) {
      console.log(request.originalUrl, ':', 'error: ', error.meta.cause)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.json({'error': error.meta.cause})
      }
    }
})

export default router
