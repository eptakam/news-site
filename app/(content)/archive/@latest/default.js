/*
    Important:
      - lorsqu'on travaille avec des parallel routes, il faut garder a l'esprit qu'ils doivent toujours fiter ensemble sinon il y aura des erreurs comme quoi le contenu de la page n'est pas trouve (cas ou il existe des not found page). cad qu'ils doivent toujours avoir la meme structure. 

      - par exemple @archive/[year]/page.js et @latest/page.js creera cette erreur. car @latest/page.js n'a pas de parametre dynamique. il faut donc creer un autre sous dossier dans @latest de maniere a avoir la meme structure que @archive/[year]/page.js en faisant @latest/[year]/default.js et mettre un contenu dedans.

      - si l'on se rend compte par exemple que le contenu de se default.js est le meme que celui de @latest/page.js, on peut donc deplacer le contenu de @latest/page.js dans @latest/[year]/default.js et supprimer @latest/page.js et le sous dossier @latest/[year] de facon a rester finalement avec @latest/default.js comme nous l'avons fait dans notre cas.
*/

import NewsList from "@/components/news/news-list";
import { getLatestNews } from "@/lib/news";


export default async function LatestNewsPage() {
  const latestNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}