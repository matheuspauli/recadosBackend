// Ocultar Div de criação de usuário / mostra apenas o login
document.getElementById('conta').style.display = 'none';
function criarconta(){
    document.getElementById('login').style.display = 'none';
    document.getElementById('conta').style.display = 'flex';
}






window.addEventListener('load', () => {    
    const usuario = document.getElementById('user00').value;
    const senha = document.getElementById('password00').value;
    const senha2 = document.getElementById('passwordCheck').value;
    criarUsuario(usuario, senha,senha2);
});
//criar usuario
function criarUsuario(usuario, senha, senha2) {
    axios.post(`https://recadosbackend.herokuapp.com/users`, {
        usuario: usuario, senha: senha, senha2: senha2
    }).then((resposta) => {
        if (resposta.data.success) {
            localStorage.setItem('userLogado', resposta.data.data.id);
            location.href = 'recado.html';
        } else {
            alert(resposta.data.message);
        }}).catch((erro) => {
                alert(erro.response.data.msg);
            });
}