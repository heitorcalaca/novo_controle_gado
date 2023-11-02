"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import TailWindNavbar from "@/components/TailWindNavbar";
import store from "@/redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html className="h-full bg-gray-100" lang="en">
          <body className="h-full">
            <div>
              <TailWindNavbar />
              {children}
            </div>
          </body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
}
