import validator from "validator";
import { HttpRequest, IController, HttpResponse } from "../protocols";
import { IUser } from "../../models/user";
import { CreateContactParams, ICreateContactRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateContactController implements IController {
  constructor(
    private readonly createContactRepository: ICreateContactRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateContactParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const requiredFields = ["name", "email", "message"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateContactParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email is invalid");
      }

      const contact = await this.createContactRepository.createContact(
        httpRequest.body!
      );

      return created<IUser>(contact);
    } catch (error) {
      return serverError();
    }
  }
}
