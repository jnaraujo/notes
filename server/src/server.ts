import fastify from "fastify";
import { userRoutes } from "./routes/user";

const app = fastify();

app.register(userRoutes);

console.log("Server is starting...");

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
