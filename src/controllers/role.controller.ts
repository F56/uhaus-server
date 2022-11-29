import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const role = await prisma.role.create({
      data: {
        name,
      },
    });
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findAll = async (_req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    return res.status(200).json({ roles });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
