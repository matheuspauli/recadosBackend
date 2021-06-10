// Ocultar Div de criação de usuário / mostra apenas o login
document.getElementById('conta').style.display = 'none';
let a = localStorage.getItem('userLogado'); // recupera nome do usuario LOGADO
let lista = [];
let indiceUpdate = undefined;

// Home - login
function entrar(){    
    const userInput = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const localUser = localStorage.getItem('listaUsuarios');
    const local = JSON.parse(localUser);
    let logou = false;
    for (const a of local) {
        if (a.user === userInput && a.pass === password) {
            logou=true;
            localStorage.setItem('userLogado', JSON.stringify(userInput));
            window.location.href = 'recados.html';
        }
    } if(!logou){
        abrirModal('Atenção!', 'Usuário e/ou senha inválidos.', 'Fechar', null);
        document.getElementById("user").value = ""; //deixa campo limpo
    }
}
// Ocultar Div Login e mostrar DIV Criação de usuário
function criarconta(){
    document.getElementById('login').style.display = 'none';
    document.getElementById('conta').style.display = 'flex';
}
//Verificando se informações estão corretas
const listUserLocalStorage = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
let deucerto = false; //função entradaValida true então usa função userCreator()
let deucerto2 = false; //usado na função usuarioCriado() e utilizado na função entradaValida(0)
//Verifica se usuário já existe
function usuarioCriado(){
    const user0 = document.getElementById('user00').value;
    for (let i of listUserLocalStorage){
        if (i.user === user0){
            deucerto2 = true;
        }
    }
};
//Analiza de usuário preencheu as informações de forma correta
function entradaValida(){
    const user0 = document.getElementById('user00').value;
    const pass0 = document.getElementById('password00').value;
    const check = document.getElementById('passwordCheck').value;
    usuarioCriado();
    if (user0 == '' || pass0 == '' || check == '') {
        abrirModal('Atenção!', 'Usuário/Senha não podem estar em branco!', 'Fechar', null);
    }else if (pass0 != check){
        abrirModal('Atenção!!', 'As senhas não coincedem, tente novamente!', 'Fechar', null);
    }else if (deucerto2 == true){
                abrirModal('Atenção!', 'Usuário existente, tente novamente', 'Fechar', null);
    }else {
        deucerto = true;
    } 
};
//Armazena no localStorage novo usuário
function userCreator(){
    entradaValida()
    const user0 = document.getElementById('user00').value;
    const pass0 = document.getElementById('password00').value;
    console.log('chegou quase');
    console.log(deucerto);    
    if (deucerto == true){
        console.log(user0);
        console.log(pass0);
        listUserLocalStorage.push({user:user0,pass:pass0});
        localStorage.setItem('listaUsuarios', JSON.stringify(listUserLocalStorage));
        localStorage.setItem('userLogado', JSON.stringify(user0));
        abrirModal('Parabens!', 'Usuário criado!', 'Ir para Recados', 'onclick="abriRecados(a)"');
    };
}
//Pagina dos recados -------------------------------------------------------------
//carrega recados ao acessar a pagina
const recupera = localStorage.getItem(a);
if (recupera) {
    lista = JSON.parse(recupera);
    mostrar();
}
//Criando recados
//acrescenta e edita os recados
function CriarRecados(){
    const descri = document.getElementById('inputDescri').value;
    const detalhes = document.getElementById('inputDetalha').value;
    if (indiceUpdate != undefined) {
        const objeto = lista[indiceUpdate];
        objeto.des = descri;
        objeto.deta = detalhes;
        chamaAlert('warning', 'Recado editado com sucesso!');
    } else {
        lista.push({des:descri,deta:detalhes});
        chamaAlert('success', 'Recado salvo com sucesso!');
    }    
    salvar();
    mostrar();
    indiceUpdate = undefined;
    document.getElementById("inputDescri").value = ""; //deixa campos limpos
    document.getElementById("inputDetalha").value = ""; //deixa campos limpos
}
//cria tabela de recados
function mostrar() {
    const divTabela = document.getElementById("tabela");
    let conteudo = "<table class>";
    let indice = 0;
    let contador = 1;
    for (const valor of lista) {
        conteudo += `
        <tr>
            <td class="col-1">${contador}</td>
            <td class="col-3">${valor.des}</td>
            <td class="col-6">${valor.deta}</td>            
            <td class="col-2 text-end"><button onclick='editar(${indice})' type="button" class="btn btn-primary btn-sm" onclick="criarconta()"> Editar </button>
                              <button onclick='apagar(${indice})' type="button" class="btn btn-dark btn-sm"    onclick="entrar()">Apagar</button></td>                  
        </tr>       
        `;
        indice++;
        contador++;
    }
    conteudo += "</table>"
    divTabela.innerHTML = conteudo;
}
// salva recados no localStorage
function salvar() {
    const recadosSalvos = JSON.stringify(lista);
    localStorage.setItem(a, recadosSalvos);
}
// apaga recados
function apagar(indice) {
    lista.splice(indice, 1);
    salvar();
    mostrar();
    chamaAlert('danger','Atenção! Recado apagado!')
}
// edita recados
function editar(indice) {
    const objetoSelecionado = lista[indice];
    document.getElementById("inputDescri").value = objetoSelecionado.des;
    document.getElementById("inputDetalha").value = objetoSelecionado.deta;
    indiceUpdate = indice;
}
//------- modal -------
function abrirModal(titulo, conteudo, btn, link){
    var myModal = new bootstrap.Modal(document.getElementById('testemodal'), {});
    let a = document.getElementById("tituloModal");
    let b = document.getElementById("conteudoModal");
    let c = document.getElementById("btnModal");    
    a.innerHTML = `<h5 class="modal-title">${titulo}</h5>`
    b.innerHTML = `<p>${conteudo}</p>`
    c.innerHTML = `<button type="button" class="btn btn-secondary" ${link} data-bs-dismiss="modal">${btn}</button>`
    myModal.show();
}
//Função utilizada nos modais
function abriRecados(){
    window.location.href = 'recados.html';
}
function sair(){
    window.location.href = 'index.html';
}
// ------- Alert -------
function chamaAlert(cor, msg){
    const alerta = document.getElementById('alertMasterUltra');    
    alerta.innerHTML = `<div class="alert alert-${cor}" role="alert">${msg}</div>`
    document.getElementById('alertMasterUltra').style.display = 'block';
    setTimeout(function(){
        document.getElementById('alertMasterUltra').style.display = 'none';
    },3000);
}