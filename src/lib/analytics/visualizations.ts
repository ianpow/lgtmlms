import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveStream } from "@nivo/stream";

export const generateHeatmap = (data: any[]) => ({
  data: data.map((d) => ({
    hour: new Date(d.timestamp).getHours(),
    day: new Date(d.timestamp).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    value: d.duration,
  })),
  config: {
    margin: { top: 60, right: 90, bottom: 60, left: 90 },
    axisTop: { orient: "top", tickSize: 5, tickPadding: 5, tickRotation: -90 },
    axisRight: { orient: "right", tickSize: 5, tickPadding: 5 },
    axisBottom: { orient: "bottom", tickSize: 5, tickPadding: 5 },
    axisLeft: { orient: "left", tickSize: 5, tickPadding: 5 },
    cellOpacity: 1,
    cellBorderColor: { from: "color", modifiers: [["darker", 0.4]] },
    labelTextColor: { from: "color", modifiers: [["darker", 1.8]] },
  },
});

export const generateActivityCalendar = (data: any[]) => ({
  data: data.map((d) => ({
    day: d.date,
    value: d.hours,
  })),
  config: {
    from: new Date(data[0].date),
    to: new Date(data[data.length - 1].date),
    emptyColor: "#eeeeee",
    colors: ["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    yearSpacing: 40,
    monthBorderColor: "#ffffff",
    dayBorderWidth: 2,
    dayBorderColor: "#ffffff",
  },
});

export const generateStreamGraph = (data: any[]) => ({
  data: data.map((d) => ({
    timestamp: d.date,
    ...d.categories,
  })),
  config: {
    keys: Object.keys(data[0].categories),
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    },
    axisLeft: {
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    },
    offsetType: "silhouette",
    colors: { scheme: "nivo" },
    fillOpacity: 0.85,
    borderColor: { theme: "background" },
  },
});

export const customChartThemes = {
  light: {
    background: "#ffffff",
    textColor: "#333333",
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: "#777777",
          strokeWidth: 1,
        },
      },
    },
    grid: {
      line: {
        stroke: "#dddddd",
        strokeWidth: 1,
      },
    },
  },
  dark: {
    background: "#1a1a1a",
    textColor: "#ffffff",
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: "#888888",
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: "#888888",
          strokeWidth: 1,
        },
      },
    },
    grid: {
      line: {
        stroke: "#333333",
        strokeWidth: 1,
      },
    },
  },
};
