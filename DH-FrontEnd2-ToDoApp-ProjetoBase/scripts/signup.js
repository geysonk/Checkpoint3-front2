const nome = document.getElementById("nome");
const apelido = document.getElementById("apelido");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const repetirSenha = document.getElementById("repetirSenha");

const botao = document.getElementById("submit");

// -*-
const validateField = (field, valid) => {
    if (valid) return field.classList.remove("is-invalid");
    field.value.length <= 0 ? field.classList.add("is-invalid") : field.classList.remove("is-invalid");
}

const validateEmail = () => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.value)) document.querySelector("#email + small").innerHTML = "Email inválido"
}

const fields = [nome, apelido, email, senha, repetirSenha];

fields.forEach(field => {

    field.addEventListener('focus', () => validateField(field, true));
    field.addEventListener('blur', () => validateField(field));
})

email.addEventListener("blur", () => {
    validateField(email, validateEmail());
})
email.addEventListener("focus", () => {
    validateField(email, true);
})

let usuarioCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const criarUsuario = () => {
    usuarioCadastro = {
        firstName: nome.value,
        lastName: apelido.value,
        email: email.value,
        password: senha.value
    };

    let usuarioCadastroJSON = JSON.stringify(usuarioCadastro);

    showSpinner()
    fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioCadastroJSON
    }).then(response => {
        console.log(response.status)
        switch (response.status) {
            case 400: throw "Usuário já existe"
            case 500: throw "Erro de servidor"
        }
        return response.json()
    }).then(response => {
        sessionStorage.setItem('jwt', response.jwt)
        console.log(sessionStorage.getItem('jwt'))
        alert("Usuário cadastrado com sucesso!")
        // *Voltar a página de login
        location.href = "tarefas.html"
    }).catch(error => {
        alert(error);
    }).finally(() => { hideSpinner() })
}

botao.addEventListener("click", function (event) {
    event.preventDefault();
    let arrayErros = [];
    if (nome.value.length <= 0) {
        arrayErros.push('Nome é obrigatório');
    }
    if (apelido.value.length <= 0) {
        arrayErros.push('Apelido é obrigatório');
    }
    if (email.value.length <= 0) {
        arrayErros.push('Email é obrigatório');
    }
    if (senha.value.length <= 0) {
        arrayErros.push('Senha é obrigatório');
    }
    if (senha.value !== repetirSenha.value) {
        arrayErros.push('A senha deve ser igual');
    }

    if (arrayErros.length > 0) {
        let stringErros = ''
        arrayErros.forEach(erro => {
            stringErros = stringErros + erro + '\n'
        });
        alert(stringErros);
    } else {
        criarUsuario();
    }
});