import express from "express";
import { CreateContactController } from "../controllers/create-contact/create-contact";
import { DeleteContactController } from "../controllers/delte-contact/delete-contact";
import { GetContactController } from "../controllers/get-contact/get-contact";
import { UpdateContactController } from "../controllers/update-contact/update-contact";
import { MongoCreateContactRepository } from "../repositories/create-contact/mongo-create-contact";
import { MongoDeleteContactRepository } from "../repositories/delete-contact/mongo-delete-contact";
import { MongoGetContactRepository } from "../repositories/get-contact/mongo-get-contact";
import { MongoUpdateContactRepository } from "../repositories/update-contact/mongo-update-contact";

const router = express.Router();

router.get("/contact", async (req, res) => {
  const mongoGetContactRepository = new MongoGetContactRepository();

  const getContactController = new GetContactController(
    mongoGetContactRepository
  );

  const { body, statusCode } = await getContactController.handle();

  res.status(statusCode).send(body);
});

router.post("/contact", async (req, res) => {
  const mongoCreateContactRepository = new MongoCreateContactRepository();

  const createContactController = new CreateContactController(
    mongoCreateContactRepository
  );

  const { body, statusCode } = await createContactController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.patch("/contact/:id", async (req, res) => {
  const mongoUpdateContactRepository = new MongoUpdateContactRepository();

  const updateContactController = new UpdateContactController(
    mongoUpdateContactRepository
  );

  const { body, statusCode } = await updateContactController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/contact/:id", async (req, res) => {
  const mongoDeleteContactRepository = new MongoDeleteContactRepository();

  const deleteContactController = new DeleteContactController(
    mongoDeleteContactRepository
  );

  const { body, statusCode } = await deleteContactController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default router;
