const scriptURL = "https://script.google.com/macros/s/AKfycbxL3zkppCrqqzxjOhnmig30s-Wn_38iVrDGB9_LAxada1zCU1WH8LNZRLWdzt2373Nd8w/exec";
const form = document.getElementById("comidaForm");
const mensagem = document.getElementById("mensagem");
const tabelaCorpo = document.getElementById("tabelaCorpo");

async function carregarComidas() {
  try {
    const res = await fetch(scriptURL + '?acao=comidas', {
        method: 'GET'
    });
    const json = await res.json();

    if (json.result === "success") {
      tabelaCorpo.innerHTML = "";
      json.comidas.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.prato}</td>
          <td>${item.quem}</td>
        `;
        tabelaCorpo.appendChild(row);
      });
    } else {
      mensagem.textContent = "Erro ao carregar comidas.";
    }
  } catch (error) {
    console.error(error);
    mensagem.textContent = "Erro de conexão.";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prato = document.getElementById("prato").value.trim();
  const quem = document.getElementById("quem").value.trim();

  if (!prato || !quem) {
    mensagem.textContent = "Por favor, preencha os dois campos.";
    return;
  }

  try {
    await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prato, quem, acao: "comida" }),
      mode: "no-cors"
    });
    mensagem.textContent = "Contribuição registrada!";
    form.reset();
    carregarComidas();
  } catch (error) {
    mensagem.textContent = "Erro ao enviar contribuição.";
  }
});

carregarComidas();
