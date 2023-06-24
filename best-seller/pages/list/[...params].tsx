import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Book {
  author: string;
  book_image: string;
  book_url: string;
  buy_links: {
    name: string;
    url: string;
  }[];
  title: string;
  description: string;
  primary_isbn10: string;
}

const id = () => {
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  // as string[] 없으면 왜 안 됨? array 맞는데
  const [listName] = (router.query.params as string[]) || [];
  useEffect(() => {
    (async () => {
      const bestSellers = await axios
        .get(`https://books-api.nomadcoders.workers.dev/list?name=${listName}`)
        .then((res) => res.data.results.books);

      setBestSellers(bestSellers);
      console.log(bestSellers, typeof bestSellers, Array.isArray(bestSellers));
    })();
  }, []);

  console.log(router);

  return (
    <>
      <h4>{router.query.id}</h4>
      <div>
        {bestSellers.map((best) => (
          <p key={best.primary_isbn10}>{best.title}</p>
        ))}
      </div>
    </>
  );
};

export default id;
