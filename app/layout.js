"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
import store from "@/redux/store";
import { Provider } from "react-redux";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html className="h-full bg-gray-100" lang="en">
          <body className="h-full">
            <div id="__next">
              <ResponsiveNavbar />
              {children}
            </div>
          </body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
}
