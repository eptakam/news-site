/*
    Imaginons que nous voulons afficher l'image d'un article de news sur une page dediee par le clic sur cette image.
    pour cela, nous allons utiliser un autre modele de routage appele 'interceptor routes' (pour le meme chemin, differentes pages sont affichees dependemment de ce qu'il y a sur ces pages).

    nous allons creer un autre path dans notre dynamic path 'news/[slug]' ce path suivra la nomenclature suivante pour son nom: des parentheses suivi du nom de la route que l'on veut intercepter. et dans la parenthese, on mettra la description pour arriver au path (dossier) que l'on veut intercepter. par exemple si les deux dossiers sont dans le meme dossier cad au meme niveau, ce sera un '.' juste comme un import path. https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

    dans notre cas, nous voulons intercepter le path 'news/[slug]/image' pour afficher l'image de l'article de presse. ce sera donc 'news/[slug]/(.)image'
*/

import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/lib/news"; // import de la fonction getNewsItem() pour recuperer un article de presse en fonction de son slug


export default async function ImagePage({ params }) {
  const newsItemSlug = params.slug; // on recupere le slug (le path) de l'article de presse

  // identify the news item that we want to display
  // we use the .find() method to find the news item with the matching slug
  // newsItem : represent one news item (one object) from the DUMMY_NEWS array

  // utilisation des donnees provenant du fichier dummy-news.js
  // const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);

  // utilisation des donnees provenant de la BD
  const newsItem = await getNewsItem(newsItemSlug);

  // if the news item does not exist, we display the NewsNotFoundPage. to do that, we'll use the notFound() function from next/navigation that will call the NewsNotFoundPage component because it's in the same folder as this file and has not-found.js as its filename.
  if (!newsItem) {
    return notFound(); // this will call the NewsNotFoundPage component
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}