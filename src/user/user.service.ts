import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import db from '@db';
import { users } from '@schema';

@Injectable()
export class UserService {
  async createUser(createUserDto) {
    try {
      const createdUser = await db
        .insert(users)
        .values(createUserDto)
        .returning();
      return createdUser[0];
    } catch (error) {
      throw new HttpException('Failed to create user.', HttpStatus.BAD_REQUEST);
    }
  }
}
