import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import UsersDb from 'src/db/usersDb';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { isUuid } from 'src/common/isUuid';

const usersDb = UsersDb.getInstance();

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    usersDb.create(user);
    return user;
  }

  findAll(): User[] {
    const allUsers = usersDb.getAll();
    return allUsers;
  }

  findOne(id: string): { status: number; message: string | User } {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const user = usersDb.getById(id);

    if (user) {
      return { status: 200, message: user };
    } else {
      return { status: 404, message: `User with id: ${id} not found` };
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
