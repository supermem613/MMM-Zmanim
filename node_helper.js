var NodeHelper = require("node_helper");
var KosherZmanim = require("kosher-zmanim");
var moment = require("moment");

const mishnahData = [
    ["", " ברכות", " פאה", " דמאי", " כלאים", " שביעית", " תרומות", " מעשרות", " מעשר שני", " חלה", " ערלה", " ביכורים", " שבת", " עירובין", " פסחים", "שקלים", "יומא", "סוכה", "ביצה", " ראש השנה", " תענית", " מגילה", " מועד קטן", " חגיגה", " יבמות", " כתובות", " נדרים", " נזיר", " סוטה", " גיטין", " קידושין", " בבא קמא", " בבא מציעא", " בבא בתרא", " סנהדרין", " מכות", " שבועות", " עדיות", " עבודה זרה", " אבות", " הוריות", " זבחים", " מנחות", " חולין", " בכורות", " ערכין", " תמורה", " כריתות", " מעילה", " תמיד", " מדות", " קינים", " כלים", " אהלות", " נגעים", " פרה", " טהרות", " מקואות", " נדה", " מכשירין", " זבים", " טבול יום", " ידים", " עוקצים"],
    ["1", "5", "6", "4", "9", "8", "10", "8", "7", "9", "9", "11", "11", "10", "7", "7", "8", "11", "10", "9", "7", "11", "10", "8", "4", "10", "4", "7", "9", "6", "10", "4", "8", "6", "6", "10", "7", "14", "9", "18", "5", "4", "4", "7", "7", "4", "6", "7", "4", "4", "9", "4", "9", "8", "6", "4", "9", "8", "7", "6", "6", "5", "5", "6"],
    ["2", "8", "8", "5", "11", "10", "6", "8", "10", "8", "17", "11", "7", "6", "8", "5", "7", "9", "10", "8", "10", "6", "5", "7", "10", "10", "5", "10", "6", "7", "10", "6", "11", "14", "5", "8", "5", "10", "7", "16", "7", "5", "5", "10", "9", "6", "3", "6", "9", "5", "6", "5", "8", "7", "5", "5", "8", "10", "7", "11", "4", "8", "4", "10"],
    ["3", "6", "8", "6", "7", "10", "9", "10", "13", "10", "9", "12", "6", "9", "8", "4", "11", "15", "8", "9", "9", "6", "9", "8", "10", "9", "11", "7", "8", "8", "13", "11", "12", "8", "8", "16", "11", "12", "10", "18", "8", "6", "7", "7", "4", "5", "5", "10", "8", "9", "8", "6", "8", "7", "8", "11", "8", "4", "7", "8", "3", "6", "5", "12"],
    ["4", "7", "11", "7", "9", "10", "13", "6", "12", "11", "", "5", "2", "11", "9", "9", "6", "10", "7", "9", "8", "10", "", "", "13", "12", "8", "7", "5", "9", "14", "9", "12", "9", "5", "", "13", "12", "12", "22", "", "6", "5", "7", "10", "4", "4", "3", "6", "3", "7", "", "4", "3", "11", "4", "13", "5", "7", "10", "7", "7", "8", ""],
    ["5", "5", "8", "11", "8", "9", "9", "8", "15", "", "", "", "4", "9", "10", "6", "7", "8", "7", "", "", "", "", "", "6", "9", "6", "7", "5", "9", "", "7", "11", "11", "5", "", "5", "7", "12", "23", "", "8", "9", "5", "6", "6", "6", "8", "5", "6", "4", "", "11", "7", "5", "9", "9", "6", "9", "11", "12", "", "", ""],
    ["6", "8", "11", "12", "9", "6", "6", "", "", "", "", "", "10", "10", "6", "6", "8", "", "", "", "", "", "", "", "6", "7", "10", "11", "4", "7", "", "6", "8", "8", "6", "", "7", "3", "", "11", "", "7", "7", "7", "12", "5", "5", "9", "6", "4", "", "", "4", "7", "8", "5", "10", "11", "14", "8", "", "", "", ""],
    ["7", "5", "8", "8", "8", "7", "7", "", "", "", "", "", "4", "11", "13", "7", "5", "", "", "", "", "", "", "", "6", "10", "9", "4", "8", "9", "", "7", "11", "4", "11", "", "8", "9", "", "", "", "6", "6", "6", "7", "5", "6", "", "", "3", "", "", "6", "6", "5", "12", "9", "7", "5", "", "", "", "", ""],
    ["8", "8", "9", "", "6", "11", "12", "", "", "", "", "", "7", "11", "8", "8", "9", "", "", "", "", "", "", "", "6", "8", "7", "2", "7", "10", "", "7", "9", "8", "7", "", "6", "7", "", "", "", "12", "7", "6", "10", "7", "", "", "", "", "", "", "11", "6", "10", "11", "9", "5", "4", "", "", "", "", ""],
    ["9", "5", "", "", "10", "9", "7", "", "", "", "", "", "7", "4", "11", "", "", "", "", "", "", "", "", "", "6", "9", "10", "5", "15", "10", "", "12", "13", "10", "6", "", "", "", "", "", "", "7", "9", "8", "8", "8", "", "", "", "", "", "", "8", "16", "3", "9", "9", "7", "11", "", "", "", "", ""],
    ["10", "", "", "", "", "9", "12", "", "", "", "", "", "6", "15", "9", "", "", "", "", "", "", "", "", "", "9", "6", "8", "", "", "", "", "10", "6", "8", "6", "", "", "", "", "", "", "8", "9", "4", "", "", "", "", "", "", "", "", "8", "7", "10", "6", "8", "8", "8", "", "", "", "", ""],
    ["11", "", "", "", "", "", "10", "", "", "", "", "", "6", "", "", "", "", "", "", "", "", "", "", "", "7", "6", "12", "", "", "", "", "", "", "", "6", "", "", "", "", "", "", "8", "9", "2", "", "", "", "", "", "", "", "", "9", "9", "12", "9", "", "", "", "", "", "", "", ""],
    ["12", "", "", "", "", "", "", "", "", "", "", "", "6", "", "", "", "", "", "", "", "", "", "", "", "6", "4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "6", "5", "5", "", "", "", "", "", "", "", "", "8", "8", "7", "11", "", "", "", "", "", "", "", ""],
    ["13", "", "", "", "", "", "", "", "", "", "", "", "7", "", "", "", "", "", "", "", "", "", "", "", "13", "11", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "8", "11", "", "", "", "", "", "", "", "", "", "8", "6", "12", "", "", "", "", "", "", "", "", ""],
    ["14", "", "", "", "", "", "", "", "", "", "", "", "4", "", "", "", "", "", "", "", "", "", "", "", "9", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "10", "", "", "", "", "", "", "", "", "", "", "8", "7", "13", "", "", "", "", "", "", "", "", ""],
    ["15", "", "", "", "", "", "", "", "", "", "", "", "3", "", "", "", "", "", "", "", "", "", "", "", "10", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "6", "10", "", "", "", "", "", "", "", "", "", ""],
    ["16", "", "", "", "", "", "", "", "", "", "", "", "8", "", "", "", "", "", "", "", "", "", "", "", "7", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "8", "5", "", "", "", "", "", "", "", "", "", ""],
    ["17", "", "", "", "", "", "", "", "", "", "", "", "8", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "17", "5", "", "", "", "", "", "", "", "", "", ""],
    ["18", "", "", "", "", "", "", "", "", "", "", "", "3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "9", "10", "", "", "", "", "", "", "", "", "", ""],
    ["19", "", "", "", "", "", "", "", "", "", "", "", "6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "10", "", "", "", "", "", "", "", "", "", "", ""],
    ["20", "", "", "", "", "", "", "", "", "", "", "", "5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "7", "", "", "", "", "", "", "", "", "", "", ""],
    ["21", "", "", "", "", "", "", "", "", "", "", "", "3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "3", "", "", "", "", "", "", "", "", "", "", ""],
    ["22", "", "", "", "", "", "", "", "", "", "", "", "6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "10", "", "", "", "", "", "", "", "", "", "", ""],
    ["23", "", "", "", "", "", "", "", "", "", "", "", "5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "5", "", "", "", "", "", "", "", "", "", "", ""],
    ["24", "", "", "", "", "", "", "", "", "", "", "", "5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "17", "", "", "", "", "", "", "", "", "", "", ""],
    ["25", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "9", "", "", "", "", "", "", "", "", "", "", ""],
    ["26", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "9", "", "", "", "", "", "", "", "", "", "", ""],
    ["27", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "12", "", "", "", "", "", "", "", "", "", "", ""],
    ["28", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "10", "", "", "", "", "", "", "", "", "", "", ""],
    ["29", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "8", "", "", "", "", "", "", "", "", "", "", ""],
    ["30", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "4", "", "", "", "", "", "", "", "", "", "", ""],
    ["Total Mishnah", "57", "69", "53", "77", "89", "101", "40", "57", "38", "35", "39", "139", "96", "89", "52", "61", "53", "42", "35", "34", "33", "24", "23", "128", "111", "90", "60", "67", "75", "47", "79", "101", "86", "71", "34", "62", "74", "50", "108", "20", "101", "93", "74", "73", "50", "35", "43", "38", "34", "34", "15", "254", "134", "115", "96", "92", "71", "79", "54", "32", "26", "22", "28"],
    ["Total Perakim", "9", "8", "7", "9", "10", "11", "5", "5", "4", "3", "4", "24", "10", "10", "8", "8", "5", "5", "4", "4", "4", "3", "3", "16", "13", "11", "9", "9", "9", "4", "10", "10", "10", "11", "3", "8", "8", "5", "6", "3", "14", "13", "12", "9", "9", "7", "6", "6", "7", "5", "3", "30", "18", "14", "12", "10", "10", "10", "6", "5", "4", "4", "3"],
    ["", "Berachot", "Peah", "Damai", "Kilaim", "Sheviit", "Terumot", "Maserot", "Maser Sheni", "Chalah", "Orlah", "Bikurim", "Shabbat", "Eruvin", "Psachim", "Shekalim", "Yoma", "Sukkah", "Beitzah", "Rosh HaShanah", "Taanit", "Megilah", "Moed Kattan", "Chaggigah", "Yevamot", "Ketubot", "Nedarim", "Nazir", "Sotah", "Gittin", "Kidushin", "Bava Kamma", "Bava Metzia", "Bava Batra", "Sanhedrin", "Makot", "Shevuot", "Eduyot", "Avodah Zara", "Avot", "Horyot", "Zevachim", "Menachot", "Chullin", "Bechorot", "Erchin", "Temurah", "Keritot", "Meilah", "Tamid", "Middot", "Kinnim", "Kelim", "Ohalot", "Negaim", "Parah", "Taharot", "Mikvaot", "Niddah", "Machshirin", "Zavim", "Tevul Yom", "Yadayim", "Uktzim"],
    ];

module.exports = NodeHelper.create({
    start: function() {},

    getNumberOfDays: function() {
        const today = new Date();
        const startingDay = new Date("2021-12-25 GMT-03:00");
        return Math.floor((today.getTime() - startingDay.getTime()) / (1000 * 3600 * 24));
    },

    getTodaysMishnah: function() {
        const days = this.getNumberOfDays();
         // Last mishna learned
        const daysTimesTwo = days * 2;

        // Amount of mishnayos in each Masechta
        const mesechtasSize = mishnahData[31];
        const mesechtasEnglish = mishnahData[33];

        let mishnayosCounter = 0;
        let currentMesechtaIndex = 1;
        while (mishnayosCounter + parseInt(mesechtasSize[currentMesechtaIndex]) < daysTimesTwo) {
            mishnayosCounter = mishnayosCounter + parseInt(mesechtasSize[currentMesechtaIndex]);
            currentMesechtaIndex = currentMesechtaIndex + 1;
        };

        // Check if we are splitting at the end of a Masechta
        const splitMasechta = mishnayosCounter + parseInt(mesechtasSize[currentMesechtaIndex])  === (daysTimesTwo + 1);

        let perek = 1;
        while (mishnayosCounter + parseInt(mishnahData[perek][currentMesechtaIndex]) <= daysTimesTwo) {
            mishnayosCounter = mishnayosCounter + parseInt(mishnahData[perek][currentMesechtaIndex]);
            perek += 1;
        }

        // Current mishna is (the one after) mishnayos we learned minus the amount daysTimesTwo/
        const mishna = daysTimesTwo - mishnayosCounter + 1;
        const isSplit = mishnahData[perek][currentMesechtaIndex]  < mishna + 1; 
        const mishnaFrom = `${mesechtasEnglish[currentMesechtaIndex]}  ${perek}:${mishna}-`;
        const mishnaTo = `${(!isSplit) ?
            mishna + 1 : 
            (!splitMasechta) ?
                `${perek + 1}:1` :
                ` ${mesechtasEnglish[currentMesechtaIndex + 1]} 1:1`
            }`;

        return mishnaFrom + mishnaTo;
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'FETCH_ZMANIM') {
            this.getZmanim(payload)
        }
        
        console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
    },

    getZmanim: function(config) {
        const self = this;
        const currentDate = new Date();
        const options = {
            date: currentDate,
            timeZoneId: config.timeZoneId,
            locationName: config.locationName,
            latitude: config.latitude,
            longitude: config.longitude,
            elevation: config.elevation,
            complexZmanim: true,
        };
        const zmanim = KosherZmanim.getZmanimJson(options)["Zmanim"];
        let tomorrowZmanim;
        if(config.showTomorrowsZmanim){
            options.date.setDate(options.date.getDate() + 1 );
            tomorrowZmanim = KosherZmanim.getZmanimJson(options)["Zmanim"];
        }

        var zmanimDateArray = [];
        var calendarArray = [];

        String.prototype.capitalizedFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        }

        const calendar = new KosherZmanim.JewishCalendar(currentDate);
        const hebrewDateFormatter = new KosherZmanim.HebrewDateFormatter();
        const parsha = this.getUpcomingParsha(currentDate);
        const parshaName = hebrewDateFormatter.getTransliteratedParshiosList()[parsha];
        calendar.setInIsrael(config.inIsrael);

        if (config.showsHebrewDate) {
            calendarArray.push(hebrewDateFormatter.format(new KosherZmanim.JewishDate(currentDate)));
        }
        if (config.showsParsha) {
            calendarArray.push("Parsha: " + parshaName);
        }
        if (config.showsDaf) {
            calendarArray.push("Daf: " + hebrewDateFormatter.formatDafYomiBavli(KosherZmanim.YomiCalculator.getDafYomiBavli(calendar)));
        }        
        if (config.showsMishnah) {
            calendarArray.push("Mishnah: " + this.getTodaysMishnah());
        }
        if (config.showsYomTov && calendar.getYomTovIndex() !== -1) {
            calendarArray.push(hebrewDateFormatter.formatYomTov(calendar));
        }
        if (config.showsDayOfOmer && calendar.getDayOfOmer() !== -1) {
            calendarArray.push("Day of Omer: " + calendar.getDayOfOmer());
        }
        if (config.showsSpecialShabbos && self.getUpcomingSpecialShabbos(currentDate) !== KosherZmanim.Parsha.NONE) {
            calendarArray.push("Shabbat " + hebrewDateFormatter.getTransliteratedParshiosList()[self.getUpcomingSpecialShabbos(currentDate)]);
        }

        for (var i in zmanim) {
            if (i == "CandleLighting" && !calendar.hasCandleLighting()) {
                continue;
            }
            
            if (i in config.displayedFields) {
                zmanimDateArray.push([config.displayedFields[i], zmanim[i], moment(zmanim[i]).format('h:mm A')])
            }
        }

        if(config.showTomorrowsZmanim){
            for (var i in tomorrowZmanim) {
                if (i in config.displayedFields) {
                    zmanimDateArray.push([config.displayedFields[i], tomorrowZmanim[i], moment(tomorrowZmanim[i]).format('h:mm A')])
                }
            }
        }

        self.sendSocketNotification(
            'FETCHED_ZMANIM', {
                'zmanim': zmanimDateArray,
                'calendar': calendarArray,
                'id': config.id,
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

    getUpcomingSpecialShabbos: function(current) {
        const nearestSaturday = new Date(this.getNextDayOfWeek(current, 6));
        const calendar = new KosherZmanim.JewishCalendar(nearestSaturday);

        return calendar.getSpecialShabbos();
    },

    // Get the next day of the week given index 0-6
    getNextDayOfWeek: function(date, dayOfWeek) {
        var resultDate = new Date(date.getTime());
    
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    
        return resultDate;
    },
})