document.addEventListener("DOMContentLoaded", function () {

    // SWIPER
    if (document.querySelector(".mySwiper")) {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }

    // CARROSSEL DE INFORMAÇÕES
    (function () {
        const imgEl = document.getElementById('galleryImage');
        const titleEl = document.getElementById('galleryTitle');
        const textEl = document.getElementById('galleryText');
        const volEl = document.getElementById('galleryVolume');
        const cafEl = document.getElementById('galleryCaffeine');
        const sugEl = document.getElementById('gallerySugar');
        const prevBtn = document.getElementById('prevCan');
        const nextBtn = document.getElementById('nextCan');

        // Se não existe, não roda nada dessa parte
        if (!imgEl || !titleEl || !textEl || !volEl || !cafEl || !sugEl || !prevBtn || !nextBtn) return;

        const cans = [
            {
                src: '../static/img/lata1.png',
                title: 'Vortex Classic',
                text: 'O sabor Tradicional oferece energia rápida e disposição com um perfil equilibrado e refrescante. Combina cafeína, taurina, vitaminas do complexo B e açúcares para aumentar o foco, estimular o metabolismo e melhorar o desempenho em atividades intensas.',
                volume: '500ml',
                caffeine: '34mg',
                sugar: '24g'
            },
            {
                src: '../static/img/lata2.png',
                title: 'Vortex Uva',
                text: 'O sabor Uva traz uma combinação marcante e frutada, oferecendo energia imediata com um toque refrescante. A união de cafeína, taurina, vitaminas do complexo B e açúcares garante mais foco, resistência e estímulo ao metabolismo.',
                volume: '500ml',
                caffeine: '32mg',
                sugar: '26g'
            },
            {
                src: '../static/img/lata3.png',
                title: 'Vortex Laranja',
                text: 'O sabor Laranja combina frescor cítrico com ação energética imediata. Sua fórmula com cafeína, taurina, vitaminas do complexo B e açúcares melhora o foco, o metabolismo e a resistência, oferecendo energia com leve acidez natural.',
                volume: '500ml',
                caffeine: '32mg',
                sugar: '26g'
            },
            {
                src: '../static/img/lata4.png',
                title: 'Vortex Maçã Verde',
                text: 'Com sabor vibrante e refrescante, o Maçã-Verde entrega energia rápida e melhora o foco. A mistura de cafeína, taurina, vitaminas do complexo B e açúcares eleva a disposição e estimula o metabolismo com um toque frutado e marcante.',
                volume: '500ml',
                caffeine: '32mg',
                sugar: '26g'
            },
            {
                src: '../static/img/lata5.png',
                title: 'Vortex Melancia',
                text: 'Com perfil leve e refrescante, o sabor Melancia aumenta a disposição rapidamente graças à cafeína, taurina, vitaminas do complexo B e açúcares. Ideal para quem busca energia com um toque suave e frutado.',
                volume: '500ml',
                caffeine: '32mg',
                sugar: '26g'
            },
            {
                src: '../static/img/lata6.png',
                title: 'Vortex Zero',
                text: 'A versão Zero entrega o mesmo impulso de energia e alerta, mas sem açúcar, mantendo o sabor leve e refrescante. Sua fórmula com cafeína, taurina e vitaminas do complexo B ajuda na disposição e no metabolismo sem adicionar calorias extras.',
                volume: '500ml',
                caffeine: '34mg',
                sugar: '0g'
            }
        ];

        let index = 0;

        function updateGallery(i) {
            const item = cans[i];
            imgEl.src = item.src;
            titleEl.textContent = item.title;
            textEl.textContent = item.text;
            volEl.textContent = item.volume;
            cafEl.textContent = item.caffeine;
            sugEl.textContent = item.sugar;
        }

        prevBtn.addEventListener('click', () => {
            index = (index - 1 + cans.length) % cans.length;
            updateGallery(index);
        });

        nextBtn.addEventListener('click', () => {
            index = (index + 1) % cans.length;
            updateGallery(index);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });

        updateGallery(index);

        let autoPlayInterval = setInterval(() => nextBtn.click(), 4000);

        function resetAutoplay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => nextBtn.click(), 4000);
        }

        prevBtn.addEventListener('click', resetAutoplay);
        nextBtn.addEventListener('click', resetAutoplay);
    })();


    // MENU DO USUÁRIO E CARRINHO
    function closeAllDropdowns() {
        document
            .querySelectorAll(".dropdown-menu, .dropdown-menu-bag")
            .forEach((m) => m.classList.remove("active"));
    }

    function setupDropdown(triggerId, menuId, closeButtonId = null) {
        const trigger = document.getElementById(triggerId);
        const menu = document.getElementById(menuId);

        if (!trigger || !menu) return;

        const closeBtn = closeButtonId ? document.getElementById(closeButtonId) : null;

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            menu.classList.add("active");
        });

        menu.addEventListener("click", (e) => e.stopPropagation());

        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                menu.classList.remove("active");
            });
        }
    }

    setupDropdown("userIcon", "dropdownMenu", "closeMenu");
    setupDropdown("bagIcon", "dropdownMenuBag", "closeMenuBag");

    document.addEventListener("click", (e) => {

        if (!e.isTrusted) return;

        if (
            e.target.closest(".modal") ||
            e.target.closest(".modal-overlay")
        ) {
            return;
        }

        if (
            e.target.closest(".dropdown-menu") ||
            e.target.closest(".dropdown-menu-bag") ||
            e.target.closest("#userIcon") ||
            e.target.closest("#bagIcon")
        ) return;

        closeAllDropdowns();
    });


    // BOTÕES DE QUANTIDADE
    const quantityInput = document.getElementById("quantity");
    const aumentarBtn = document.getElementById("aumentar");
    const diminuirBtn = document.getElementById("diminuir");

    if (quantityInput && aumentarBtn && diminuirBtn) {
        aumentarBtn.addEventListener("click", () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        diminuirBtn.addEventListener("click", () => {
            let v = parseInt(quantityInput.value);
            if (v > 1) quantityInput.value = v - 1;
        });
    }

    // ATUALIZAR TOTAL E SUBTOTAL
    const produtos = document.querySelectorAll(".order-product, .bag-itens");
    const totalModal = document.querySelector("#totalPrice");
    const totalBag = document.querySelector("#bag-total-price");

    produtos.forEach(prod => {

    const btnMinus = prod.querySelector(".qty-minus");
    const btnPlus = prod.querySelector(".qty-plus");
    const input = prod.querySelector(".qty-input");
    const units = prod.querySelector(".units");
    const price = parseFloat(prod.querySelector(".unit").textContent.replace("R$", ""));
    const itemId = prod.dataset.itemId;

    if (!btnMinus || !btnPlus || !input) return;

    function enviar(novaQtd) {
        fetch("/atualizar-quantidade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_item: itemId,
                quantidade: novaQtd
            })
        })
        .then(r => r.json())
        .then(data => {
            if (data.total_pedido !== undefined) {
                if (totalModal) totalModal.textContent = "R$ " + data.total_pedido.toFixed(2);
                if (totalBag) totalBag.textContent = "R$ " + data.total_pedido.toFixed(2);
            }

        })
        .catch(err => console.error(err));
    }

    btnPlus.addEventListener("click", () => {
        let nova = parseInt(input.value) + 1;
        input.value = nova;
        units.textContent = "Unidades: " + nova;
        enviar(nova);
    });

    btnMinus.addEventListener("click", () => {
        let atual = parseInt(input.value);
        if (atual > 1) {
            let nova = atual - 1;
            input.value = nova;
            units.textContent = "Unidades: " + nova;
            enviar(nova);
        }
    });

    input.addEventListener("change", () => {
        if (input.value < 1) input.value = 1;
        let nova = parseInt(input.value);
        units.textContent = "Unidades: " + nova;
        enviar(nova);
    });

    });
});