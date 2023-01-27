import { IUser } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteContactRepository } from "./protocols";

export class DeleteContactController implements IController {
  constructor(private readonly deleteContactRepository: IDeleteContactRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteContactRepository.deleteUser(id);

      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
