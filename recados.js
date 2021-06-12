let usuarioLogado = localStorage.getItem('userLogado');
const recupera = localStorage.getItem(usuarioLogado);
if (recupera) {
    lista = JSON.parse(recupera);
    mostrar();
}
window.addEventListener('load', () => {
    const id = localStorage.getItem("userLogado");
    axios.get(`https://recadosbackend.herokuapp.com/users/${id}`)
        .then((resposta) => {
            const dados = resposta.dados.dados;
            const divTabela = document.getElementById("tabela");
    let conteudo = "<table class>";
    let indice = 0;
    let contador = 1;
    for (const valor of dados) {
        conteudo += `
        <tr>
            <td class="col-1">${contador}</td>
            <td class="col-3">${valor.descricao}</td>
            <td class="col-6">${valor.detalhes}</td>            
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
        );
});



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