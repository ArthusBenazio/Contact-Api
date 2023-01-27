import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";
import { IDeleteContactRepository } from "../../controllers/delte-contact/protocols";
import { MongoUser } from "../mongo-protocols";

export class MongoDeleteContactRepository implements IDeleteContactRepository {
  async deleteUser(id: string): Promise<IUser> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
