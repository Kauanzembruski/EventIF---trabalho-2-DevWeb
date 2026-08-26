const detalhesEvento = document.getElementById("detalhesEvento");

function renderizarErro() {
    detalhesEvento.innerHTML = `
        <div class="empty-state">
            <h1 class="h3">Evento nao encontrado</h1>
            <p>O evento informado nao existe ou o endereco acessado esta incorreto.</p>
            <a class="btn btn-primary" href="index.html">Voltar ao catalogo</a>
        </div>
    `;
}

function renderizarDetalhes(evento) {
    const preco = evento.preco === 0 ? "Gratuito" : formatarMoeda(evento.preco);

    detalhesEvento.innerHTML = `
        <article class="detail-card">
            <div class="row g-0">
                <div class="col-lg-6">
                    <img src="${evento.imagem}" alt="${evento.nome}">
                </div>
                <div class="col-lg-6">
                    <div class="detail-content">
                        <span class="category-badge mb-3">${evento.categoria}</span>
                        <h1>${evento.nome}</h1>
                        <p class="text-secondary mt-3">${evento.descricao}</p>
                        <div class="detail-list">
                            <div>
                                <span>Data</span>
                                <strong>${evento.data}</strong>
                            </div>
                            <div>
                                <span>Local</span>
                                <strong>${evento.local}</strong>
                            </div>
                            <div>
                                <span>Preco</span>
                                <strong>${preco}</strong>
                            </div>
                            <div>
                                <span>Avaliacao</span>
                                <strong>${evento.avaliacao.toFixed(1)}</strong>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-sm-flex">
                            <button class="btn btn-primary" type="button" onclick="selecionarIngressoDetalhes(${evento.id})">Selecionar ingresso</button>
                            <a class="btn btn-outline-primary" href="index.html">Voltar ao catalogo</a>
                        </div>
                        <div id="mensagemDetalhes" class="alert alert-success mt-3 d-none" role="alert"></div>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function selecionarIngressoDetalhes(idEvento) {
    const mensagem = document.getElementById("mensagemDetalhes");
    const adicionou = adicionarIngresso(idEvento);

    if (mensagem && adicionou) {
        mensagem.textContent = "Ingresso selecionado com sucesso.";
        mensagem.classList.remove("d-none");
    }
}

const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));
const evento = eventos.find(function(item) {
    return item.id === id;
});

if (!id || !evento) {
    renderizarErro();
} else {
    renderizarDetalhes(evento);
}
