var NodeHelper = require("node_helper");
var KosherZmanim = require("kosher-zmanim");
var moment = require("moment");

// https://www.artscroll.com/images/siteimages/KitzurShulchanAruch_calendar_YEARLY_singlepages.pdf
const kitzurShulchanAruchSchedule = new Map([
    ["24 Tishrei", "1:1-1:4"],
    ["25 Tishrei", "1:5-2:4"],
    ["26 Tishrei", "2:5-3:1"],
    ["27 Tishrei", "3:2-End"],
    ["28 Tishrei", "4:1-5:1"],
    ["29 Tishrei", "5:2-8"],
    ["30 Tishrei", "5:9-6:16"],
    ["1 Cheshvan", "6:17-7:3"],
    ["2 Cheshvan", "7:4-9"],
    ["3 Cheshvan", "7:10-7:End"],
    ["4 Cheshvan", "8:1-5"],
    ["5 Cheshvan", "8:6-9:3"],
    ["6 Cheshvan", "9:4-9"],
    ["7 Cheshvan", "9:10-13"],
    ["8 Cheshvan", "9:14-End"],
    ["9 Cheshvan", "10:1-3"],
    ["10 Cheshvan", "10:4-12"],
    ["11 Cheshvan", "10:13-19"],
    ["12 Cheshvan", "10:20-End"],
    ["13 Cheshvan", "11:1-11"],
    ["14 Cheshvan", "11:12-20"],
    ["15 Cheshvan", "11:21-12:4"],
    ["16 Cheshvan", "12:5-10"],
    ["17 Cheshvan", "12:11-13:1"],
    ["18 Cheshvan", "13:2-14:3"],
    ["19 Cheshvan", "14:4-End"],
    ["20 Cheshvan", "15:1-6"],
    ["21 Cheshvan", "15:7-End"],
    ["22 Cheshvan", "16:1-End"],
    ["23 Cheshvan", "17:1-7"],
    ["24 Cheshvan", "17:8-18:2"],
    ["25 Cheshvan", "18:3-9"],
    ["26 Cheshvan", "18:10-14"],
    ["27 Cheshvan", "18:15-End"],
    ["28 Cheshvan", "19:1-7"],
    ["29 Cheshvan", "19:8-10"],
    ["30 Cheshvan", "19:11-13"],
    ["1 Kislev", "19:14-20:7"],
    ["2 Kislev", "20:8-21:2"],
    ["3 Kislev", "21:3-8"],
    ["4 Kislev", "21:9-22:End"],
    ["5 Kislev", "23:1-9"],
    ["6 Kislev", "23:10-15"],
    ["7 Kislev", "23:16-22"],
    ["8 Kislev", "23:23-End"],
    ["9 Kislev", "24:1-6"],
    ["10 Kislev", "24:7-End"],
    ["11 Kislev", "25:1-26:2"],
    ["12 Kislev", "26:3-12"],
    ["13 Kislev", "26:13-21"],
    ["14 Kislev", "26:22-27:End"],
    ["15 Kislev", "28:1-10"],
    ["16 Kislev", "28:10-29:3"],
    ["17 Kislev", "29:4-10"],
    ["18 Kislev", "29:11-17"],
    ["19 Kislev", "29:18-30:3"],
    ["20 Kislev", "30:4-31:1"],
    ["21 Kislev", "31:2-32:1"],
    ["22 Kislev", "32:2-7"],
    ["23 Kislev", "32:8-18"],
    ["24 Kislev", "32:16-22"],
    ["25 Kislev", "139:1-4"],
    ["26 Kislev", "139:5-11"],
    ["27 Kislev", "139:12-19"],
    ["28 Kislev", "139:20-End"],
    ["29 Kislev", "32:23-End"],
    ["30 Kislev", "33:1-6"],
    ["1 Tevet", "33:7-End"],
    ["2 Tevet", "34:1-4"],
    ["3 Tevet", "34:5-13"],
    ["4 Tevet", "34:14-35:7"],
    ["5 Tevet", "35:8-36:10"],
    ["6 Tevet", "36:11-26"],
    ["7 Tevet", "36:27-37:9"],
    ["8 Tevet", "37:10-38:8"],
    ["9 Tevet", "38:9-39:1"],
    ["10 Tevet", "121:1-5"],
    ["11 Tevet", "39:2-40:4"],
    ["12 Tevet", "40:5-13"],
    ["13 Tevet", "40:14-End"],
    ["14 Tevet", "41:1-7"],
    ["15 Tevet", "41:8-42:5"],
    ["16 Tevet", "42:6-19"],
    ["17 Tevet", "42:20-43:3"],
    ["18 Tevet", "43:4-44:4"],
    ["19 Tevet", "44:5-13"],
    ["20 Tevet", "44:14-45:2"],
    ["21 Tevet", "45:3-8"],
    ["22 Tevet", "45:9-16"],
    ["23 Tevet", "45:17-46:3"],
    ["24 Tevet", "46:4-16"],
    ["25 Tevet", "46:17-29"],
    ["26 Tevet", "46:30-40"],
    ["27 Tevet", "46:41-47:7"],
    ["28 Tevet", "47:8-21"],
    ["29 Tevet", "47:22-48:5"],
    ["1 Shevat", "48:6-End"],
    ["2 Shevat", "49:1-6"],
    ["3 Shevat", "49:7-50:2"],
    ["4 Shevat", "50:3-10"],
    ["5 Shevat", "50:11-51:1"],
    ["6 Shevat", "51:2-7"],
    ["7 Shevat", "51:8-End"],
    ["8 Shevat", "52:1-7"],
    ["9 Shevat", "52:8-15"],
    ["10 Shevat", "52:16-53:2"],
    ["11 Shevat", "53:3-54:3"],
    ["12 Shevat", "54:4-55:1"],
    ["13 Shevat", "55:2-56:5"],
    ["14 Shevat", "56:6-57:5"],
    ["15 Shevat", "57:6-58:7"],
    ["16 Shevat", "58:8-59:1"],
    ["17 Shevat", "59:2-8"],
    ["18 Shevat", "59:9-19"],
    ["19 Shevat", "59:20-60:5"],
    ["20 Shevat", "60:6-13"],
    ["21 Shevat", "60:14-61:5"],
    ["22 Shevat", "61:6-62:3"],
    ["23 Shevat", "62:4-14"],
    ["24 Shevat", "62:15-63:1"],
    ["25 Shevat", "63:2-64:End"],
    ["26 Shevat", "65:1-8"],
    ["27 Shevat", "65:9-15"],
    ["28 Shevat", "65:16-22"],
    ["29 Shevat", "65:23-End"],
    ["30 Shevat", "66:1-6"],
    ["1 Adar", "66:7-10"],
    ["2 Adar", "66:11-67:5"],
    ["3 Adar", "67:6-End"],
    ["4 Adar", "68:1-7"],
    ["5 Adar", "68:8-69:1"],
    ["6 Adar", "69:2-7"],
    ["7 Adar", "69:8-70:End"],
    ["8 Adar", "71:1-4"],
    ["9 Adar", "71:5-72:4"],
    ["10 Adar", "72:5-10"],
    ["11 Adar", "140:1-141:3"],
    ["12 Adar", "141:4-13"],
    ["13 Adar", "141:14-21"],
    ["14 Adar", "141:22-142:5"],
    ["15 Adar", "142:6-End"],
    ["16 Adar", "72:11-19"],
    ["17 Adar", "72:20-73:4"],
    ["18 Adar", "73:5-End"],
    ["19 Adar", "74:1-75:3"],
    ["20 Adar", "75:4-9"],
    ["21 Adar", "75:10-76:4"],
    ["22 Adar", "76:5-13"],
    ["23 Adar", "107:1-108:3"],
    ["24 Adar", "108:4-109:6"],
    ["25 Adar", "109:7-110:5"],
    ["26 Adar", "110:6-12"],
    ["27 Adar", "110:13-111:6"],
    ["28 Adar", "111:7-13"],
    ["29 Adar", "111:14-112:4"],
    ["1 Nisan", "112:5-113:7"],
    ["2 Nisan", "113:8-114:4"],
    ["3 Nisan", "114:5-12"],
    ["4 Nisan", "114:13-115:3"],
    ["5 Nisan", "115:4-116:4"],
    ["6 Nisan", "116:5-14"],
    ["7 Nisan", "116:15-117:4"],
    ["8 Nisan", "117:5-11"],
    ["9 Nisan", "117:12-118:4"],
    ["10 Nisan", "118:5-8"],
    ["11 Nisan", "118:9-119:2"],
    ["12 Nisan", "119:3-5"],
    ["13 Nisan", "119:6-8"],
    ["14 Nisan", "119:9-End"],
    ["15 Nisan", "120:1-End"],
    ["16 Nisan", "101:1-102:1"],
    ["17 Nisan", "102:2-103:2"],
    ["18 Nisan", "103:3-11"],
    ["19 Nisan", "103:12-104:6"],
    ["20 Nisan", "104:7-End"],
    ["21 Nisan", "104:1-105:End"],
    ["22 Nisan", "76:14-22"],
    ["23 Nisan", "76:23-77:8"],
    ["24 Nisan", "77:9-15"],
    ["25 Nisan", "77:16-End"],
    ["26 Nisan", "78:1-7"],
    ["27 Nisan", "78:8-79:1"],
    ["28 Nisan", "79:2-End"],
    ["29 Nisan", "80:1-8"],
    ["30 Nisan", "80:9-17"],
    ["1 Iyar", "80:17-26"],
    ["2 Iyar", "80:267-35"],
    ["3 Iyar", "80:36-45"],
    ["4 Iyar", "80:46-60"],
    ["5 Iyar", "80:61-67"],
    ["6 Iyar", "80:68-76"],
    ["7 Iyar", "80:77-86"],
    ["8 Iyar", "80:87-81:2"],
    ["9 Iyar", "81:3-82:2"],
    ["10 Iyar", "82:3-8"],
    ["11 Iyar", "82:9-83:2"],
    ["12 Iyar", "83:3-84:4"],
    ["13 Iyar", "84:5-15"],
    ["14 Iyar", "84:16-85:3"],
    ["15 Iyar", "85:4-86:5"],
    ["16 Iyar", "86:6-87:6"],
    ["17 Iyar", "87:7-17"],
    ["18 Iyar", "87:18-88:1"],
    ["19 Iyar", "88:2-6"],
    ["20 Iyar", "88:7-14"],
    ["21 Iyar", "88:15-89:3"],
    ["22 Iyar", "89:4-90:4"],
    ["23 Iyar", "90:5-14"],
    ["24 Iyar", "90:15-91:1"],
    ["25 Iyar", "91:2-13"],
    ["26 Iyar", "91:14-92:2"],
    ["27 Iyar", "92:3-End"],
    ["28 Iyar", "93:1-94:2"],
    ["29 Iyar", "94:3-8"],
    ["1 Sivan", "94:9-19"],
    ["2 Sivan", "94:20-95:1"],
    ["3 Sivan", "95:2-11"],
    ["4 Sivan", "95:12-End"],
    ["5 Sivan", "96:1-5"],
    ["6 Sivan", "96:6-14"],
    ["7 Sivan", "96:15-97:9"],
    ["8 Sivan", "97:10-End"],
    ["9 Sivan", "143:1-9"],
    ["10 Sivan", "143:10-18"],
    ["11 Sivan", "143:19-144:6"],
    ["12 Sivan", "144:7-145:6"],
    ["13 Sivan", "145:7-20"],
    ["14 Sivan", "145:21-146:End"],
    ["15 Sivan", "147:1-148:End"],
    ["16 Sivan", "149:1-11"],
    ["17 Sivan", "149:12-150:5"],
    ["18 Sivan", "150:6-13"],
    ["19 Sivan", "150:14-151:5"],
    ["20 Sivan", "151:6-152:7"],
    ["21 Sivan", "152:8-End"],
    ["22 Sivan", "153:1-9"],
    ["23 Sivan", "153:10-154:1"],
    ["24 Sivan", "154:2-End"],
    ["25 Sivan", "155:1-6"],
    ["26 Sivan", "155:7-End"],
    ["27 Sivan", "156:1-157:3"],
    ["28 Sivan", "157:4-158:End"],
    ["29 Sivan", "159:1-6"],
    ["30 Sivan", "159:7-160:5"],
    ["1 Tammuz", "160:6-161:8"],
    ["2 Tammuz", "161:9-17"],
    ["3 Tammuz", "161:18-162:5"],
    ["4 Tammuz", "162:6-11"],
    ["5 Tammuz", "162:12-163:4"],
    ["6 Tammuz", "163:5-164:4"],
    ["7 Tammuz", "164:5-165:3"],
    ["8 Tammuz", "165:4-11"],
    ["9 Tammuz", "165:12-166:3"],
    ["10 Tammuz", "166:4-167:9"],
    ["11 Tammuz", "167:10-168:5"],
    ["12 Tammuz", "168:6-171:1"],
    ["13 Tammuz", "171:2-173:1"],
    ["14 Tammuz", "173:2-175:3"],
    ["15 Tammuz", "175:4-176:7"],
    ["16 Tammuz", "176:8-177:8"],
    ["17 Tammuz", "121:6-End"],
    ["18 Tammuz", "177:9-178:3"],
    ["19 Tammuz", "178:4-179:8"],
    ["20 Tammuz", "179:9-180:8"],
    ["21 Tammuz", "180:9-181:4"],
    ["22 Tammuz", "181:5-13"],
    ["23 Tammuz", "181:14-182:1"],
    ["24 Tammuz", "182:2-11"],
    ["25 Tammuz", "182:12-183:3"],
    ["26 Tammuz", "183:4-184:5"],
    ["27 Tammuz", "184:6-185:4"],
    ["28 Tammuz", "185:5-187:End"],
    ["29 Tammuz", "188:1-189:5"],
    ["1 Av", "189:6-191:End"],
    ["2 Av", "122:1-6"],
    ["3 Av", "122:7-11"],
    ["4 Av", "122:12-123:2"],
    ["5 Av", "123:3-124:3"],
    ["6 Av", "124:4-11"],
    ["7 Av", "124:12-20"],
    ["8 Av", "124:21-125:End"],
    ["9 Av", "126:1-End"],
    ["10 Av", "127:1-10"],
    ["11 Av", "127:11-End"],
    ["12 Av", "192:1-7"],
    ["13 Av", "192:8-193:5"],
    ["14 Av", "193:6-End"],
    ["15 Av", "194:1-11"],
    ["16 Av", "194:12-195:7"],
    ["17 Av", "195:8-196:1"],
    ["18 Av", "196:2-8"],
    ["19 Av", "196:9-19"],
    ["20 Av", "196:20-197:5"],
    ["21 Av", "197:6-198:3"],
    ["22 Av", "198:4-14"],
    ["23 Av", "198:15-199:9"],
    ["24 Av", "199:10-200:2"],
    ["25 Av", "200:3-9"],
    ["26 Av", "200:10-202:1"],
    ["27 Av", "202:2-8"],
    ["28 Av", "202:9-203:2"],
    ["29 Av", "203:3-204:5"],
    ["30 Av", "204:6-205:3"],
    ["1 Elul", "205:4-206:6"],
    ["2 Elul", "206:7-207:5"],
    ["3 Elul", "207:6-208:9"],
    ["4 Elul", "208:10-209:6"],
    ["5 Elul", "209:7-210:End"],
    ["6 Elul", "211:1-11"],
    ["7 Elul", "211:12-212:End"],
    ["8 Elul", "213:1-214:End"],
    ["9 Elul", "215:1-216:End"],
    ["10 Elul", "217:1-219:1"],
    ["11 Elul", "219:2-7"],
    ["12 Elul", "219:8-220:4"],
    ["13 Elul", "220:5-221:2"],
    ["14 Elul", "221:3-End"],
    ["15 Elul", "128:1-4"],
    ["16 Elul", "128:5-11"],
    ["17 Elul", "128:12-End"],
    ["18 Elul", "129:1-7"],
    ["19 Elul", "129:8-13"],
    ["20 Elul", "129:14-19"],
    ["21 Elul", "129:20-End"],
    ["22 Elul", "130:1-End"],
    ["23 Elul", "131:1-4"],
    ["24 Elul", "131:5-9"],
    ["25 Elul", "131:10-16"],
    ["26 Elul", "131:17-132:End"],
    ["27 Elul", "133:1-8"],
    ["28 Elul", "133:9-15"],
    ["29 Elul", "133:16-End"],
    ["1 Tishrei", "133:17-21"],
    ["2 Tishrei", "133:22-26"],
    ["3 Tishrei", "133:27-4:1"],
    ["4 Tishrei", "134:2-6"],
    ["5 Tishrei", "134:7-12"],
    ["6 Tishrei", "134:13-135:2"],
    ["7 Tishrei", "135:3-6"],
    ["8 Tishrei", "135:7-12"],
    ["9 Tishrei", "135:13-End"],
    ["10 Tishrei", "136:1-2"],
    ["11 Tishrei", "136:3-End"],
    ["12 Tishrei", "137:1-7"],
    ["13 Tishrei", "137:8-138:1"],
    ["14 Tishrei", "138:2-End"],
    ["15 Tishrei", "98:1-7"],
    ["16 Tishrei", "98:8-13"],
    ["17 Tishrei", "98:14-22"],
    ["18 Tishrei", "98:33-32"],
    ["19 Tishrei", "98:33-99:2"],
    ["20 Tishrei", "99:3-100:4"],
    ["21 Tishrei", "100:5-10"],
    ["22 Tishrei", "100:11-16"],
    ["23 Tishrei", "100:17-End"],
]);

