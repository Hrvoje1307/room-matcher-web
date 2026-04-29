import type { AppProps } from "next/app";
import { QueryProvider } from "@/shared/providers/query-provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryProvider>
            <Component {...pageProps} />
        </QueryProvider>
    );
}
