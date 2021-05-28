import React from "react";
import { Data } from "src/interfaces/Interfaces";
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { COLORS } from "../constants/Colors";
const COLOR_DEFAULT = COLORS.darkerOrange;
const COLOR_NOTHOVER = COLORS.primaryOrange;

const whiteStyle = {
  axis: { stroke: "white" },
  axisLabel: { fontSize: 20, padding: 30, fill: "white" },
  ticks: { stroke: "white", size: 5 },
  tickLabels: { fontSize: 15, padding: 5, fill: "white" },
};

interface ChartBarProps {
  data: Data[];
}
const ChartBar = ({ data }: ChartBarProps) => {
  return (
    <VictoryChart domainPadding={{ x: 80, y: [0, 20] }} scale={{ x: "time" }}>
      <VictoryBar
        style={{ data: { fill: COLOR_DEFAULT }, labels: { color: "#fff" } }}
        data={data}
        x="label"
        y="value"
        labels={({ datum }) => [datum.y, datum.x]}
        labelComponent={
          <VictoryTooltip
            constrainToVisibleArea
            flyoutHeight={40}
            flyoutWidth={40}
          />
        }
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "labels",
                    mutation: (props) => {
                      return props.text === "clicked"
                        ? null
                        : { text: "clicked" };
                    },
                  },
                ];
              },

              onMouseEnter: () => {
                return [
                  {
                    eventKey: "all",
                    target: "data",
                    mutation: () => ({
                      style: {
                        fill: COLOR_NOTHOVER,
                      },
                    }),
                  },
                  {
                    target: "data",
                    mutation: () => ({
                      style: {
                        fill: COLOR_DEFAULT,
                      },
                    }),
                  },
                ];
              },

              onMouseLeave: () => {
                return [
                  {
                    eventKey: "all",
                    target: "data",
                    mutation: () => ({
                      style: {
                        fill: COLOR_DEFAULT,
                      },
                    }),
                  },
                  {
                    target: "data",
                    mutation: () => ({
                      style: {
                        fill: COLOR_DEFAULT,
                      },
                    }),
                  },
                ];
              },
            },
          },
        ]}
      />
      <VictoryAxis style={whiteStyle} />
      <VictoryAxis dependentAxis style={whiteStyle} />
    </VictoryChart>
  );
};

export default ChartBar;