function getTodaysKitzurShulchanAruch() {
    const today = new KosherZmanim.JewishDate(new Date());
    const hebrewDateFormatter = new KosherZmanim.HebrewDateFormatter();
    hebrewDateFormatter.setHebrewFormat(false);
    const fullDate = hebrewDateFormatter.format(today);

    const dayMonth = fullDate.split(",")[0];

    // Additional rules:
    if (today.isCheshvanLong()) {
    // * When Kislev has only 29 days, 32:23-33:2 are studied on 29 Kislev,
    // and 33:3-14 studied on 1 Tevet.
        if (dayMonth === "29 Cheshvan") {
            return "32:23-33:2";
        } else if (dayMonth === "1 Kislev") {
            return "33:3-14";
        }
    } else {
    // * When Cheshvan has only 29 days, 19:8-20:2 are studied on 29 Cheshvan,
    // and 20:3-7 are studied on 1 Kislev.
        if (dayMonth === "29 Cheshvan") {
            return "19:8-20:2";
        } else if (dayMonth === "1 Kislev") {
            return "20:3-7";
        }
    }

    // **  During a leap year, Adar I is used either to catch up on missed days
    // or to review difficult halachos for a better understanding.
    const month = dayMonth.split(" ")[1];
    if (month === "Adar I") {
        return "Review / Catch Up";
    } else if (month === "Adar II") {
        dayMonth = dayMonth.replace("Adar II", "Adar");
    }

    const kitzurEntry = kitzurShulchanAruchSchedule.get(dayMonth);
    return kitzurEntry;
}

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
        if (config.showsShulchanAruch) {
            calendarArray.push("Kitzur Shulchan Aruch: " + getTodaysKitzurShulchanAruch());
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