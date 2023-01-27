import { IUser } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateContactRepository, UpdateContactParams } from "./protocols";

export class UpdateContactController implements IController {
  constructor(private readonly updateContactRepository: IUpdateContactRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateContactParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateContactParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateContactParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateContactRepository.updateUser(id, body);

      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
