import express, { Request, Response } from 'express';
import { validate as uuidValidate } from "uuid";
import  User from './classes/user';
import validarUsuario from './middlewares/md-user-nome';
import validarSenha from './middlewares/md-user-senha';
import IUser from './interfaces/userinterface';
import IRecado from './interfaces/recadointerface';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(process.env.PORT || 3000, () => {
    console.log('Recados Start');
});
// Onde todos os dados serão salvos
const listaDeUsuarios: Array<User> = [];

app.get("/", (req: express.Request, res: express.Response) => {
    res.send(`
    <body style='margin:0;padding:0'>
        <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
          <h1 style='font-size:60px;font-weigth:600'>BackEnd Recados</h1>
        </div>
    </body>
    `);
});
//Criar usuário
app.post('/users', validarUsuario, validarSenha,
(req: express.Request, res: express.Response) => {
    const { usuario, senha, senha2 }: IUser = req.body;
    const existe = listaDeUsuarios.find((f) => f.usuario === usuario);
    // poderia ter um middleware especifico
    if (existe) {
        return res.status(400).json({
            msg: 'Nome de Usuário já cadastrado',
        });
    }
    if (senha !== senha2) {
        return res.status(400).json({
            msg: 'As senhas não coincidem',
        });
    }
    const user = new User(usuario, senha);
    //adiciona no array
    listaDeUsuarios.push(user);
    return res.status(201).json({
        success: true,
        data: user,
    });
});
// login
//Procura e retorna usuário e seus recados
app.post('/login', (req: express.Request, res: express.Response) => {
    const { usuario, senha }: { usuario?: string, senha?: string } = req.body;    
    const user = listaDeUsuarios.find((f) => f.usuario === usuario && f.senha === senha);
    console.log(user);
    if (!user) {
        return res.status(404).json({
          msg: "Usuário/Senha inválidos",
        });
    }
    return res.status(200).json({
        success: true,
        data: user.id
    });
    
});
//Procura e retorna usuário e seus recados
app.get('/users/:id', (req: express.Request, res: express.Response) => {
    const { id }: { id?: string | undefined } = req.params;
    if(!id) {
        return res.status(400).json({
            msg: "ID deve ser informada",
          });
    }
    if (!uuidValidate(id)) {
        return res.status(400).json({
          msg: "ID inválido",
        });
    }
    const user = listaDeUsuarios.find((f) => f.id === id);
    if (!user) {
        return res.status(404).json({
          msg: "Usuário não encontrado",
        });
      }    
      return res.status(200).json({
        success: true,
        data: user?.exibirUsuario(),
    });
});

// criar recado
app.post('/users/:id', (req: express.Request, res: express.Response) => {
    const { id }: { id?: string } = req.params;
    const { descricao, detalhes }: IRecado = req.body;    
    if(!id) {
        return res.status(400).json({
            msg: "ID deve ser informado",
          });
    }
    if (!uuidValidate(id)) {
        return res.status(400).json({
          msg: "ID inválido",
        });
    }
    let achar = listaDeUsuarios.find((f) => f.id === id);
    if (!achar) {
        return res.status(404).json({msg: 'Usuário não existe'})
    }    
    achar.adicionarRecado(descricao, detalhes);
    listaDeUsuarios.push(achar);
    return res.status(200).json({
        msg: 'Recado criado com sucesso',
    });
});
//Editar recado
app.put('/users/:id/recado/:rid', (req: express.Request, res: express.Response) => {
    const { id, rid }: { id?: string, rid?: string } = req.params;
    const { descricao, detalhes }: IRecado = req.body;
    if(!id) {
        return res.status(400).json({
            msg: "ID deve ser informado",
          });
    }
    if (!uuidValidate(id)) {
        return res.status(400).json({
          msg: "ID inválido",
        });
    }    
    const achou = listaDeUsuarios.find((f) => f.id === id);
    achou?.editarRecado(rid, descricao, detalhes);
    return res.status(200).json({
        success: true,
    });
});
//Deletar recado
app.delete('/users/:id/recado/:rid', (req: express.Request, res: express.Response) => {
    const { id, rid }: { id?: string, rid?: string } = req.params;   
    if(!id) {
        return res.status(400).json({
            msg: "ID deve ser informada",
          });
    }
    if (!uuidValidate(id)) {
        return res.status(400).json({
          msg: "ID inválido",
        });
    }
    const achou = listaDeUsuarios.find((f) => f.id === id);
    achou?.deletarRecado(rid);    
    return res.status(200).json({
        success: true,        
    });
});