import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface Result {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
}

export default function Page({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.list_name_encoded}>{result.display_name}</li>
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
