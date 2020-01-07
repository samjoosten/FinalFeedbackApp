export default class Constants {
    //don't forget slashes!!!!

    //heidi
    //static url = 'http://3785ce28.ngrok.io/'

    //team frontend
    static url = 'http://3785ce28.ngrok.io/';

    static makeId() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < charactersLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
