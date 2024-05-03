import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedLishner } from "./events/ticket-created-lishner";

console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Lishner connect to nats");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  new TicketCreatedLishner(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
