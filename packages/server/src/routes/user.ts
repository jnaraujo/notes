import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { usernameSchema } from "../schemas/user";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users/me", async (request, reply) => {
    await request.jwtVerify();

    const { id, name, email, username } = await prisma.user.findUniqueOrThrow({
      where: {
        email: request.user.email,
      },
    });

    reply.status(200).send({
      id,
      name,
      email,
      username,
    });
  });

  app.get("/users/username/check/:username", async (request, reply) => {
    const { username } = usernameSchema.parse(request.params);

    const doesUsernameExist = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (!doesUsernameExist) {
      reply.status(404).send({
        error: "Username not found",
      });
      return;
    }

    reply.status(200).send({
      exists: true,
    });
  });
}
