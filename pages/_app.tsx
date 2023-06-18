import "../styles/globals.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CeloProvider, Alfajores } from "@celo/react-celo";
import Contract from '../pages/confirm';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;


  return (
    <CeloProvider
      dapp={{
        name: "Health Care For All",
        description: "Revolutionalizing the face of healthcare",
        url: "https://healthplus.celo",
        icon: "",
      }}
      defaultNetwork={Alfajores.name}
    >
      <Layout>
        <AnyComponent {...pageProps} />
        <Contract />
      </Layout>
    </CeloProvider>
  );
}

export default MyApp;