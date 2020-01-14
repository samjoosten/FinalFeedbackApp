import React, { Component } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
  VictoryLabel
} from "victory-native";
import CustomVictoryTheme from "../../theme/CustomVictoryTheme"
import { PropTypes } from "prop-types";
import { Text, View } from "react-native";

class LineChart2019 extends React.PureComponent {
  static propTypes = {
    feedbacksPerYear2019: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    const customTheme = {
      axis: {
        style: {
          tickLabels: {
            fill: 'white',
          },
        },
      },
    }
    const feedbacksCount = this.props.feedbacksPerYear2019;
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
            theme={ CustomVictoryTheme }
            containerComponent={<VictoryVoronoiContainer />}
          >
          <VictoryLabel x={5} y={30} style={{fill: "#ECEFF1", fontSize: 11, fontStyle: "italic"}} text={"Amount \nof feedbacks"}/>
            {feedbacksCount.length !== 0 ? (
              <VictoryLine
                animate={{ duration: 2000}}
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

export default LineChart2019;