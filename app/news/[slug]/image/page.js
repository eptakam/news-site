/*
    Imaginons que nous voulons afficher l'image d'un article de news sur une page dediee par le clic sur cette image.
    pour cela, nous allons utiliser un autre modele de routage appele 'interceptor routes'.

    nous allons creer un autre path dans notre dynamic path 'news/[slug]'
*/

import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";


export default function ImagePage({ params }) {
  const newsItemSlug = params.slug; // on recupere le slug (le path) de l'article de presse

  // identify the news item that we want to display
  // we use the .find() method to find the news item with the matching slug
  // newsItem : represent one news item (one object) from the DUMMY_NEWS array
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);

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