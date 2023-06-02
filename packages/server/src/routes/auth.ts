import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import {
  userLoginSchema,
  userRegisterSchema,
  usernameSchema,
} from "../schemas/user";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/signin", async (request, reply) => {
    const { email, password } = userLoginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      reply.status(401).send({
        error: "User not found",
      });
      return;
    }

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
      reply.status(401).send({
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

  app.post("/auth/signup", async (request, reply) => {
    const { email, name, password, username } = userRegisterSchema.parse(
      request.body
    );

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

  app.get("/auth/username/:username", async (request, reply) => {
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
