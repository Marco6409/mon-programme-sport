console.log("Programme Premium chargé. Bonne séance Marc !");
// On sélectionne toutes les zones de saisie des charges
const inputs = document.querySelectorAll('.input-charge');

// Au chargement de la page, on récupère les valeurs sauvegardées
inputs.forEach(input => {
    const id = input.parentElement.parentElement.cells[0].innerText; // Utilise le nom de l'exercice comme identifiant
    const savedValue = localStorage.getItem(id);
    if (savedValue) {
        input.value = savedValue;
    }

    // Dès qu'on change une valeur, on la sauvegarde
    input.addEventListener('change', () => {
        localStorage.setItem(id, input.value);
    });
});