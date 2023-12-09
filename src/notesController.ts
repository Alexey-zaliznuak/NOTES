import { Body, Controller, Get, Post, Route, Path, Put, Delete } from 'tsoa';
import { Prisma, PrismaClient } from '@prisma/client';
import { SimpleUserResponse } from './usersController'


const prisma = new PrismaClient()


export interface SimpleNoteResponse {
  id: string,
  title: string,
  text: string,
  authorId: string,
}

export interface NoteResponse extends SimpleNoteResponse {
  author: SimpleUserResponse
}


@Route('notes')
export class NoteController extends Controller {
  @Get('/')
  public async getNotes(): Promise<NoteResponse[]> {
    return prisma.note.findMany({
      include: {
        author: true,
      }
    });
  }

  @Post('/')
  public async createNote(
    @Body() requestBody: Prisma.NoteCreateInput
  ): Promise<SimpleNoteResponse> {
    return prisma.note.create({ data: requestBody });
  }

  @Put('/:noteId')
  public async updateNote(
    @Path() noteId: string, @Body() requestBody: Prisma.NoteCreateInput
  ): Promise<SimpleNoteResponse> {
    return prisma.note.update({ where: { id: noteId }, data: requestBody });
  }

  @Delete('/:noteId')
  public async deleteNote(
    @Path() noteId: string
  ): Promise<SimpleNoteResponse> {
    return prisma.note.delete({ where: { id: noteId } });
  }
}
