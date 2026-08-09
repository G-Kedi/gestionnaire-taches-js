"use strict";

const tasks_list = document.querySelector("#tasks_list");

// // Ajoute le contenu HTML dans l'élément tables
function afficherTaches(html) {
  tasks_list.innerHTML += html;
}

const taches = [
  {
    id: 1,
    titre: "Créer la structure HTML",
    priorite: "haute",
    terminee: true,
  },
  {
    id: 2,
    titre: "Créer le tableau de bord",
    priorite: "haute",
    terminee: true,
  },
  {
    id: 3,
    titre: "Ajouter les filtres",
    priorite: "moyenne",
    terminee: false,
  },
  {
    id: 4,
    titre: "Créer les cartes KPI",
    priorite: "moyenne",
    terminee: true,
  },
  {
    id: 5,
    titre: "Ajouter la barre de progression",
    priorite: "basse",
    terminee: false,
  },
  {
    id: 6,
    titre: "Gérer la suppression des tâches",
    priorite: "haute",
    terminee: false,
  },
  {
    id: 7,
    titre: "Gérer les tâches terminées",
    priorite: "moyenne",
    terminee: true,
  },
  {
    id: 8,
    titre: "Tester les statistiques",
    priorite: "basse",
    terminee: false,
  },
];

/*----- Ajouter une tâche -----*/
function ajouterTache(titre, priorite) {
  const nouvelleTache = {
    id: taches.length > 0 ? taches[taches.length - 1].id + 1 : 1,
    titre: titre,
    priorite: priorite,
    terminee: false,
  };

  taches.push(nouvelleTache);
}

/*----- Basculer l'état d'une tâche -----*/
function basculerEtatTache(id) {
  const tache = taches.find((tache) => tache.id === id);

  if (tache) {
    tache.terminee = !tache.terminee;
  }

  return tache;
}

/*-------- supprimer une tache --------*/
function supprimerTache(id) {
  const index = taches.findIndex((tache) => tache.id === id);

  if (index !== -1) {
    taches.splice(index, 1);
  }

  return taches;
}

/*---------- filtrer les taches en cours et complétées -------------*/

function filtrerTachesEnCours() {
  let tacheEnCours = taches.filter((tache) => !tache.terminee);
  return tacheEnCours;
}

function filtrerTachesTerminees() {
  let tachesTerminees = taches.filter((tache) => tache.terminee);
  return tachesTerminees;
}

/*----- Statistiques des tâches -----*/
function calculerStatistiques() {
  const total = taches.length;

  const terminees = taches.filter((tache) => tache.terminee).length;

  const tauxCompletion = total > 0 ? Math.round((terminees / total) * 100) : 0;

  return {
    total: total,
    terminees: terminees,
    tauxCompletion: tauxCompletion,
  };
}

/*----- Formatter les tâches -----*/
function formaterTaches(taches) {
  let html = "";

  const priorites = {
    haute: "priority-high",
    moyenne: "priority-medium",
    basse: "priority-low",
  };

  for (const tache of taches) {
    const classePriorite = priorites[tache.priorite];
    const checked = tache.terminee ? "checked" : "";

    html += `
            <article class="task-item">
                <div class="task-content">
                    <div class="task-check">
                        <input type="checkbox" id="task-${tache.id}" ${checked}>
                        <label for="task-${tache.id}"></label>
                    </div>

                    <div class="task-info">
                        <h3>${tache.titre}</h3>
                    </div>
                </div>

                <div class="task-actions">
                    <span class="task-priority ${classePriorite}">
                        ${tache.priorite}
                    </span>

                    <button class="task-delete" type="button" aria-label="Supprimer la tâche" data-id="${tache.id}">
                        Supprimer
                    </button>
                </div>
            </article>
        `;
  }

  return html;
}


let tachesEnCours = filtrerTachesEnCours();
let tachesTerminees = filtrerTachesTerminees();

afficherTaches(formaterTaches(taches));
