var NodeHelper = require("node_helper");
var KosherZmanim = require("kosher-zmanim");
var moment = require("moment");

// TODO: Add refetching logic
module.exports = NodeHelper.create({
    start: function() {},
    
    socketNotificationReceived: function (notification, payload) {
        if (notification === 'FETCH_ZMANIM') {
            this.getZmanim(payload)
        }
        
        console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
    },

    getZmanim: function(config) {
        var self = this;
        
        const options = {
            date: new Date(),
            timeZoneId: config.timeZoneId,
            locationName: config.locationName,
            latitude: config.latitude,
            longitude: config.longitude,
            elevation: config.elevation,
            complexZmanim: false,
        };
        
        const zmanim = KosherZmanim.getZmanimJson(options);
        var zmanimDateArray = [];

        // console.log(KosherZmanim.YomiCalculator.getDafYomiBavli(new KosherZmanim.JewishCalendar()).getMasechtaTransliterated());

        for (var i in zmanim["BasicZmanim"]) {
            if (i in config.displayedFields) {
                zmanimDateArray.push([config.displayedFields[i], moment(zmanim["BasicZmanim"][i]).format('h:mm A')])
            }
        }

        self.sendSocketNotification('FETCHED_ZMANIM', zmanimDateArray);
    }
})