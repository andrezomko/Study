const inputCep = document.querySelector("#cep")  //1

const inputNome =  document.querySelector('#nome')


//3-F p realizar o fetch dos dados do CEP digitado na API
const fpesquisaCep = async() => {
 
    const cep = inputCep.value; 

    if(verificaCep(cep)){  //4 - só busca na API se o CEP digitado for correto: necessario cria funcao.
//4.2 - Fetch API async await:        
        const url = `http://viacep.com.br/ws/${cep}/json/` 
        const dadosBrutos = await fetch(url);
        const dadosCep = await dadosBrutos.json();
    
        if(dadosCep.erro == "true"){
            alert('CEP não encontrado.')
            limpaForms()
        }else{
            fPreencheForm(dadosCep)
        }
    }else{
        alert(`O cep ${cep} é invalido, digite novamente`)
        limpaForms()
    }
    
}

const limpaForms = ()=>{
    document.querySelector('#logradouro').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#cidade').value = ''
    document.querySelector('#estado').value = ''
    inputCep.value = ''
    inputNome.focus()
}


const fPreencheForm = (dadosCep) =>{
    document.querySelector('#logradouro').value = dadosCep.logradouro
    document.querySelector('#bairro').value = dadosCep.bairro
    document.querySelector('#cidade').value = dadosCep.localidade
    document.querySelector('#estado').value = dadosCep.uf
}

//4.1- F de verificacao
const verificaCep = (cep)  => { 
  return cep.length == 8 && !isNaN(cep) // precisa ter 8 digitos e SER um numero = True
}



//2-Saiu do input CEP, irá pesquisar na API:
inputCep.addEventListener('focusout',fpesquisaCep)