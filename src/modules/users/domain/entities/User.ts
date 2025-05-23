export class User {
  constructor(
    public readonly id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public readonly createdAt: Date,
    public phone?: string,
    public password?: string,
    public isActive?: boolean,
    public deletedAt?: Date
  ) {}
}
