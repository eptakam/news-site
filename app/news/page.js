import Link from "next/link";

export default function NewsPage() {
  return (
    <div>
      <h1>News Page</h1>
      <ul className="news-list">
        <li>
          <Link href="news/buzz">Buzz</Link><br />
        </li>
        <li>
          <Link href="news/breaking">Breaking</Link><br />
        </li>
        <li>
          <Link href="news/it-news">IT news</Link><br />
        </li>
      </ul>
    </div>
  )
}