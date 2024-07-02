import Link from "next/link";

// import { useEffect, useState } from "react";
import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news/news-list";

export default async function NewsPage() {
  /*
    je desire actuellement afficher les donnees de la BD (backend separe) au lieu de les afficher directement comme fait ci-dessus avec DUMMY_NEWS

    option 1 :
        utiliser le hook useEffect pour fetcher les donnees de la BD (client-side data fetching)

    option 2 : meilleur option avec Next.js
        utiliser la fonction fetch directement dans le composant pour fetcher les donnees de la BD (server-side data fetching)
        on utilise directement le async sur le composant NewsPage
        et on enleve le hook useEffect et le use client
  */

  /*
  // option 1 : client-side data fetching
  // pour gerer le chargement des donnees de la BD
  const [isLoading, setIsLoading] = useState(false);

  // pour gerer les erreurs lors de la requete fetch
  const [error, setError] = useState();

  // pour stocker les donnees de la BD
  const [news, setNews] = useState();

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8088/news");

      // verifier si la requete a echoue
      if (!response.ok) {
        setError("Failed to fetch news!");
        setIsLoading(false);
      }

      // lire et convertir la reponse en objet javascript
      const news = await response.json(); 
      setIsLoading(false); // indiquer que le chargement des donnees est termine
      setNews(news);  // stocker les donnees dans le state news
    }

    fetchNews();
  }, []); // pour fetcher les donnees de la BD

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let newsContent;
  if (news) {
    newsContent = <NewsList news={news} />;
  }
  */

   // option 2 : server-side data fetching

  const response = await fetch("http://localhost:8088/news");

  // verifier si la requete a echoue
  if (!response.ok) {
    throw new Error("Failed to fetch news!");
  }

  // lire et convertir la reponse en objet javascript
  const news = await response.json(); 

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
      {/* <NewsList news={DUMMY_NEWS} /> */}

      {/* Methode #4 : option 1 : afficher les donnees de la BD (backend separe) */}
      {/* {newsContent} */}

       {/* Methode #4 : option 2 : afficher les donnees de la BD (backend separe) */}
      <NewsList news={news} />
    </>
  );
}
