/*
Premier temps : utilisation des donnees provenant du fichier dummy-news.js
ici nous allons coder des functions qui vont nous etre utiles et faciliter la gestion des donnees. comme par exemple, une fonction qui va nous permettre de recuperer les annees disponibles, une autre qui va nous permettre de recuperer les articles d'une annee donnee, etc.

Deuxieme temps : utilisation des donnees provenant de la BD
nous n'allons plus utiliser les donnees provenant du fichier dummy-news.js, mais plutot les donnees provenant de la BD. pour cela, nous allons utiliser le module 'better-sqlite3' qui est un module qui permet de manipuler des BD SQLite de maniere synchrone.
*/
import sql from "better-sqlite3"; // ne pas oublier d'installer 'better-sqlite3' dans le projet avec 'npm install better-sqlite3'

import { DUMMY_NEWS } from "@/dummy-news";

// creer une connexion a la BD
const db = sql("data.db");

export async function getAllNews() {
  // return DUMMY_NEWS;

  // fetcher les donnees directement de la BD
  const news = db.prepare("SELECT * FROM news").all();

  // implementer un loading fallback : pour cela, il faut simuler un delai de chargement des donnees d'ou l'ajout du async a la fonction getAllNews() et du setTimeout ci-dessous
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return news;
}

export async function getNewsItem(slug) {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews() {
  // utilisation des donnees provenant du fichier dummy-news
  // return DUMMY_NEWS.slice(0, 3);

  // utilisation des donnees provenant de la BD
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears() {
  /*
    Note:
        DUMMY_NEWS.reduce((years, news) => { ... }, [])

        la methode .reduce() prend deux parametres: une fonction callback (fonction reductrice) et une valeur initiale de l'accumulateur

        Ici, la valeur initiale est un tableau vide [], et la fonction réductrice est définie par (years, news) => { ... }.

        years: accumulateur des annees de publication de chaque article
        news: article en cours de traitement
  */

  // utilisation des donnees provenant du fichier dummy-news.js
  // return DUMMY_NEWS.reduce((years, news) => {
  //   const year = new Date(news.date).getFullYear();
  //   // si l'annee de publication de l'article n'est pas deja dans le tableau years, on l'ajoute
  //   if (!years.includes(year)) {
  //     years.push(year);
  //   } // fin de la fonction reductrice (callback)
  //   return years;
  // }, []).sort((a, b) => b - a);  // [] : indique que la valeur initiale de l'accumulateur est un tableau vide

  // utilisation des donnees provenant de la BD
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years;
}

export function getAvailableNewsMonths(year) {
  // utilisation des donnees provenant du fichier dummy-news.js
  // return DUMMY_NEWS.reduce((months, news) => {
  //   const newsYear = new Date(news.date).getFullYear();
  //   // Le symbole + devant year convertit la valeur de year en un nombre si ce n'est pas déjà le cas. Cela permet de s'assurer que la comparaison se fait entre deux nombres.
  //   if (newsYear === +year) {
  //     const month = new Date(news.date).getMonth();
  //     if (!months.includes(month)) {
  //       // On ajoute 1 au mois pour obtenir un nombre de 1 à 12 au lieu de 0 à 11. Car les mois sont indexés de 0 à 11 en JavaScript (method getMonth())
  //       months.push(month + 1);
  //     }
  //   }
  //   return months;
  // }, []).sort((a, b) => b - a);

  // utilisation des donnees provenant de la BD
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => month.month);
}

export async function getNewsForYear(year) {
  // utilisation des donnees provenant du fichier dummy-news.js
  // return DUMMY_NEWS.filter(
  //   (news) => new Date(news.date).getFullYear() === +year
  // );

  // utilisation des donnees provenant de la BD
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  // utilisation des donnees provenant du fichier dummy-news.js
  // return DUMMY_NEWS.filter((news) => {
  //   const newsYear = new Date(news.date).getFullYear();
  //   const newsMonth = new Date(news.date).getMonth() + 1;
  //   return newsYear === +year && newsMonth === +month;
  // });

  // utilisation des donnees provenant de la BD
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}
