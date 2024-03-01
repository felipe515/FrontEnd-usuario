const criarHome = document.querySelector('.popupCriarConta');
const tabela = document.querySelector('.tableContain');
var pegarId;

var usuario = {}
var usuarioList = [];

atualizarTabela();

function atualizarTabela(){
    fetch('http://localhost:8080/usuario')
    .then(response => response.json())
    .then(data => {
        // Faça algo com os dados recebidos
        console.log('Data', data);
        this.usuarioList = data
        this.tableCreate(this.usuarioList)
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");
            
            var colNome = document.createElement("td");
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome);
            
            var colEmail = document.createElement("td");
            colEmail.appendChild(document.createTextNode(element.email))
            row.appendChild(colEmail);
            
            var colEditar = document.createElement("td")
            var buttonEditar = document.createElement("button");
            buttonEditar.classList.add("buttonTabela");
            buttonEditar.textContent = "EDITAR";
            colEditar.appendChild(buttonEditar)
            colEditar.addEventListener("click", function() {
                openEdit(element.id, element.nome, element.email);
            });
            row.appendChild(colEditar)
            
            
            var colExcluir = document.createElement("td");
            var buttonExcluir = document.createElement("button");
            buttonExcluir.classList.add("buttonTabela");
            buttonExcluir.textContent = "EXCLUIR";
            colExcluir.appendChild(buttonExcluir)

            colExcluir.addEventListener("click", function() {
                openPopup(element.id, element.nome);
            });
            row.appendChild(colExcluir);
            
            tableBody.appendChild(row);
            console.log(element);
        });
    }
}

        function openLoginHome(){
            criarHome.classList.add('active')
            tabela.classList.add('hide')
            buttons.classList.add('hide');
            
        }

        function fecharPopHome(){
            criarHome.classList.remove('active')
            tabela.classList.remove('hide')
            buttons.classList.remove('hide');

        }

        function openPopup(id, nome){
            pegarId = id
            var h2 = document.getElementById('h2Excluir');
            h2.innerHTML = '<h2> Tem certeza que deseja excluir ' + nome + ' da sua lista de clientes?</h2>';
//            Tem certeza que deseja excluir esse usuario?
            pop.classList.add('active');
            tabela.classList.add('hide');
            buttons.classList.add('hide');
            
        }

        function fecharPopupExcluir(){
            pop.classList.remove('active');
            tabela.classList.remove('hide')
            buttons.classList.remove('hide');

        }


        function openEdit(id, nome, email) {
            pegarId = id
            document.getElementById('nomeEditar').value = nome;
            document.getElementById('emailEditar').value = email;

            popEditar.classList.add('active');
            tabela.classList.add('hide')
            buttons.classList.add('hide');
        }

        function fecharPopupEditar(){
            popEditar.classList.remove('active');
            tabela.classList.remove('hide')
            buttons.classList.remove('hide');
        }

function adicionar(){
    
    this.usuario.nome = document.getElementById('nomeCriar').value;
    this.usuario.email = document.getElementById('emailCriar').value;
    this.usuario.senha = document.getElementById('senhaCriar').value;
    
    console.log(this.usuario)
    
    if(this.usuario.nome != "" && this.usuario.email != "" && this.usuario.senha != ""){
        fetch('http://localhost:8080/usuario', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if(response.ok){
                console.log('Dados enviados com sucesso!');
                atualizarTabela();
            }else{
                console.log('Falha ao enviar os dados!');
            }
        })
        .catch(error => {
            console.log('Falha ao enviar os dados:', error)
        });
    }else{
        console.log('existe campos vazios')
    }
    this.usuario = {}
    
    document.getElementById('nomeCriar').value = '';
    document.getElementById('emailCriar').value = '';
    document.getElementById('senhaCriar').value = '';
}


function editar(){
    
    this.usuario.nome = document.getElementById('nomeEditar').value;
    this.usuario.email = document.getElementById('emailEditar').value;
    this.usuario.senha = document.getElementById('senhaEditar').value;
    
    console.log(this.usuario)
    console.log('editar ' + pegarId);
    if(this.usuario.nome != "" && this.usuario.email != "" && this.usuario.senha != ""){
        fetch('http://localhost:8080/usuario/' + pegarId, {
        method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if(response.ok){
                console.log('Dados enviados com sucesso!');
                atualizarTabela();
            }else{
                console.log('Falha ao enviar os dados!');
            }
        })
        .catch(error => {
            console.log('Falha ao enviar os dados:', error)
        });
    }else{
        console.log('existe campos vazios')
    }
    this.usuario = {}
    
    document.getElementById('nomeEditar').value = '';
    document.getElementById('emailEditar').value = '';
    document.getElementById('senhaEditar').value = '';
}

function excluir(){
    console.log('excluir ' + pegarId);
   // const urlDelete = 'http://localhost:8080/usuario/' + pegarId;
    fetch('http://localhost:8080/usuario/' + pegarId, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro na solicitação: ${response.statusText}');
        }
        return response.text();//trata a resposta como texto simples
    })
    .then(data => {
        console.log(data)
        atualizarTabela();
    })
    .catch(error => {
        console.error('Erro ao excluir usuario:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const pesquisar = document.querySelector('.pesquisar');
    const userTable = document.querySelector('.rTable');
    const tableBody = userTable.getElementsByTagName("tbody")[0]; 
    const linhas = tableBody.getElementsByTagName('tr');

    pesquisar.addEventListener('input', function(){
        const pesquisarUser = pesquisar.value.toLowerCase();

        for(let i = 0; i < linhas.length; i++){
            const userName = linhas[i].getElementsByTagName('td')[1].innerHTML.toLowerCase();

            if(userName.includes(pesquisarUser)){
                linhas[i].style.display = '';
            }else{
                linhas[i].style.display = 'none';
            }
        }

    });

});

let pop = document.querySelector('.popupExcluir');
let popEditar = document.querySelector('.popupEditarConta');
let buttons = document.querySelector('.buttons');