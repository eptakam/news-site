import Link from "next/link";

import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news/news-list";

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      {/* <ul className="news-list"> */}
      {/* Methode #1 : hardcoder soi-meme les urls */}
        {/* <li>
          <Link href="news/buzz">Buzz</Link><br />
        </li>
        <li>
          <Link href="news/breaking">Breaking</Link><br />
        </li>
        <li>
          <Link href="news/it-news">IT news</Link><br />
        </li> */}

        {/* 
          Methode #2 :
              au lieu d'utiliser les liens ci-dessus, nous allons utiliser les données de DUMMY_NEWS
        */}

        {/* {DUMMY_NEWS.map((newsItem) => (
          // newsItem : represente chaque element du tableau DUMMY_NEWS
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img 
                src={`/images/news/${newsItem.image}`} 
                alt={newsItem.title} 
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul> */}
       
      {/* 
      Methode #3 :
          vu que nous avons cree un composant NewsList, nous allons l'utiliser ici pour afficher les donnees de DUMMY_NEWS au lieu de les afficher directement comme fait ci-dessus avec la boucle map 
      */}
      <NewsList news={DUMMY_NEWS} />
    </>
  )
}