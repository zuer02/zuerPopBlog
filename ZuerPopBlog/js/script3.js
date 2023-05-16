
const arraylivros = [];
let td_numero = '';
let td_linkcapa = '';
let td_nome = '';
let td_autor = '';
let td_genero = '';
let td_comentario = '';
let td_acoes = '';

function salvar(){
        let livro = lerDados();
        if(document.getElementById('button3').innerText == 'salvar') {
            livro.editNumero = null; //botei essa bomba aqui
        }else livro.editNumero = 1;
        if(this.validaCampos(livro)){
            if(livro.editNumero == null){
                this.adicionar(livro);//Acho que nao precisa desse this., mas tá funcionando huehue
                
            }else{
                //livro.numero = numero;
                this.atualizar(livro.numero, livro);
            }
    
        }
        
        listaTabela();
        cancelar();
    }
    
function adicionar(livro){
    arraylivros.push(livro);
    }

function lerDados(){    
    let livro = {} //aparentemente essa let cria um object tambem, legal

    livro.numero = arraylivros.length + 1;
    livro.nomeLivro = document.getElementById('nomeLivro').value;
    livro.autor = document.getElementById('autor').value;
    livro.genero = document.getElementById('genero').value; 
    livro.comentario = document.getElementById('comentario').value;
    livro.linkcapa = document.getElementById('linkcapa').value;

    return livro;
}

function validaCampos(livro){
    let msg='';

    if(livro.nomeLivro == ''){ msg += 'Insira o nome do livro'}
    if(livro.genero == ''){ msg += 'Insira o gênero literário'}
    if(livro.autor == ''){ msg += 'Insira o nome do autor'}
    if(livro.comentario == ''){ msg += 'Insira um comentário sobre o livro'}      

    if(msg!=''){
        alert(msg)
        return false
    }

    return true;
}

function listaTabela(){
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for(let i=0; i<arraylivros.length; i++){
        let tr= tbody.insertRow();

        td_numero = tr.insertCell();
        td_nome = tr.insertCell();
        td_linkcapa = tr.insertCell();
        td_autor = tr.insertCell();
        td_genero = tr.insertCell();
        td_comentario = tr.insertCell();
        td_acoes = tr.insertCell();

        td_numero.innerText = arraylivros[i].numero;
        td_nome.innerText= arraylivros[i].nomeLivro;
        td_autor.innerText = arraylivros[i].autor;
        td_genero.innerText = arraylivros[i].genero;
        td_comentario.innerText = arraylivros[i].comentario;

        td_numero.classList.add('center');

        let tagImgCapa = document.createElement('img');
        tagImgCapa.src = arraylivros[i].linkcapa;
        tagImgCapa.width = '100';
        td_linkcapa.appendChild(tagImgCapa);
        td_linkcapa.classList.add('center');


        /*let imgEdit = document.createElement('img');
        imgEdit.src = 'img/editar.svg';
        imgEdit.width = '40';
        imgEdit.setAttribute("onclick","preparaEdicao("+JSON.stringify(arraylivros[i])+")");
        td_acoes.appendChild(imgEdit);*/

        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/delete.svg';
        imgDelete.width = '40';
        imgDelete.setAttribute("onclick","deletar("+arraylivros[i].numero+")");
        td_acoes.appendChild(imgDelete);
    }
}

function cancelar(){
    document.getElementById('nomeLivro').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('linkcapa').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('comentario').value = '';
    
    document.getElementById('button3').innerText = 'salvar';
}

function deletar(num){
    
    for(let i=0; i<arraylivros.length; i++){
        if(num==arraylivros[i].numero){
            if(confirm('tem certeza que quer tirar da tabela a livro '+arraylivros[i].nomeLivro+'?'));{
                arraylivros.splice(i,1);
                tbody.deleteRow(i);
            }
        }
    }
    console.log(arraylivros);
}

function preparaEdicao(dados){
    document.getElementById('nomeLivro').value = dados.nomeLivro;
    document.getElementById('autor').value = dados.autor;
    document.getElementById('linkcapa').value = dados.linkcapa;
    document.getElementById('genero').value = dados.genero;
    document.getElementById('comentario').value = dados.comentario;
    
    document.getElementById('button3').innerText = 'Atualizar';
}

function atualizar(num, livro){
    num = num - 1;
    alert(num+' '+livro.numero);
    for(let i=0; i<arraylivros.length; i++){
        if(num == arraylivros[i].numero){
            arraylivros[i].nomeLivro = livro.nomeLivro;
            arraylivros[i].autor = livro.autor;
            arraylivros[i].linkcapa = livro.linkcapa;
            arraylivros[i].genero = livro.genero;
            arraylivros[i].comentario = livro.comentario;
        }
    }
}