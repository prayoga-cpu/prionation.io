import type { WidgetText } from "./widgets";

export const fr: WidgetText = {
  buildVsBuy: {
    title: "Build vs buy : évaluez votre flux de travail",
    intro:
      "Répondez à six questions sur le flux de travail que vous arbitrez. L'outil les transforme en une direction — construire, acheter ou hybride — selon la même logique qu'un Diagnostic applique. Traitez le résultat comme le point de départ d'une conversation de cadrage, pas comme un verdict.",
    questions: [
      {
        label:
          "Coût annuel de ce flux de travail aujourd'hui (coût complet, personnes incluses)",
        options: ["Faible", "Modéré", "Élevé"],
      },
      {
        label: "Sa fréquence d'exécution",
        options: ["Faible volume", "Régulier", "Volume élevé"],
      },
      {
        label: "Sa spécificité à votre façon de concurrencer",
        options: [
          "Générique — toute entreprise l'a",
          "Mixte",
          "Très spécifique à nous",
        ],
      },
      {
        label: "Sensibilité des données",
        options: [
          "Peuvent quitter notre environnement",
          "Quelques contraintes",
          "Doivent rester en interne",
        ],
      },
      {
        label: "SaaS existant qui le couvre déjà",
        options: [
          "Un produit solide existe",
          "Couverture partielle",
          "Peu ou aucun",
        ],
      },
      {
        label: "Combien de temps vous vous appuierez sur ce flux de travail",
        options: ["Moins d'un an", "Un à trois ans", "Plusieurs années"],
      },
    ],
    resultLabel: "Direction recommandée",
    scoreNote:
      "Lorsque deux réponses tirent en sens opposés, la spécificité fait pencher la balance — à quel point le flux de travail est propre à votre façon de concurrencer.",
    verdicts: {
      build: {
        title: "Build",
        body: "Les signaux pointent vers un build sur mesure : le flux de travail est spécifique, coûteux ou à fort volume, ou contraint par des données qui ne peuvent quitter votre environnement, et vous vous y appuierez pendant des années. La prochaine étape est un Diagnostic de deux semaines pour cartographier le goulot d'étranglement et chiffrer un Build fixe.",
      },
      hybrid: {
        title: "Hybride",
        body: "Le cœur paraît générique mais le dernier kilomètre est le vôtre. Achetez la couche de commodité et ne construisez que la fine couche différenciante par-dessus — là où vivent réellement la plupart des gains IA du mid-market. Un Diagnostic peut confirmer exactement où passe cette ligne.",
      },
      buy: {
        title: "Buy",
        body: "Ce flux de travail est générique et bien servi par un SaaS mature — vous ne devriez pas construire une infrastructure de commodité. Votre prochaine étape est la sélection d'un fournisseur, pas une mission. Si cela change à mesure que vous grandissez, le cas du build est facile à réexaminer.",
      },
    },
    cta: "Cartographiez-le dans un Diagnostic",
  },
  podVsHire: {
    title: "Pod vs embauche : estimez le coût réel",
    intro:
      "Comparez un pod à prix fixe à une embauche IA interne sur votre horizon de temps. Les valeurs par défaut proviennent de chiffres publiés sur ce site ; chaque entrée est modifiable, et le résultat est une estimation destinée à cadrer la décision — pas un devis.",
    fields: {
      hireCost: "Coût complet d'une embauche IA senior (€/an)",
      podCost: "Prix fixe par Build (€)",
      years: "Horizon de temps (années)",
      buildsPerYear: "Builds que vous prévoyez par an",
    },
    hireTotalLabel: "Embauche interne",
    podTotalLabel: "Pods PRIONATION",
    podWins:
      "Sur cet horizon, les pods ressortent environ {amount} moins chers — et vous ne portez aucun risque de recrutement, de montée en compétence ou de qualité d'embauche.",
    hireWins:
      "Sur cet horizon, une équipe interne ressort environ {amount} moins chère — signe que votre feuille de route IA est peut-être assez permanente pour justifier une embauche.",
    evenLabel:
      "Sur cet horizon, les deux sont à peu près à égalité — le facteur décisif devient le risque, la vitesse et le degré de permanence de la feuille de route.",
    note: "Le parcours courant est séquentiel : livrez les premiers builds avec des pods pour prouver la valeur, puis embauchez face à une feuille de route éprouvée — en héritant d'un système en marche, pas d'une boîte noire. Une embauche implique aussi une montée en compétence de 3 à 6 mois et un coût de recrutement que cette estimation n'ajoute pas.",
    disclaimer:
      "Estimation seulement, fondée sur vos entrées et sur des prix publics. Pas un devis. Une embauche, c'est un ingénieur ; un pod, c'est une équipe senior avec des evals, de la télémétrie et une garantie de quatre semaines.",
    cta: "Obtenez un prix de Build fixe",
  },
  readiness: {
    title: "Êtes-vous prêt pour un build de 8 semaines ?",
    intro:
      "Évaluez-vous sur les cinq préconditions dont dépend un build à prix fixe de huit semaines. Une lacune n'est pas une disqualification — c'est une chose à combler avant que l'horloge ne démarre, ce que fait précisément un Diagnostic.",
    areas: [
      "Des données représentatives existent, sont accessibles et assez bonnes pour en construire des evals",
      "Un seul décideur responsable porte le résultat — pas un comité",
      "Vous pouvez énoncer ce que « fonctionne » signifie en termes mesurables",
      "Une équipe peut provisionner dans votre environnement sans une chaîne d'approbation de plusieurs mois",
      "Le budget et le calendrier de huit semaines sont véritablement engagés",
    ],
    scale: ["Non", "En partie", "Oui"],
    resultLabel: "Votre niveau de préparation",
    verdicts: {
      ready: {
        title: "Prêt pour un Build",
        body: "Vous êtes solide sur toutes les préconditions : un Build peut donc démarrer en confiance et le prix fixe est peu risqué. Le Diagnostic devient une courte confirmation plutôt qu'un travail de fond.",
      },
      partial: {
        title: "Presque prêt — comblez les lacunes",
        body: "L'essentiel des fondations est en place. Consolidez d'abord les domaines ci-dessous ; un Diagnostic peut faire ce travail et produire le plan de build dans la même étape.",
      },
      diagnostic: {
        title: "Commencez par un Diagnostic",
        body: "Trop de préconditions restent ouvertes pour qu'un Build démarré maintenant ne soit pas risqué. Un Diagnostic de deux semaines existe précisément pour lever ces inconnues et transformer un « pas encore » en « prêt ».",
      },
    },
    weakLabel: "Domaines à consolider d'abord",
    cta: "Démarrer un Diagnostic",
  },
};
