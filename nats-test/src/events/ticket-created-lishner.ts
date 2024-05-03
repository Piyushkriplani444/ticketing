import { Listner } from "./base-lishner";
import { Message } from "node-nats-streaming";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedLishner extends Listner<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    console.log(data.title);
    console.log(data.price);
    console.log(data.id);
    msg.ack();
  }
}
