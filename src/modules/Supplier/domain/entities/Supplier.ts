export class Supplier {
  constructor(
    public readonly id: number,
    public companyName: string,
    public contactName?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
    public city?: string,
    public state?: string,
    public zipCode?: string,
    public country?: string,
    public taxId?: string,
    public isActive?: boolean,
    public readonly createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
