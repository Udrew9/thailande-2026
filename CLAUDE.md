# CLAUDE.md — The Hangover (site de voyage en Thaïlande)

## Rôle de ce fichier

Ce fichier donne le contexte du projet à Claude Code. Lis-le avant toute modification. Le site existe déjà et est publié : il faut le faire évoluer sans casser ce qui fonctionne.

## 1. Le projet et son objectif

Ce dépôt contient un site web personnel de préparation et de carnet de voyage intitulé **The Hangover**.

- Dépôt GitHub : `Udrew9/thailande-2026`
- Branche principale : `main`
- Site publié avec GitHub Pages : https://udrew9.github.io/thailande-2026/
- Le site est destiné au petit groupe de voyageurs qui part en Thaïlande en décembre 2026.
- Il doit servir à la fois de joli carnet de voyage et d'outil pratique : itinéraire, hébergements, déplacements, activités, budget, carte, conseils et bonnes adresses.
- Le site est hébergé gratuitement sur GitHub Pages. Garder une solution simple, statique et gratuite.

L'utilisateur n'est pas développeur professionnel. Il décrit les changements souhaités en français courant et attend de Claude qu'il comprenne la demande, inspecte le code existant, effectue les modifications directement dans le dépôt et explique brièvement ce qui a changé.

## 2. Voyage : informations de référence

Voyage prévu du **7 au 22 décembre 2026**, avec trois voyageurs.

| Étape | Dates | Hébergement |
|---|---|---|
| Phuket / Rawai | 7–11 décembre (4 nuits) | Blue Palm Seafront Resort Phuket |
| Khao Lak | 11–14 décembre (3 nuits) | Khaolak Relax Resort |
| Chiang Mai / Hang Dong | 14–19 décembre (5 nuits) | At Leaf Villa |
| Bangkok | 19–22 décembre (3 nuits) | Somerset Sukhumvit 71 Bangkok |

Vol retour depuis Bangkok le 22 décembre. Le départ de France est prévu le 6 décembre et l'arrivée à Phuket le 7 décembre.

### Adresses des hébergements

- **Blue Palm Seafront Resort Phuket** : 54/14 Moo 6, Rawai Beach, Phuket, Thailand.
- **Khaolak Relax Resort** : 30/47 Moo 3, Khuk Khak, Takua Pa, Phang Nga 82190, Thailand.
- **At Leaf Villa** : 225/329 Kad Farang, Chiangmai-Hang Dong Road, Ban Waen, Hang Dong, Chiang Mai 50230, Thailand.
- **Somerset Sukhumvit 71 Bangkok** : 1015/29 Pridi Banomyong 45, Sukhumvit 71 Road, Khlong Tan Nuea, Watthana, Bangkok 10110, Thailand.

### Grandes lignes du programme

- **7 décembre** : arrivée à Phuket.
- **8 décembre** : Wat Chalong et Phuket Old Town ; excursion en mer possible selon choix final.
- **9 décembre** : excursion aux îles Phi Phi.
- **10 décembre** : baie de Phang Nga / James Bond Island, kayak ou canoë.
- **11 décembre** : transfert de Rawai à Khao Lak (environ 2 h 30 à 3 h).
- **12 décembre** : excursion aux îles Similan depuis le port de Thap Lamu. Les sorties sont soumises à la météo et aux conditions locales.
- **13 décembre** : journée plus calme et découverte du secteur de Bang Niang.
- **14 décembre** : transfert vers l'aéroport de Phuket puis vol pour Chiang Mai.
- **15 décembre** : vieille ville de Chiang Mai et temples.
- **16 décembre** : cours de cuisine thaïlandaise envisagé.
- **17 décembre** : parc national de Doi Inthanon envisagé.
- **18 décembre** : sanctuaire d'éléphants envisagé. Privilégier les structures éthiques, observation d'abord, sans monter sur les éléphants ni spectacles.
- **19 décembre** : vol pour Bangkok, soirée à Chinatown.
- **20 décembre** : Chatuchak Weekend Market (dimanche).
- **21 décembre** : Grand Palace, Wat Pho et Wat Arun.
- **22 décembre** : retour.

Ce programme est une base de travail et peut encore évoluer. **Ne change pas les dates, les hôtels, l'ordre des étapes ou les activités réservées/souhaitées sans demande explicite.** Ne présente pas une activité envisagée comme déjà réservée.

## 3. Identité visuelle et direction artistique

Le site doit évoquer un **magazine de voyage / carnet éditorial haut de gamme**, pas un template touristique générique.

