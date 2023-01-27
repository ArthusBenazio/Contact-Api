import { serverError } from "../helpers";
import { IUser } from "../../models/user";
import { ok } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetContactRepository } from "./protocols";

export class GetContactController implements IController {
  constructor(private readonly getContactRepository: IGetContactRepository) {}
  async handle(): Promise<HttpResponse<IUser[] | string>> {
    try {
      const users = await this.getContactRepository.getUsers();

      return ok<IUser[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
