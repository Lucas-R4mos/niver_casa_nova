const CONFIRM_URL = 'https://script.google.com/macros/s/AKfycbxL3zkppCrqqzxjOhnmig30s-Wn_38iVrDGB9_LAxada1zCU1WH8LNZRLWdzt2373Nd8w/exec';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('confirmForm');
    const mensagem = document.getElementById('mensagem');
    const submitButton = document.querySelector('button[type="submit"]');
    const navMessage = document.getElementById('nav-message');
    let feedback = ""

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitButton.disabled = true;
  
      const nome = document.getElementById('nome').value.trim();
      if (!nome) {
        feedback = 'Por favor, preencha o nome.'
        mensagem.textContent = feedback;
        mensagem.setAttribute('aria-label', feedback);
        mensagem.style.color = 'red';
        submitButton.disabled = false;
        mensagem.focus();
        setTimeout(() => {
          document.getElementById('nome').focus();
        }, 3000);
        return;
      }
  
      try {
        const resposta = await fetch(CONFIRM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome: nome, acao: "confirmar" }),
          mode: 'no-cors'
        });
        feedback = 'Presença confirmada com sucesso!'
        mensagem.textContent = feedback;
        mensagem.setAttribute('aria-label', feedback);
        mensagem.style.color = 'green';
        form.reset();
        setTimeout(() => {
          navMessage.focus();
        }, 3000)
      } catch (error) {
        feedback = 'Ocorreu um erro ao confirmar. Por favor, confirme diretamente com o Lucas.'
        mensagem.textContent = feedback;
        mensagem.setAttribute('aria-label', feedback);
        mensagem.style.color = 'red';
        mensagem.focus();
        setTimeout(() => {
          document.getElementById('nome').focus();
        }, 3000);
      } finally {
        submitButton.disabled = false;
      }
    });
  });