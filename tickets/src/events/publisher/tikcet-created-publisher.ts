import { Publisher, Subjects, TicketCreatedEvent } from "@pkorga/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
