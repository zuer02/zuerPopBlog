
const arrayfilmes = [];
let td_numero = '';
let td_nome = '';
let td_diretor = '';
let td_linkimagem = '';
let td_sinopse = '';
let td_comentario = '';
let td_linkimdb = '';
let td_acoes = '';

function salvar(){ // armazenar a posicao da tabela ; 1)mudar o onclick ; 2) criar outro butao e botar desabilitado
    let filme = lerDados(); 
    
    if(this.validaCampos(filme)){
        this.adicionar(filme);//Acho que nao precisa desse this., mas tá funcionando huehue
    }
        listaTabela();
        cancelar();
    }
    
function adicionar(filme){
    arrayfilmes.push(filme);
    }


function lerDados(){    // tem como colocar um valor predefinido, se passar algo ele sobrescreve, tentar usar isso  
    let filme = {} //aparentemente essa let cria um object tambem, legal
    filme.numero = arrayfilmes.length + 1;
    filme.nomeFilme = document.getElementById('nomeFilme').value;
    filme.diretor = document.getElementById('diretor').value;
    filme.linkimagem = document.getElementById('linkimagem').value; 
    filme.sinopse = document.getElementById('sinopse').value;
    filme.comentario = document.getElementById('comentario').value;
    filme.linkimdb = document.getElementById('linkimdb').value;

    return filme;
}

function validaCampos(filme){
    let msg='';

    if(filme.nomeFilme == ''){ msg += 'Insira o nome do filme'}
    if(filme.diretor == ''){ msg += 'Insira o nome do diretor do filme'}
    if(filme.sinopse == ''){ msg += 'Insira a sinopse do filme'}
    if(filme.comentario == ''){ msg += 'Insira um comentario sobre o filme'}      

    if(msg!=''){
        alert(msg)
        return false
    }

    return true;
}

function listaTabela(){
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for(let i=0; i<arrayfilmes.length; i++){
        let tr= tbody.insertRow();

        td_numero = tr.insertCell();
        td_nome = tr.insertCell();
        td_diretor = tr.insertCell();
        td_linkimagem = tr.insertCell();
        td_sinopse = tr.insertCell();
        td_comentario = tr.insertCell();
        td_linkimdb = tr.insertCell();
        td_acoes = tr.insertCell();

        td_numero.innerText = arrayfilmes[i].numero;
        td_nome.innerText= arrayfilmes[i].nomeFilme;
        td_diretor.innerText = arrayfilmes[i].diretor;
        td_sinopse.innerText = arrayfilmes[i].sinopse;
        td_comentario.innerText = arrayfilmes[i].comentario;

        td_numero.classList.add('center');

        let tagImgFilme = document.createElement('img');
        tagImgFilme.src = arrayfilmes[i].linkimagem;
        tagImgFilme.width = '100';
        td_linkimagem.appendChild(tagImgFilme);
        td_linkimagem.classList.add('center');
        
        let imdb = document.createElement('a');
        imdb.href = arrayfilmes[i].linkimdb; //mas aqui vai dar no diretório /o site que eu colocar auehauehaueaueh
        imdb.target = 'blank'; // vai fazer o link abrir em outra pagina

        
        let imdbImg = document.createElement('img');
        imdbImg.src = 'img/imdb.svg';
        imdbImg.width = '50';
        
        imdb.appendChild(imdbImg);
        td_linkimdb.appendChild(imdb);

        let imgEdit = document.createElement('img');
        imgEdit.src = 'img/editar.svg';
        imgEdit.width = '40';
        imgEdit.setAttribute("onclick","preparaEdicao("+JSON.stringify(arrayfilmes[i])+")");
        td_acoes.appendChild(imgEdit);

        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/delete.svg';
        imgDelete.width = '40';
        imgDelete.setAttribute("onclick","deletar("+arrayfilmes[i].numero+")");
        td_acoes.appendChild(imgDelete);
    }
}

function cancelar(){
    document.getElementById('nomeFilme').value = '';
    document.getElementById('diretor').value = '';
    document.getElementById('linkimagem').value = '';
    document.getElementById('sinopse').value = '';
    document.getElementById('comentario').value = '';
    document.getElementById('linkimdb').value = '';
    
    //document.getElementById('button1').innerText = 'salvar';
}

function deletar(num){
    
    for(let i=0; i<arrayfilmes.length; i++){
        if(num==arrayfilmes[i].numero){
            if(confirm('tem certeza que quer tirar da tabela o filme '+arrayfilmes[i].nomeFilme+'?'));{
                arrayfilmes.splice(i,1);
                tbody.deleteRow(i);
            }
        }
    }
    cancelar();
}

function preparaEdicao(dados){
    document.getElementById('nomeFilme').value = dados.nomeFilme;
    document.getElementById('diretor').value = dados.diretor;
    document.getElementById('linkimagem').value = dados.linkimagem;
    document.getElementById('sinopse').value = dados.sinopse;
    document.getElementById('comentario').value = dados.comentario;
    document.getElementById('linkimdb').value = dados.linkimdb;
    
    document.getElementById('button1').innerText = 'Atualizar';
    document.getElementById('button1').setAttribute("onclick", "atualizaDados("+dados.numero+", "+JSON.stringify(dados)+")");
    //document.getElementById('button1').onclick=`salvar(${dados.numero})`; nao deu certo*/
}

/*function atualizar(num, filme){
    //num = num - 1;
    alert("oQ?"); //                         COMO ASSIM EU CLICO NO LAPIS DE EDITAR E ESSE ALERT É CHAMADO????????? O.o
    for(let i=0; i<arrayfilmes.length; i++){
        if(num == arrayfilmes[i].numero){
            arrayfilmes[i].nomeFilme = filme.nomeFilme;
            arrayfilmes[i].diretor = filme.diretor;
            arrayfilmes[i].linkimagem = filme.linkimagem;
            arrayfilmes[i].sinopse = filme.sinopse;
            arrayfilmes[i].comentario = filme.comentario;
            arrayfilmes[i].linkimdb = filme.linkimdb;
        }
    }
}*/

function atualizaDados(num, dados){
    for(let i=0; i<arrayfilmes.length; i++){
        if(num == arrayfilmes[i].numero){
            dados.nomeFilme = document.getElementById('nomeFilme').value;
            arrayfilmes[i].nomeFilme = dados.nomeFilme;
            dados.diretor = document.getElementById('diretor').value;
            arrayfilmes[i].diretor = dados.diretor;
            dados.linkimagem = document.getElementById('linkimagem').value; 
            arrayfilmes[i].linkimagem = dados.linkimagem;
            dados.sinopse = document.getElementById('sinopse').value;
            arrayfilmes[i].sinopse = dados.sinopse;
            dados.comentario = document.getElementById('comentario').value;
            arrayfilmes[i].comentario = dados.comentario;
            dados.linkimdb = document.getElementById('linkimdb').value;
            arrayfilmes[i].linkimdb = dados.linkimdb;
    }
    }
    document.getElementById('button1').innerText = 'salvar';
    document.getElementById('button1').setAttribute("onclick", "salvar()");
    listaTabela();
    cancelar();
}