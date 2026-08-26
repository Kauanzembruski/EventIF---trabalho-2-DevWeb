const listaEventos = document.getElementById("listaEventos");
const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroPreco = document.getElementById("filtroPreco");
const ordenacao = document.getElementById("ordenacao");
const mensagemCatalogo = document.getElementById("mensagemCatalogo");

function criarCardEvento(evento) {
    const preco = evento.preco === 0 ? "Gratuito" : formatarMoeda(evento.preco);

    return `
        <div class="col-md-6 col-xl-4 col-xxl-3">
            <article class="card event-card">
                <img src="${evento.imagem}" alt="${evento.nome}">
                <div class="card-body d-flex flex-column">
                    <span class="category-badge mb-3">${evento.categoria}</span>
                    <h2 class="h5 fw-bold">${evento.nome}</h2>
                    <p class="event-meta mb-2">${evento.data} | ${evento.local}</p>
                    <p class="event-meta mb-3">Avaliacao ${evento.avaliacao.toFixed(1)}</p>
                    <p class="event-price mt-auto">${preco}</p>
                    <div class="d-grid gap-2">
                        <a class="btn btn-outline-primary" href="detalhes.html?id=${evento.id}">Ver detalhes</a>
                        <button class="btn btn-primary" type="button" onclick="selecionarIngresso(${evento.id})">Adicionar ingresso</button>
                    </div>
                </div>
            </article>
        </div>
    `;
}

function eventoAtendePreco(evento, filtro) {
    if (filtro === "gratuitos") {
        return evento.preco === 0;
    }

    if (filtro === "ate30") {
        return evento.preco > 0 && evento.preco <= 30;
    }

    if (filtro === "30a60") {
        return evento.preco >= 30 && evento.preco <= 60;
    }

    if (filtro === "acima60") {
        return evento.preco > 60;
    }

    return true;
}

function ordenarEventos(lista) {
    const listaOrdenada = [...lista];
    const tipoOrdenacao = ordenacao.value;

    if (tipoOrdenacao === "nomeAZ") {
        listaOrdenada.sort(function(a, b) {
            return a.nome.localeCompare(b.nome);
        });
    } else if (tipoOrdenacao === "nomeZA") {
        listaOrdenada.sort(function(a, b) {
            return b.nome.localeCompare(a.nome);
        });
    } else if (tipoOrdenacao === "menorPreco") {
        listaOrdenada.sort(function(a, b) {
            return a.preco - b.preco;
        });
    } else if (tipoOrdenacao === "maiorPreco") {
        listaOrdenada.sort(function(a, b) {
            return b.preco - a.preco;
        });
    } else if (tipoOrdenacao === "melhorAvaliacao") {
        listaOrdenada.sort(function(a, b) {
            return b.avaliacao - a.avaliacao;
        });
    }

    return listaOrdenada;
}

function aplicarFiltros() {
    const busca = campoBusca.value.trim().toLowerCase();
    const categoria = filtroCategoria.value;
    const preco = filtroPreco.value;

    const eventosFiltrados = eventos.filter(function(evento) {
        const correspondeBusca = evento.nome.toLowerCase().includes(busca);
        const correspondeCategoria = categoria === "todos" || evento.categoria === categoria;
        const correspondePreco = eventoAtendePreco(evento, preco);

        return correspondeBusca && correspondeCategoria && correspondePreco;
    });

    const eventosOrdenados = ordenarEventos(eventosFiltrados);
    renderizarCatalogo(eventosOrdenados);
}

function renderizarCatalogo(lista) {
    if (lista.length === 0) {
        listaEventos.innerHTML = "";
        mensagemCatalogo.textContent = "Nenhum evento encontrado.";
        mensagemCatalogo.classList.remove("d-none");
        return;
    }

    mensagemCatalogo.classList.add("d-none");
    listaEventos.innerHTML = lista.map(criarCardEvento).join("");
}

function selecionarIngresso(idEvento) {
    const adicionou = adicionarIngresso(idEvento);

    if (adicionou) {
        mensagemCatalogo.textContent = "Ingresso adicionado aos seus ingressos.";
        mensagemCatalogo.className = "alert alert-success";
        setTimeout(function() {
            mensagemCatalogo.classList.add("d-none");
        }, 2200);
    }
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);
filtroPreco.addEventListener("change", aplicarFiltros);
ordenacao.addEventListener("change", aplicarFiltros);

aplicarFiltros();
