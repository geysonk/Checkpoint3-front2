let tarefasPendentesUL = document.querySelector('.tarefas-pendentes');
let tarefasConcluidasUL = document.querySelector('.tarefas-terminadas');

const renderizaTarefaNaoConcluida = (tarefa) => {
    let tarefaPendenteLI = document.createElement('li');
    tarefaPendenteLI.classList.add('tarefa');
    

    let taskSplitPendente = tarefa.createdAt.split("T");

    let dataAmericana = taskSplitPendente[0];
    let dataBrasileira = dataAmericana.split("-").reverse().join('/');

    tarefaPendenteLI.innerHTML =
    `
    <div class="not-done" id="${tarefa.id}" onclick="marcaCompleto(${tarefa.id})"></div>
    <div class="descricao">
        <p class="nome">${tarefa.description}</p>
    <label>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dataBrasileira}</p>
        <button><i id="${tarefa.id}" class="far fa-trash-alt" onclick="deletaTarefa(${tarefa.id})"></i></button>
    </label>
    </div>
    `
    tarefasPendentesUL.appendChild(tarefaPendenteLI);
}

const renderizaTarefaConcluida = (tarefa) => {
    let tarefaConcluidaLI = document.createElement('li');
    tarefaConcluidaLI.classList.add('tarefa');

    tarefaConcluidaLI.innerHTML =
    `
    <div class="done"></div>
    <div class="descricao">
    <p class="nome">${tarefa.description}</p>
    <div>
        <button onclick="marcaImcompleto(${tarefa.id})"><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
        <button><i id="${tarefa.id}" class="far fa-trash-alt" onclick="deletaTarefa(${tarefa.id})"></i></button>
    </div>
    </div>
    `

    tarefasConcluidasUL.appendChild(tarefaConcluidaLI);
}