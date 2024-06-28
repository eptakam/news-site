import Link from "next/link";

import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsPage() {
  return (
    <div>
      <h1>News Page</h1>
      <ul className="news-list">
        {/* <li>
          <Link href="news/buzz">Buzz</Link><br />
        </li>
        <li>
          <Link href="news/breaking">Breaking</Link><br />
        </li>
        <li>
          <Link href="news/it-news">IT news</Link><br />
        </li> */}

        {/* au lieu d'utiliser les liens ci-dessus, nous allons utiliser les données de DUMMY_NEWS */}
        {DUMMY_NEWS.map((newsItem) => (
          // newsItem : represente chaque element du tableau DUMMY_NEWS
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img 
                src={`/images/news/${newsItem.image}`} 
                alt={newsItem.title} 
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}