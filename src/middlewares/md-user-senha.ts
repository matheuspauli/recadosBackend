import { Request, Response, NextFunction } from "express";

function validarSenha(req: Request, res: Response, next: NextFunction) {
  const { senha }: { senha: string } = req.body;

  if (!senha) {
    return res.status(400).json({
      msg: "A senha deve ser informada",
    });
  }
  if (senha.trim().length < 4) {
    return res.status(400).json({
      msg: "A senha deve conter ao menos 4 caracteres",
    });
  }

  next();
}

export default validarSenha;