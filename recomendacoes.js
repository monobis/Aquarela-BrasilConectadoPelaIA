window.addEventListener("DOMContentLoaded", () => {
  const respostas = JSON.parse(localStorage.getItem("respostasQuiz"));
  const container = document.getElementById("resultado-container");

  if (!respostas) {
    container.innerHTML = "<p>Nenhuma resposta encontrada. Volte ao quiz!</p>";
    return;
  }

  const recomendacoes = {
    comidas: bancoAquarela.comidas.filter((c) =>
      respostas.gastronomia?.some((g) =>
        c.tipo.toLowerCase().includes(g.toLowerCase())
      )
    ),
    artesanatos: bancoAquarela.artesanatos.filter((a) =>
      respostas.artesanato?.some((g) =>
        a.tipo.toLowerCase().includes(g.toLowerCase())
      )
    ),
    filmesSeries: bancoAquarela.filmesSeries.filter((f) =>
      respostas.filmes?.some((g) =>
        f.genero.toLowerCase().includes(g.toLowerCase())
      )
    ),
    vestimentas: bancoAquarela.vestimentas.filter((v) =>
      respostas.vestuario?.some((g) =>
        v.estilo.toLowerCase().includes(g.toLowerCase())
      )
    ),
    musicas: bancoAquarela.musicas.filter((m) =>
      respostas.musicas?.some((g) =>
        m.genero.toLowerCase().includes(g.toLowerCase())
      )
    ),
  };

  function criarCards(titulo, items, tipo) {
    if (items.length === 0)
      return `<h2>${titulo}</h2><p>Nenhum item encontrado.</p>`;

    return `
      <h2>${titulo}</h2>
      <div class="cards">
        ${items
          .map(
            (item) => `
            <div class="card">
              <img src="${
                item.imagem || "https://via.placeholder.com/180x150"
              }" alt="${item.nome}">
              <div class="card-content">
                <strong>${item.nome}${
              item.lancamento ? " (" + item.lancamento + ")" : ""
            }</strong>

                ${
                  tipo === "filme"
                    ? `
                    <em>${item.genero}</em>
                    <span>Formato: ${item.formato}</span>
                    <span>Região: ${item.regiao}</span>
                  `
                    : ""
                }

                ${
                  tipo === "musica"
                    ? `
                    <em>${item.genero}</em>
                    <span>Artista: ${item.artista}</span>
                    <span>Região: ${item.regiao}</span>
                  `
                    : ""
                }

                ${
                  tipo === "comida"
                    ? `
                    <em>${item.tipo}</em>
                    <span>Região: ${item.regiao}</span>
                  `
                    : ""
                }

                ${
                  tipo === "vestimenta"
                    ? `
                    <em>${item.estilo}</em>
                    <span>Região: ${item.regiao}</span>
                  `
                    : ""
                }

                ${
                  tipo === "artesanato"
                    ? `
                    <em>${item.tipo}</em>
                    <span>Região: ${item.regiao}</span>
                  `
                    : ""
                }

                ${item.descricao ? `<p>${item.descricao}</p>` : ""}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  container.innerHTML = `
    ${criarCards("Gastronomia🥣", recomendacoes.comidas, "comida")}
    ${criarCards("Artesanato🪡", recomendacoes.artesanatos, "artesanato")}
    ${criarCards("Filmes & Séries🎬", recomendacoes.filmesSeries, "filme")}
    ${criarCards("Vestuário👖", recomendacoes.vestimentas, "vestimenta")}
    ${criarCards("Músicas🎵", recomendacoes.musicas, "musica")}
  `;
});
