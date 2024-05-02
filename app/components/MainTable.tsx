import { SimulationRun } from "@/lib/simulation/types";
import { useAtom } from "jotai";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { sessionAtom } from "../page";

export default function MainTable() {
  const [session] = useAtom(sessionAtom);

  const columns = useMemo<MRT_ColumnDef<SimulationRun>[]>(
    () => [
      {
        accessorKey: "i",
        header: "Time",
        Cell: ({ row }) => {
          console.log(row);
          return (
            <span>
              {new Date((row.original as any).i * 1000)
                .toISOString()
                .slice(11, 16)}
            </span>
          );
        },
      },
      {
        accessorKey: "temp",
        header: "Initial Temperature",
      },
      {
        accessorKey: "newTemp",
        header: "New Temperature",
      },
      {
        accessorKey: "unHingedNewTemp",
        header: "Unsafe New Temp",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: session.runs,
  });

  return <MantineReactTable table={table} />;
}
