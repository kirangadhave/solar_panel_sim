"use client";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Button,
  Group,
  List,
  Popover,
  Text,
} from "@mantine/core";
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
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group justify="flex-start">
            <Burger
              opened={configuratorOpened}
              onClick={configuratorToggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text>Solar Panel Heat Transfer Simulation</Text>
          </Group>
          <Group justify="flex-end">
            <Popover shadow="lg" withArrow>
              <Popover.Target>
                <Button variant="outline">Help</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <List m="sm" ml="0" mr="lg" maw="300px" withPadding>
                  <List.Item>
                    Use the left side bar to set various config values.
                  </List.Item>
                  <List.Item>
                    Click "Run" to simulate heat transfer for 24 hours starting
                    at midnight.
                  </List.Item>
                  <List.Item>
                    You can enable show/hide previous sessions on the right side
                    bar. Runs from all "shown" sessions are included in the main
                    view.
                  </List.Item>
                  <List.Item>
                    You can switch between visualizations and the raw data table
                    using the tabs.
                  </List.Item>
                </List>
              </Popover.Dropdown>
            </Popover>
            <Anchor
              href="https://github.com/kirangadhave/solar_panel_sim/blob/main/README.md"
              target="_blank"
            >
              Readme
            </Anchor>
          </Group>
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
