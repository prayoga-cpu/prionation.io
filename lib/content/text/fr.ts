import type { LocalePages } from "./types";

export const pagesFr: LocalePages = {
  common: {
    backToHome: "← Retour à l'accueil",
    faqTitle: "Questions fréquentes",
    ctaTitle: "Commencez par un Diagnostic",
    ctaBody:
      "Deux semaines. 5 000 €. Un goulot d'étranglement cartographié et un plan prêt pour la production — sans obligation de poursuivre vers un Build.",
    ctaButton: "Démarrer un Diagnostic",
    anchorLabel: "Ingénierie produit IA",
  },

  methodology: {
    "evals-before-features": {
      navLabel: "Les evals avant les fonctionnalités",
      seoTitle: "Les evals avant les fonctionnalités · PRIONATION",
      metaDescription:
        "Pourquoi PRIONATION écrit la suite d'evals avant le prompt — le principe d'ingénierie qui rend honnête l'IA de production à prix fixe.",
      badge: "Méthodologie · 01",
      tldr: "Les evals avant les fonctionnalités, c'est écrire la suite de tests qui définit « fonctionne » avant de construire l'IA qui doit la réussir. C'est le principe qui rend possibles un prix fixe et une garantie post-lancement : sans mesure convenue du « terminé », ni le client ni le constructeur ne peuvent dire si le système a réussi.",
      h1: "Les evals avant les fonctionnalités : la suite de tests avant le prompt",
      intro: [
        "Dans le logiciel classique, les tests vérifient que le code fait ce qu'il doit. En IA, l'équivalent — les evals — fait quelque chose de plus fondamental : il définit ce que « doit » signifie pour un système probabiliste. PRIONATION les écrit en premier, avant de choisir le moindre prompt ou modèle.",
        "Ce n'est pas une préférence de processus. C'est le mécanisme qui permet à une mission à périmètre et prix fixes d'être honnête, parce que la définition du succès est convenue et mesurable avant le début du build.",
      ],
      sections: [
        {
          h2: "Ce que signifie ce principe",
          body: [
            "Une eval est un test reproductible qui note la sortie d'un système d'IA selon une norme définie : un ensemble d'entrées représentatives, un comportement attendu et une méthode de notation. Une suite d'evals transforme la question vague « l'IA est-elle assez bonne ? » en un chiffre convenu à l'avance par tous.",
            "Les écrire d'abord inverse l'ordre habituel. Au lieu de construire une fonctionnalité puis de se demander si elle marche, PRIONATION précise ce que « marche » veut dire — le jeu de données de référence, les seuils de réussite, les cas d'échec — et ne construit qu'ensuite le système pour y répondre.",
          ],
        },
        {
          h2: "L'anti-modèle",
          body: [
            "Le mode d'échec courant est le développement piloté par la démo : un prototype impressionne sur quelques entrées triées sur le volet, tout le monde s'enthousiasme, et on déploie. En production, il rencontre des entrées que personne n'a testées, échoue en silence, et le débat devient subjectif — « le modèle se trompe » contre « le prompt est bon » — sans norme commune pour trancher.",
            "Sans evals, il n'y a pas non plus de garantie honnête. Si le « terminé » n'a jamais été défini, impossible de dire si une régression ultérieure est un bug à corriger gratuitement ou un nouveau travail à chiffrer. L'absence d'evals est ce qui rend la plupart des missions d'IA discrètement sans fin.",
          ],
        },
        {
          h2: "Comment PRIONATION l'applique",
          body: [
            "Chaque Build commence par construire un jeu de données de référence à partir d'entrées réelles et représentatives, et par définir la grille de notation de chacune — correspondance exacte lorsque c'est pertinent, notation par modèle lorsque le jugement est nécessaire, avec des seuils explicites. Celles-ci deviennent des contrôles de non-régression automatisés exécutés en CI à chaque changement.",
            "La suite d'evals est spécifiée pendant le Diagnostic de deux semaines, avant que le Build soit chiffré. C'est délibéré : la suite est le contrat. C'est ce sur quoi le prix fixe est calculé et ce sur quoi la garantie post-lancement de quatre semaines est mesurée.",
          ],
        },
        {
          h2: "Comment cela se relie aux trois autres principes",
          body: [
            "Les evals alimentent la télémétrie : la même logique de notation qui valide le build s'exécute sur le trafic de production, de sorte que la performance en direct est mesurée à la même aune que le build. Elles dépendent de l'infrastructure possédée, car le jeu de données de référence et le harnais d'evals sont des actifs du client livrés avec le code.",
            "Et elles rendent les pods réduits possibles. Une petite équipe peut avancer vite précisément parce que la suite d'evals détecte automatiquement les régressions, supprimant le contrôle qualité manuel qui ralentirait sinon un pod de deux à trois personnes.",
          ],
        },
        {
          h2: "Pourquoi c'est le socle structurel de la livraison à prix fixe",
          body: [
            "Un prix fixe n'est honnête que si le « terminé » est défini avant que le chiffre soit convenu. Les evals sont cette définition. Elles transforment un problème de recherche ouvert en un problème d'ingénierie borné : construire le système qui dépasse le seuil sur la suite convenue.",
            "C'est pourquoi PRIONATION considère la spécification des evals comme le véritable livrable du Diagnostic. Une fois qu'elle existe, le Build est dérisqué des deux côtés — le périmètre ne peut pas s'étendre en silence, et le résultat ne peut pas être contesté.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'est-ce qu'une eval en IA ?",
          a: "Un test reproductible qui note la sortie d'un système d'IA selon une norme définie — un ensemble d'entrées représentatives, un comportement attendu et une méthode de notation. Les evals transforment « l'IA est-elle assez bonne ? » en un chiffre convenu.",
        },
        {
          q: "Pourquoi écrire les evals avant le prompt ?",
          a: "Parce que l'eval définit ce que « fonctionne » signifie. L'écrire d'abord rend le succès mesurable et convenu avant le build, ce qui permet un prix fixe et une vraie garantie. Construire d'abord et tester ensuite laisse le « terminé » indéfini.",
        },
        {
          q: "En quoi cela rend-il un prix fixe possible ?",
          a: "Un prix fixe n'est honnête que si la ligne d'arrivée est définie à l'avance. La suite d'evals est cette ligne d'arrivée : le Build est chiffré et garanti sur sa réussite, donc le périmètre ne peut pas s'étendre en silence.",
        },
        {
          q: "Les evals ralentissent-elles le build ?",
          a: "Elles l'accélèrent. Les contrôles d'evals automatisés en CI détectent les régressions instantanément, supprimant les cycles de QA manuels. C'est ce qui permet à un pod de deux à trois personnes d'avancer vite sans rien casser.",
        },
        {
          q: "À qui appartient la suite d'evals ?",
          a: "Au client. Le jeu de données de référence et le harnais d'evals sont livrés avec le code dans le cadre de l'infrastructure possédée, de sorte que la même norme continue de tourner après la fin de la mission.",
        },
      ],
    },

    "telemetry-from-day-one": {
      navLabel: "La télémétrie dès le premier jour",
      seoTitle: "La télémétrie dès le premier jour · PRIONATION",
      metaDescription:
        "Comment PRIONATION instrumente l'IA de production dès le premier déploiement — la pratique d'observabilité qui met fin aux débats « le modèle se trompe ».",
      badge: "Méthodologie · 02",
      tldr: "La télémétrie dès le premier jour, c'est instrumenter un système d'IA pour enregistrer ce qu'il a fait, sur quelle entrée et avec quelle qualité — dès sa toute première requête en production. Cela transforme « le modèle semble bizarre » en preuves, et c'est ainsi que le retainer et chaque itération ultérieure restent ancrés dans le réel plutôt que dans l'opinion.",
      h1: "La télémétrie dès le premier jour : les données de production avant l'opinion",
      intro: [
        "La plupart des systèmes d'IA sont déployés à l'aveugle. Ils produisent des sorties, ces sorties atteignent les utilisateurs, et personne ne peut dire ensuite ce que le système a réellement fait ni pourquoi. PRIONATION instrumente dès la première requête, pour que le système s'explique lui-même.",
        "La télémétrie, c'est la différence entre itérer sur des données et itérer sur des anecdotes. C'est aussi ce qui fait de la suite d'evals une chose vivante plutôt qu'une porte franchie une seule fois.",
      ],
      sections: [
        {
          h2: "Ce que signifie ce principe",
          body: [
            "La télémétrie est l'enregistrement structuré d'un système d'IA en production : l'entrée reçue, la sortie produite, la version du modèle et du prompt, les scores liés aux evals, la latence, le coût et toute correction humaine. Elle est journalisée dès le premier déploiement, pas ajoutée après une panne.",
            "L'objectif est l'observabilité — pouvoir répondre, pour toute décision prise par le système en production, à ce qui s'est passé et si la norme a été respectée, sans rejouer ni deviner.",
          ],
        },
        {
          h2: "L'anti-modèle",
          body: [
            "Le mode d'échec est la plainte intraçable. Une partie prenante dit que l'IA « se dégrade », et sans télémétrie l'équipe ne peut ni le confirmer, ni le localiser, ni le mesurer. Le débogage devient de l'archéologie, et les changements se font sur des intuitions qui peuvent empirer les choses.",
            "Le second anti-modèle est la journalisation cosmétique : tout capturer sans rien d'utile — des vidages bruts de requêtes sans scores, sans versions, sans lien avec les critères d'evals — de sorte que les données existent mais ne peuvent répondre à la seule question qui compte : est-ce toujours assez bon ?",
          ],
        },
        {
          h2: "Comment PRIONATION l'applique",
          body: [
            "L'instrumentation fait partie du build, pas d'un après-coup. Chaque interaction de production est journalisée avec l'entrée, la sortie, la version du modèle et du prompt, et les mêmes scores que la suite d'evals, de sorte que la qualité en production est suivie à la même aune que le build. Les coûts et la latence sont suivis en parallèle, car en production ce sont aussi des attributs de qualité.",
            "Le pipeline de télémétrie écrit dans l'infrastructure du client. Des tableaux de bord font apparaître la dérive par rapport aux seuils d'evals, et les cas signalés réalimentent le jeu de données de référence, bouclant la boucle entre la réalité de la production et l'itération suivante.",
          ],
        },
        {
          h2: "Comment cela se relie aux trois autres principes",
          body: [
            "La télémétrie est la moitié « en exécution » des evals : la suite définit la norme, la télémétrie la mesure en continu sur le trafic réel. Elle réside sur l'infrastructure possédée, de sorte que l'enregistrement opérationnel — souvent l'actif le plus précieux qu'un build produit — appartient au client.",
            "Elle maintient aussi l'honnêteté des pods réduits dans la durée. Un retainer ne vaut la peine d'être payé que si son effet est visible ; la télémétrie rend l'impact de chaque itération mesurable, de sorte que le travail continu du pod est jugé sur l'évolution de chiffres réels.",
          ],
        },
        {
          h2: "Pourquoi c'est le socle structurel de la livraison à prix fixe",
          body: [
            "Une garantie post-lancement de quatre semaines n'a aucun sens sans télémétrie. Pour honorer « nous corrigeons si cela passe sous les seuils d'evals », il faut pouvoir voir, en production, si c'est le cas. La télémétrie est ce qui fait de la garantie un engagement mesurable plutôt qu'un slogan.",
            "Elle borne aussi le retainer. Parce que l'impact est observable, le travail continu est cadré sur des signaux réels plutôt que sur un « continuez à l'améliorer » sans fin, qui est exactement le type de variance que des prix fixes et prévisibles requièrent d'éliminer.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'est-ce que la télémétrie en IA ?",
          a: "L'enregistrement structuré d'un système d'IA en production : chaque entrée, sortie, version de modèle et de prompt, score lié aux evals, latence et coût, plus toute correction humaine. Elle rend le comportement du système observable et mesurable.",
        },
        {
          q: "Pourquoi instrumenter dès le premier jour plutôt qu'à la première panne ?",
          a: "Parce que les problèmes en IA sont souvent silencieux et dérivent lentement. Sans télémétrie dès la première requête, vous ne pouvez ni confirmer, ni localiser, ni mesurer une régression — le débogage devient de la devinette.",
        },
        {
          q: "En quoi la télémétrie diffère-t-elle de la journalisation classique ?",
          a: "La journalisation générale enregistre qu'un événement a eu lieu. La télémétrie d'IA enregistre avec quelle qualité, notée selon la même norme que la suite d'evals et liée à la version exacte du modèle et du prompt — pour répondre si le système est toujours assez bon.",
        },
        {
          q: "Où résident les données de télémétrie ?",
          a: "Dans l'infrastructure du client. Elles font partie de l'infrastructure possédée, de sorte que l'enregistrement opérationnel reste chez le client et continue de fonctionner après la mission.",
        },
        {
          q: "Comment la télémétrie soutient-elle la garantie et le retainer ?",
          a: "La garantie promet une correction si la qualité en production passe sous les seuils d'evals convenus ; la télémétrie est ce qui permet de le voir. Pour le retainer, elle rend l'impact de chaque itération mesurable, de sorte que le travail continu est jugé sur des chiffres réels.",
        },
      ],
    },

    "owned-infrastructure": {
      navLabel: "L'infrastructure possédée",
      seoTitle: "L'infrastructure possédée · PRIONATION",
      metaDescription:
        "Pourquoi les clients de PRIONATION détiennent le code, l'hébergement, les données et les modèles à la fin de chaque mission — le plaidoyer d'ingénierie contre l'enfermement propriétaire.",
      badge: "Méthodologie · 03",
      tldr: "L'infrastructure possédée signifie que le client détient le code, l'hébergement, les données et les comptes de modèles — dès le premier jour, et non comme une remise de fin de projet. C'est l'expression d'ingénierie d'une position commerciale simple : le contrôle plutôt que la dépendance. Quand la mission se termine, le client continue de tourner sans PRIONATION.",
      h1: "L'infrastructure possédée : le contrôle plutôt que la dépendance",
      intro: [
        "De nombreux prestataires d'IA construisent un système, l'hébergent eux-mêmes et le louent en retour. Le client obtient une sortie mais jamais l'actif, et partir signifie tout perdre. PRIONATION construit à l'inverse : dans l'environnement du client, avec le client qui détient chaque clé.",
        "C'est le principe que les clients ressentent le plus directement, car c'est celui qui détermine ce qu'il leur reste lorsque la relation se termine.",
      ],
      sections: [
        {
          h2: "Ce que signifie ce principe",
          body: [
            "L'infrastructure possédée signifie qu'à chaque instant — pas seulement à la fin — le système de production tourne sur des comptes et des dépôts contrôlés par le client : l'organisation GitHub, le projet cloud, les comptes des fournisseurs de modèles, la base de données et le magasin de télémétrie. PRIONATION opère dans cet environnement en tant que constructeur, pas en tant que propriétaire.",
            "Le livrable n'est donc pas l'accès à un système mais le système lui-même, sans aucun composant retenu en otage par le prestataire.",
          ],
        },
        {
          h2: "L'anti-modèle",
          body: [
            "Le schéma d'enfermement est connu : le nom du prestataire est sur le compte cloud, le code vit dans son dépôt privé, les clés d'API sont les siennes, et les données passent par son pipeline. Le levier du client s'érode mois après mois, et le coût de changement devient un fossé que le prestataire n'a jamais à défendre sur le mérite.",
            "La version plus subtile est la « plateforme » qui donne techniquement l'accès mais encode la vraie logique dans une couche propriétaire inexportable. Vous pouvez partir — mais sans rien qui fonctionne.",
          ],
        },
        {
          h2: "Comment PRIONATION l'applique",
          body: [
            "Le provisionnement se fait dans les comptes du client dès le premier jour du Build. Le code est commité dans le dépôt du client ; l'infrastructure est définie comme du code afin d'être reproductible et inspectable ; les secrets appartiennent au client dès le départ. Un runbook de remise documente chaque accès, service et procédure opérationnelle.",
            "Rien d'essentiel ne transite par des services détenus par PRIONATION. Le test est simple et appliqué délibérément : si PRIONATION disparaissait du jour au lendemain, le système continue de tourner et l'équipe du client peut l'exploiter.",
          ],
        },
        {
          h2: "Comment cela se relie aux trois autres principes",
          body: [
            "L'infrastructure possédée est l'endroit où les evals et la télémétrie se posent : le jeu de données de référence, le harnais d'evals et la télémétrie de production sont tous des actifs du client, de sorte que les normes et l'enregistrement opérationnel restent chez le client. C'est ce qui rend ces principes durables plutôt qu'empruntés.",
            "Elle façonne aussi la relation de pod réduit : parce que le client possède tout, le retainer est un vrai choix renouvelé sur la valeur, pas une dépendance dont on ne peut sortir.",
          ],
        },
        {
          h2: "Pourquoi c'est le socle structurel de la livraison à prix fixe",
          body: [
            "L'infrastructure possédée aligne les incitations d'une manière qui rend le prix fixe cohérent. Un prestataire qui profite de l'enfermement est récompensé pour la dépendance ; une fondation qui remet tout n'est récompensée que pour avoir livré quelque chose qui fonctionne. La seconde est la seule posture sous laquelle un prix fixe et une sortie propre sont mutuellement honnêtes.",
            "Elle garde aussi le périmètre concret. Construire dès le premier jour dans l'environnement réel du client fait remonter tôt les réalités d'intégration, quand elles peuvent être chiffrées, plutôt que tard, quand elles deviennent des litiges.",
          ],
        },
      ],
      faq: [
        {
          q: "Que comprend « le client possède l'infrastructure » ?",
          a: "Le dépôt de code, les comptes cloud et l'hébergement, les comptes des fournisseurs de modèles, la base de données et les données de télémétrie — tous sur des comptes contrôlés par le client dès le premier jour, plus un runbook de remise documentant chaque accès et procédure.",
        },
        {
          q: "Quand a lieu la remise ?",
          a: "Il n'y a pas d'événement de migration. PRIONATION construit dans l'environnement du client dès le premier jour, de sorte que la possession est l'état par défaut tout du long, pas un transfert à la fin.",
        },
        {
          q: "Qu'est-ce que l'enfermement propriétaire en IA, concrètement ?",
          a: "Quand le prestataire détient le compte cloud, le dépôt privé, les clés d'API, ou encode la logique centrale dans une couche propriétaire inexportable. Vous pouvez partir, mais rien ne part avec vous qui fonctionne encore.",
        },
        {
          q: "Pouvons-nous exploiter le système sans PRIONATION ?",
          a: "Oui — c'est le test de conception explicite. L'infrastructure comme code, un runbook documenté et des accès détenus par le client signifient que votre propre équipe peut l'exploiter, et un retainer optionnel est un choix plutôt qu'une nécessité.",
        },
        {
          q: "Quel est le lien entre la possession, les données et la conformité ?",
          a: "Parce que les données et l'hébergement résident dans vos comptes, vous contrôlez la résidence et les accès. L'infrastructure client peut rester sur un hébergement conforme lorsque c'est requis, sans transiter par un tiers.",
        },
      ],
    },

    "lean-pods-fixed-clocks": {
      navLabel: "Pods réduits, horloges fixes",
      seoTitle: "Pods réduits, horloges fixes · PRIONATION",
      metaDescription:
        "Comment un pod de 2–3 ingénieurs et une horloge de 8 semaines rendent possible la livraison d'IA à prix fixe — le lien entre la méthodologie de PRIONATION et son modèle commercial.",
      badge: "Méthodologie · 04",
      tldr: "Pods réduits, horloges fixes signifie une petite équipe senior — deux à trois ingénieurs — qui livre sur une cadence fixe de huit semaines plutôt que sur un calendrier ouvert. C'est l'expression commerciale des trois autres principes : ce n'est que parce que les evals, la télémétrie et l'infrastructure possédée éliminent la variance qu'une horloge fixe et un prix fixe peuvent être promis honnêtement.",
      h1: "Pods réduits, horloges fixes : comment le prix fixe devient possible",
      intro: [
        "La plupart des missions d'IA sont vendues à l'heure ou au mois parce que le travail paraît imprévisible. PRIONATION vend un périmètre fixe sur une horloge fixe — et la raison pour laquelle elle le peut n'est pas l'optimisme mais la méthode.",
        "Ce principe est l'endroit où l'ingénierie rencontre le modèle commercial. Il explique pourquoi le Diagnostic est obligatoire et pourquoi une petite équipe est un atout, pas une limite.",
      ],
      sections: [
        {
          h2: "Ce que signifie ce principe",
          body: [
            "Un pod est une petite équipe senior et transversale — typiquement deux à trois ingénieurs — qui possède un build de bout en bout. Une horloge fixe est l'unité de livraison de huit semaines à laquelle le pod s'engage. La combinaison est volontairement contrainte : assez petite pour avancer sans surcoût de coordination, assez bornée dans le temps pour forcer la priorisation.",
            "La contrainte est l'objectif. Une horloge fixe transforme « que pourrions-nous construire ? » en « quelle est la seule chose la plus précieuse que nous pouvons livrer et durcir en huit semaines ? »",
          ],
        },
        {
          h2: "L'anti-modèle",
          body: [
            "La mission ouverte est l'anti-modèle : une grande équipe, un périmètre vague et un calendrier qui glisse parce que rien ne force la décision sur ce qu'est le « terminé ». Le coût croît avec le temps, et l'incitation du prestataire favorise discrètement plus de temps, pas plus de valeur.",
            "L'échec inverse est le contractant solo héroïque sans méthode — rapide jusqu'à ce qu'il rencontre la variance que les evals et la télémétrie existent pour absorber, moment où le calendrier devient inconnaissable.",
          ],
        },
        {
          h2: "Comment PRIONATION l'applique",
          body: [
            "Les huit semaines ont une forme : environ deux semaines d'architecture et d'échafaudage d'evals, quatre semaines de build face à ces evals, et deux semaines de durcissement et de réglage piloté par la télémétrie. Le pod est assez petit pour que chacun garde tout le système en tête, ce qui maintient une horloge fixe réaliste.",
            "Surtout, le prix fixe n'est chiffré qu'après le Diagnostic de deux semaines, car c'est alors que le périmètre est cartographié et les critères d'evals fixés. PRIONATION ne chiffre pas un prix de Build fixe sur un problème non cartographié.",
          ],
        },
        {
          h2: "Comment cela se relie aux trois autres principes",
          body: [
            "Ce principe est en aval des trois autres. Les evals bornent le travail en définissant le terminé ; la télémétrie rend l'itération mesurable pour cibler le durcissement ; l'infrastructure possédée élimine les surprises d'intégration qui font exploser les calendriers. Retirez-en un seul et l'horloge fixe cesse d'être honnête.",
            "Autrement dit, les pods réduits sur horloges fixes ne sont pas une astuce de planning — c'est ce qui devient possible une fois la variance éliminée par les trois premiers principes.",
          ],
        },
        {
          h2: "Pourquoi c'est le socle structurel de la livraison à prix fixe",
          body: [
            "Prix fixe et horloge fixe sont la même promesse vue commercialement et opérationnellement. La promesse n'est sûre à faire que lorsque la méthodologie absorbe la variance — ce que le Diagnostic vérifie précisément avant qu'un chiffre soit donné.",
            "C'est pourquoi aucun prix fixe honnête n'existe sans la méthode derrière. Les agences qui chiffrent un prix fixe sur de l'IA sans evals, télémétrie et infrastructure possédée absorbent un risque caché, ou basculent discrètement en régie quand cela mord.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'est-ce qu'un pod PRIONATION ?",
          a: "Une petite équipe senior — typiquement deux à trois ingénieurs — qui possède un build de bout en bout sur une horloge fixe de huit semaines. Petite par conception, pour que l'équipe avance sans surcoût de coordination et garde tout le système en tête.",
        },
        {
          q: "Pourquoi huit semaines ?",
          a: "Une horloge fixe force la priorisation : elle transforme une question ouverte en « quelle est la seule chose la plus précieuse que nous pouvons livrer et durcir en huit semaines ? » La cadence est d'environ deux semaines d'architecture, quatre de build, deux de durcissement.",
        },
        {
          q: "Pourquoi le Diagnostic est-il requis avant un prix fixe ?",
          a: "Parce qu'un prix fixe n'est honnête qu'une fois le périmètre cartographié et les critères d'evals fixés. Le Diagnostic de deux semaines le fait ; PRIONATION ne chiffre pas un prix de Build fixe sur un problème non cartographié.",
        },
        {
          q: "Une petite équipe n'est-elle pas une limite ?",
          a: "C'est un atout. Un petit pod senior évite le surcoût de coordination qui ralentit les grandes équipes, et il est viable précisément parce que les evals et la télémétrie automatisent les contrôles qui exigeraient sinon une couche de QA.",
        },
        {
          q: "Comment un prix fixe peut-il fonctionner pour l'IA quand d'autres facturent à l'heure ?",
          a: "Cela ne fonctionne que parce que les trois autres principes éliminent la variance. Les evals définissent le terminé, la télémétrie rend l'itération mesurable et l'infrastructure possédée prévient les surprises d'intégration. Sans cette méthode, un prix fixe cache le risque au lieu de l'éliminer.",
        },
      ],
    },
  },

  frameworks: {
    "ai-build-vs-buy-calculator": {
      navLabel: "Calculateur build vs buy",
      seoTitle: "Calculateur IA build vs buy · PRIONATION",
      metaDescription:
        "Un cadre de décision pour les opérateurs mid-market : six variables qui indiquent s'il faut construire une IA sur mesure, acheter du SaaS ou opter pour l'hybride.",
      badge: "Cadre · Build vs buy",
      tldr: "La décision build-vs-buy en IA tient à six variables : le coût du flux de travail, son volume, sa spécificité à votre entreprise, la sensibilité des données, l'outillage existant et l'horizon de temps. Ce cadre les transforme en une recommandation claire — construire, acheter ou hybride — plutôt qu'une intuition.",
      h1: "IA build vs buy : un cadre de décision pour les opérateurs mid-market",
      intro: [
        "Tout opérateur face à une décision IA pose la même question : construit-on du sur-mesure, achète-t-on un produit SaaS, ou combine-t-on les deux ? La mauvaise réponse coûte cher dans les deux sens — un build sur mesure pour un problème générique gaspille du capital ; un SaaS pour un différenciateur clé plafonne votre potentiel.",
        "Ce cadre réduit la décision à six variables et à une logique simple pour les pondérer. C'est le raisonnement que PRIONATION applique dans un Diagnostic, rendu explicite.",
      ],
      sections: [
        {
          h2: "Comment l'utiliser",
          body: [
            "Évaluez honnêtement votre flux de travail selon les six variables ci-dessous. Le but n'est pas un chiffre précis mais une direction : la plupart des décisions deviennent évidentes une fois les variables nommées. Lorsque deux variables tirent en sens opposés, l'arbitre est presque toujours la spécificité — à quel point le flux est propre à votre façon de concurrencer.",
            "Traitez le résultat comme le début d'une conversation de cadrage, pas un verdict. Un signal « construire » nécessite encore un Diagnostic pour confirmer que le goulot est réel et le périmètre borné.",
          ],
        },
        {
          h2: "Les six variables",
          body: [
            "1) Coût annuel du flux — le coût complet de sa réalisation aujourd'hui, personnes incluses. 2) Volume mensuel — sa fréquence. 3) Spécificité — à quel point il est particulier à votre entreprise plutôt qu'une tâche générique. 4) Sensibilité des données — si les données peuvent quitter votre environnement. 5) Outillage existant — si un SaaS couvre déjà l'essentiel. 6) Horizon de temps — combien de temps vous en dépendrez.",
            "Coût élevé, volume élevé, forte spécificité et données sensibles poussent vers le build. Faible spécificité et une bonne option SaaS poussent vers l'achat. Un horizon long augmente le rendement d'un build ; un horizon court favorise l'achat.",
          ],
        },
        {
          h2: "La logique de décision",
          body: [
            "Achetez quand le flux est générique, bien servi par un SaaS mature, et n'est pas une source d'avantage concurrentiel — on ne construit pas une infrastructure de commodité. Construisez quand le flux est propre à votre façon de concurrencer, coûteux, à fort volume, ou contraint par des données qui ne peuvent quitter votre environnement, et que vous comptez vous y appuyer des années.",
            "Choisissez l'hybride quand le cœur est générique mais le dernier kilomètre est le vôtre : achetez la couche de commodité, construisez par-dessus la fine couche différenciante. La plupart des gains IA mid-market sont des hybrides — la valeur est dans les 20 % propres à votre opération.",
          ],
        },
        {
          h2: "Que faire du résultat",
          body: [
            "Un résultat « acheter » signifie que votre prochaine étape est la sélection d'un fournisseur, pas une mission avec PRIONATION. Nous vous le dirons. Un résultat « construire » ou « hybride » signifie que la prochaine étape est un Diagnostic de deux semaines pour cartographier le goulot, confirmer le périmètre et chiffrer un Build fixe.",
            "Dans tous les cas, le cadre a fait son travail s'il vous a empêché de construire ce que vous auriez dû acheter, ou d'acheter ce que vous auriez dû construire.",
          ],
        },
      ],
      faq: [
        {
          q: "Quand construire une IA sur mesure plutôt qu'acheter du SaaS ?",
          a: "Construisez quand le flux est propre à votre façon de concurrencer, coûteux ou à fort volume, ou contraint par des données qui ne peuvent quitter votre environnement — et que vous vous y appuierez des années. Achetez quand il est générique et bien servi par un SaaS mature.",
        },
        {
          q: "Qu'est-ce qu'une approche IA hybride ?",
          a: "Acheter la couche de commodité et ne construire que la fine couche différenciante par-dessus. La plupart des gains IA mid-market sont hybrides, car la valeur réside dans la petite part du flux propre à votre opération.",
        },
        {
          q: "Comment la sensibilité des données influe-t-elle ?",
          a: "Si les données ne peuvent quitter votre environnement pour des raisons de conformité ou de concurrence, cela pousse fortement vers le build, car l'infrastructure possédée garde les données dans vos comptes plutôt que via un SaaS tiers.",
        },
        {
          q: "Un résultat « construire » signifie-t-il qu'il faut embaucher ?",
          a: "Pas nécessairement. Un build peut être livré par un pod réduit à prix fixe puis remis à votre équipe — voir le modèle de coût pod vs embauche. La décision de build est distincte de la décision d'embauche.",
        },
        {
          q: "Quelle est l'étape suivante après ce cadre ?",
          a: "Si le résultat est construire ou hybride, un Diagnostic de deux semaines cartographie le goulot et chiffre un Build fixe. Si c'est acheter, votre prochaine étape est la sélection d'un fournisseur — et nous le dirons clairement.",
        },
      ],
    },

    "pod-vs-hire-cost-model": {
      navLabel: "Modèle de coût pod vs embauche",
      seoTitle: "Pod vs embauche — modèle de coût · PRIONATION",
      metaDescription:
        "Le coût complet d'un pod IA réduit face à l'embauche d'un ingénieur IA interne — salaire, charges, recrutement, montée en compétence et risque, comparés honnêtement.",
      badge: "Cadre · Pod vs embauche",
      tldr: "Comparer un pod PRIONATION à une embauche IA interne sur le seul taux journalier est trompeur. La comparaison honnête inclut salaire, charges, recrutement, montée en compétence et risque de mauvaise embauche. Sur un seul build de huit semaines, un pod à prix fixe est presque toujours moins cher et plus rapide ; sur des années, une équipe interne finit par l'emporter. Ce modèle montre où se situe la limite.",
      h1: "Pod vs embauche : le vrai coût de construire de l'IA",
      intro: [
        "L'instinct est de comparer le prix d'un pod au salaire d'un ingénieur et de conclure que l'embauche est moins chère. Cette comparaison ignore l'essentiel du coût réel d'une embauche et tout le risque.",
        "Ce modèle expose le coût complet de chaque voie pour que la comparaison soit honnête — et montre que la réponse dépend entièrement de votre horizon de temps.",
      ],
      sections: [
        {
          h2: "Comment l'utiliser",
          body: [
            "Choisissez le scénario qui vous correspond : un seul build défini, un flux continu de travail IA, ou l'incertitude entre les deux. Lisez ensuite le coût complet de chaque voie, pas le chiffre d'affichage. La décision porte rarement sur le prix par jour ; elle porte sur le risque, la vitesse et la quantité réelle de travail IA que vous avez.",
            "Le modèle suppose un contexte mid-market — salaires européens ou américains, un seul flux à forte valeur — et vise à cadrer la décision, pas à remplacer un devis.",
          ],
        },
        {
          h2: "Le coût complet d'une embauche",
          body: [
            "Un ingénieur IA senior n'est pas son salaire. Le coût complet ajoute charges patronales et avantages, frais de recrutement ou mois de temps du fondateur, équipement et outillage, et les trois à six mois de montée en compétence avant productivité. Puis le risque : une mauvaise embauche dans un domaine rare et difficile à évaluer peut coûter une année sans rien livrer.",
            "Sur une base annuelle, une seule embauche IA senior dans l'UE ou aux États-Unis atteint largement six chiffres en coût complet — avant d'avoir rien livré, et en supposant que l'embauche réussisse.",
          ],
        },
        {
          h2: "Le coût complet d'un pod",
          body: [
            "Un pod PRIONATION est un prix fixe pour un build défini de huit semaines, avec une petite équipe senior, des evals, de la télémétrie et une garantie de quatre semaines incluses. Pas de recrutement, pas de montée en compétence, pas de risque de qualité d'embauche — la méthodologie et le prix fixe absorbent la variance.",
            "Le compromis est qu'un pod est facturé par mission. Pour un flux continu et ouvert de travail IA, le coût récurrent des pods finit par dépasser celui d'une équipe interne déjà montée en compétence.",
          ],
        },
        {
          h2: "Où se situe la limite",
          body: [
            "Pour un ou deux builds définis, le pod l'emporte nettement : plus rapide, moins cher une fois le risque et la montée en compétence comptés, et vous gardez le code. Pour une feuille de route IA permanente et à fort volume, construire une équipe interne finit par l'emporter — une fois embauchée, montée en compétence et fidélisée.",
            "La voie courante est séquentielle : utiliser des pods pour livrer les premiers builds et prouver la valeur, puis embaucher en interne face à une feuille de route prouvée — la remise d'infrastructure possédée signifiant que votre nouvelle équipe hérite d'un système qui tourne, pas d'une boîte noire.",
          ],
        },
      ],
      faq: [
        {
          q: "Un pod est-il moins cher qu'embaucher un ingénieur IA ?",
          a: "Pour un build défini, presque toujours — une fois comptés recrutement, charges, les trois à six mois de montée en compétence et le risque de qualité d'embauche, pas seulement le salaire. Pour une feuille de route permanente à fort volume, une équipe interne finit par coûter moins.",
        },
        {
          q: "Qu'est-ce que le « coût complet » d'une embauche IA ?",
          a: "Salaire plus charges et avantages, coût de recrutement ou temps du fondateur, équipement, et les mois de montée en compétence avant productivité — plus le risque qu'une mauvaise embauche dans un domaine rare coûte une année sans rien livrer.",
        },
        {
          q: "Quand l'embauche interne a-t-elle plus de sens ?",
          a: "Quand vous avez un flux permanent et à fort volume de travail IA. Une fois une équipe interne embauchée, montée en compétence et fidélisée, son coût marginal par projet passe sous celui de missions répétées.",
        },
        {
          q: "Peut-on utiliser des pods puis embaucher ?",
          a: "Oui, et c'est la voie courante : livrer les premiers builds avec des pods pour prouver la valeur, puis embaucher face à une feuille de route prouvée. Parce que le pod remet une infrastructure possédée, votre nouvelle équipe hérite d'un système qui tourne.",
        },
        {
          q: "Le prix du pod inclut-il la maintenance ?",
          a: "Chaque Build inclut une garantie post-lancement de quatre semaines. La maintenance continue est un retainer optionnel, cadré sur la télémétrie réelle, pas un engagement ouvert.",
        },
      ],
    },

    "8-week-build-readiness-checklist": {
      navLabel: "Liste de préparation au build",
      seoTitle: "Liste de préparation au build de 8 semaines · PRIONATION",
      metaDescription:
        "Une auto-évaluation sur les données, les parties prenantes, les critères de succès, l'accès à l'infrastructure et l'engagement — êtes-vous prêt pour un build IA de 8 semaines ?",
      badge: "Cadre · Préparation",
      tldr: "La plupart des builds IA qui échouent n'étaient pas prêts à démarrer. Cette liste évalue la préparation sur cinq domaines — données, alignement des parties prenantes, critères de succès, accès à l'infrastructure et engagement commercial. Faible sur plus d'un : un Diagnostic d'abord ; fort sur les cinq : vous êtes prêt à construire.",
      h1: "Êtes-vous prêt pour un build IA de 8 semaines ? Une liste de préparation",
      intro: [
        "Un build à prix fixe de huit semaines ne fonctionne que si le terrain est préparé. La raison la plus courante d'un dérapage n'est pas l'ingénierie — c'est qu'une des cinq conditions préalables manquait et que personne ne l'a vérifiée.",
        "Utilisez cette liste avant de vous engager dans un Build. C'est l'évaluation de préparation qu'un Diagnostic réalise, transformée en quelque chose que vous pouvez exécuter vous-même.",
      ],
      sections: [
        {
          h2: "Comment l'utiliser",
          body: [
            "Évaluez-vous honnêtement sur les cinq domaines ci-dessous. Un « non » n'est pas une disqualification — c'est une chose à corriger avant que l'horloge démarre. L'intérêt de la liste est de faire remonter les lacunes maintenant, quand elles sont peu coûteuses à combler, plutôt qu'en semaine trois d'un build, quand elles coûtent cher.",
            "Fort sur les cinq : vous êtes prêt à construire. Faible sur un : corrigez-le d'abord. Faible sur deux ou plus : commencez par un Diagnostic, qui existe précisément pour résoudre ces inconnues.",
          ],
        },
        {
          h2: "Les cinq domaines",
          body: [
            "1) Préparation des données — des données représentatives existent-elles, sont-elles accessibles et assez bonnes pour bâtir des evals ? 2) Alignement des parties prenantes — y a-t-il un décideur unique qui possède le résultat, pas un comité ? 3) Critères de succès — pouvez-vous dire ce que « fonctionne » signifie en termes mesurables ? 4) Accès à l'infrastructure — une équipe peut-elle provisionner dans votre environnement sans une chaîne d'approbation de plusieurs mois ? 5) Engagement commercial — le budget et le calendrier de huit semaines sont-ils réellement engagés ?",
            "Ces domaines correspondent directement aux quatre principes : données et critères de succès alimentent les evals ; l'accès à l'infrastructure permet l'infrastructure possédée ; l'engagement rend l'horloge fixe réelle.",
          ],
        },
        {
          h2: "Lire votre score",
          body: [
            "Si vous êtes fort sur les cinq, un Build peut démarrer en confiance et le prix fixe est peu risqué. Si les données ou les critères de succès sont faibles, c'est exactement ce qu'un Diagnostic produit — il cartographie le goulot et écrit la spécification d'evals, transformant un « pas encore » en « prêt ».",
            "Si la lacune est l'alignement ou l'engagement, corrigez cela avant de dépenser le moindre euro en ingénierie. Aucune méthodologie ne survit à un build que l'organisation n'a pas réellement engagé.",
          ],
        },
        {
          h2: "Que faire du résultat",
          body: [
            "Un score fort signifie que votre prochaine étape est un Diagnostic pour verrouiller le périmètre et chiffrer le Build — court, car vous êtes déjà prêt. Un score mitigé signifie que le Diagnostic fait double emploi : il comble les lacunes de préparation et produit le plan de build.",
            "Dans tous les cas, la liste a fait son travail si elle a déplacé un problème de la semaine trois d'un build à la semaine qui le précède.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'est-ce qui rend une entreprise prête pour un build IA ?",
          a: "La force sur cinq domaines : des données représentatives et accessibles, un décideur unique responsable, des critères de succès mesurables, un accès rapide à l'infrastructure dans votre environnement, et un engagement réel de budget et de calendrier.",
        },
        {
          q: "Et si nos données ne sont pas prêtes ?",
          a: "Alors un Diagnostic d'abord. Construire la suite d'evals nécessite des données représentatives ; si elles manquent ou sont en désordre, le Diagnostic le fait remonter et définit ce qui est nécessaire avant qu'un Build à prix fixe ait du sens.",
        },
        {
          q: "Faut-il des métriques de succès avant de démarrer ?",
          a: "Oui — ou un Diagnostic pour les définir. « Fonctionne » doit être mesurable avant un build, car la suite d'evals et le prix fixe s'écrivent dessus. Un succès indéfini est la cause la plus courante de projets IA sans fin.",
        },
        {
          q: "Pourquoi l'alignement des parties prenantes compte-t-il autant ?",
          a: "Parce qu'un build avec un comité et sans propriétaire unique cale sur les décisions. Un décideur unique responsable garde une horloge de huit semaines réaliste ; un build que l'organisation n'a pas vraiment engagé dérapera quelle que soit la méthode.",
        },
        {
          q: "Quelle est l'étape suivante après la liste ?",
          a: "Un Diagnostic de deux semaines — court si votre score est fort, ou faisant double emploi pour combler les lacunes et produire le plan de build si votre score est mitigé.",
        },
      ],
    },
  },

  guides: {
    "ai-consulting-cost-mid-market-companies": {
      navLabel: "Coût du conseil en IA",
      seoTitle: "Coût du conseil en IA pour le mid-market · PRIONATION",
      metaDescription:
        "Ce que coûtent réellement les missions IA pour les entreprises de 5–50 M€ — Diagnostic, Build et Retainer, les trois modèles comparés, et où se cachent les coûts.",
      badge: "Guide · Tarifs",
      tldr: "Pour une entreprise mid-market, les missions IA coûtent typiquement 5 000–7 000 € pour un Diagnostic de deux semaines, 25 000–55 000 € pour un Build de huit semaines, et 4 000–9 000 €/mois pour un Retainer. Le chiffre qui compte plus que le prix affiché est le modèle de tarification, car il détermine qui porte le risque quand le travail s'avère plus difficile que prévu.",
      h1: "Coût du conseil en IA pour les entreprises mid-market",
      intro: [
        "La réponse honnête à « combien coûte le conseil en IA ? » pour une entreprise de 5–50 M€ est une fourchette — et un avertissement : la fourchette est la partie la moins importante. La façon dont le travail est facturé compte plus que le chiffre, car elle décide qui absorbe la variance inévitable.",
        "Ce guide donne les vrais chiffres, compare les trois modèles de tarification et nomme les coûts que les prestataires ont tendance à taire au départ.",
      ],
      sections: [
        {
          h2: "Les vrais chiffres",
          body: [
            "La structure de PRIONATION est fixe et publique : un Diagnostic à 5 000–7 000 € sur deux semaines cartographie le goulot et fixe le périmètre ; un Build à 25 000–55 000 € sur huit semaines livre le système de production ; un Retainer à 4 000–9 000 €/mois maintient un pod disponible ensuite, avec un minimum de six mois. Un site Express de trois pages démarre à 1 500 €.",
            "Plus de 60 % des Diagnostics débouchent sur un Build — un chiffre qui ne tient que parce que le Diagnostic est cadré pour qualifier le travail, pas pour vendre l'étape suivante à tout prix.",
          ],
        },
        {
          h2: "Les trois modèles de tarification",
          body: [
            "Le travail IA se vend de trois façons. L'horaire ou la régie reporte tout le risque d'imprévisibilité sur vous — le compteur tourne, que le travail converge ou non. Le périmètre fixe chiffre un résultat défini, donc le prestataire porte la variance. Le Retainer achète une capacité continue à un tarif mensuel prévisible.",
            "Le point structurel : la régie récompense le prestataire quand le travail dure plus longtemps. Le périmètre fixe ne fonctionne que si le prestataire a une méthode qui élimine la variance — c'est pourquoi prix fixe et méthodologie sont inséparables.",
          ],
        },
        {
          h2: "Où se cachent les coûts cachés",
          body: [
            "Les coûts que les prestataires minimisent sont la montée en compétence, l'intégration et l'enfermement. La montée en compétence, ce sont les semaines facturées pendant qu'une équipe apprend votre domaine. L'intégration, c'est le travail ingrat de connexion à vos vrais systèmes, souvent cadré vaguement et facturé à mesure qu'il s'étend. L'enfermement, c'est le coût différé d'un système que vous ne pouvez ni exploiter ni quitter sans le prestataire.",
            "Une mission à périmètre fixe avec infrastructure possédée élimine les trois : montée en compétence et intégration sont dans le prix fixe, et il n'y a rien dont s'enfermer puisque vous détenez tout.",
          ],
        },
        {
          h2: "Comment budgéter",
          body: [
            "Budgétez d'abord le Diagnostic — il est petit, et c'est lui qui rend le prix du Build fiable. Traitez tout prestataire qui chiffre un prix de Build fixe sans étape de cadrage comme devinant, ou prévoyant de facturer la différence plus tard.",
            "Pour le coût total de possession, comptez ce que vous gardez : avec une infrastructure possédée, le Build est un actif que votre équipe peut exploiter, pas un abonnement au système d'autrui.",
          ],
        },
      ],
      faq: [
        {
          q: "Combien coûte le conseil en IA pour une entreprise mid-market ?",
          a: "Typiquement 5 000–7 000 € pour un Diagnostic de deux semaines, 25 000–55 000 € pour un Build de huit semaines, et 4 000–9 000 €/mois pour un Retainer. Tout à périmètre fixe, prix fixe, facturé en euros.",
        },
        {
          q: "Pourquoi le modèle de tarification importe-t-il plus que le prix ?",
          a: "Parce qu'il décide qui porte le risque quand le travail est plus dur que prévu. La régie met ce risque sur vous et récompense le prestataire qui prend plus de temps ; le périmètre fixe le met sur le prestataire, mais ne fonctionne qu'avec une vraie méthode.",
        },
        {
          q: "Quels sont les coûts cachés des missions IA ?",
          a: "La montée en compétence (semaines facturées pendant l'apprentissage), l'intégration (travail de connexion cadré vaguement qui s'étend) et l'enfermement (un système que vous ne pouvez exploiter ni quitter). Le périmètre fixe avec infrastructure possédée élimine les trois.",
        },
        {
          q: "Pourquoi commencer par un Diagnostic ?",
          a: "Parce qu'il rend le prix du Build fiable. Un prix de Build fixe chiffré sans étape de cadrage est une supposition. Le Diagnostic cartographie le goulot et fixe les critères d'evals sur lesquels le prix repose.",
        },
        {
          q: "Que peut-on annuler, et quelle est la garantie ?",
          a: "Le Diagnostic n'oblige pas à poursuivre vers un Build. Chaque Build inclut une garantie post-lancement de quatre semaines sur les seuils d'evals convenus ; le Retainer a un minimum de six mois et est sinon continu.",
        },
      ],
    },

    "scoping-ai-build-engagement": {
      navLabel: "Cadrer un build IA",
      seoTitle: "Comment cadrer un build IA · PRIONATION",
      metaDescription:
        "Les six composants que tout document de périmètre IA doit contenir avant de parler à un prestataire — avec bons et mauvais exemples — et les erreurs de cadrage qui tuent les projets.",
      badge: "Guide · Cadrage",
      tldr: "Un bon périmètre IA a six composants : la cible de flux de travail, la métrique de succès, un inventaire des données, les points d'intégration, les contraintes et un repère de calendrier. La plupart des projets IA échoués étaient sous-cadrés sur l'un d'eux avant la signature. Ce guide montre à quoi ressemblent le bon et le mauvais pour chacun.",
      h1: "Comment cadrer un build IA",
      intro: [
        "Le meilleur prédicteur de la réussite d'un build IA est la qualité du périmètre écrit avant son démarrage. Un périmètre vague n'est pas un problème de paperasse — c'est le mécanisme par lequel les budgets doublent et les calendriers dérapent.",
        "Ce guide décompose le périmètre en six composants, avec un bon et un mauvais exemple pour chacun, afin de tester un périmètre avant de vous engager.",
      ],
      sections: [
        {
          h2: "Pourquoi le périmètre décide du résultat",
          body: [
            "Le travail IA comporte plus d'incertitude inhérente que le logiciel ordinaire, donc un périmètre flou se compose plus vite. Quand « construire un assistant IA » est le périmètre, chaque partie comble les vides avec une hypothèse différente, et l'écart devient un litige dès l'arrivée de la facture.",
            "Un bon périmètre n'élimine pas l'incertitude ; il la localise. Il dit exactement ce qui est construit, comment le succès est mesuré, et ce qui est explicitement hors champ — pour que les inconnues restantes soient petites et nommées.",
          ],
        },
        {
          h2: "Les six composants",
          body: [
            "1) Cible de flux — l'opération précise modifiée, pas une capacité. 2) Métrique de succès — une définition mesurable du terminé. 3) Inventaire des données — quelles données existent, où et dans quel état. 4) Points d'intégration — les systèmes exacts à connecter. 5) Contraintes — résidence des données, latence, budget, non-négociables. 6) Repère de calendrier — une date fixe qui rythme le travail.",
            "Chacun correspond à du concret : la métrique de succès devient la suite d'evals ; l'inventaire des données détermine la faisabilité ; les points d'intégration sont là où se cache l'essentiel du coût caché.",
          ],
        },
        {
          h2: "Bon périmètre vs mauvais périmètre",
          body: [
            "Mauvais : « Utiliser l'IA pour améliorer le support client. » Bon : « Rédiger les premières réponses pour les tickets de facturation, notées sur un jeu de référence de 200 tickets, intégrées à notre service d'assistance, sans que les données client ne quittent notre cloud, en production en huit semaines. » Le second est constructible et chiffrable ; le premier est une invitation à facturer à l'heure.",
            "Le test de toute ligne de périmètre : deux prestataires la chiffreraient-ils pareil ? Sinon, la ligne est trop vague pour s'y engager.",
          ],
        },
        {
          h2: "Les erreurs qui tuent les projets",
          body: [
            "Les erreurs de cadrage fatales sont : définir une capacité au lieu d'un flux ; laisser le succès indéfini ; découvrir après signature que les données sont inutilisables ; et traiter l'intégration comme un détail. Chacune transforme une mission fixe en mission ouverte.",
            "Un Diagnostic existe pour produire exactement ce périmètre — mais vous pouvez en faire une grande part vous-même d'abord, et arriver à la conversation avec les inconnues déjà réduites.",
          ],
        },
      ],
      faq: [
        {
          q: "Que doit contenir un document de périmètre IA ?",
          a: "Six composants : la cible de flux, une métrique de succès mesurable, un inventaire des données, les points d'intégration, les contraintes (résidence, latence, budget) et un repère de calendrier. Chacun élimine une classe de litige ultérieur.",
        },
        {
          q: "À quoi ressemble un bon périmètre IA ?",
          a: "Précis et testable : le flux exact, une définition mesurable du terminé, les systèmes à intégrer, les contraintes de données et une date fixe. Le test : deux prestataires le chiffreraient-ils à l'identique ?",
        },
        {
          q: "Quelle est l'erreur de cadrage la plus courante ?",
          a: "Définir une capacité (« utiliser l'IA pour le support ») au lieu d'un flux (« rédiger les premières réponses des tickets de facturation, notées sur un jeu de référence »). Les capacités ne se chiffrent ni ne se terminent ; les flux, oui.",
        },
        {
          q: "Quel est le lien entre le périmètre et la suite d'evals ?",
          a: "La métrique de succès du périmètre devient la suite d'evals. Un périmètre sans critère de succès mesurable ne peut produire d'evals, d'où des projets ouverts et contestés.",
        },
        {
          q: "Le Diagnostic peut-il faire le cadrage pour nous ?",
          a: "Oui — produire ce périmètre est exactement ce que livre le Diagnostic de deux semaines. Faire le travail préparatoire vous-même d'abord rend le Diagnostic plus rapide et le Build qui en résulte moins cher.",
        },
      ],
    },

    "fixed-price-vs-hourly-ai-consulting": {
      navLabel: "Prix fixe vs horaire",
      seoTitle: "Prix fixe vs horaire en conseil IA · PRIONATION",
      metaDescription:
        "Les quatre modèles de tarification IA, l'incitation que chacun crée pour le prestataire, et pourquoi le prix fixe en IA ne fonctionne que quand la méthodologie élimine la variance.",
      badge: "Guide · Modèles de prix",
      tldr: "Il y a quatre façons de payer le travail IA — horaire, périmètre fixe, par jalons et retainer — et chacune crée une incitation différente pour le prestataire. L'horaire récompense la lenteur ; le périmètre fixe récompense l'efficacité mais ne fonctionne qu'avec une vraie méthode. Choisir le modèle, c'est en réalité choisir quel intérêt est aligné avec le fait de terminer.",
      h1: "Prix fixe vs horaire en conseil IA : quel modèle vous protège",
      intro: [
        "La plupart des acheteurs comparent les prestataires IA sur le taux et les compétences. La comparaison la plus importante est le modèle de tarification, car le modèle décide si le prestataire profite de terminer ou de continuer.",
        "Ce guide expose les quatre modèles, l'incitation que chacun intègre, et pourquoi un prix fixe n'est digne de confiance que lorsqu'il y a une méthodologie derrière.",
      ],
      sections: [
        {
          h2: "Les quatre modèles",
          body: [
            "L'horaire / régie facture le temps passé, quel que soit le résultat. Le périmètre fixe chiffre un livrable défini pour un prix fixe. Le modèle par jalons lie le paiement à des livrables échelonnés. Le retainer achète une capacité continue contre un forfait mensuel.",
            "Chacun est légitime dans le bon contexte. L'erreur est de choisir un modèle sans voir l'incitation qu'il crée — car cette incitation façonne chaque décision du prestataire une fois le travail lancé.",
          ],
        },
        {
          h2: "L'incitation que chacun crée",
          body: [
            "L'horaire récompense le prestataire quand le travail dure plus longtemps — non par malhonnêteté, mais parce que le compteur et l'intérêt vont dans le même sens. Le périmètre fixe récompense l'efficacité : le prestataire garde le gain de terminer vite, donc son intérêt s'aligne avec le vôtre. Les jalons alignent le paiement sur l'avancement mais peuvent fragmenter un système en morceaux démontrables. Le retainer récompense une relation stable mais peut dériver sans mesure de valeur.",
            "La question à poser à tout prestataire est simple : sous votre modèle, gagnez-vous plus en terminant ou en continuant ?",
          ],
        },
        {
          h2: "Pourquoi le prix fixe en IA est différent",
          body: [
            "Le prix fixe est le modèle le plus aligné avec l'acheteur — mais c'est aussi celui que la plupart des prestataires ne peuvent honnêtement offrir en IA, car le travail IA comporte une variance qu'un prix fixe doit absorber. Offert sans méthode, un prix fixe est soit lourdement gonflé, soit discrètement abandonné dès que le travail devient difficile.",
            "C'est pourquoi PRIONATION couple le prix fixe aux evals, à la télémétrie et à l'infrastructure possédée. La méthodologie élimine la variance qui rendrait sinon un prix fixe imprudent — et le Diagnostic obligatoire est là où cette variance est mesurée avant qu'un chiffre soit donné.",
          ],
        },
        {
          h2: "Comment choisir",
          body: [
            "Préférez le périmètre fixe pour un build défini, et exigez de voir la méthode qui le rend sûr — une étape de cadrage, une définition du terminé basée sur les evals, et une garantie. Utilisez un retainer pour un travail réellement continu, cadré sur la télémétrie. Méfiez-vous de l'horaire pour tout ce qui peut être défini, et d'un prix fixe offert sans aucune étape de cadrage.",
            "Le bon modèle est celui sous lequel le prestataire ne gagne que lorsque vous gagnez.",
          ],
        },
      ],
      faq: [
        {
          q: "Prix fixe ou horaire, lequel est meilleur pour l'IA ?",
          a: "Le périmètre fixe est plus aligné avec l'acheteur car le prestataire garde le gain de terminer vite. Mais il n'est digne de confiance qu'avec une vraie méthode derrière ; sans elle, un prix fixe est gonflé ou discrètement abandonné quand le travail devient difficile.",
        },
        {
          q: "Pourquoi la plupart des prestataires facturent-ils à l'heure en IA ?",
          a: "Parce que le travail IA comporte de la variance, et l'horaire reporte ce risque sur le client. C'est le choix sûr pour un prestataire sans méthodologie pour éliminer la variance — mais il récompense le prestataire qui prend plus de temps.",
        },
        {
          q: "Comment un prix fixe peut-il être honnête pour un travail IA imprévisible ?",
          a: "Seulement si une méthodologie élimine d'abord l'imprévisibilité. Les evals définissent le terminé, la télémétrie rend l'itération mesurable, l'infrastructure possédée prévient les surprises d'intégration, et un Diagnostic mesure la variance avant que le prix soit fixé.",
        },
        {
          q: "À quoi sert la tarification par jalons ?",
          a: "À lier le paiement à une livraison échelonnée sur des programmes plus grands. Le risque est de fragmenter un système en morceaux démontrables qui ne forment pas un résultat de production cohérent ; les jalons doivent donc être définis sur des résultats réels.",
        },
        {
          q: "Que dois-je demander à un prestataire sur les prix ?",
          a: "Une question : sous votre modèle, gagnez-vous plus en terminant ou en continuant ? Puis demandez à voir la méthode — étape de cadrage, définition du terminé basée sur les evals, et garantie — qui rend un prix fixe sûr.",
        },
      ],
    },
  },

  showcases: {
    "epidom-logistics-france": {
      navLabel: "Epidom",
      seoTitle: "Epidom — opérations d'inventaire, France · PRIONATION",
      metaDescription:
        "Comment PRIONATION a remplacé le suivi d'inventaire manuel multi-sites par un système de production centralisé pour Epidom, un opérateur F&B européen — et la leçon transférable.",
      badge: "Réalisation · 🇫🇷 France · F&B",
      tldr: "Epidom, un opérateur F&B européen, gérait son inventaire multi-sites par des processus manuels qui ne passaient pas à l'échelle. PRIONATION a construit un système de production centralisé pour suivre l'inventaire entre les sites et réduire la charge opérationnelle de le faire à la main. Voici le profil de la mission et la leçon transférable pour les opérateurs multi-sites.",
      h1: "Epidom : centraliser les opérations d'inventaire multi-sites",
      intro: [
        "Epidom est un opérateur européen de l'agroalimentaire qui gère son inventaire sur plusieurs sites. Comme la plupart des opérateurs multi-sites, sa contrainte n'était pas la stratégie — c'était le processus manuel et fragmenté pour garder le stock visible et exact partout à la fois.",
        "Cette page profile la mission : le goulot d'étranglement opérationnel, l'approche de build de PRIONATION, ce qui a changé, et la leçon qui se transfère à toute opération multi-sites. Les résultats chiffrés seront publiés à mesure qu'ils sont finalisés.",
      ],
      sections: [
        {
          h2: "Le goulot d'étranglement",
          body: [
            "L'inventaire multi-sites fait à la main échoue de façon prévisible : chaque site garde sa propre vue, les chiffres dérivent, et les réconcilier consomme un temps qui croît avec chaque nouveau site. Le coût n'est pas un grand échec mais une taxe opérationnelle constante — surcharge, ruptures de stock, et décisions prises sur des données périmées.",
            "Pour Epidom, le goulot était exactement cela : un processus de suivi manuel et multi-sites qui ne pouvait suivre le rythme de l'opération.",
          ],
        },
        {
          h2: "Comment PRIONATION a abordé le build",
          body: [
            "Le travail a suivi la méthode standard : cartographier l'opération avant de construire, définir en termes mesurables ce qu'est une vue d'inventaire correcte et à jour, et construire le plus petit système de production qui la délivre — un suivi centralisé qui remplace le processus manuel au lieu de s'y superposer.",
            "Comme pour chaque mission, le système a été construit pour être possédé et exploité par le client, afin que la capacité reste en interne après livraison.",
          ],
        },
        {
          h2: "Ce qui a changé",
          body: [
            "Le processus manuel, site par site, a été remplacé par un système centralisé unique, supprimant la charge de réconciliation et donnant à l'opération une vue exacte de l'inventaire entre les sites. Selon le résumé public du projet, cela a réduit la charge opérationnelle.",
            "Les métriques détaillées avant/après sont en préparation pour publication et apparaîtront ici et sur la page de transparence.",
          ],
        },
        {
          h2: "La leçon transférable",
          body: [
            "La leçon se généralise à tout opérateur multi-sites : le premier build au ROI le plus élevé est rarement le plus spectaculaire — c'est celui qui supprime la taxe de réconciliation manuelle qui croît avec chaque site. Centralisez d'abord la source de vérité ; tout le reste se compose à partir de là.",
            "Si votre opération gère des chiffres critiques dans des tableurs que chaque site maintient séparément, c'est généralement le goulot à cartographier en premier.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'a construit PRIONATION pour Epidom ?",
          a: "Un système de gestion d'inventaire centralisé pour un opérateur F&B européen, conçu pour le suivi multi-sites, remplaçant les processus manuels par un système de production unique qui a réduit la charge opérationnelle.",
        },
        {
          q: "Quel secteur et quel marché est Epidom ?",
          a: "Agroalimentaire, opérant en France et en Europe. La mission portait sur les opérations d'inventaire multi-sites.",
        },
        {
          q: "Où sont les résultats et métriques détaillés ?",
          a: "Les résultats chiffrés avant/après sont en préparation et seront publiés ici et sur la page de transparence. Ce profil décrit la mission et la leçon transférable.",
        },
        {
          q: "Quelle est la leçon transférable pour d'autres opérateurs ?",
          a: "Pour les opérations multi-sites, le premier build au ROI le plus élevé est généralement celui qui supprime la taxe de réconciliation manuelle qui croît avec chaque site — centralisez la source de vérité avant tout.",
        },
        {
          q: "Comment démarrerait un build similaire ?",
          a: "Par un Diagnostic de deux semaines qui cartographie le goulot opérationnel et définit la cible mesurable avant de construire le moindre système.",
        },
      ],
    },

    "expeditoo-marketplace-france": {
      navLabel: "Expeditoo",
      seoTitle: "Expeditoo — marketplace logistique, France · PRIONATION",
      metaDescription:
        "Comment PRIONATION a conçu une marketplace logistique et d'enchères pour Expeditoo — combinant enchères et suivi d'expédition dans un seul système de production — et la leçon transférable.",
      badge: "Réalisation · 🇫🇷 France · Marketplace",
      tldr: "Expeditoo avait besoin d'une seule application combinant des enchères de type vente aux enchères avec le suivi d'expédition — deux systèmes complexes que la plupart des équipes construisent séparément. PRIONATION les a conçus en une seule marketplace de production. Cette page profile la mission et la leçon pour les opérateurs de plateformes à deux faces.",
      h1: "Expeditoo : une marketplace logistique avec enchères et suivi dans un seul système",
      intro: [
        "Expeditoo est une marketplace logistique française qui combine la mécanique d'enchères avec le suivi d'expédition. Le difficile dans une telle plateforme n'est aucune des deux fonctionnalités seule — c'est de faire fonctionner enchères et suivi opérationnel comme un seul système cohérent plutôt que deux assemblés.",
        "Cette page profile la mission : le goulot, l'approche de build, et la leçon transférable pour quiconque construit une plateforme logistique à deux faces. Les résultats chiffrés sont publiés une fois finalisés.",
      ],
      sections: [
        {
          h2: "Le goulot d'étranglement",
          body: [
            "Une marketplace logistique porte une complexité à deux faces : une couche d'enchères où le prix se découvre, et une couche opérationnelle où les expéditions sont suivies jusqu'à leur terme. Construites séparément, les deux divergent — la marketplace promet ce que l'opérationnel ne peut livrer de façon fiable, et les données ne concordent jamais.",
            "Pour Expeditoo, le défi était de les unifier en une seule application avec une logique métier cohérente des deux côtés.",
          ],
        },
        {
          h2: "Comment PRIONATION a abordé le build",
          body: [
            "L'approche a été de traiter enchères et suivi comme un seul domaine avec une seule source de vérité, pas deux intégrations. Cela signifie définir d'abord le modèle de données partagé, puis construire les flux d'enchères et de suivi par-dessus pour qu'ils restent cohérents par construction.",
            "Le résultat a été livré comme un système de production que le client possède — full-stack, gérant la logique métier complexe qu'exige une plateforme logistique à deux faces.",
          ],
        },
        {
          h2: "Ce qui a changé",
          body: [
            "Au lieu de deux systèmes à réconcilier, Expeditoo exploite une seule application où une enchère et l'expédition qu'elle produit partagent le même enregistrement. Le résumé public du projet le décrit comme démontrant une capacité full-stack à travers une logique métier complexe.",
            "Les métriques opérationnelles sont en préparation pour publication et apparaîtront ici et sur la page de transparence.",
          ],
        },
        {
          h2: "La leçon transférable",
          body: [
            "Pour les plateformes à deux faces, la leçon est structurelle : modélisez le domaine partagé avant de construire l'un ou l'autre côté. L'essentiel de la douleur des marketplaces vient d'un système d'enchères et d'un système d'opérations construits séparément et n'ayant jamais convenu des données. Une seule source de vérité supprime toute une catégorie de problèmes ultérieurs.",
            "Si les deux faces de votre plateforme se disputent sur ce qui s'est passé, le correctif est généralement en amont dans le modèle de données, pas dans l'une ou l'autre fonctionnalité.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'a construit PRIONATION pour Expeditoo ?",
          a: "Une marketplace logistique et d'enchères combinant la mécanique d'enchères et le suivi d'expédition en une seule application de production avec une logique métier cohérente des deux côtés.",
        },
        {
          q: "Qu'est-ce qui rend une marketplace logistique difficile à construire ?",
          a: "La complexité à deux faces : une couche d'enchères et une couche de suivi opérationnel qui, construites séparément, divergent. Le difficile est d'en faire un seul système cohérent avec une source de vérité partagée.",
        },
        {
          q: "Où sont les métriques détaillées ?",
          a: "Les résultats opérationnels sont en préparation et seront publiés ici et sur la page de transparence. Ce profil décrit la mission et la leçon transférable.",
        },
        {
          q: "Quelle est la leçon transférable ?",
          a: "Pour toute plateforme à deux faces, modélisez le domaine partagé avant de construire l'un ou l'autre côté — l'essentiel de la douleur des marketplaces vient de deux systèmes qui n'ont jamais convenu des données.",
        },
        {
          q: "Comment démarrerait un build similaire ?",
          a: "Par un Diagnostic de deux semaines pour cartographier le domaine et définir le modèle de données partagé avant de construire la moindre fonctionnalité.",
        },
      ],
    },

    "lead-agent-real-estate-australia": {
      navLabel: "The Lead Agent",
      seoTitle: "The Lead Agent — génération de leads immobiliers, Australie · PRIONATION",
      metaDescription:
        "Comment PRIONATION a construit une plateforme de génération de leads et de prise de rendez-vous pour The Lead Agent, automatisant la gestion du pipeline pour les agents immobiliers australiens — et la leçon transférable.",
      badge: "Réalisation · 🇦🇺 Australie · Immobilier",
      tldr: "The Lead Agent, une opération immobilière australienne, gérait la génération de leads et la prise de rendez-vous par un travail de pipeline manuel qui plafonnait le nombre d'agents qu'elle pouvait soutenir. PRIONATION a construit une plateforme de production qui automatise le pipeline. Cette page profile la mission et la leçon pour les opérateurs orientés vente.",
      h1: "The Lead Agent : automatiser le pipeline de leads immobiliers",
      intro: [
        "The Lead Agent est une opération immobilière australienne dont la croissance était limitée par le travail manuel de génération, de qualification et de prise de rendez-vous des leads. Dans les entreprises orientées vente, ce travail de pipeline est à la fois essentiel et la première chose qui cesse de passer à l'échelle.",
        "Cette page profile la mission : le goulot, le build, et la leçon transférable pour tout opérateur dont la croissance est bridée par une gestion manuelle du pipeline. Les résultats chiffrés sont publiés une fois finalisés.",
      ],
      sections: [
        {
          h2: "Le goulot d'étranglement",
          body: [
            "La génération de leads et la prise de rendez-vous faites à la main ont un plafond dur : chaque agent supplémentaire multiplie la coordination manuelle, et la qualité chute précisément quand le volume monte. La contrainte n'est pas l'effort — c'est que le pipeline ne passe pas à l'échelle sans système pour le faire tourner.",
            "Pour The Lead Agent, le goulot était ce pipeline manuel, qui plafonnait le nombre d'agents ambitieux que l'opération pouvait soutenir à la fois.",
          ],
        },
        {
          h2: "Comment PRIONATION a abordé le build",
          body: [
            "Le build a ciblé le pipeline comme l'opération, pas la génération de leads comme une fonctionnalité : une plateforme web orientée client qui automatise la gestion du pipeline de bout en bout, pour que la coordination autrefois manuelle devienne systématique. La cible a été définie avant le build — à quoi ressemble un pipeline correctement géré — et le système construit pour la délivrer.",
            "Elle a été livrée comme une plateforme de production que le client possède et exploite sur le marché australien.",
          ],
        },
        {
          h2: "Ce qui a changé",
          body: [
            "La coordination manuelle du pipeline a été remplacée par une plateforme qui l'automatise, augmentant le nombre d'agents que l'opération peut soutenir sans hausse proportionnelle du travail manuel. Le résumé public du projet décrit une plateforme complète de génération de leads et de prise de rendez-vous qui automatise la gestion du pipeline.",
            "Les métriques de conversion et de débit sont en préparation pour publication et apparaîtront ici et sur la page de transparence.",
          ],
        },
        {
          h2: "La leçon transférable",
          body: [
            "La leçon pour les opérateurs orientés vente : le goulot est généralement le pipeline, pas les leads. Générer plus de leads dans un pipeline manuel ne fait que déplacer le goulot en aval. Automatiser la coordination — qualification et prise de rendez-vous — est ce qui augmente réellement la capacité.",
            "Et il y a une limite honnête : un système relève le plafond sur le volume et la cohérence du pipeline, mais il ne remplace pas le jugement d'un bon agent. Le gain est de supprimer la coordination manuelle, pas la relation humaine.",
          ],
        },
      ],
      faq: [
        {
          q: "Qu'a construit PRIONATION pour The Lead Agent ?",
          a: "Une plateforme complète de génération de leads et de prise de rendez-vous — un système web orienté client qui automatise la gestion du pipeline pour les agents immobiliers opérant à travers l'Australie.",
        },
        {
          q: "Quel était le goulot opérationnel ?",
          a: "Une génération de leads et une prise de rendez-vous manuelles qui ne passaient pas à l'échelle : chaque agent supplémentaire multipliait la coordination manuelle, plafonnant le nombre que l'opération pouvait soutenir.",
        },
        {
          q: "Où sont les métriques de conversion détaillées ?",
          a: "Les résultats de conversion et de débit sont en préparation et seront publiés ici et sur la page de transparence. Ce profil décrit la mission et la leçon transférable.",
        },
        {
          q: "Quelle est la leçon transférable pour les équipes de vente ?",
          a: "Le goulot est généralement le pipeline, pas les leads. Automatiser la qualification et la prise de rendez-vous augmente la capacité ; générer plus de leads dans un pipeline manuel ne fait que déplacer le goulot en aval.",
        },
        {
          q: "Qu'est-ce que l'automatisation ne peut pas corriger ici ?",
          a: "Elle relève le plafond sur le volume et la cohérence du pipeline mais ne remplace pas le jugement d'un bon agent. Le gain est de supprimer la coordination manuelle, pas la relation humaine.",
        },
      ],
    },
  },

  intelligence: {
    "ai-bottlenecks-mid-market-logistics": {
      navLabel: "Goulots IA en logistique",
      seoTitle: "Goulots d'étranglement IA en logistique mid-market · PRIONATION",
      metaDescription:
        "Les goulots opérationnels que l'IA brise systématiquement en logistique mid-market — et ceux qu'elle ne peut pas — issus des missions logistiques de PRIONATION.",
      badge: "Intelligence · Logistique",
      tldr: "En logistique mid-market, l'IA gagne sa place contre quelques goulots opérationnels récurrents : visibilité fragmentée entre sites et systèmes, coordination manuelle qui ne passe pas à l'échelle, et décisions prises sur des données périmées. Cette note nomme ces schémas, l'architecture qui répond à chacun, et les limites — issues du travail de PRIONATION en opérations logistiques et marketplaces.",
      h1: "Goulots d'étranglement IA en logistique mid-market : ce qui casse vraiment",
      intro: [
        "La logistique est là où les goulots opérationnels sont les plus visibles, car le coût d'un processus manuel se compose à chaque expédition, site et contrepartie. Les opérateurs mid-market le ressentent vivement : trop grands pour les tableurs, trop spécifiques pour le SaaS générique.",
        "Cette note est une vue de première main des schémas que l'IA brise systématiquement en logistique mid-market — et de ceux qu'elle ne brise pas. Elle s'appuie sur les missions de PRIONATION en opérations logistiques et marketplaces.",
      ],
      sections: [
        {
          h2: "Ce que l'on voit dans les missions logistiques",
          body: [
            "Les mêmes contraintes reviennent quelle que soit l'opération : la visibilité est fragmentée entre sites et outils, la coordination qui marchait à petite échelle devient une taxe manuelle à mesure que le volume croît, et les données dont dépendent les décisions sont souvent périmées au moment de leur usage. Aucune n'est un problème de stratégie ; toutes sont opérationnelles.",
            "Le fil commun : le goulot est rarement l'absence d'information — c'est que l'information est éparpillée, manuelle à réconcilier, et tardive.",
          ],
        },
        {
          h2: "Les schémas que l'IA brise",
          body: [
            "Trois schémas reviennent. La visibilité fragmentée cède à une source de vérité centralisée — le premier build à plus fort levier, car chaque décision en aval s'améliore une fois les données unifiées. La coordination manuelle cède à l'automatisation systématique des étapes répétitives, supprimant la taxe qui croît avec le volume. Et les décisions sur données périmées cèdent à une instrumentation qui fait apparaître l'état courant en continu plutôt que par relevés manuels périodiques.",
            "Dans chaque cas, l'architecture est ingrate et spécifique : modéliser le domaine, centraliser la vérité, automatiser la coordination répétitive, et instrumenter ce qui compte. Le gain vient de le faire sur le flux qui coûte le plus, pas d'une plateforme large.",
          ],
        },
        {
          h2: "Ce que l'IA ne peut pas corriger en logistique",
          body: [
            "L'IA ne corrige pas un processus physique cassé, une contrepartie qui refuse de partager ses données, ou une opération qui n'a pas décidé ce que « correct » signifie. Elle supprime la taxe manuelle autour d'un processus ; elle n'invente pas le processus. Là où la contrainte est physique ou organisationnelle, le logiciel la rend visible mais ne la résout pas.",
            "C'est la limite honnête : l'IA en logistique est un levier sur une opération saine, pas un substitut. Le Diagnostic existe en partie pour dire aux opérateurs quand le goulot n'est pas de ceux que l'IA devrait toucher.",
          ],
        },
        {
          h2: "Le cadre transférable",
          body: [
            "Pour un opérateur logistique mid-market, l'ordre des opérations est constant : centraliser d'abord la source de vérité, automatiser ensuite la coordination manuelle au plus fort volume, instrumenter en troisième pour des décisions sur l'état courant. Chaque étape dérisque la suivante, et chacune est assez bornée pour être livrée en quelques semaines.",
            "L'erreur est de commencer par le symptôme visible — un tableau de bord, une prévision — avant que les données sous-jacentes soient unifiées. L'ordre compte plus que l'ambition.",
          ],
        },
      ],
      faq: [
        {
          q: "Quels goulots opérationnels l'IA brise-t-elle en logistique ?",
          a: "La visibilité fragmentée entre sites et outils, la coordination manuelle qui ne passe pas à l'échelle, et les décisions sur données périmées. Chacun cède à une architecture spécifique et ingrate plutôt qu'à une plateforme large.",
        },
        {
          q: "Quel est le premier build IA au ROI le plus élevé en logistique ?",
          a: "Généralement centraliser la source de vérité. Les données fragmentées sont la contrainte racine, et chaque décision en aval s'améliore une fois unifiées — d'où la priorité.",
        },
        {
          q: "Que ne peut pas corriger l'IA en logistique ?",
          a: "Un processus physique cassé, une contrepartie qui ne partage pas ses données, ou une opération qui n'a pas défini « correct ». L'IA supprime la taxe manuelle autour d'un processus sain ; elle n'invente pas le processus.",
        },
        {
          q: "Est-ce basé sur des missions réelles ?",
          a: "Oui — une vue de première main issue des opérations logistiques et marketplaces de PRIONATION. Les métriques détaillées par mission sont publiées sur les pages de réalisation et de transparence à mesure qu'elles sont finalisées.",
        },
        {
          q: "Par où un opérateur logistique doit-il commencer ?",
          a: "Par un Diagnostic de deux semaines qui identifie quel goulot est à la fois le plus coûteux et adapté à l'IA — et, tout aussi important, lesquels ne le sont pas.",
        },
      ],
    },

    "ai-lead-generation-mid-market": {
      navLabel: "IA pour la génération de leads",
      seoTitle: "IA pour la génération de leads mid-market · PRIONATION",
      metaDescription:
        "Ce qui fonctionne vraiment quand l'IA rencontre la génération de leads mid-market — et ce qu'elle ne peut pas corriger — issu de la mission lead-gen de PRIONATION.",
      badge: "Intelligence · Génération de leads",
      tldr: "En génération de leads mid-market, le vrai levier de l'IA est le pipeline — qualification et coordination — pas la fabrication de plus de leads. Le goulot est presque toujours le travail manuel entre un lead et une conversation prise. Cette note nomme ce qui marche, ce qui ne marche pas, et le cadre transférable, issu du travail lead-gen de PRIONATION.",
      h1: "IA pour la génération de leads mid-market : ce qui fonctionne vraiment",
      intro: [
        "La plupart des IA de génération de leads sont vendues comme un moyen de produire plus de leads. Dans les opérations mid-market, la vraie contrainte est rarement le volume de leads — c'est le pipeline manuel qui transforme un lead en conversation qualifiée et prise, qui ne passe pas à l'échelle avec les effectifs.",
        "Cette note est une vue de première main de là où l'IA aide vraiment en génération de leads mid-market, et de là où elle n'aide pas. Elle s'appuie sur le travail de PRIONATION pour construire une plateforme de pipeline de leads.",
      ],
      sections: [
        {
          h2: "Ce que l'on voit dans les missions lead-gen",
          body: [
            "Le schéma récurrent : le goulot se situe après le lead, pas avant. Les équipes peuvent générer ou acheter des leads ; ce qui plafonne la croissance, c'est la coordination manuelle pour les qualifier, les router et prendre la conversation — un travail qui se multiplie avec chaque agent et se dégrade quand le volume monte.",
            "Plus de leads dans ce pipeline manuel n'augmentent pas la production ; ils augmentent l'arriéré. La contrainte est le débit, pas l'offre.",
          ],
        },
        {
          h2: "Ce que l'IA fait bien ici",
          body: [
            "Le levier de l'IA porte sur le jugement répétitif et la coordination du pipeline : qualifier selon des critères constants, prioriser, rédiger les premières réponses, et automatiser les transferts de prise de rendez-vous. Bien fait, cela augmente le nombre de leads qu'une équipe donnée peut convertir sans hausse proportionnelle du travail manuel.",
            "Le build efficace cible le pipeline comme un système — qualification constante et coordination automatisée — plutôt qu'un seul modèle astucieux greffé sur un processus manuel.",
          ],
        },
        {
          h2: "Ce que l'IA ne peut pas corriger en génération de leads",
          body: [
            "L'IA ne conclut pas les affaires, ne bâtit pas la confiance, et ne remplace pas le jugement d'un bon agent dans une vraie conversation. Elle relève le plafond du nombre de conversations qualifiées qui atteignent un humain ; elle n'a pas la conversation. La traiter comme un commercial plutôt que comme un pipeline est l'erreur courante et coûteuse.",
            "Elle ne peut pas non plus corriger une offre faible ou une liste de leads mal ciblés. Automatiser la coordination autour d'un pipeline mal ajusté ne fait que produire plus vite des rendez-vous mal ajustés.",
          ],
        },
        {
          h2: "Le cadre transférable",
          body: [
            "Le cadre pour les opérateurs orientés vente : corrigez le pipeline avant l'offre. Cartographiez où les leads stagnent entre l'arrivée et une conversation prise, automatisez cette coordination, et gardez l'humain là où le jugement compte — la conversation elle-même. Mesurez le débit de conversations qualifiées, pas le nombre brut de leads.",
            "Le volume est une métrique de vanité si le pipeline ne peut le convertir. La capacité à convertir est le chiffre qui fait bouger l'entreprise.",
          ],
        },
      ],
      faq: [
        {
          q: "L'IA génère-t-elle plus de leads ?",
          a: "Elle le peut, mais c'est rarement le goulot en mid-market. Le vrai levier porte sur le pipeline — qualification et coordination — qui plafonne le nombre de leads qu'une équipe peut convertir.",
        },
        {
          q: "Que fait bien l'IA en génération de leads ?",
          a: "Le jugement répétitif et la coordination : qualifier selon des critères constants, prioriser, rédiger les premières réponses, et automatiser les transferts de prise de rendez-vous — augmentant la capacité de conversion sans hausse proportionnelle du travail manuel.",
        },
        {
          q: "Que ne peut pas corriger l'IA en lead-gen ?",
          a: "Elle ne conclut pas les affaires, ne bâtit pas la confiance, et ne remplace pas un bon agent dans une vraie conversation. Elle ne peut pas non plus corriger une offre faible ou des leads mal ciblés — automatiser un pipeline mal ajusté produit juste plus vite des rendez-vous mal ajustés.",
        },
        {
          q: "Que faut-il mesurer ?",
          a: "Le débit de conversations qualifiées, pas le nombre brut de leads. Le volume est une métrique de vanité si le pipeline ne peut le convertir ; la capacité à convertir est ce qui fait bouger l'entreprise.",
        },
        {
          q: "Est-ce basé sur une mission réelle ?",
          a: "Oui — une vue de première main issue du travail de pipeline de leads de PRIONATION. Les métriques par mission sont publiées sur les pages de réalisation et de transparence une fois finalisées.",
        },
      ],
    },
  },
};
