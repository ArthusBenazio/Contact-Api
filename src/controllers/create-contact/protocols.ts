import { IUser } from "../../models/user";

export interface CreateContactParams {
  name: string;
  email: string;
  message: string;
}

export interface ICreateContactRepository {
  createContact(params: CreateContactParams): Promise<IUser>;
}
