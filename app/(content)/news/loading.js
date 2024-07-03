/**
 * permettre d'afficher un loading spinner pendant le chargement des donnees
 * 
 * donc a chaque fois que nous devons charger des donnees cad attendre une reponse, etc. ce composant sera affiche/actif
 * 
 * ceci est valable pour toutes page.js qui sont au meme niveau que ce fichier et egalement pour les fichiers page.js qui sont imbriques sous ce fichier (niveau d'arborescence inferieur a celui de ce fichier loading.js)
 */

export default function NewsLoading() {
  return <p id="p-loading">Populating the project...</p>;
}
