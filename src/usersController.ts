import { Body, Controller, Get, Post, Route, Path, Put, Delete } from 'tsoa';
import { Prisma, PrismaClient } from '@prisma/client';
import { SimpleNoteResponse } from './notesController'


const prisma = new PrismaClient()


export interface SimpleUserResponse {
  id: String;
  name: String;
  email: String;
}


export interface UserResponse extends SimpleUserResponse{
  notes: SimpleNoteResponse[],
}


@Route('users')
export class UserController extends Controller {
  @Get('/')
  public async getUsers(): Promise<UserResponse[]> {
    return prisma.user.findMany({
      include: {
        notes: true,
      }
    });
  }

  @Post('/')
  public async createUser(
    @Body() requestBody: Prisma.UserCreateInput
  ): Promise<SimpleUserResponse> {
    return prisma.user.create({ data: requestBody });
  }

  @Put('/:userId')
  public async updateUser(
    @Path() userId: string, @Body() requestBody: Prisma.UserCreateInput
  ): Promise<SimpleUserResponse> {
    return prisma.user.update({ where: { id: userId }, data: requestBody });
  }

  @Delete('/:userId')
  public async deleteUser(
    @Path() userId: string
  ): Promise<SimpleUserResponse> {
    return prisma.user.delete({ where: { id: userId } });
  }
}
