import Layout from "@/components/layout";
import { AppProps } from "next/app";
import "../styles/globals.css";

interface Props {}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
