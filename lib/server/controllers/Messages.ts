import * as express from "express";
import * as ulid from "ulid";
import { IContext } from "../../azure-functions-types";
import { ICreatedMessageEvent } from "../../models/created_message_event";
import { INewMessage, MessageModel } from "../../models/message";
import * as documentDbUtils from "../../utils/documentdb";

/**
 * Input and output bindings for this function
 * see CreatedMessageQueueHandler/function.json
 */
interface IContextWithBindings extends IContext {
  bindings: {
    createdMessage?: ICreatedMessageEvent;
  };
}

const Message = new MessageModel(
  documentDbUtils.getDocumentDBClient(),
  documentDbUtils.getCollectionUrl(documentDbUtils.getDatabaseUrl(), "messages")
);

/**
 * Returns a controller that will handle requests
 * for creating new messages.
 *
 * @param Message The Message model.
 */
export function submitMessageforUser(
  request: express.Request,
  response: express.Response
) {
  const context: IContextWithBindings = request.app.get("context");

  const message: INewMessage = {
    bodyShort: (request as any).swagger.params.message.value.content.body_short,
    fiscalCode: (request as any).swagger.params.fiscal_code.value,
    id: ulid()
  };

  Message.createMessage(message).then(result => {
    context.log(`>> message stored [${result.id}]`);

    const createdMessage: ICreatedMessageEvent = {
      message: result
    };

    // queue the message to the created messages queue by setting
    // the message to the output binding of this function
    context.bindings.createdMessage = createdMessage;

    // TODO: this will return all internal attrs, only return "public" attributes
    response.json(result);
  });
}

/**
 * Returns a controller that will handle requests
 * for getting a single message for a recipient.
 *
 * @param Message The Message model
 */
export function getMessage(
  request: express.Request,
  response: express.Response
) {
  Message.findMessageForRecipient(
    (request as any).swagger.params.fiscal_code.value,
    (request as any).swagger.params.id
  ).then(result => {
    if (result != null) {
      response.json(result);
    } else {
      response.status(404).send("Message not found");
    }
  });
}

/**
 * Returns a controller that will handle requests
 * for getting all messages for a recipient.
 *
 * @param Message The Message model
 */
export function getMessages(
  request: express.Request,
  response: express.Response
) {
  const iterator = Message.findMessages(
    (request as any).swagger.params.fiscal_code.value
  );
  iterator.executeNext().then(response.json);
}

module.exports = { getMessage, submitMessageforUser };
