Module.register("Zmanim", {
    defaults: {
        timeZoneId: "America/New_York",
        locationName: "Teaneck",
        latitude: 40.884819,
        longitude: -74.006561,
        elevation: 0,
        maxWidth: 400,
        displayedFields: {
            'AlosHashachar': 'Alos Hashachar',
            'Sunrise': 'Netz Hachama',
            'SofZmanShmaMGA': 'Zman Shma (MGA)',
            'SofZmanShmaGRA': 'Zman Shma (GRA)',
            'SofZmanTfilaMGA': 'Zman Tefila (MGA)',
            'SofZmanTfilaGRA': 'Zman Tefila (GRA)',
            'Chatzos': 'Chatzos',
            'CandleLighting': 'Candle Lighting',
            'Sunset': 'Shkiya',
            'Tzais': 'Tzais',
        },
        displaysPastZmanim: true,
        graysOutPastZmanim: false,
        inIsrael: false,
        showsHebrewDate: true,
        showsParsha: true,
        showsDaf: true,
        showsDayOfOmer: true,
        showsSpecialShabbos: true,
        showsYomTov: true,
        alwaysShowDividerLine: false
    },

    // Define required scripts.
	getStyles: function () {
		return ["Zmanim.css"];
	},
    
    getDom: function() {
        var self = this;
        var table = document.createElement("table");
        table.className = "small";

        for (value in this.calendarArray) {
            var row = document.createElement("tr");
            table.appendChild(row);

            var cell = document.createElement("th");
			cell.className = "calendarValue";
            cell.innerHTML = this.calendarArray[value];
            cell.colSpan = 2;
            row.appendChild(cell);

            if (value == this.calendarArray.length - 1) {
                cell.style.borderBottom = "1px solid white";
            }
        }

        for (index in this.zmanimArray) {
            const zmanEntry = this.zmanimArray[index];
            const currentDate = new Date();
            const zmanHasPassed = new Date(zmanEntry[1]) < currentDate.getTime();
            const arrayCount = this.zmanimArray.length;
            const baseOpacity = 0.2;
            const capOpacity = 0.4;
            const isFirstRow = index == 0;
            
            var row = document.createElement("tr");
            if (self.config.displaysPastZmanim && self.config.graysOutPastZmanim) {
                row.style.opacity = zmanHasPassed ? (baseOpacity + (capOpacity - baseOpacity) * index / arrayCount) : 1.0;
            } else if (!self.config.displaysPastZmanim && zmanHasPassed) {
                continue;
            }
            
            table.appendChild(row);

            var titleCell = document.createElement("td");
			titleCell.className = "zmanimTitle";
			titleCell.innerHTML = zmanEntry[0] + ": ";
			row.appendChild(titleCell);

			var valueCell = document.createElement("td");
			valueCell.className = "zmanimValue";
			valueCell.innerHTML = zmanEntry[2];
            row.appendChild(valueCell);
            
            if (isFirstRow) {
                titleCell.style.paddingTop = "10px";
                valueCell.style.paddingTop = "10px";

                if (self.config.alwaysShowDividerLine && this.calendarArray.length == 0) {
                    titleCell.style.borderTop = "1px solid white";
                    valueCell.style.borderTop = "1px solid white";
                }
            }
        }
        
        return table
    },

    socketNotificationReceived: function(notification, payload) {
        if (payload.id == this.identifier) {
            switch(notification) {
                case "FETCHED_ZMANIM":
                  this.zmanimArray = payload.zmanim;
                  this.calendarArray = payload.calendar;
                  this.updateDom();
                  break
              }
        }
    },

    start: function () {
        var self = this

        self.zmanimArray = [{ subject: 'LOADING_ENTRIES' }]

        // update tasks every 60s
        var refreshFunction = function () {
            self.config['id'] = self.identifier;
            self.sendSocketNotification('FETCH_ZMANIM', self.config)
        }
        refreshFunction()
        setInterval(refreshFunction, 60000)
    }
});