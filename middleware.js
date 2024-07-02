/*
  Un middleware est un bloc de code qui s'exécute entre la réception d'une requête par le serveur et l'envoi d'une réponse au client. Il agit comme un intermédiaire dans le traitement des requêtes HTTP. Les middlewares sont largement utilisés dans les applications web modernes pour gérer diverses tâches telles que l'authentification, la journalisation, la gestion des erreurs, et le traitement des données de requête.

Voici quelques-unes de leurs principales utilisations :

1. **Authentification et autorisation** : Vérifier si un utilisateur est connecté et s'il a les droits nécessaires pour accéder à une ressource spécifique.
2. **Journalisation** : Enregistrer des informations sur les requêtes et les réponses pour le débogage et la surveillance.
3. **Gestion des erreurs** : Attraper et traiter les erreurs survenues lors du traitement des requêtes.
4. **Traitement des données** : Transformer ou valider les données de requête avant qu'elles n'atteignent le gestionnaire de route final.
5. **Configuration de l'en-tête de réponse** : Ajouter ou modifier les en-têtes HTTP des réponses avant qu'elles ne soient envoyées au client.

Les middlewares permettent de structurer une application en séparant les préoccupations et en réutilisant la logique commune, rendant le code plus modulaire, facile à comprendre et à maintenir.
*/

import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log(request);
  return NextResponse.next();
}

// configure le middleware pour qu'il s'exécute uniquement pour les requêtes dirigées vers le chemin /news
export const config = {
  matcher: '/news'
};