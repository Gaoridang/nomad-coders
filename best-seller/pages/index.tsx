import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect } from "react";

interface Result {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
}

export default function Page({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // useEffect(() => {
  //   const data = axios
  //     .get(
  //       "https://books-api.nomadcoders.workers.dev/list?name=hardcover-fiction"
  //     )
  //     .then((res) => res.data);

  //   console.log(data);
  // }, []);

  return (
    <ul>
      {results.map((result) => (
        <li key={result.list_name_encoded}>
          <Link
            href={{
              pathname: `list/${result.list_name_encoded}`,
            }}
          >
            {result.display_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const getServerSideProps: GetServerSideProps<{
  results: Result[];
}> = async () => {
  // results는 안 되고, { results }만 되는 이유?
  const { results } = await axios
    .get("https://books-api.nomadcoders.workers.dev/lists")
    .then((res) => res.data);
  console.log(typeof results, Array.isArray(results));
  return {
    props: {
      results,
    },
  };
};
