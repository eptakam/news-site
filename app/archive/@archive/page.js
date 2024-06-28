import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";

export default function archivePage() {
const years = getAvailableNewsYears();  // on recupere les annees disponibles (tableau d'annees) grace a la fonction getAvailableNewsYears() qui se trouve dans le fichier news.js du dossier lib

  return (
    <>
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
    </>
  );
}
