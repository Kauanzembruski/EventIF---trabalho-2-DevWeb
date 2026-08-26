const eventos = [
    {
        id: 1,
        nome: "Palestra Futuro da Inteligencia Artificial",
        categoria: "Palestra",
        preco: 0,
        data: "12/09/2026",
        local: "Auditorio Central",
        avaliacao: 4.9,
        imagem: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
        descricao: "Uma conversa sobre impactos da inteligencia artificial na educacao, no mercado de trabalho e na pesquisa cientifica."
    },
    {
        id: 2,
        nome: "Palestra Carreiras em Tecnologia",
        categoria: "Palestra",
        preco: 20,
        data: "14/09/2026",
        local: "Sala Maker 2",
        avaliacao: 4.7,
        imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
        descricao: "Profissionais convidados apresentam caminhos de carreira em desenvolvimento, dados, seguranca e gestao de produtos digitais."
    },
    {
        id: 3,
        nome: "Palestra Sustentabilidade no Campus",
        categoria: "Palestra",
        preco: 15,
        data: "16/09/2026",
        local: "Biblioteca IF",
        avaliacao: 4.5,
        imagem: "https://images.unsplash.com/photo-1497436072909-f5e4be1713f9?auto=format&fit=crop&w=900&q=80",
        descricao: "Debate sobre consumo consciente, energia limpa e acoes sustentaveis que podem ser aplicadas em instituicoes de ensino."
    },
    {
        id: 4,
        nome: "Palestra Empreendedorismo Jovem",
        categoria: "Palestra",
        preco: 35,
        data: "18/09/2026",
        local: "Anfiteatro Bloco B",
        avaliacao: 4.6,
        imagem: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
        descricao: "Encontro sobre transformacao de ideias em projetos reais, com exemplos de startups criadas por estudantes."
    },
    {
        id: 5,
        nome: "Oficina Criacao de Sites com Bootstrap",
        categoria: "Oficina",
        preco: 45,
        data: "20/09/2026",
        local: "Laboratorio de Informatica 1",
        avaliacao: 4.8,
        imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        descricao: "Atividade pratica para criar paginas responsivas com HTML, CSS e componentes do Bootstrap."
    },
    {
        id: 6,
        nome: "Oficina Introducao ao Arduino",
        categoria: "Oficina",
        preco: 60,
        data: "21/09/2026",
        local: "Laboratorio de Robotica",
        avaliacao: 4.9,
        imagem: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
        descricao: "Montagem de circuitos simples com sensores, leds e conceitos iniciais de programacao embarcada."
    },
    {
        id: 7,
        nome: "Oficina Fotografia com Celular",
        categoria: "Oficina",
        preco: 25,
        data: "22/09/2026",
        local: "Estudio Multimidia",
        avaliacao: 4.4,
        imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        descricao: "Tecnicas de enquadramento, luz e edicao para produzir fotografias melhores usando apenas o celular."
    },
    {
        id: 8,
        nome: "Oficina Prototipagem 3D",
        categoria: "Oficina",
        preco: 75,
        data: "24/09/2026",
        local: "Espaco de Inovacao",
        avaliacao: 4.6,
        imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
        descricao: "Introducao a modelagem, preparo de arquivos e impressao 3D para prototipos escolares e projetos pessoais."
    },
    {
        id: 9,
        nome: "Show Banda Campus Livre",
        categoria: "Show",
        preco: 30,
        data: "25/09/2026",
        local: "Patio Principal",
        avaliacao: 4.7,
        imagem: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
        descricao: "Apresentacao musical com repertorio autoral e releituras de sucessos nacionais escolhidos pelos estudantes."
    },
    {
        id: 10,
        nome: "Show Noite Cultural IF",
        categoria: "Show",
        preco: 0,
        data: "26/09/2026",
        local: "Quadra Coberta",
        avaliacao: 4.3,
        imagem: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
        descricao: "Evento aberto com musica, poesia, danca e apresentacoes artisticas preparadas pela comunidade escolar."
    },
    {
        id: 11,
        nome: "Show Jazz e Cafe",
        categoria: "Show",
        preco: 55,
        data: "28/09/2026",
        local: "Hall da Biblioteca",
        avaliacao: 4.8,
        imagem: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=900&q=80",
        descricao: "Apresentacao intimista de jazz instrumental acompanhada por feira de cafes especiais e produtos locais."
    },
    {
        id: 12,
        nome: "Show Eletronica no Intervalo",
        categoria: "Show",
        preco: 80,
        data: "30/09/2026",
        local: "Centro de Eventos",
        avaliacao: 4.5,
        imagem: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
        descricao: "Encerramento do festival com DJs convidados, iluminacao especial e ambiente organizado para estudantes e convidados."
    }
];

const CHAVE_INGRESSOS = "eventifIngressos";
const CHAVE_CUPOM = "eventifCupom";

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterIngressos() {
    try {
        const dados = localStorage.getItem(CHAVE_INGRESSOS);
        const ingressos = dados ? JSON.parse(dados) : [];
        return Array.isArray(ingressos) ? ingressos : [];
    } catch (erro) {
        return [];
    }
}

function salvarIngressos(ingressos) {
    localStorage.setItem(CHAVE_INGRESSOS, JSON.stringify(ingressos));
    atualizarContadorIngressos();
}

function obterCupom() {
    return localStorage.getItem(CHAVE_CUPOM) || "";
}

function salvarCupom(cupom) {
    if (cupom) {
        localStorage.setItem(CHAVE_CUPOM, cupom);
    } else {
        localStorage.removeItem(CHAVE_CUPOM);
    }
}

function adicionarIngresso(idEvento) {
    const eventoExiste = eventos.some(function(evento) {
        return evento.id === Number(idEvento);
    });

    if (!eventoExiste) {
        return false;
    }

    const ingressos = obterIngressos();
    const ingressoEncontrado = ingressos.find(function(item) {
        return item.id === Number(idEvento);
    });

    if (ingressoEncontrado) {
        ingressoEncontrado.quantidade += 1;
    } else {
        ingressos.push({
            id: Number(idEvento),
            quantidade: 1
        });
    }

    salvarIngressos(ingressos);
    return true;
}

function calcularQuantidadeTotal() {
    return obterIngressos().reduce(function(total, item) {
        const quantidade = Number(item.quantidade);
        return total + (quantidade > 0 ? quantidade : 0);
    }, 0);
}

function atualizarContadorIngressos() {
    const contador = document.getElementById("contadorIngressos");
    if (contador) {
        contador.textContent = calcularQuantidadeTotal();
    }
}

document.addEventListener("DOMContentLoaded", atualizarContadorIngressos);
