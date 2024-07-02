/*
    en general, dans un site web, la page d'accueil est la page principale d'un site web. et elle a un look et une sensation différente des autres pages du site. cad elle n'a pas de barre de navigation, de pied de page, etc.

    le probleme est que dans next.js, on ne peut pas créer une page sans le layout de base qui contient la barre de navigation (meme barre pour toutes les pages). 

    donc ce que nous allons essayer de faire, c'est de creer un 'rootLayout' pour la page d'accueil et un autre different pour le reste des pages. 

    NextJs permet cela avec le concept appele 'route group'.

    on parametre un 'route group' en ajoutant un dossier dans le dossier 'app' en suivant la nomenclature suivante: 'app/(nom_du_groupe_de_route)'. dans notre cas, nous allons creer un dossier 'app/(content)'  

    bien noter que ce nouveau dossier n'ajoute rien a l'url. apres cela, nous deplacerons toutes nos autres routes (archive et news) ainsi que le fichier layout.js dans ce dossier 'app/(content)'.

    on creera un autre 'route group' pour la home page en creant un dossier 'app/(home)'. Puis nous dupliquerons le fichier layout.js dans ce dossier sauf que cette fois, nous enleverrons le composant pour la barre de navigation (<MainHeader />).

    pour finir, nous deplacerons le fichier d'acceuil 'app/page.js' dans le dossier 'app/(home)' et le fichier not-found.js dans le dossier 'app/(content)'.
  
*/

import logo from '@/assets/logo.jpg'
import Link from 'next/link';

export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A newspaper" />
      <h1>A News Site For The Next Generation</h1>
      <p>
        Next News is here to deliver you all the latest news - concise &
        unbiased!
      </p>

      <p>
        NextNews aims to provide you with the latest news in a concise and
        unbiased manner. We strive to deliver the news in a way that is easy to
        understand and to the point. We want to keep you informed without
        overwhelming you with unnecessary information.
      </p>

      <p>
        We employ a team of dedicated journalists who are committed to
        delivering the news in a fair and unbiased manner. Our team is
        passionate about keeping you informed and up to date with the latest
        news.
      </p>

      <p>
        <Link href="/news">Read the latest news</Link>
      </p>
    </div>
  );
}

