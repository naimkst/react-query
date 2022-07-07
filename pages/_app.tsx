import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;


// const client = new GraphQLClient({
//   url: "https://rickandmortyapi.com/graphql",
// });

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <ClientContext.Provider value={client}>
//         <Component {...pageProps} />
//       </ClientContext.Provider>
//     </>
//   );
// }