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
            'SofZmanShmaMGA': 'Sof Zman Kriyas Shma (MGA)',
            'SofZmanShmaGRA': 'Sof Zman Kriyas Shma (GRA)',
            'SofZmanTfilaMGA': 'Sof Zman Tefila (MGA)',
            'SofZmanTfilaGRA': 'Sof Zman Tefila (GRA)',
            'Chatzos': 'Chatzos',
            'CandleLighting': 'Candle Lighting',
            'Sunset': 'Shkiya',
            'Tzais': 'Tzais',
        },
    },
    
    getDom: function() {
        var table = document.createElement("table");
        table.className = "small";

        for (value in this.array) {
            var row = document.createElement("tr");
            table.appendChild(row);

            var titleCell = document.createElement("td");
			titleCell.className = "title";
			titleCell.innerHTML = this.array[value][0] + ": ";
			row.appendChild(titleCell);

			var valueCell = document.createElement("td");
			valueCell.className = "value";
			valueCell.innerHTML = this.array[value][1];
			row.appendChild(valueCell);
        }
        
        return table
    },

    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
          case "DOM_OBJECTS_CREATED":
            this.sendSocketNotification("FETCH_ZMANIM",this.config);
            break
        }
    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
          case "FETCHED_ZMANIM":
            this.array = payload;
            this.updateDom();
            break
        }
    },

    start: function () {
        var self = this

        self.array = [{ subject: 'LOADING_ENTRIES' }]
    }
});