- Nom et titre : **The Hangover**.
- Ambiance : élégante, immersive, éditoriale, légèrement cinématographique.
- Palette : crème / ivoire, vert forêt, vert sauge, nuances naturelles et quelques touches de brun chaud.
- Typographies : **Playfair Display** (avec sa vraie italique) pour les titres, **DM Sans** pour le texte courant et **Caveat** (manuscrite) uniquement pour la légende du polaroid.
- Palette définie en variables CSS en tête de `styles.css` (`--bg`, `--forest`, `--sage`, `--clay`, `--gold`…) ; chaque étape a sa couleur d'accent (Phuket #3f7f7a, Khao Lak #4f7f97, Chiang Mai #7d8a52, Bangkok #c0874d).
- Mise en page aérée, belles photographies, titres expressifs, petits détails graphiques.
- Le site doit rester lisible, intuitif et agréable sur ordinateur comme sur téléphone.
- Depuis la refonte de novembre 2026, l'utilisateur a demandé un rendu « premium » avec des effets au survol et au clic (apparitions au défilement, inclinaison du polaroid, boutons magnétiques, curseur personnalisé sur ordinateur, onde au clic). Garder ces effets discrets et cohérents ; ils sont tous désactivés si l'appareil demande moins d'animations.
- Le titre de la couverture est « The Hangover. ». La photo du groupe (`couverture.jpg.png`, petite résolution 679×322) est présentée en **polaroid** au-dessus d'un fond de Bangkok : ne pas la réafficher en plein écran, elle serait floue.

## 4. Contenu et fonctionnalités déjà présents

Le site a été construit progressivement. Les éléments ci-dessous existent déjà dans le projet ; inspecte le code actuel pour connaître leur implémentation exacte avant de modifier quoi que ce soit.

Ordre des sections (refonte de novembre 2026) : couverture → bandeau défilant → compte à rebours → 01 Le voyage → 02 Les étapes → 03 Hébergements → 04 Jour après jour → 05 La carte → 06 Budget → 07 Le coin du crew → 08 Bouffe du coin → 09 À savoir → pied de page.

