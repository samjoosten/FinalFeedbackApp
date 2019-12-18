import React, { Component } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
  VictoryLabel
} from "victory-native";
import { PropTypes } from "prop-types";
import { Text, View } from "react-native";

class LineChart extends React.PureComponent {
  static propTypes = {
    feedbacksPerYear: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    const feedbacksCount = this.props.feedbacksPerYear;
    const data =[
      { x: "Jan", y: feedbacksCount[0] },
      { x: "Feb", y: feedbacksCount[1] },
      { x: "Mar", y: feedbacksCount[2] },
      { x: "Apr", y: feedbacksCount[3] },
      { x: "May", y: feedbacksCount[4] },
      { x: "Jun", y: feedbacksCount[5] },
      { x: "Jul", y: feedbacksCount[6] },
      { x: "Aug", y: feedbacksCount[7] },
      { x: "Sep", y: feedbacksCount[8] },
      { x: "Oct", y: feedbacksCount[9] },
      { x: "Nov", y: feedbacksCount[10] },
      { x: "Dec", y: feedbacksCount[11] }
    ]

    return (
      <View>
        {feedbacksCount.length !== 0 ? (
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer />}
          >
          <VictoryLabel x={5} y={30} style={{fill: "#f0f0f0", fontSize: 11, fontStyle: "italic", fontFamily: "'Fira Sans', sans-serif"}} text={"Total amount \nof feedbacks"}/>
            {feedbacksCount.length !== 0 ? (
              <VictoryLine
                style={{
                  data: { stroke: "#ab34eb" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ]
                }}
                data={data}
              />
            ) : (
              <Text> No data to display </Text>
            )}
            {feedbacksCount.length !== 0 ? (
              <VictoryScatter
                style={{ data: { fill: "#ab34eb" } }}
                size={5}
                labelComponent={<VictoryTooltip constrainToVisibleArea />}
                data={data}
                labels={({ datum }) => datum.y}
              />
            ) : (
              <Text> No data to display </Text>
            )}
          </VictoryChart>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

export default LineChart;
