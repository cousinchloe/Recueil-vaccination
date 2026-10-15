# Recueil Vaccination — mise en ligne et installation

## 1. Mettre les fichiers en ligne (une seule fois)

Sur github.com, dépôt public, puis « Add file » → « Upload files ».
Glisse **les 7 fichiers ensemble**, sans dossier intermédiaire :

- index.html
- manifest.webmanifest
- sw.js
- icon-192.png
- icon-512.png
- icon-maskable-512.png
- apple-touch-icon.png

Puis Settings → Pages → Branch : main, dossier / (root) → Save.
L'adresse apparaît après une ou deux minutes.

## 2. Installer sur les téléphones

Chacune ouvre l'adresse, puis :
- **iPhone (Safari uniquement)** : bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮ → « Installer l'application » ou « Ajouter à l'écran d'accueil ».

L'outil s'ouvre alors en plein écran, avec son icône, et fonctionne sans réseau.

## 3. Publier une correction

Remplace index.html dans le dépôt, et change la ligne
`const VERSION = "recueil-vaccination-v1";` dans sw.js en `"recueil-vaccination-v2"`.
Sans ce changement de numéro, les téléphones garderont l'ancienne version en cache.

## À savoir

- Les recueils sont stockés dans le téléphone (localStorage) et ne partent jamais
  vers le serveur. Le dépôt ne contient que le formulaire vide.
- La mémoire de l'app installée est distincte de celle de Safari : les recueils
  saisis avant l'installation ne s'y retrouveront pas.
- Faire une **Sauvegarde** régulière (bouton sur la liste) reste la seule vraie
  protection contre une perte ou un changement de téléphone.
- Ranger les PDF dans un dossier local, pas dans iCloud Drive ni Google Photos.

## Particularités de cet outil

- Créer un **nouveau dépôt** (ex. « Recueil-Vaccination ») : l'adresse sera
  https://cousinchloe.github.io/Recueil-Vaccination/
- Les fiches vaccination sont stockées à part des recueils BSI : les deux outils
  cohabitent sans se mélanger.
