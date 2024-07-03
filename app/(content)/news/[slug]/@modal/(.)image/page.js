/*
    Imaginons que nous voulons afficher l'image d'un article de news sur une page dediee par le clic sur cette image.
    pour cela, nous allons utiliser un autre modele de routage appele 'interceptor routes' (pour le meme chemin, differentes pages sont affichees dependemment de ce qu'il y a sur ces pages).

    nous allons creer un autre path dans notre dynamic path 'news/[slug]' ce path suivra la nomenclature suivante pour son nom: des parentheses suivi du nom de la route que l'on veut intercepter. et dans la parenthese, on mettra la description pour arriver au path (dossier) que l'on veut intercepter. par exemple si les deux dossiers sont dans le meme dossier cad au meme niveau, ce sera un '.' juste comme un import path. https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

    dans notre cas, nous voulons intercepter le path 'news/[slug]/image' pour afficher l'image de l'article de presse. ce sera donc 'news/[slug]/(.)image'

    on peut remarquer que la page n'occupe pas tout l'espace et qu'elle n'est pas egalement supperposee a l'autre page.

    pour resoudre ce probleme, nous allons creer un fichier layout.js dans le dossier components. car c'est le layout qui determine comment les pages sont affichees.
*/

import { notFound } from "next/navigation";
// import { DUMMY_NEWS } from "@/dummy-news";
import ModalBackdrop from "@/components/modal/modal-backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {
  // permettre la naviguation a la page precedente par le clique sur le background du modal (la div qui la contient)

  const newsItemSlug = params.slug; // on recupere le slug (le path) de l'article de presse

  // identify the news item that we want to display
  // we use the .find() method to find the news item with the matching slug
  // newsItem : represent one news item (one object) from the DUMMY_NEWS array

  // utilisation des donnees provenant du fichier dummy-news.js
  // const newsItem = DUMMY_NEWS.find(
  //   (newsItem) => newsItem.slug === newsItemSlug
  // );

  // utilisation des donnees provenant de la BD
  // ce sera un peu different ici car nous utilisont 'use client' et que nous ne pouvons pas utiliser les fonctions asynchrones sur un composant client. nous allons donc extraire la div ayant pour classe 'modal-backdrop' car c'est elle qui nous oblige a rendre les composants en composant client a cause de l'evenement onClick={router.back} qui est un evenement client. et de cette facon, le reste des composants seront rendus en composant server.

  // donc nous allons creer un nouveau composant qui va contenir la div ayant pour classe 'modal-backdrop' et qui va appeler le composant InterceptedImagePage. ce composant sera nomme ModalBackdrop et sera dans le dossier components.
  const newsItem = await getNewsItem(newsItemSlug);

  // if the news item does not exist, we display the NewsNotFoundPage. to do that, we'll use the notFound() function from next/navigation that will call the NewsNotFoundPage component because it's in the same folder as this file and has not-found.js as its filename.
  if (!newsItem) {
    return notFound(); // this will call the NewsNotFoundPage component
  }

  return (
    <>
      {/* <ModalBackdrop /> : permet de retourner a la page precedente en cliquant sur le background du modal */}
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
