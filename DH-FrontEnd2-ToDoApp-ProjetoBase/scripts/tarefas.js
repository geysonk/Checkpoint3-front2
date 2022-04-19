if (!localStorage.getItem('jwt')) location.href = "index.html";

const tarefas = () => {

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.json()
    }).then(response => {
        console.log(response)
        for (const tarefa of response) {
            if (tarefa.completed) {
                renderizaTarefaConcluida(tarefa)
            } else {
                renderizaTarefaNaoConcluida(tarefa)
            }
        }
    }).catch(error => {
        console.log(error)
    })
}

const description = document.getElementById('novaTarea');

let novaTarefa = () => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify(
            {
                "description": description.value, //adicionei .value
                "completed": false //e aqui coloquei igual tava na documentação, aparentemente deu certo
            }
        )
    }).then(response => {
        return response.json();
    }).then(response => {
        location.reload();
        console.log(response);
    });
}

let marcarTarefaConcluida = () => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify(
            {
                "description": description.value, //adicionei .value
                "completed": false //e aqui coloquei igual tava na documentação, aparentemente deu certo
            }
        )
    }).then(response => {
        return response.json();
    }).then(response => {
        location.reload();
        console.log(response);
    });
}

let button = document.getElementById("novaTarefa");
button.addEventListener("click", (event) => {
    event.preventDefault();
    novaTarefa();
});

onload = tarefas();

const marcaCompleto = (id) => {
    let confirmacao = confirm("Tem certeza que deseja marcar tarefa como concluida?");
    if (!confirmacao) {
        return
    }

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify(
            {
                "completed": true //e aqui coloquei igual tava na documentação, aparentemente deu certo
            }
        )
    }).then(response => {
        return response.json();
    }).then(response => {
        location.reload();
        console.log(response);
    });
}

const marcaImcompleto = (id) => {
    let confirmacao = confirm("Tem certeza que deseja marcar tarefa como incompleta?");
    if (!confirmacao) {
        return
    }

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify(
            {
                "completed": false
            }
        )
    }).then(response => {
        return response.json();
    }).then(response => {
        location.reload();
        console.log(response);
    });
}

const deletaTarefa = (id) => {
    let confirmacao = confirm("Tem certeza que deseja deletar a tarefa?");
    if (!confirmacao) {
        return
    }

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        location.reload();
        console.log(response);
    })
}