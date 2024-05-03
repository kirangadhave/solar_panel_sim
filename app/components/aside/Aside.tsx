import {
  sessionListAtom,
  useSessions,
  useVisibleSessions,
} from "@/lib/simulation/atoms";
import { SimulationSession } from "@/lib/simulation/types";
import {
  AppShell,
  Button,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { SessionCard } from "./SessionCard";

export default function Aside() {
  const [sessionList] = useAtom(sessionListAtom);
  const [visibleSessions, { show, hide }] = useVisibleSessions();
  const { deleteSessions } = useSessions();

  const sessionKeys = useMemo(() => {
    const sort = (filterPredicate?: (session: SimulationSession) => boolean) =>
      Object.values(sessionList)
        .filter((s) => (filterPredicate ? filterPredicate(s) : s))
        .sort((a, b) =>
          new Date(b.createdOn) > new Date(a.createdOn) ? 1 : -1
        )
        .map((s) => s.id);

    return sort();
  }, [sessionList, visibleSessions]);

  return (
    <>
      <Title ta="center" fw={500} order={3}>
        Previous Sessions
      </Title>
      <Divider mb="xs" />
      {sessionKeys.length === 0 ? (
        <Text ta="center">Please run a simulation using the left side-bar</Text>
      ) : (
        <Stack h="100%" gap="0">
          <Group gap="xs">
            <Button size="xs" onClick={() => show()} variant="white">
              Show All
            </Button>
            <Button size="xs" onClick={() => hide()} variant="white">
              Hide All
            </Button>
            <Button
              size="xs"
              onClick={() => deleteSessions()}
              variant="white"
              c="red"
            >
              Delete All
            </Button>
          </Group>
          <Divider mb="xs" mt="xs" />
          <AppShell.Section
            grow
            component={ScrollArea}
            type="auto"
            offsetScrollbars
          >
            <Stack>
              {sessionKeys.map((id) => (
                <SessionCard key={id} id={id} />
              ))}
            </Stack>
          </AppShell.Section>
        </Stack>
      )}
    </>
  );
}
