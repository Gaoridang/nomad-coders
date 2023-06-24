import Layout from "@/components/layout";
import { AppProps } from "next/app";

interface Props {}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
