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
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";

import Link from "next/link";
import { Suspense } from "react";

async function FilterHeader({ year, month}) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  // generer une erreur si le segment d'url apres '/archive' n'est pas correct
  if (
    (year && !availableYears.includes(year)) ||
    (month &&
      !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter value!");
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }


  return (
    <header id="archive-header">
        <nav>
          <ul>
            {/* 
              ici, nous allons lister toutes les annees disponibles (dummy-news.js)
              pour permettre aussi l'affichage des mois disponibles pour une annee donnee

            */}

            {/* garder a l'esprit qu'a ce niveau, links contient plutot les mois disponibles pour une annee donnee et non plus les annees comme au depart */}
            {links.map((link) => {
              const href = year
                ? `/archive/${year}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
  );
}

// nous remarquons que lorsqu'on clique sur le lien d'un mois donne, nous n'avons pas le loading fallbaack bien que nous avons le fichier loading.js qui est parent a cette page courante. ceci est du au fait qu'avant d'arriver sur les mois, les donnees (annees) ont deja ete chargees et donc le loading fallback n'est pas declenche. pour resoudre ce probleme, nous allons utiliser le 'granular' approach pour le chargement des donnees.
// pour cela, nous allons creer une fonction pour le chargement des donnees. elle peut etre creee dans le meme fichier ou dans un fichier a part. ici, nous allons la creer dans le meme fichier pour plus de simplicite.
async function FilteredNews({ year, month }) {
  let news;

  // verifier si l'on a une annee et un mois
  if (year && !month) {
    news = await getNewsForYear(year); // on recupere tous les articles de l'annee passee a l'url
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month); // on recupere tous les articles de l'annee et du mois passee a l'url
  }

  let newsContent = <p>No news found for the selected period!</p>;

  // si on a des articles, on les affiche
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter; // filter : tableau de tous les segments de chemin correspondants (ex: ['2024'] pour /archive/2024)

  // vu que filter est un tableau, nous pouvons acceder a ces elements via les index. mais attention car il peut avoir 'undefined' comme element si le tableau est vide.
  // const selecteYear = filter ? filter[0] : undefined; // on recupere l'annee passee a l'url

  // ou plus simplement
  const selectedYear = filter?.[0]; // on recupere l'annee passee a l'url
  const selectedMonth = filter?.[1]; // on recupere le mois correspondant a l'annee passee a l'url

  // let news;

  // les valeurs issues de la BD sont des strings, donc on doit comparer avec des strings d'ou l'on ne convertit pas selectedYear en nombre (+selectedYear) comme on le faisait avant pour les annees issues de dummy-news.js
  // const availableYears = await getAvailableNewsYears();

  // let links = availableYears; // on recupere les annees disponibles (tableau d'annees) grace a la fonction getAvailableNewsYears() qui se trouve dans le fichier news.js du dossier lib

  // if (selectedYear && !selectedMonth) {
  //   // news = await getNewsForYear(selectedYear); // on recupere tous les articles de l'annee passee a l'url
  //   links = getAvailableNewsMonths(selectedYear); // on recupere les mois disponibles pour l'annee passee a l'url
  // }

  // if (selectedYear && selectedMonth) {
  //   // news = await getNewsForYearAndMonth(selectedYear, selectedMonth); // on recupere tous les articles de l'annee et du mois passee a l'url

  //   links = []; // on ne veut pas afficher le lien de l'annee du mois selectionne
  // }

  // sans le granular approach, on aurait fait le chargement des donnees ici
  // let newsContent = <p>No news found for the selected period!</p>;

  // // si on a des articles, on les affiche
  // if (news && news.length > 0) {
  //   newsContent = <NewsList news={news} />;
  // }

  
  return (
    <>
    <Suspense fallback={<p>Loading filter header...</p>}>
      <FilterHeader year={selectedYear} month={selectedMonth} />
    </Suspense>
      {/* sans le granular approach, on aurait eu ceci: */}
      {/* {newsContent} */}

      {/* avec le granular approach, on a: */}
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
