import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Provider } from "jotai";
import "mantine-react-table/styles.css";
import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Solar Panel Heat Transfer Simulator",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <MantineProvider>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}

// <section className={styles.container}>
//   <header className={styles.header}>Header</header>

//   <main className={styles.main}>{children}</main>

//   <footer className={styles.footer}>Footer</footer>
// </section>
