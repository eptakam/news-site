/*
    je desire mettre en surbrillance le lien de navigation qui est utilise.
    pour y parvenir, il faut connaitre l'url actuel et le comparer avec le/les urls des liens de navigation
    pour cela, nous allons utiliser le hook usePathname de next/navigation qui a besoin d'un composant client pour fonctionner

    Attention: en mettant 'use client' au debut du fichier, nous transformerons tous les autres composants en composants client. ce qui n'est pas une bonne pratique

    nous allons donc creer un composant client dedie a cela <NavLink /> et l'importer ou l'on en a besoin par la suite
  */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// le composant NavLink prend en parametre (props) l'url du lien de navigation ({href}) et le texte a afficher ({children})
export default function NavLink({ href, children }) {
  const path = usePathname(); // on recupere l'url actuel

  return (
    <Link href={href} className={path.startsWith(href) ? "active" : undefined}>
      {children}
    </Link>
  );
}
