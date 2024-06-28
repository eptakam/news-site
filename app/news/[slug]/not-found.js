/*
    ce composant s'affiche (est appele) si l'article dont on souhaite les details n'est pas trouvé. Il est accessible via l'URL /news/[slug]/not-found.
*/

export default function NewsNotFoundPage() {
  return (
    <div id="error">
      <h1>News not found!</h1>
      <p>Unfortunately, we could not find the requested article.</p>
    </div>
  );
}