function pesquisacep(valor) {

    let cep = valor.replace(/\D/g, "");
  
    if (cep.length !== 8) {
        limpa_formulário_cep();
        return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(r => r.json())
        .then(data => {
            if (data.erro) {
                limpa_formulário_cep();
                alert("CEP não encontrado.");
                return;
            }
  
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
        })
        .catch(() => {
            alert("Erro ao buscar CEP.");
        });
  }
  
  function limpa_formulário_cep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
  }
  