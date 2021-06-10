import { v4 as uuid } from "uuid";
class Recados {
    public id: string;
    public descricao: string;
    public detalhes: string;    

    constructor(descricao: string, detalhes: string) {
        this.id = uuid();
        this.descricao = descricao;
        this.detalhes = detalhes;     
    }
    
}
export default Recados;