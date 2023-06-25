import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import css from "styled-jsx/css";
// import { useEffect } from "react";

interface Result {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
}

export default function Page({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { className, styles } = css.resolve`
    a {
      color: black;
      text-decoration: none;
    }
  `;
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
            className={className}
            href={{
              pathname: `list/${result.list_name_encoded}`,
            }}
          >
            <button className="hover:scale-105 hover:bg-blue-200 bg-slate-200 transition-all ">
              {result.display_name}
            </button>
          </Link>
        </li>
      ))}
      <style jsx>
        {`
          ul {
            display: flex;
            flex-wrap: wrap;
          }
          li {
            list-style: none;
            color: black;
          }
          button {
            border: none;
            border-radius: 10px;
            padding: 14px;
            margin: 10px;
            font-size: 18px;
            cursor: pointer;
          }
        `}
      </style>
      {styles}
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
