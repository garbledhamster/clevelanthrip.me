document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    fetch('https://formspree.io/f/mdkovrog', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        openModal();
      } else {
        return response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            alert('Oops! There was a problem submitting your form: ' + data.errors.map(error => error.message).join(', '));
          } else {
            alert('Oops! There was a problem submitting your form.');
          }
        });
      }
    })
    .catch(error => {
      alert('Oops! There was a problem submitting your form. Please try again later.');
    });
  });
  
  function openModal() {
    document.getElementById('success-modal').style.display = 'flex';
  }
  
  function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
  }
  