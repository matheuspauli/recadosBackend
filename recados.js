const usuarioLogado = localStorage.getItem('userLogado');
window.addEventListener('load', () => {        
    axios.get(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}`)
        .then((resposta) => { 
            mostrarRecados(resposta);               
        });
});

// recarregar lista de recados atualizada/editada/apagada
function atualizaRecados() {
    axios.get(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}`)
        .then((resposta) => { 
            mostrarRecados(resposta);               
        });
}

// Constroi lista de recados
function mostrarRecados(resposta) {    
    const dados = resposta.data.data.recado;             
    const divTabela = document.getElementById("tabela");    
    let conteudo = "<table class>";
    let contador = 1;
    for (const valor of dados) {
        console.log('dentro da tabela', valor);
        conteudo += `
        <tr>
            <td class="col-1">${contador}</td>
            <td class="col-3">${valor.descricao}</td>
            <td class="col-6">${valor.detalhes}</td>            
            <td class="col-2 text-end"><button onclick='editar("${valor.id}")' type="button" class="btn btn-primary btn-sm" onclick="criarconta()"> Editar </button>
                    <button onclick='apagar("${valor.id}")' type="button" class="btn btn-dark btn-sm"    onclick="entrar()">Apagar</button></td>                  
        </tr>
        `;
        contador++;
    };
    conteudo += "</table>";
    divTabela.innerHTML = conteudo;
}

//Criar um novo Recado
function criarRecado() {
    const descri = document.getElementById('inputDescri').value;
    const detalhes = document.getElementById('inputDetalha').value;
    axios.post(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}`, {
        descricao: descri, detalhes: detalhes
    }).then((resposta) => {
        chamaAlert('success', 'Recado salvo com sucesso!');
        document.getElementById("inputDescri").value = "";
        document.getElementById("inputDetalha").value = "";
        atualizaRecados()       
    })
}

//Editar recados
function editarRecados(rid) {
    const descri = document.getElementById('inputDescri').value;
    const detalhes = document.getElementById('inputDetalha').value;
    axios.put(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}/recado/${rid}`, {
        descricao: descri, detalhes: detalhes
    }).then((resposta) => {
        chamaAlert('warning', 'Recado editado com sucesso!');
        document.getElementById("inputDescri").value = "";
        document.getElementById("inputDetalha").value = "";
})}

// Apagar recado
function apagar(rid) {    
    axios.delete(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}/recado/${rid}`).then((resposta) => {
        chamaAlert('danger','Atenção! Recado apagado!');
        axios.get(`https://recadosbackend.herokuapp.com/users/${usuarioLogado}`)
        .then((resposta) => { 
            mostrarRecados(resposta);
        });
    })
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