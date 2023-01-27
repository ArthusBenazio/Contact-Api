import { IUser } from "../../models/user";

export interface UpdateContactParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateContactRepository {
  updateUser(id: string, params: UpdateContactParams): Promise<IUser>;
}
