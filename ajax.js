//const apiHost = "http://3785ce28.ngrok.io/";
//const apiHost = "http://10.24.24.244:8085";
// http://daf2e285.ngrok.io
const apiHost = "http://4ed0970f.ngrok.io/";

export default {
  getApiHost() {
    return apiHost.toString();
  },

  async getAllFeedbacks() {
    try {
      const response = await fetch(apiHost + "/get/GroupByTag");
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackDetail(feedbackTag) {
    try {
      const response = await fetch(apiHost + "/get/nested/" + feedbackTag);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackToDeleteByTag(tagID) {
    try {
      const response = await fetch(apiHost + "/areyousure/delete/" + tagID);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchFeedbacksFilteredResult(appName) {
    try {
      const response = await fetch(apiHost + "/get/FbByAppName/" + appName);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getAppNames() {
    try {
      const response = await fetch(apiHost + "/get/apps");
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getQuestionsAndAvg(app) {
    try {
      const response = await fetch(
        apiHost + "/getAvgRatingPerQuestPerApp/" + app
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
};
