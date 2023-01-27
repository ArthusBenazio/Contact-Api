import { IUser } from "../../models/user";

export interface IGetContactRepository {
  getUsers(): Promise<IUser[]>;
}
