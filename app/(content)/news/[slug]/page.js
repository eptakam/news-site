/*
    cette page est générée dynamiquement en fonction de l'URL de la page et nous affichons les détails de l'article de presse correspondant. Nous utilisons le slug de l'article de presse pour identifier l'article de presse à afficher. Nous utilisons la méthode .find() pour trouver l'article de presse avec le slug correspondant dans le tableau DUMMY_NEWS.
*/
import Link from "next/link";

import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/lib/news"; // import de la fonction getNewsItem() pour recuperer un article de presse en fonction de son slug

export default async function NewsDetailPage({ params }) {
  // retrieve the news ID from the params object
  const newsSlug = params.slug;

  // identify the news item that we want to display
  // we use the .find() method to find the news item with the matching slug
  // utilisation des donnees provenant du fichier dummy-news.js
  // const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  // utilisation des donnees provenant de la BD
  const newsItem = await getNewsItem(newsSlug);

  // if the news item does not exist, we display the NewsNotFoundPage. to do that, we'll use the notFound() function from next/navigation that will call the NewsNotFoundPage component because it's in the same folder as this file and has not-found.js as its filename.
  if (!newsItem) {
    return notFound(); // this will call the NewsNotFoundPage component
  }

  return (
    <article className="news-article">
      <header>
        {/* rendre l'image cliquable en le wrappant avec <Link> pour afficher l'image en plein écran */}
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
