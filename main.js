document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nabForm');
  const participateRadios = document.getElementsByName('participate');
  const conditionalFields = document.getElementById('conditionalFields');
  const statusDiv = document.getElementById('status');

  // Toggle conditional fields
  participateRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'si') {
        conditionalFields.classList.remove('hidden');
        // Add required attribute to mobility fields when visible
        document.querySelectorAll('input[name="mobility"]').forEach(input => {
          input.setAttribute('required', '');
        });
      } else {
        conditionalFields.classList.add('hidden');
        // Remove required attribute when hidden
        document.querySelectorAll('input[name="mobility"]').forEach(input => {
          input.removeAttribute('required');
          input.checked = false;
        });
      }
    });
  });

  // Handle Form Submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusDiv.textContent = 'Enviando...';
    statusDiv.className = 'status-message';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (data.participate === 'si' && !data.mobility) {
      statusDiv.textContent = 'Por favor indica tu movilidad.';
      statusDiv.className = 'status-message error';
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusDiv.textContent = '¡Registro exitoso! Gracias por participar.';
        statusDiv.className = 'status-message success';
        form.reset();
        conditionalFields.classList.add('hidden');
      } else {
        const errorData = await response.json();
        if (Object.hasOwn(errorData, 'errors')) {
            statusDiv.textContent = errorData["errors"].map(error => error["message"]).join(", ");
        } else {
            statusDiv.textContent = 'Hubo un error al enviar el formulario. Inténtalo de nuevo.';
        }
        statusDiv.className = 'status-message error';
      }
    } catch (error) {
      statusDiv.textContent = 'Error de conexión. Verifica tu internet.';
      statusDiv.className = 'status-message error';
    }
  });
});
