"use client";
import { ActionIcon, AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHistory } from "@tabler/icons-react";
import Aside from "./components/aside/Aside";
import { Main } from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";

export default function IndexPage() {
  const [configuratorOpened, { toggle: configuratorToggle }] = useDisclosure();
  const [historyOpened, { toggle: historyToggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !configuratorOpened,
        },
      }}
      aside={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !historyOpened,
        },
      }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md">
          <Burger
            opened={configuratorOpened}
            onClick={configuratorToggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Text>Configurator</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar pt="xs" pr="md" pl="md">
        <Group justify="flex-end">
          <Burger
            opened={configuratorOpened}
            onClick={configuratorToggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Main />
      </AppShell.Main>

      <AppShell.Aside p="md">
        <Group justify="flex-end">
          <Burger
            opened={historyOpened}
            onClick={historyToggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
        <Aside />
      </AppShell.Aside>

      <AppShell.Footer hiddenFrom="sm">
        <Group h="100%" px="md">
          <ActionIcon
            onClick={historyToggle}
            hiddenFrom="sm"
            size="lg"
            variant="subtle"
            color="gray"
          >
            <IconHistory />
          </ActionIcon>
          <Text>History</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
