import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

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

  app.post("/users", async (request, reply) => {
    const userSchema = z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email({
          message: "Invalid email",
        }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, {
          message: "Password must have at least 8 characters",
        }),
    });

    const { email, name, password } = userSchema.parse(request.body);

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      reply.status(400).send({
        error: "User already exists",
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, 10),
      },
    });

    const token = app.jwt.sign(
      {
        name,
        email,
      },
      {
        expiresIn: "30d",
        sub: user.id,
      }
    );

    reply.status(201).send(token);
  });
}
