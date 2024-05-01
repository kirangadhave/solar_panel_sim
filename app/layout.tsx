import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import StoreProvider from "./StoreProvider";

import "./styles/globals.css";
import "@mantine/core/styles.css";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Solar Panel Sim",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <StoreProvider>{children}</StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

// <section className={styles.container}>
//   <header className={styles.header}>Header</header>

//   <main className={styles.main}>{children}</main>

//   <footer className={styles.footer}>Footer</footer>
// </section>
