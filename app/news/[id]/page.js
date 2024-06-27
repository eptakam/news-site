import Link from "next/link";

export default function NewsDetail({params}) {
  const idNews = params.id;
  return (
    <main>
      <h1>News Detail</h1>
      <p>Here is the detail of the news</p>
      <p>News id: {idNews}</p>
    </main>
  );
}