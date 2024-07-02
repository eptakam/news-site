/*
ici nous allons coder des functions qui vont nous etre utiles et faciliter la gestion des donnees. comme par exemple, une fonction qui va nous permettre de recuperer les annees disponibles, une autre qui va nous permettre de recuperer les articles d'une annee donnee, etc.
*/
import sql from 'better-sqlite3'; // ne pas oublier d'installer 'better-sqlite3' dans le projet avec 'npm install better-sqlite3'

import { DUMMY_NEWS } from '@/dummy-news';

// creer une connexion a la BD
const db = sql('data.db');

export function getAllNews() {
  // return DUMMY_NEWS;

  // fetcher les donnees directement de la BD
  const news = db.prepare('SELECT * FROM news').all();
  return news;
}

export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() {
  /*
    Note:
        DUMMY_NEWS.reduce((years, news) => { ... }, [])

        la methode .reduce() prend deux parametres: une fonction callback (fonction reductrice) et une valeur initiale de l'accumulateur

        Ici, la valeur initiale est un tableau vide [], et la fonction réductrice est définie par (years, news) => { ... }.

        years: accumulateur des annees de publication de chaque article
        news: article en cours de traitement
  */
  return DUMMY_NEWS.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    // si l'annee de publication de l'article n'est pas deja dans le tableau years, on l'ajoute
    if (!years.includes(year)) {
      years.push(year);
    } // fin de la fonction reductrice (callback)
    return years;
  }, []).sort((a, b) => b - a);  // [] : indique que la valeur initiale de l'accumulateur est un tableau vide
}

export function getAvailableNewsMonths(year) {
  return DUMMY_NEWS.reduce((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    // Le symbole + devant year convertit la valeur de year en un nombre si ce n'est pas déjà le cas. Cela permet de s'assurer que la comparaison se fait entre deux nombres.
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {  
        // On ajoute 1 au mois pour obtenir un nombre de 1 à 12 au lieu de 0 à 11. Car les mois sont indexés de 0 à 11 en JavaScript (method getMonth())
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year) {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

export function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
