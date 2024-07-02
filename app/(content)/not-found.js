/*
    ce composant s'affiche (est appele) si la page que l'on desire acceder n'est pas trouvée. Il est accessible via l'URL /not-found.
*/

export default function NotFoundPage() {
  return (
    <div id="error">
      <h1>News not found!</h1>
      <p>Sorry, the news you are looking for does not exist.</p>
    </div>
  );
}