import { VisualizationSpec } from "react-vega";

export function createLineChart(
  attr: string,
  label = attr,
  height = 300,
  width = 300
): VisualizationSpec {
  return {
    width,
    height,
    data: { name: "runs" },
    transform: [
      {
        lookup: "session_id",
        from: {
          data: { name: "sessions" },
          key: "id",
          fields: ["name"],
        },
        as: ["Name"],
      },
      {
        calculate: "toDate(datum.time / 3600)",
        as: "time",
      },
    ],
    encoding: {
      x: {
        field: "time",
        type: "quantitative",
      },
    },
    layer: [
      {
        mark: "line",
        encoding: {
          y: { field: attr, type: "quantitative", axis: { title: label } },
          color: { field: "Name", type: "nominal" },
          tooltip: [
            { field: "Name", type: "nominal" },
            { field: "time", type: "temporal" },
          ],
        },
      },
      {
        mark: {
          type: "rule",
        },
        encoding: {
          opacity: {
            condition: { value: 0.3, param: "hover", empty: false },
            value: 0,
          },
          color: { value: "gray" },
          tooltip: [
            { field: "Name", type: "nominal" },
            { field: "time", timeUnit: "hours", type: "temporal" },
            { field: attr, type: "quantitative", title: label },
          ],
        },
        params: [
          {
            name: "hover",
            select: {
              type: "point",
              fields: ["time"],
              nearest: true,
              on: "pointerover",
              clear: "pointerout",
            },
          },
        ],
      },
    ],
  };
}
