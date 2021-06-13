import { Request, Response, NextFunction } from "express";

function validarUsuario(req: Request, res: Response, next: NextFunction) {
  const { usuario }: { usuario: string } = req.body;

  if (!usuario) {
    return res.status(400).json({
      msg: "Usuário deve ser informado",
    });
  }

  if (usuario.trim().length < 3) {
    return res.status(400).json({
      msg: "Usuário deve conter ao menos 3 caracteres",
    });
  }
  next();
}

export default validarUsuario;