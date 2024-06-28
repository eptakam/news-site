/**
 * Note:
 *    cette page nous permettra d'afficher la liste des articles d'une annee donnee. l'annee sera   passee a l'url de facon dynamique
 *
 *   - nous voulons que le contenu de cette page soit active de facon dynamique peu importe l'url qui est passee. c'est pourquoi nous allons utiliser une autre fonctionnalite de nextjs en changeant la facon de nommer notre sous dossier [year] (standard dynamic route) en [[...year]] (catch-all route) cela permettra a nextjs de generer dynamiquement le contenu de cette page peu importe l'url qui est passee apres '../archive' peu importe leur nombre et leur nom.
 *
 *   - ceci nous permettra de pouvoir voir les liens des annees meme lorsque nous naviguons sur une annee donnee (exemple clique sur l'annee 2024: /archive/2024).
 *
 * Attention:
 *    - en le faisant, nous obtenons un conflit entre les routes @archive/page.js et @archive/[...year]/page.js. car @archive/[...year]/page.js capte tous les urls apres '/archive' meme ceux de '@archive/page.js'.
 *
 *    - pour resoudre ce conflit, nous allons copier le contenu de @archive/page.js dans @archive/[...year]/page.js et supprimer @archive/page.js
 */

import NewsList from "@/components/news/news-list";
import { getNewsForYear } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";

import Link from "next/link";

export default function FilteredNewsPage({ params }) {
  const filter = params.filter; // filter : tableau de tous les segments de chemin correspondants (ex: ['2024'] pour /archive/2024)

  const years = getAvailableNewsYears(); // on recupere les annees disponibles (tableau d'annees) grace a la fonction getAvailableNewsYears() qui se trouve dans le fichier news.js du dossier lib
    
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {/* ici, nous allons lister toutes les annees disponibles (dummy-news.js) */}
          {years.map((year) => (
            <li key={year}>
              <Link href={`/archive/${year}`}>{year}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );

  // const news = getNewsForYear(filter); // on recupere tous les articles de l'annee passee a l'url
  // return (
  //   <>
  //     <NewsList news={news} />
  //   </>
  // );
}
