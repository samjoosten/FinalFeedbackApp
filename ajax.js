//const apiHost = "http://10.24.24.244:8085";
//const apiHost = "http://192.168.43.95:8085";
//const apiHost = "http://10.24.24.244:8085";
// http://daf2e285.ngrok.io
const apiHost = "http://daf2e285.ngrok.io";

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
  // async getAllFeedbacks() {
  //   try {
  //     const response = await fetch(apiHost + "/get/time/desc");
  //     const responseJson = await response.json();
  //     return responseJson;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  async getFeedbackDetail(feedbackTag) {
    try {
      const response = await fetch(apiHost + "/get/nested/" + feedbackTag);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  // async getFeedbackDetail(feedbackId) {
  //   try {
  //     const response = await fetch(apiHost + "/get/id/" + feedbackId);
  //     const responseJson = await response.json();
  //     return responseJson;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
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
