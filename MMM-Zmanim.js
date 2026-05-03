Module.register("MMM-Zmanim", {
  defaults: {
    timeZoneId: "America/New_York",
    locationName: "Teaneck",
    latitude: 40.884819,
    longitude: -74.006561,
    elevation: 0,
    frameWidth: 300, // px width of the rendered module column; raise to align with neighbouring modules
    displayedFields: {
      AlosHashachar: "Alos Hashachar",
      Sunrise: "Netz Hachama",
      SofZmanShmaMGA: "Zman Shma (MGA)",
      SofZmanShmaGRA: "Zman Shma (GRA)",
      SofZmanTfilaMGA: "Zman Tefila (MGA)",
      SofZmanTfilaGRA: "Zman Tefila (GRA)",
      Chatzos: "Chatzos",
      MinchaGedola: "Mincha Gedola",
      PlagHamincha: "Plag Hamincha",
      CandleLighting: "Candle Lighting",
      Sunset: "Shkiya",
      Tzais: "Tzais"
    },
    displaysPastZmanim: true,
    graysOutPastZmanim: false,
    inIsrael: false,
    showsHebrewDate: true,
    showsParsha: true,
    showsDaf: true,
    showsMishnah: true,
    showsShulchanAruch: true,
    showsDayOfOmer: true,
    showsSpecialShabbos: true,
    showsYomTov: true,
    alwaysShowDividerLine: false
  },

  getStyles: function () {
    return ["Zmanim.css"];
  },

  start: function () {
    const self = this;
    self.zmanimArray = [];
    self.calendarArray = [];

    const refreshFunction = function () {
      self.config.id = self.identifier;
      self.sendSocketNotification("FETCH_ZMANIM", self.config);
    };
    refreshFunction();
    setInterval(refreshFunction, 600000);
  },

  socketNotificationReceived: function (notification, payload) {
    if (payload.id === this.identifier && notification === "FETCHED_ZMANIM") {
      this.zmanimArray = payload.zmanim;
      this.calendarArray = payload.calendar;
      this.updateDom();
    }
  },

  /**
   * Render a single calendar header line (hebrew date, parsha, daf, etc.) as a
   * compact row. Strings that arrive shaped like "Label: Value" are split into
   * a small uppercase label + bright value; everything else is rendered as a
   * single value (for the hebrew date and yom tov entries).
   *
   * @param {string} text Source string from node_helper's calendarArray.
   * @returns {?HTMLElement} Row element ready to append, or null if the entry
   *   has a label but no value (e.g. "Parsha:" between parshiyos).
   */
  buildCalendarRow: function (text) {
    const colonIdx = text.indexOf(":");
    if (colonIdx > 0) {
      const label = text.substring(0, colonIdx).trim();
      const value = text.substring(colonIdx + 1).trim();
      if (value === "") {
        return null;
      }
      const row = document.createElement("div");
      row.className = "zmanim-calendar-row";
      row.innerHTML =
        `<span class="zmanim-cal-label">${label}</span>` +
        `<span class="zmanim-cal-value">${value}</span>`;
      return row;
    }
    const trimmed = text.trim();
    if (trimmed === "") {
      return null;
    }
    const row = document.createElement("div");
    row.className = "zmanim-calendar-row";
    row.innerHTML = `<span class="zmanim-cal-value">${trimmed}</span>`;
    return row;
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "MMM-Zmanim";
    wrapper.style.width = `${this.config.frameWidth}px`;

    // Loading state — initial render before the first FETCHED_ZMANIM payload.
    if (!Array.isArray(this.zmanimArray) || this.zmanimArray.length === 0) {
      const loading = document.createElement("div");
      loading.className = "small dimmed";
      loading.innerHTML = "Loading…";
      wrapper.appendChild(loading);
      return wrapper;
    }

    // Calendar header block (hebrew date / parsha / daf / omer / etc.).
    if (Array.isArray(this.calendarArray) && this.calendarArray.length > 0) {
      const calBlock = document.createElement("div");
      calBlock.className = "zmanim-calendar";
      for (let i = 0; i < this.calendarArray.length; i++) {
        const calRow = this.buildCalendarRow(this.calendarArray[i]);
        if (calRow) {
          calBlock.appendChild(calRow);
        }
      }
      if (calBlock.childNodes.length > 0) {
        wrapper.appendChild(calBlock);
      }
    }

    // Identify the first non-past zman so we can mark it with the amber "now"
    // accent (and a "now" divider line above it).
    const now = Date.now();
    let firstFutureIdx = -1;
    for (let i = 0; i < this.zmanimArray.length; i++) {
      const t = new Date(this.zmanimArray[i][1]).getTime();
      if (t >= now) {
        firstFutureIdx = i;
        break;
      }
    }

    const table = document.createElement("table");
    table.className = "small zmanim-table";

    const arrayCount = this.zmanimArray.length;
    const baseOpacity = 0.2;
    const capOpacity = 0.4;

    for (let index = 0; index < arrayCount; index++) {
      const zmanEntry = this.zmanimArray[index];
      const entryDate = new Date(zmanEntry[1]);
      const entryTime = entryDate.getTime();
      const today = new Date();
      const zmanHasPassed = entryTime < now;
      const zmanIsFuture = entryDate.getDate() !== today.getDate();
      const zmanIsFarFuture = entryTime - now > 1000 * 60 * 60 * 24;

      if (
        (!this.config.displaysPastZmanim && zmanHasPassed) ||
        (zmanIsFarFuture && !this.config.showAllTomorrowsZmanim) ||
        (zmanIsFuture && !this.config.showTomorrowsZmanim)
      ) {
        continue;
      }

      const row = document.createElement("tr");
      if (this.config.displaysPastZmanim && this.config.graysOutPastZmanim) {
        row.style.opacity = zmanHasPassed
          ? baseOpacity + ((capOpacity - baseOpacity) * index) / arrayCount
          : 1.0;
      }
      if (index === firstFutureIdx) {
        row.className = "zmanim-next";
      }
      table.appendChild(row);

      const titleCell = document.createElement("td");
      titleCell.className = "zmanimTitle";
      const tomSuffix =
        zmanIsFuture || zmanIsFarFuture
          ? " <span class='zmanim-tom'>(tom.)</span>"
          : "";
      titleCell.innerHTML = `${zmanEntry[0]}:${tomSuffix}`;
      row.appendChild(titleCell);

      const valueCell = document.createElement("td");
      valueCell.className = "zmanimValue";
      valueCell.innerHTML = zmanEntry[2];
      row.appendChild(valueCell);
    }

    wrapper.appendChild(table);
    return wrapper;
  }
});
