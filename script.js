console.log("Programme Premium Salle 100 chargé. Bonne séance Marc !");

const inputs = document.querySelectorAll('.input-charge');

// On récupère le nom de la page actuelle (ex: "haut.html")
const pageName = window.location.pathname.split("/").pop() || "index";

inputs.forEach((input, index) => {
    // La clé devient unique par page ET par position
    const storageKey = 'salle100_' + pageName + '_' + index;

    // 1. Charger
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
        input.value = savedValue;
    }

    // 2. Sauvegarder
    input.addEventListener('input', () => {
        localStorage.setItem(storageKey, input.value);
    });
});