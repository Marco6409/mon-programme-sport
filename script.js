console.log("Programme Premium Salle 100 chargé !");

// 1. Calcul total poids, Kcal et Temps cardio
function calculateSessionTotal() {
    let grandTotal = 0, totalKcal = 0, totalCardioTime = 0;

    document.querySelectorAll('.card').forEach(card => {
        const sets = parseFloat(card.querySelector('.sets')?.value) || 0;
        const reps = parseFloat(card.querySelector('.reps')?.value) || 0;
        const weight = parseFloat(card.querySelector('.weight')?.value) || 0;
        const totalExo = sets * reps * weight;
        if (card.querySelector('.total-weight')) card.querySelector('.total-weight').textContent = totalExo;
        grandTotal += totalExo;
    });

    document.querySelectorAll('.kcal-input').forEach(i => totalKcal += parseFloat(i.value) || 0);
    document.querySelectorAll('.cardio-time').forEach(i => totalCardioTime += parseFloat(i.value) || 0);

    const pageName = window.location.pathname.split("/").pop() || "index";
    localStorage.setItem('salle100_' + pageName + '_grandTotal', grandTotal);
    localStorage.setItem('salle100_' + pageName + '_kcal', totalKcal);
    localStorage.setItem('salle100_' + pageName + '_time', totalCardioTime);
}

// 2. Mise à jour Dashboard, Historique et totaux
function updateDashboard() {
    const pages = ['haut.html', 'bas.html', 'cardio.html'];
    let grandTotal = 0, totalKcal = 0, totalTime = 0;
    
    pages.forEach(p => {
        grandTotal += parseFloat(localStorage.getItem('salle100_' + p + '_grandTotal')) || 0;
        totalKcal += parseFloat(localStorage.getItem('salle100_' + p + '_kcal')) || 0;
        totalTime += parseFloat(localStorage.getItem('salle100_' + p + '_time')) || 0;
    });

    if (document.getElementById('total-haut')) document.getElementById('total-haut').textContent = localStorage.getItem('salle100_haut.html_grandTotal') || 0;
    if (document.getElementById('total-bas')) document.getElementById('total-bas').textContent = localStorage.getItem('salle100_bas.html_grandTotal') || 0;
    if (document.getElementById('total-kcal-global')) document.getElementById('total-kcal-global').textContent = totalKcal;
    if (document.getElementById('total-cardio-time')) document.getElementById('total-cardio-time').textContent = totalTime;
    if (document.getElementById('grand-total-global')) document.getElementById('grand-total-global').textContent = grandTotal;
    
    afficherHistorique();
}

// 3. Gestion Historique
function enregistrerSeance() {
    const date = new Date().toLocaleDateString();
    const totalGlobal = document.getElementById('grand-total-global').textContent;
    const totalKcal = document.getElementById('total-kcal-global').textContent;
    
    let historique = JSON.parse(localStorage.getItem('salle100_historique')) || [];
    historique.unshift({ date, totalGlobal, totalKcal });
    localStorage.setItem('salle100_historique', JSON.stringify(historique.slice(0, 5)));
    afficherHistorique();
}

function afficherHistorique() {
    const list = document.getElementById('historique-list');
    const historique = JSON.parse(localStorage.getItem('salle100_historique')) || [];
    if (list && historique.length > 0) {
        list.innerHTML = historique.map(s => `<p>${s.date} : <b>${s.totalGlobal} kg</b> | ${s.totalKcal} kcal</p>`).join('');
    }
}

// 4. Événements
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('salle100_val_' + input.className + input.parentElement.innerText, input.value);
        calculateSessionTotal();
        if (window.location.pathname.includes('dashboard')) updateDashboard();
    });
});

if (window.location.pathname.includes('dashboard')) updateDashboard();
else calculateSessionTotal();