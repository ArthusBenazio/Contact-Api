import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";
import { IGetContactRepository } from "../../controllers/get-contact/protocols";
import { MongoUser } from "../mongo-protocols";

export class MongoGetContactRepository implements IGetContactRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
