'use client';
import { Provider } from "jotai";
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import LayoutDispatcher from "./layout/layoutDispatcher";
import StyledJsxRegistry from './registry';

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>Jitera Deposit</title>
        <link rel="shortcut icon" href={"./favicon.png"} />
      </head>
      <body className={inter.className}>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <StyledJsxRegistry>
              <LayoutDispatcher>
                {children}
              </LayoutDispatcher>
            </StyledJsxRegistry>
          </QueryClientProvider>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  )
}
