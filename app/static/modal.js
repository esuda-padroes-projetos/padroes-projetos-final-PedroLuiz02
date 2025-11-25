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
  
  });
  