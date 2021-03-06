import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";
import Bar from "../components/charts/Bar";
import CategoryDistr from "../components/charts/CategoryDistr";
import SmileysAvgPerApp from "../components/charts/SmileysAvgPerApp";
import LineChart2020 from "../components/charts/LineChart2020";
import LineChart2019 from "../components/charts/LineChart2019";
import {
  IndicatorViewPager,
  PagerTitleIndicator,
} from 'rn-viewpager';
import ajax from "../ajax";
import PieChartWithClickSlices from './../components/charts/PieChartWithClickSlices';


const apiHost = ajax.getApiHost() + "/get";

/*
Dashboard screen showing the charts in Carousel Views, implementing refresh control, 
contains methods to fetch from REST server and passes the callback as props to the charts
*/

class DashboardScreen extends Component {
  state = {
    feedbacksPerYear2020: [],
    feedbacksPerYear2019: [],
    months: [],
    os: [],
    loading: false,
    smileys: [],
    refreshing: false,
    avgPerApp: [],
    catDistr: []
  };

  componentDidMount() {
    this._getFeedbackAmountPerYear2019();
    this._getFeedbackAmountPerYear2020();
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getAvgPerApp();
    this._getCatDistr();
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
          feedbacksPerYear2019: responseJson
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
          feedbacksPerYear2020: responseJson
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
    this._getFeedbackAmountPerYear2019();
    this._getFeedbackAmountPerYear2020().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const feedbacksPerYear2020 = this.state.feedbacksPerYear2020;
    const feedbacksPerYear2019 = this.state.feedbacksPerYear2019;
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
          <IndicatorViewPager
              style={styles.panel_Dashboard}
              indicator={this._renderLineChartsTitleIndicator()}>
            <View>
              <Text style={[styles.text_white, styles.titles_charts, styles.text_bold]}>
                Feedback amount per year
              </Text>         
                <LineChart2019 
                feedbacksPerYear2019={feedbacksPerYear2019} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} 
                />
            </View>
            <View>
              <Text style={[styles.text_white, styles.titles_charts, styles.text_bold]}>
                Feedback amount per year
              </Text>         
                <LineChart2020 
                feedbacksPerYear2020={feedbacksPerYear2020} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} 
                />
            </View>
          </IndicatorViewPager>
          <IndicatorViewPager
              style={styles.panel_Dashboard}
              indicator={this._renderSmileyChartsTitleIndicator()}>
            <View>
              <Text style={[styles.text_bold, styles.titles_charts, styles.text_white]}>
                Satisfaction index
              </Text>
              <PieChartWithClickSlices
                smileys={smileyRange} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
              />
            </View>
            <View>           
                <Text style={[styles.text_white, styles.titles_charts, styles.text_bold]}>
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
              style={styles.panel_Dashboard}
              indicator={this._renderOSCatTitleIndicator()}>
            <View>
              <Text style={[styles.text_white, styles.titles_charts, styles.text_bold]}>
                OS distribution
              </Text>
                <Bar 
                os={os}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
                />
            </View>
            <View>
              <View>
                <Text style={[styles.text_white, styles.titles_charts, styles.text_bold]}>
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
