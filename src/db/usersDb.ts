interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

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
}
