export class Customer {
  constructor(
    public readonly id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string,
    public documentNumber?: string,
    public address?: string,
    public isActive?: boolean,
    public deletedAt?: Date,
    public readonly createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
