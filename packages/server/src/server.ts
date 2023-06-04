import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { notesRoutes } from "./routes/notes";

const app = fastify();

app.register(cors, {
  origin: "*",
});
app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
});

app.register(userRoutes);
app.register(authRoutes);
app.register(notesRoutes);

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "127.0.0.1";

app
  .listen({
    port: PORT as number,
    host: HOST
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
