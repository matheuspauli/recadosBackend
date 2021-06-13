// Ocultar Div de criação de usuário / mostra apenas o login
document.getElementById('conta').style.display = 'none';
function criarconta(){
    document.getElementById('login').style.display = 'none';
    document.getElementById('conta').style.display = 'flex';
}
const api = "https://recadosbackend.herokuapp.com";
//const api = "http://localhost:3000";
window.addEventListener('load', () => {    
    //criarUsuario();
});
//criar usuario
function criarUsuario() {
    const usuario = document.getElementById('user00').value;
    const senha = document.getElementById('password00').value;
    const senha2 = document.getElementById('passwordCheck').value;
    axios.post(`${api}/users`, {
        usuario: usuario, senha: senha, senha2: senha2
    }).then((resposta) => {
        if (resposta.data.success) {
            localStorage.setItem('userLogado', resposta.data.data.id);
            location.href = 'recados.html';
        } else {
            alert(resposta.data.message);
        }}).catch((erro) => {
                alert(erro.response.data.msg);
            });
}
//Login
function login() {
    const usuarioL = document.getElementById('user').value;
    const senhaL = document.getElementById('password').value;
    console.log(usuarioL);
    console.log(senhaL);
    axios.post(`${api}/login`, {
        usuario: usuarioL, senha: senhaL
    }).then((resposta) => {
        if (resposta.data.success) {
            localStorage.setItem('userLogado', resposta.data.data);
            location.href = 'recados.html';
        } else {
            alert(resposta.data.message);
        }}).catch((erro) => {
                alert(erro.response.data.msg);
            });
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