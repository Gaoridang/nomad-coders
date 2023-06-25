import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Book {
  author: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  book_url: string;
  buy_links: {
    name: string;
    url: string;
  }[];
  title: string;
  description: string;
  primary_isbn10: string;
}

const Detail = () => {
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState(false);
  // as string[] 없으면 왜 안 됨? array 맞는데
  const [listName] = (router.query.params as string[]) || [];
  console.log(listName, "list-name");
  useEffect(() => {
    setLoading(true);

    (async () => {
      const bestSellers = await axios
        .get(`https://books-api.nomadcoders.workers.dev/list?name=${listName}`)
        .then((res) => {
          setLoading(false);
          return res.data.results.books;
        });

      setBestSellers(bestSellers);
      console.log(bestSellers, typeof bestSellers, Array.isArray(bestSellers));
    })();
  }, [listName]);

  // console.log(router);

  return (
    <>
      <h4>{router.query.id}</h4>
      <div>
        {isLoading && "Loading..."}
        {bestSellers?.map((best, index) => (
          <div key={`${best.primary_isbn10}-${index}`}>
            <Image
              src={best.book_image}
              alt={best.title}
              width={best.book_image_width}
              height={best.book_image_height}
              placeholder="empty"
              priority={index === 0 ? true : false}
            />
            <button>
              <Link href={best.buy_links[0].url}> Buy Now</Link>
            </button>
          </div>
        ))}
        <style jsx>{``}</style>
      </div>
    </>
  );
};

export default Detail;
