document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('a.nav-link, a.btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetEl = document.querySelector(hash);
                if (targetEl) {
                    const offsetTop = targetEl.offsetTop - 50;
                    window.scroll({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fetch data from cards.json and populate sections
    fetch('data/cards.json')
        .then(response => response.json())
        .then(data => {
            // Populate professional section
            const professionalContainer = document.getElementById('professional-cards');
            if (data.professional && professionalContainer) {
                data.professional.forEach(card => {
                    const cardEl = document.createElement('div');
                    cardEl.classList.add('mb-3');
                    cardEl.innerHTML = `
                        <h4>${card.title}</h4>
                        <p>${card.description}</p>
                    `;
                    professionalContainer.appendChild(cardEl);
                });
            }

            // Populate family section
            const familyList = document.getElementById('family-list');
            if (data.family && familyList) {
                data.family.forEach(member => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${member.name}</strong> (${member.role}): ${member.description}`;
                    familyList.appendChild(li);
                });
            }

            // Populate art section
            const artList = document.getElementById('art-list');
            if (data.art && artList) {
                data.art.forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('mb-3');
                    div.innerHTML = `<h4>${item.type}</h4><p>${item.description}</p>`;
                    artList.appendChild(div);
                });
            }
        })
        .catch(err => console.error('Error loading cards.json:', err));
});
