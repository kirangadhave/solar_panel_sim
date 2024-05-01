"use client";
import { useAppSelector } from "@/lib/hooks";
import { calculateTemperature } from "@/lib/simulation";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "./components/navbar/Navbar";

export default function IndexPage() {
  const state = useAppSelector((selector) => ({ ...selector }));
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
        },
      }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Header</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        Final Temp after 1 hour: {calculateTemperature(state, 3600)}
      </AppShell.Main>

      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
}
