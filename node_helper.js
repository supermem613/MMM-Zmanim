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
            complexZmanim: true,
        };
        
        const zmanim = KosherZmanim.getZmanimJson(options)["Zmanim"];
        var zmanimDateArray = [];
        var calendarArray = [];

        String.prototype.capitalizedFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        }

        const calendar = new KosherZmanim.JewishCalendar(new Date());
        const parsha = KosherZmanim.Parsha[this.getUpcomingParsha(new Date())];
        const parshaAdjustedName = parsha.replace('_', '-').capitalizedFirstLetter();
        
        calendarArray.push("Parsha: " + parshaAdjustedName);

        for (var i in zmanim) {
            if (i == "CandleLighting" && !calendar.hasCandleLighting()) {
                continue;
            }
            
            if (i in config.displayedFields) {
                zmanimDateArray.push([config.displayedFields[i], moment(zmanim[i]).format('h:mm A')])
            }
        }

        self.sendSocketNotification(
            'FETCHED_ZMANIM', {
                'zmanim': zmanimDateArray,
                'calendar': calendarArray,
            }
        );
    },

    getUpcomingParsha: function(current) {
        const nearestSaturday = new Date(this.getNextDayOfWeek(current, 6));
        const calendar = new KosherZmanim.JewishCalendar(nearestSaturday);
        const yearType = calendar.getParshaYearType();
        const roshHashanaDayOfWeek = KosherZmanim.JewishCalendar.getJewishCalendarElapsedDays(calendar.getJewishYear()) % 7;
        const day = roshHashanaDayOfWeek + calendar.getDaysSinceStartOfJewishYear();

        return KosherZmanim.JewishCalendar.parshalist[yearType][day / 7];
    },

    // Get the next day of the week given index 0-6
    getNextDayOfWeek: function(date, dayOfWeek) {
        var resultDate = new Date(date.getTime());
    
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    
        return resultDate;
    },
})