import { User } from 'src/user/entities/user.entity';

export default class UsersDb {
  private static instance: UsersDb;
  private users: User[] = [];
  public static getInstance(): UsersDb {
    if (!UsersDb.instance) {
      UsersDb.instance = new UsersDb();
    }
    return UsersDb.instance;
  }

  public create(user: User) {
    this.users.push(user);
  }

  public getAll() {
    return this.users;
  }

  public getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  public updateUser(
    id: string,
    params: { oldPassword: string; newPassword: string },
  ) {
    const user = this.getById(id);
    if (!user) {
      return null;
    }

    if (params.oldPassword && user.password !== params.oldPassword) {
      return null;
    }

    const updatedUser = {
      ...user,
      password: params.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  }

  public deleteUser(id: string) {
    const user = this.getById(id);
    if (!user) {
      return false;
    }

    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
}
