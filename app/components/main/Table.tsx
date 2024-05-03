"use client";
import { SimulationRun, SimulationSession } from "@/lib/simulation/types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

export function Table({
  data,
  sessions,
}: {
  data: SimulationRun[];
  sessions: Record<string, SimulationSession>;
}) {
  const columns = useMemo<MRT_ColumnDef<SimulationRun>[]>(
    () => [
      {
        accessorKey: "time",
        header: "Time",
        size: 100,
      },
      {
        accessorKey: "session_id",
        header: "Session Id",
      },
      {
        accessorFn: (row) =>
          sessions && sessions[row.session_id]
            ? sessions[row.session_id].name
            : "",
        header: "Session Name",
      },
      {
        accessorKey: "initialTemperature",
        header: "Initial Temperature (°C)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
      {
        accessorKey: "finalTemperature",
        header: "Final Temperature (°C)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
      {
        accessorKey: "heatAdded",
        header: "Heat Added (J)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
      {
        accessorKey: "cummulativeHeatAdded",
        header: "Cummulative Heat Added (J)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
      {
        accessorKey: "heatLossAmbient",
        header: "Heat Loss Ambient (J)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
      {
        accessorKey: "cummulativeHeatLossAmbient",
        header: "Cummulative Heat Loss Ambient (J)",
        Cell: ({ cell }) => {
          const t = cell.getValue<number | string>();

          return <span>{typeof t === "number" ? t.toFixed(2) : t}</span>;
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    paginationDisplayMode: "pages",
    layoutMode: "grid",
    enableDensityToggle: false,
    enableColumnResizing: true,
    initialState: {
      density: "xs",
    },
    mantineTableProps: {
      striped: true,
    },
  });

  return <MantineReactTable table={table} />;
}
