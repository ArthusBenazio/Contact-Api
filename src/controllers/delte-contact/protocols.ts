import { IUser } from "../../models/user";

export interface IDeleteContactRepository {
  deleteUser(id: string): Promise<IUser>;
}
