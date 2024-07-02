/*
    Note:
      cette route (api) servira a ne pas afficher une page ordinaire d'ou elle n'aura pas besoin de layout.
      vu qu'elle n'aura pas de layout, elle ne pas se nommer 'page.js' mais 'route.js'.

      avec le fichier 'route.js', nous allons parametrer ce qu'on appelle 'route handlers' dans next.js.

      les 'route handlers' sont des fonctions dans lesquelles nous pouvons exporter différentes fonctions qui doivent être nommées GET OU POST OU PATCH OU DELETE OU PUT.
      il doivent avoir egalement 'HtDP' method name.

      avec les 'route handlers', nous retournerons les fichiers json
*/

export function GET(request) {
  console.log(request);
  // return Response.json();
  return new Response('hello world');
}

// export function POST(request) {}