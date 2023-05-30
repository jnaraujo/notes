import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth", async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email({}),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
      reply.status(400).send({
        error: "Invalid password",
      });
      return;
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        sub: user.id,
        expiresIn: "30d",
      }
    );

    reply.status(200).send(token);
  });
}
