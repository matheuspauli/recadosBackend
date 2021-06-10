import { Request, Response, NextFunction } from "express";

function validarDescrição(req: Request, res: Response, next: NextFunction) {
  const { desc }: { desc: string } = req.body;

  if (!desc) {
    return res.status(400).json({
      msg: "A descrição não pode estar em branco",
    });
  }
  next();
}

export default validarDescrição;