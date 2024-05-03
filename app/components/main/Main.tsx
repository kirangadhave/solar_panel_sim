import { sessionListAtom, useVisibleSessions } from "@/lib/simulation/atoms";
import { SimulationRun, SimulationSession } from "@/lib/simulation/types";
import { Center, Group, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { VegaLite } from "react-vega";
import { createLineChart } from "./charts";

export function Main() {
  const [sessionList] = useAtom(sessionListAtom);
  const [visibleSessionIds] = useVisibleSessions();

  const visibleSessions = useMemo(() => {
    return visibleSessionIds
      .reduce((acc, id) => {
        const session = sessionList[id];
        if (session) {
          acc.push(session);
        }

        return acc;
      }, [] as SimulationSession[])
      .sort((a, b) => (new Date(b.createdOn) > new Date(a.createdOn) ? 1 : -1));
  }, [sessionList, visibleSessionIds]);

  const runs = useMemo(() => {
    return visibleSessions.reduce((acc, session) => {
      return [...acc, ...session.runs];
    }, [] as SimulationRun[]);
  }, [visibleSessions]);

  if (visibleSessions.length === 0) {
    return (
      <Center>
        <Text>Please select atleast one simulation to visualize.</Text>
      </Center>
    );
  }

  if (runs.length > 0) console.log(Object.keys(runs[0]));

  return (
    <Stack align="center">
      <Group justify="center">
        <VegaLite
          data={{
            runs: [...runs],
            sessions: visibleSessions.map(({ id, name }) => ({ id, name })),
          }}
          spec={createLineChart("finalTemperature", "Final Temperature (°C)")}
        />
      </Group>
      <Group justify="center">
        <VegaLite
          data={{
            runs: [...runs],
            sessions: visibleSessions.map(({ id, name }) => ({ id, name })),
          }}
          spec={createLineChart(
            "heatAdded",
            "Heat Transfer from Solar Panel (J)"
          )}
        />
        <VegaLite
          data={{
            runs: [...runs],
            sessions: visibleSessions.map(({ id, name }) => ({ id, name })),
          }}
          spec={createLineChart(
            "cummulativeHeatAdded",
            "Cummulative Heat Transfer from Solar Panel (J)"
          )}
        />
      </Group>

      <Group justify="center">
        <VegaLite
          data={{
            runs: [...runs],
            sessions: visibleSessions.map(({ id, name }) => ({ id, name })),
          }}
          spec={createLineChart(
            "heatLossAmbient",
            "Heat Loss to Environment (J)"
          )}
        />
        <VegaLite
          data={{
            runs: [...runs],
            sessions: visibleSessions.map(({ id, name }) => ({ id, name })),
          }}
          spec={createLineChart(
            "cummulativeHeatLossAmbient",
            "Cummulative Heat Loss to Environment (J)"
          )}
        />
      </Group>
    </Stack>
  );
}
