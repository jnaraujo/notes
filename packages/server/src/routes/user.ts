import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users/me", async (request, reply) => {
    await request.jwtVerify();

    const { name, email } = await prisma.user.findUniqueOrThrow({
      where: {
        email: request.user.email,
      },
    });

    reply.status(200).send({
      name,
      email,
    });
  });
}
