
const arraymusicas = [];
let td_numero = '';
let td_linkcapa = '';
let td_nome = '';
let td_banda = '';
let td_estilo = '';
let td_comentario = '';
let td_link = '';
let td_acoes = '';

function salvar(){
        let musica = lerDados();
        if(document.getElementById('button2').innerText == 'salvar') {
            musica.editNumero = null; //botei essa bomba aqui
        }else musica.editNumero = 1;
        if(this.validaCampos(musica)){
            if(musica.editNumero == null){
                this.adicionar(musica);//Acho que nao precisa desse this., mas tá funcionando huehue
                
            }else{
                //musica.numero = numero;
                this.atualizar(musica.numero, musica);
            }
    
        }
        
        listaTabela();
        cancelar();
    }
    
function adicionar(musica){
    arraymusicas.push(musica);
    }

function lerDados(){    
    let musica = {} //aparentemente essa let cria um object tambem, legal

    musica.numero = arraymusicas.length + 1;
    musica.nomemusica = document.getElementById('nomemusica').value;
    musica.banda = document.getElementById('banda').value;
    musica.estilo = document.getElementById('estilo').value; 
    musica.comentario = document.getElementById('comentario').value;
    musica.link = document.getElementById('link').value;
    musica.linkcapa = document.getElementById('linkcapa').value;

    return musica;
}

function validaCampos(musica){
    let msg='';

    if(musica.nomemusica == ''){ msg += 'Insira o nome da musica'}
    if(musica.banda == ''){ msg += 'Insira o nome da banda'}
    if(musica.estilo == ''){ msg += 'Insira o estilo da musica'}
    if(musica.comentario == ''){ msg += 'Insira um comentario sobre a musica'}      

    if(msg!=''){
        alert(msg)
        return false
    }

    return true;
}

function listaTabela(){
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for(let i=0; i<arraymusicas.length; i++){
        let tr= tbody.insertRow();

        td_numero = tr.insertCell();
        td_nome = tr.insertCell();
        td_banda = tr.insertCell();
        td_estilo = tr.insertCell();
        td_comentario = tr.insertCell();
        td_link = tr.insertCell();
        td_linkcapa = tr.insertCell();
        td_acoes = tr.insertCell();

        td_numero.innerText = arraymusicas[i].numero;
        td_nome.innerText= arraymusicas[i].nomemusica;
        td_banda.innerText = arraymusicas[i].banda;
        td_estilo.innerText = arraymusicas[i].estilo;
        td_comentario.innerText = arraymusicas[i].comentario;

        td_numero.classList.add('center');

        let tagImgCapa = document.createElement('img');
        tagImgCapa.src = arraymusicas[i].linkcapa;
        tagImgCapa.width = '100';
        td_linkcapa.appendChild(tagImgCapa);
        td_linkcapa.classList.add('center');


        let linkmsc = document.createElement('a');
        linkmsc.href = arraymusicas[i].link; 
        linkmsc.target = 'blank'; // vai fazer o link abrir em outra pagina

        
        let linkImg = document.createElement('img');
        linkImg.src = 'img/link.svg';
        linkImg.width = '40';
        
        linkmsc.appendChild(linkImg);
        td_link.appendChild(linkmsc);

        /*let imgEdit = document.createElement('img');
        imgEdit.src = 'img/editar.svg';
        imgEdit.width = '40';
        imgEdit.setAttribute("onclick","preparaEdicao("+JSON.stringify(arraymusicas[i])+")");
        td_acoes.appendChild(imgEdit);*/

        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/delete.svg';
        imgDelete.width = '40';
        imgDelete.setAttribute("onclick","deletar("+arraymusicas[i].numero+")");
        td_acoes.appendChild(imgDelete);
    }
}

function cancelar(){
    document.getElementById('nome').value = '';
    document.getElementById('banda').value = '';
    document.getElementById('linkcapa').value = '';
    document.getElementById('estilo').value = '';
    document.getElementById('comentario').value = '';
    document.getElementById('link').value = '';
    
    document.getElementById('button2').innerText = 'salvar';
}

function deletar(num){
    
    for(let i=0; i<arraymusicas.length; i++){
        if(num==arraymusicas[i].numero){
            if(confirm('tem certeza que quer tirar da tabela a musica '+arraymusicas[i].nome+'?'));{
                arraymusicas.splice(i,1);
                tbody.deleteRow(i);
            }
        }
    }
    console.log(arraymusicas);
}

function preparaEdicao(dados){
    document.getElementById('nomemusica').value = dados.nomemusica;
    document.getElementById('banda').value = dados.banda;
    document.getElementById('linkcapa').value = dados.linkcapa;
    document.getElementById('estilo').value = dados.estilo;
    document.getElementById('comentario').value = dados.comentario;
    document.getElementById('link').value = dados.link;
    
    document.getElementById('button2').innerText = 'Atualizar';
}

function atualizar(num, musica){
    num = num - 1;
    for(let i=0; i<arraymusicas.length; i++){
        if(num == arraymusicas[i].numero){
            arraymusicas[i].nomemusica = musica.nomemusica;
            arraymusicas[i].banda = musica.banda;
            arraymusicas[i].linkcapa = musica.linkcapa;
            arraymusicas[i].estilo = musica.estilo;
            arraymusicas[i].comentario = musica.comentario;
            arraymusicas[i].link = musica.link;
        }
    }
}