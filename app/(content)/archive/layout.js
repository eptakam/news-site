/*
    Note:
        le but est de pour creer des routes paralleles et d'etre capable d'afficher des donnees issues de routes/path differentes sur une meme page

        - on va creer un fichier layout.js dans le dossier archive. et c'est dans ce fichier que nous allons parametrer les routes paralleles

        - ne pas oublier que nous aurons un sous dossier par route parallele. ces sous dossiers ont leur nom qui commence par @

        - en general, le composant qui est dans un layout recois {children} en props. c'est ce {children} qui permet d'afficher les donnees de la page actuelle. Dans le cas des routes paralleles, nous ne passerons pas {children} en props mais plutot le nom qui suit le @ dans le nom du/des sous dossiers.

        - dans notre cas, nous voulons avoir deux routes paralleles (@archive et @latest). nous passerons donc en props {archive, latest} au lieu de {children} dans le composant layout
*/

export default function ArchiveLayout({archive, latest}) {
    return (
        <div>
            <h1>News Archive</h1>
            <section id="archive-filter">{archive}</section>
            <section id="archive-latest">{latest}</section>
        </div>
    );
}