const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");

const botao = document.getElementById("submit");

let usuarioLogin = {
    email: "",
    password: ""
}

const logarUsuario = function () {
    usuarioLogin = {
        email: email.value,
        password: senha.value
    }

    let usuarioJSON = JSON.stringify(usuarioLogin);

    showSpinner();
    fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioJSON

    }).then(response => {
        console.log(response)
        switch(response.status) {
            case 400: throw("Senha errada")
            case 404: throw("Usuário não encontrado")
            case 500: throw("Erro no servidor")
        }
        return response.json()
    }).then(response => {
        console.log(response);
        localStorage.setItem('jwt', response.jwt);
        console.log(localStorage.getItem('jwt'));
        location.href = "tarefas.html";
    }).catch(error => {
        console.log(error);
        alert(error);
    }).finally(() => { hideSpinner() });
}

botao.addEventListener("click", function (event) {
    event.preventDefault();
    let arrayErros = [];

    if (email.value.length <= 0) {
        arrayErros.push('Email é obrigatório');
    }
    if (senha.value.length <= 0) {
        arrayErros.push('Senha é obrigatório');
    }
    if (arrayErros.length > 0) {
        let stringErros = '';
        arrayErros.forEach(erro => {
            stringErros = stringErros + erro + '\n';
        });
        alert(stringErros);
    } else {
        logarUsuario();
    }
});