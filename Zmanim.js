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
    },

    // Define required scripts.
	getStyles: function () {
		return ["Zmanim.css"];
	},
    
    getDom: function() {
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
        }

        for (value in this.zmanimArray) {
            var row = document.createElement("tr");
            table.appendChild(row);

            var titleCell = document.createElement("td");
			titleCell.className = "zmanimTitle";
			titleCell.innerHTML = this.zmanimArray[value][0] + ": ";
			row.appendChild(titleCell);

			var valueCell = document.createElement("td");
			valueCell.className = "zmanimValue";
			valueCell.innerHTML = this.zmanimArray[value][1];
			row.appendChild(valueCell);
        }
        
        return table
    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
          case "FETCHED_ZMANIM":
            this.zmanimArray = payload.zmanim;
            this.calendarArray = payload.calendar;
            this.updateDom();
            break
        }
    },

    start: function () {
        var self = this

        self.zmanimArray = [{ subject: 'LOADING_ENTRIES' }]

        // update tasks every 60s
        var refreshFunction = function () {
            self.sendSocketNotification('FETCH_ZMANIM', self.config)
        }
        refreshFunction()
        setInterval(refreshFunction, 60000)
    }
});