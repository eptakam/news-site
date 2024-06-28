import Link from "next/link";
import NavLink from "./nav-link";

export default function MainHeader() {
  /*
    je desire mettre en surbrillance le lien de navigation qui est utilise
    pour y parvenir, il connaitre l'url actuel et comparer avec les urls des liens de navigation
    pour cela, nous allons utiliser le hook usePathname de next/navigation qui a besoin d'un composant client pour fonctionner

    Attention: en mettant 'use client' au debut du fichier, nous transformerons les autres composants en composants client. ce qui n'est pas une bonne pratique

    nous allons donc creer un composant client dedie a cela <NavLink /> et l'importer ou on en a besoin par la suite
  */

  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news">News</NavLink>
          </li>
          <li>
            <NavLink href="/archive">Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
