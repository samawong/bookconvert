import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { LanguageProvider } from "../islands/LanguageContext.tsx";

export default function App({ Component }: AppProps) {
  return (
    <LanguageProvider>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Component />
    </LanguageProvider>
  );
}