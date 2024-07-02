/*  
    on peut remarquer que la page n'occupe pas tout l'espace et qu'elle n'est pas egalement supperposee a l'autre page.

    pour resoudre ce probleme, nous allons creer un fichier layout.js dans le dossier components. car c'est le layout qui determine comment les pages sont affichees.

    pour ce faire, nous pouvons creer deux sous-dossiers dans le dossier news/[slug]. l'un 'news/[slug]/@details' qui contiendra les details sur l'article de presse et dans ce cas, il faudra deplacer le fichier 'news/[slug]/page.js' qui contient les details d'un article de presse dans ce dossier. l'autre dossier 'news/[slug]/@modal' premettra la gestion de la superposition de la page d'image sur la page de details de l'article de presse.

    mais dans notre cas, vue que nous utilisons les 'parallel routes', nous pouvons aussi juste  creer un fichier layout.js dans le dossier 'news/[slug]/@modal' pour gerer la superposition de la page d'image sur la page de details de l'article de presse. et les details de l'article de presse seront dans ce fichier seront passees en props ({children}) a ce layout.

    vue que le 'parallel routes' 'news/[slug]/@modal' est pour intercepter l'image, nous deplacerons le sous-dossier 'news/[slug]/image' dans le dossier 'news/[slug]/@modal' pour que le path soit 'news/[slug]/@modal/(.)image'

    il ne faut pas perdre de vue que /@modal/(.)image/page.js ne pour etre affichee que si une url d'image est interceptee, ce n'est qu'a ce moment que nous ouvrirons le modal.
    Pour rendre cela fonctionnel, il faut ajouter un fichier page.js ou default.js a l'exterieur du dossier d'interception /@modal/(.)image/  cad /@modal/page.js ou /@modal/default.js 

    au cas ou il y a une erreur lorsqu'on fait le refresh de l'image, il faut utiliser default.js a la place de page.js

    bien garder a l'esprit que le layout est un composant client et que les pages interceptees sont des composants client. donc, il faudra importer les composants client dans le layout pour qu'ils soient affiches

    note: 
      si l'on veut retourner a la page precedente, en cliquant sur le background du modal, il faut ajouter un event listener sur le background du modal pour fermer le modal cad au niveau du composant client intercepte 'InterceptedImagePage' qui est dans le dossier 'news/[slug]/@modal/(.)image' et non dans le layout.

      cela est appele 'navigation programmatique' et est possible grace au hook 'useRouter' de next/navigation
*/

export default function NewsDetailLayouta({ children, modal }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
