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
};
