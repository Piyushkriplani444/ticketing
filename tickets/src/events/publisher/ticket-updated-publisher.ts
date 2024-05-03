import { Publisher, Subjects, TicketUpdatedEvent } from "@pkorga/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
