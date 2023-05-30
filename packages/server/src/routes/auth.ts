import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
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

  app.post("/auth/register", async (request, reply) => {
    const userSchema = z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      username: z.string({
        required_error: "Username is required",
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

    const { email, name, password, username } = userSchema.parse(request.body);

    const usernameAlreadyExists = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameAlreadyExists) {
      reply.status(400).send({
        error: "Username already exists",
      });
    }

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailAlreadyExists) {
      reply.status(400).send({
        error: "Email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: bcrypt.hashSync(password, 10),
      },
      select: {
        id: true,
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
