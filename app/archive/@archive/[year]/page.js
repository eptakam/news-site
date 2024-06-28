/**
 * Note: 
 *    cette page nous permettra d'afficher la liste des articles d'une annee donnee. l'annee sera   passee a l'url de facon dynamique
 */

import NewsList from "@/components/news/news-list";
import { getNewsForYear } from "@/lib/news";

export default function FilteredNewsPage({ params }) {
  const newsYear = params.year; // on recupere l'annee passee a l'url
  const news = getNewsForYear(newsYear); // on recupere tous les articles de l'annee passee a l'url
  return (
    <>
      <NewsList news={news} />
    </>
  );
}