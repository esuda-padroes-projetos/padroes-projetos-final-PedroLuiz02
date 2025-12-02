document.addEventListener("DOMContentLoaded", () => {

    // Abrir um modal pelo ID
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
  
        modal.classList.add("active");
        document.body.classList.add("no-scroll");
    };
  
    // Fechar um modal pelo ID
    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
  
        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };
  
    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            if (modal) closeModal(modal.id);
        });
    });
  
    // Fechar modal ao clicar fora
    document.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal");
        const overlay = e.target.classList.contains("modal-overlay");
  
        if (overlay && modal) {
            closeModal(modal.id);
        }
    });
  
    // Fechar modal com ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal.active").forEach(m => {
                closeModal(m.id);
            });
        }
    });
  
    window.buy_off = function(event) {
      const nome = document.getElementById('fullName');
      const email = document.getElementById('email');
      const cep = document.getElementById('cep');
      const rua = document.getElementById('rua');
      const bairro = document.getElementById('bairro');
      const cidade = document.getElementById('cidade');
      const uf = document.getElementById('uf');
      const pagamento = document.getElementById('payment');
      
      if(nome.value && email.value && cep.value && rua.value && 
         bairro.value && cidade.value && uf.value && pagamento.value) {
          
          alert("Compras Indisponíveis no Momento, Desculpe o Transtorno!");
          
          nome.value = "";
          email.value = "";
          cep.value = "";
          rua.value = "";
          bairro.value = "";
          cidade.value = "";
          uf.value = "";
          pagamento.value = "";
          
          if(event) {
              event.preventDefault();
              event.stopPropagation();
          }
          
      } else {
          alert("Preencha Todos os campos!");
          if(event) event.preventDefault();
      }
      return false;
  }
  
  });
  