- Couverture : fond photo de Bangkok, titre « The Hangover. », photo du groupe en polaroid, tampon tournant « 16 jours sur place », puis bandeau défilant des destinations.
- Compte à rebours (jours, heures, minutes, secondes) jusqu'au 7 décembre 2026 à minuit, heure thaïlandaise, avec horloges Paris / Thaïlande. Pendant le voyage, il passe en mode « Jour X / 16 · lieu » avec barre de progression, et la journée du jour est mise en avant dans le programme (badge « Aujourd'hui »).
- Le voyage : texte, chiffres clés animés et petite frise des 4 étapes.
- Les étapes : pour chaque base, 3 photos, dates, logement, programme, liens vers le logement et vers les journées filtrées, et un bloc **« À voir dans le coin »** (4 idées par étape avec photo et lien Google Maps, présentées comme des idées non réservées). Bangkok a un fond sombre « nuit » et met en avant le Sky Bar (lieu de tournage de *Very Bad Trip 2*).
- Hébergements : 4 cartes avec photo d'ambiance (non contractuelle), lien galerie/Booking, adresse avec bouton « Copier » (adresse en anglais pour Grab ou un chauffeur), horaires et liens.
- Programme jour par jour : 16 journées illustrées, filtres par étape, bouton « Tout déplier », détails déroulants animés, rail de progression coloré.
- Carte Leaflet (tuiles OpenStreetMap avec un filtre de couleur chaud) : repères numérotés, tracé animé, boutons pour zoomer sur chaque étape.
- Budget : cartes par activité (options hors programme en pointillé), total, calculateur (activités du programme cochées par défaut, options décochées, nombre de voyageurs de 1 à 6, total par groupe et par personne) et convertisseur € / ฿. Le taux 1 € ≈ 38 ฿ est une approximation, pas un taux de change garanti.
- Le coin du crew : bingo de 16 défis (enregistré dans le navigateur, confettis quand une ligne est complète) et petit lexique thaï en cartes à retourner.
- Section **« Bouffe du coin »**, en avant-dernière position, juste avant **« À savoir »** : 6 plats en photo avec une étiquette porc (sans porc / porc possible / avec porc — un des voyageurs ne mange pas de porc), tirage au sort « On mange quoi ce soir ? » avec interrupteur « Tirage sans porc » (mémorisé sur l'appareil) et l'étiquette porc du plat tiré, adresses par étape dans des onglets.
- À savoir : 6 cartes pratiques, météo & valise par région, infos utiles (décalage, urgences, argent, prises, entrée, applis) et checklist avec barre de progression. La checklist garde la clé `thailande2026-checklist` et l'ordre des 8 premières cases (une 9e a été ajoutée à la fin) pour ne pas perdre les cases déjà cochées.
- Galerie plein écran (lightbox) sur toutes les photos marquées `data-zoom`, avec précédente / suivante, clavier et glissement au doigt. Elle ne fait défiler que les photos du même groupe (une étape, les journées d'une même étape, les plats) ; une photo seule s'affiche sans flèches.
- En-tête qui se cache au défilement, menu plein écran sous 1180 px, barre de progression de lecture.
- Petit secret : cliquer 5 fois sur le « T. » du logo.

### Suggestions de restauration déjà intégrées

Elles sont des pistes enregistrées dans le site, pas une garantie de disponibilité ou de qualité actuelle. Vérifier les adresses et distances avant de les modifier ou d'en ajouter.

- Rawai / Phuket : Salaloy Seafood, Street Hut – Local Thai Food, Mook Manee Seafood.
- Khao Lak / Khuk Khak-Bang Niang : Bang Niang Market, Takiang Restaurant, Khaolak Curry Thai Restaurant.
- Hang Dong / Chiang Mai : Peth Lanna Restaurant (Kad Farang), Huen Phen Restaurant 2, Yummy Hang Dong.
- Sukhumvit 71 / Bangkok : Rosmuemaepridi, Mahasamut Sukhumvit 71, Yaowarat / Chinatown.

## 5. Structure technique et publication

Le site est un site statique, sans backend.

Fichiers principaux :
- `index.html` : structure, contenu et sections.
- `styles.css` : styles et responsive design.
- `script.js` : interactions et fonctionnalités JavaScript.
- `couverture.jpg.png` : photo du groupe (affichée en polaroid et utilisée comme image d'aperçu de partage).
- `favicon.svg` : icône « T. » de l'onglet.
- `.nojekyll` : fichier utile à la publication GitHub Pages.

Les photos de lieux viennent d'Unsplash (`images.unsplash.com/photo-…`) et ont été vérifiées visuellement. Avant d'en ajouter une, vérifier qu'elle montre bien le bon lieu : une ancienne photo « Bangkok » montrait en réalité Dubaï. Si une image ne charge pas, `script.js` la remplace par une photo de secours.

Publication : GitHub Pages depuis le dépôt. Le site en ligne est https://udrew9.github.io/thailande-2026/.

### Précautions techniques importantes

1. **Commence toujours par lire les fichiers actuels** (`index.html`, `styles.css`, `script.js`) et comprendre comment la fonctionnalité concernée est construite.
2. `styles.css` a été entièrement réécrit en novembre 2026 : il est organisé par sections commentées, avec un seul bloc responsive à la fin (points de rupture 1180, 980, 700 et 420 px). Ajoute les nouvelles règles dans la bonne section ou dans ce bloc, plutôt que d'empiler des correctifs en fin de fichier.
3. Ne réécris pas tout le site sans demande explicite et ne remplace pas son design par un template.
4. Ne supprime aucune fonctionnalité existante pour simplifier le code sans expliquer l'impact et demander l'accord si nécessaire.
5. Conserve les images locales et les chemins relatifs compatibles avec GitHub Pages. Pour les images externes, prévois un comportement de secours si elles ne chargent pas.
6. Évite les dépendances payantes, les clés API privées et les services nécessitant un abonnement. Le site doit continuer à fonctionner gratuitement sur GitHub Pages.
7. N'ajoute pas de framework ou de système de build sans raison solide : le site actuel est volontairement simple.
8. Vérifie les liens, les ancres, les boutons, les filtres, les menus déroulants, le calculateur, la carte et la lightbox après toute modification qui peut les affecter.
9. Vérifie systématiquement l'affichage mobile (en particulier autour de 375–430 px de large), les tablettes et le desktop. Évite les débordements horizontaux, les textes coupés et les images trop zoomées.
10. Si tu modifies le CSS, pense au cache du navigateur. Le lien du site peut être ouvert avec un paramètre de version, par exemple `?v=...`, ou le paramètre de version du fichier CSS peut être incrémenté dans le HTML si nécessaire.
11. Fais des changements ciblés et cohérents. Après chaque série de modifications, indique les fichiers modifiés, les points vérifiés et les éventuels éléments restant à tester.

## 6. Façon de collaborer avec l'utilisateur

- Répondre en **français**, avec un ton naturel, clair et direct.
- L'utilisateur peut décrire une modification sans vocabulaire technique : interpréter l'intention et proposer une solution concrète.
- Si une demande est suffisamment claire, réaliser le changement plutôt que donner uniquement des instructions.
- Si un choix de contenu, de budget, d'itinéraire ou de design est ambigu et peut modifier sensiblement le site, poser une seule question courte avant de trancher.
- Ne pas inventer des informations pratiques, des prix, des horaires, des distances ou des disponibilités. Signaler les estimations et vérifier les informations susceptibles d'avoir changé.
- Préserver le contenu français, les accents et les formulations déjà validées.
- Ne pas changer le nom The Hangover ni l'identité visuelle sans demande.
- Avant de terminer, donner un résumé court des modifications et le lien du site publié si le déploiement est prêt. Rappeler que GitHub Pages peut prendre un court délai à actualiser.

## 7. Première tâche recommandée pour Claude Code

Avant de modifier le site :
1. Parcourir le dépôt et lire les trois fichiers principaux.
2. Faire un état des lieux rapide des sections, fonctionnalités et éventuels problèmes visibles.
3. Repérer les incohérences, bugs ou points à améliorer, notamment sur mobile.
4. Présenter un petit diagnostic et proposer les améliorations prioritaires, **sans modifier le code avant que l'utilisateur ait choisi ou validé les changements**.

Ensuite, travailler par petites séries de modifications et vérifier que les fonctionnalités existantes restent opérationnelles.
