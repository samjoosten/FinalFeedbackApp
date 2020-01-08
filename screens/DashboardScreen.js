import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import Bar from "../components/Bar";
import styles from "../style";
import CategoryDistr from "../components/CategoryDistr";
import SmileysAvgPerApp from "../components/SmileysAvgPerApp";
import LineChart2019 from "../components/LineChart2019";
import {
  IndicatorViewPager,
  PagerTitleIndicator,
} from 'rn-viewpager';
import ajax from "../ajax";
import PieChartWithClickSlices from './../components/PieChartWithClickSlices';
import LineChart2020 from './../components/LineChart2020';

const apiHost = ajax.getApiHost() + "/get";

class DashboardScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      feedbacksPerYear2019: [],
      feedbacksPerYear2020: [],
      months: [],
      os: this.getData(),
      loading: false,
      smileys: [],
      refreshing: false,
      avgPerApp: [],
      catDistr: []
    };
  }

  componentDidMount() {
    this._getFeedbackAmountPerYear2019();
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getAvgPerApp();
    this._getCatDistr();
  }

  componentDidUpdate(){
  }

  _getCatDistr = async () => {
    await fetch(ajax.getApiHost() + "/get/catDistr", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          catDistr: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getAvgPerApp = async () => {
    await fetch(ajax.getApiHost() + "/getAvgPerApp", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          avgPerApp: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getFeedbackAmountPerYear2019 = async () => {
    await fetch(apiHost + "/feedbacks/year/2019", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          feedbacksPerYear: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getFeedbackAmountPerYear2020 = async () => {
    await fetch(apiHost + "/feedbacks/year/2020", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          feedbacksPerYear: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getOsAmount = async () => {
    await fetch(apiHost + "/os2/android+ios", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          os: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return {x: bar + 1, y: random(2, 10)};
    });
  }

  _getSmileyRangeAmount = async () => {
    await fetch(apiHost + "/linecount/smiley", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          smileys: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this._getCatDistr();
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getAvgPerApp();
    this._getFeedbackAmountPerYear2020();
    this._getFeedbackAmountPerYear2019().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const feedbacksPerYear2019 = this.state.feedbacksPerYear2019;
    const feedbacksPerYear2020 = this.state.feedbacksPerYear2020;
    const os = this.state.os;
    const smileyRange = this.state.smileys;
    const avgPerAppData = this.state.avgPerApp;
    const catDistrData = this.state.catDistr; 

    return (
       <View style={[styles.container]}>
        <StatusBarAdjust />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.mlr10, styles.ptb10]}>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold]}>
                Feedback amount per year
              </Text>         
                <LineChart2019
                feedbacksPerYear={feedbacksPerYear} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} 
                />
            </View>
            <IndicatorViewPager
              style={{ height: 550 }}
              indicator={this._renderSmileyChartsTitleIndicator()}>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_bold, styles.text_white]}>
                Satisfaction index
              </Text>
              <PieChartWithClickSlices
                smileys={smileyRange} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
              />
            </View>
            <View style={styles.panel_Dashboard}>           
                <Text
                  style={[styles.text_white, styles.text_bold, styles.ptb10]}
                >
                  Average rating per app
                </Text>
                <SmileysAvgPerApp
                avgPerApp={avgPerAppData}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
                />
            </View>
            </IndicatorViewPager>
            <IndicatorViewPager
              style={{ height: 550 }}
              indicator={this._renderOSCatTitleIndicator()}>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold, styles.ptb10]}>
                OS distribution
              </Text>
                <Bar 
                os={os}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
                />
            </View>
            <View style={styles.panel_Dashboard}>
              <View>
                <Text
                  style={[styles.text_bold, styles.text_white, styles.ptb10]}
                >
                  Category distribution
                </Text>
              <CategoryDistr
              catDistr={catDistrData}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}
              /> 
              </View>
            </View>
            </IndicatorViewPager>
          </View>
        </ScrollView>
        </View>
    );
  }
  _renderLineChartsTitleIndicator() {
    return <PagerTitleIndicator 
            itemTextStyle={{color: 'white'}}
            style={{backgroundColor:'#6f81a3'}} 
            titles={['2019', '2020']} />;
  }
  _renderSmileyChartsTitleIndicator() {
    return <PagerTitleIndicator 
            itemTextStyle={{color: 'white'}}
            style={{backgroundColor:'#6f81a3'}} 
            titles={['Smiley rating', 'App rating']} />;
  }
  _renderOSCatTitleIndicator() {
    return <PagerTitleIndicator 
            itemTextStyle={{color: 'white'}}
            titles={['Mobile OS', 'Category']}
            style={{backgroundColor:'#6f81a3'}} />;
  }
}

export default DashboardScreen;
