import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import truncate from "../utils/truncate";
import { noteIdSchema, noteSchema, usernameSchema } from "../schemas/note";

export async function notesRoutes(app: FastifyInstance) {
  app.post("/notes", async (request, reply) => {
    await request.jwtVerify();

    const { title, content, isPublic } = noteSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        id: request.user.sub,
      },
    });

    if (!user) {
      reply.status(404).send({
        error: "User not found",
      });
      return;
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        isPublic,
        authorId: request.user.sub,
      },
    });

    reply.status(201).send(note);
  });

  app.get("/notes", async (request, reply) => {
    await request.jwtVerify();

    const notes = await prisma.note.findMany({
      where: {
        authorId: request.user.sub,
      },
    });

    reply.status(200).send(notes);
  });

  app.get("/notes/:id", async (request, reply) => {
    const { id } = noteIdSchema.parse(request.params);

    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    if (!note) {
      reply.status(404).send({
        error: "Note not found",
      });
      return;
    }

    if (!note.isPublic) {
      await request.jwtVerify();
    }

    const userId = request.user?.sub;

    if (note.authorId !== userId && !note.isPublic) {
      reply.status(401).send({
        error: "Unauthorized",
      });
      return;
    }

    reply.status(200).send(note);
  });

  app.delete("/notes/:id", async (request, reply) => {
    await request.jwtVerify();

    const { id } = noteIdSchema.parse(request.params);

    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    if (!note) {
      reply.status(404).send({
        error: "Note not found",
      });
      return;
    }

    if (note.authorId !== request.user.sub) {
      reply.status(401).send({
        error: "Unauthorized",
      });
      return;
    }

    await prisma.note.delete({
      where: {
        id: id,
      },
    });

    reply.status(204).send();
  });

  app.put("/notes/:id", async (request, reply) => {
    await request.jwtVerify();

    const { id } = noteIdSchema.parse(request.params);

    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    if (!note) {
      reply.status(404).send({
        error: "Note not found",
      });
      return;
    }

    const { title, content, isPublic } = noteSchema.parse(request.body);

    if (note.authorId !== request.user.sub) {
      reply.status(401).send({
        error: "Unauthorized",
      });
      return;
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title: title ?? note.title,
        content: content ?? note.content,
        isPublic: isPublic ?? note.isPublic,
      },
    });

    reply.status(200).send(updatedNote);
  });

  app.get("/notes/user/me", async (request, reply) => {
    await request.jwtVerify();

    const notes = await prisma.note.findMany({
      where: {
        authorId: request.user.sub,
      },
    });

    reply.status(200).send(notes);
  });

  app.get("/notes/user/:username", async (request, reply) => {
    const { username } = usernameSchema.parse(request.params);

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return reply.status(404).send({
        error: "User not found",
      });
    }

    const notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
        isPublic: true,
      },
    });

    reply.status(200).send(
      notes.map(({ content, ...note }) => {
        return {
          content: truncate(content, 255),
          ...note,
        };
      })
    );
  });
}
