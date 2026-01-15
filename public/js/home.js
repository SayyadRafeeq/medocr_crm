$(document).ready(function () {
  // 1 variable with multiple theme colors
  const themeColors = {
    customers: "vivid-orange",
    Advertiser: "living-coral",
    NGO: "violet-sky",
    pharmacy: "light-sea-green",
  };

  // Get the current path
  const path = window.location.pathname;

  // Default color
  let selectedColor = "#F79E1B";
  let bgColor;

  // Loop and match theme by keyword in path
  $.each(themeColors, function (keyword, color) {
    if (path.includes(keyword)) {
      selectedColor = color;
      bgColor =
        selectedColor == "vivid-orange"
          ? "#F79E1B"
          : selectedColor == "living-coral"
          ? "#FF6F61"
          : selectedColor == "light-sea-green"
          ? "#3AAFA9"
          : "#6B79F5";
      return false;
    }
  });

  $(".bookmark-fill").click(function () {
    $(this).addClass(`material-filled text-${selectedColor}`);
  });
  document.documentElement.style.setProperty("--radio-border-color", bgColor);
  document.documentElement.style.setProperty("--radio-fill-color", bgColor);
  // Common chart options function
  function getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          yAlign: "bottom",
          backgroundColor: "#3AAFA9",
          displayColors: true,
          callbacks: {
            title: () => "",
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
      scales: {
        x: { title: { display: false } },
        yLeft: {
          type: "linear",
          position: "left",
          beginAtZero: true,
          min: 0,
          max: 800,
          ticks: { stepSize: 200 },
        },
        yRight: {
          type: "linear",
          position: "right",
          beginAtZero: true,
          min: 0,
          max: 800,
          ticks: { display: false },
          grid: { drawOnChartArea: false },
        },
      },
    };
  }

  // Initialize chart helper
  function initChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      return new Chart(canvas.getContext("2d"), config);
    }
    return null;
  }

  //  Pharmacy Home Page Chart
  const pharmacyChart = initChart("pharmacyChart", {
    type: "line",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Total Revenue",
          data: [600, 400, 590, 650, 800, 400, 160, 570],
          borderColor: "#5182E3",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yLeft",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#5182E3",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#5182E3",
        },
        {
          label: "Total Enquiries",
          data: [600, 700, 300, 250, 200, 600, 180, 700],
          borderColor: "#FFA500",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#FFA500",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#FFA500",
        },
        {
          label: "Points Earned",
          data: [0, 580, 170, 560, 410, 401, 70, 160],
          borderColor: "#3AAFA9",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#3AAFA9",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#3AAFA9",
        },
      ],
    },
    options: getChartOptions(),
  });

  //End Customers Home Page Chart
  const customersChart = initChart("customersChart", {
    type: "line",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Bill Amount",
          data: [600, 400, 590, 650, 800, 400, 160, 570],
          borderColor: "#5182E3",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yLeft",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#5182E3",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#5182E3",
        },
        {
          label: "Purchases Amount",
          data: [600, 700, 300, 250, 200, 600, 180, 700],
          borderColor: "#F79E1B",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#F79E1B",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#F79E1B",
        },
        {
          label: "Points Earned",
          data: [0, 580, 170, 560, 410, 401, 70, 160],
          borderColor: "#3AAFA9",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#3AAFA9",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#3AAFA9",
        },
      ],
    },
    options: getChartOptions(),
  });

  // Register as Advertiser Home Page Chart
  const advertiserChart = initChart("advertiserChart", {
    type: "line",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Total Coupons",
          data: [600, 400, 590, 650, 800, 400, 160, 570],
          borderColor: "#5182E3",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yLeft",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#5182E3",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#5182E3",
        },
        {
          label: "Total Redemptions",
          data: [600, 700, 300, 250, 200, 600, 180, 700],
          borderColor: "#FF6F61",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#FF6F61",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#FF6F61",
        },
        {
          label: "Active Coupons",
          data: [0, 580, 170, 560, 410, 401, 70, 160],
          borderColor: "#3AAFA9",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#3AAFA9",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#3AAFA9",
        },
      ],
    },
    options: getChartOptions(),
  });

  //Register as NGO Owner Home Page Chart
  const ngoChart = initChart("ngoChart", {
    type: "line",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Total Post",
          data: [600, 400, 590, 650, 800, 400, 160, 570],
          borderColor: "#6B79F5",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yLeft",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#6B79F5",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#6B79F5",
        },
        {
          label: "Total Views",
          data: [600, 700, 300, 250, 200, 600, 180, 700],
          borderColor: "#6B79F5",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#6B79F5",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#6B79F5",
        },
        {
          label: "Target Donation",
          data: [0, 580, 170, 560, 410, 401, 70, 160],
          borderColor: "#6B79F5",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#6B79F5",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#6B79F5",
        },
        {
          label: "Donation Received",
          data: [400, 500, 800, 290, 700, 200, 580, 300],
          borderColor: "#3AAFA9",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#3AAFA9",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#3AAFA9",
        },
      ],
    },
    options: getChartOptions(),
  });

  //Custom Legend Working Code
  const charts = [
    {
      chart: pharmacyChart,
      legendId: "#pharmacyCustomLegend",
      tabsId: "#pharmacytimeRangeTabs",
    },
    {
      chart: customersChart,
      legendId: "#endcustomersCustomLegend",
      tabsId: "#endcustomerstimeRangeTabs",
    },
    {
      chart: advertiserChart,
      legendId: "#advertiserCustomLegend",
      tabsId: "#advertisertimeRangeTabs",
    },
    {
      chart: ngoChart,
      legendId: "#ngoCustomLegend",
      tabsId: "#ngotimeRangeTabs",
    },
  ];
  charts.forEach(({ chart, legendId, tabsId }) => {
    $(`${legendId} .legend-checkbox`).on("change", function () {
      const datasetIndex = $(this).data("index");
      const visible = $(this).is(":checked");
      chart.setDatasetVisibility(datasetIndex, visible);
      chart.update();
    });

    // Time Range Tabs
    $("[data-active-class] p").click(function () {
      const $section = $(this).closest("[data-active-class]");
      const activeClass = $section.data("active-class");

      $section.find("p").removeClass(activeClass);
      $(this).addClass(activeClass);
    });
  });

  // Calendar [Pharmacy,Register as Advertiser,Register as NGO Owner Sections]
  $(".calendar-container").each(function () {
    const $root = $(this);
    const highlightColor = $root.data("color");

    const $label = $root.find("#monthYearLabel");
    const $dropdown = $root.find("#dropdownContent");
    const $calendarDays = $root.find("#calendarDays");
    const $prevBtn = $root.find("#prevMonth");
    const $nextBtn = $root.find("#nextMonth");
    const $dropdownToggle = $root.find("#monthYearDropdown");

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Example event data
    const calendarEvents = [
      { date: "2025-06-01", text: "PF Deposit", color: "bg-slate-blue" },
      { date: "2025-06-15", text: "ESI", color: "bg-green" },
      { date: "2025-06-21", text: "GST", color: "bg-strong-red" },
      { date: "2025-06-29", text: "INCOME TAX", color: "bg-vivid-orange" },
      { date: "2025-06-06", text: "PF Deposit", color: "bg-slate-blue" },
      { date: "2025-06-12", text: "ESI", color: "bg-green" },
      { date: "2025-06-27", text: "GST", color: "bg-strong-red" },
      { date: "2025-06-31", text: "INCOME TAX", color: "bg-vivid-orange" },
      { date: "2025-06-03", text: "PF Deposit", color: "bg-slate-blue" },
      { date: "2025-06-05", text: "ESI", color: "bg-green" },
      { date: "2025-06-09", text: "GST", color: "bg-strong-red" },
      { date: "2025-06-23", text: "INCOME TAX", color: "bg-vivid-orange" },
    ];

    function updateMonthYearLabel() {
      $label.text(`${monthNames[currentMonth]} ${currentYear}`);
    }

    function generateMonthYearDropdown() {
      let options = "";
      for (let y = currentYear - 20; y <= currentYear + 10; y++) {
        for (let m = 0; m < 12; m++) {
          options += `<div class="px-3 py-2 hover:bg-gray-200 cursor-pointer" data-month="${m}" data-year="${y}">
          ${monthNames[m]} ${y}
        </div>`;
        }
      }
      $dropdown.html(options);
    }

    function getEventsForDate(dateStr) {
      return calendarEvents.filter((event) => event.date === dateStr);
    }

    function renderCalendar() {
      $calendarDays.empty();
      dayNames.forEach((day) => {
        $calendarDays.append(
          `<div class="font-semibold text-sm text-gray-700 pt-2">${day}</div>`
        );
      });
      $calendarDays.append(
        `<div class="col-span-7"><hr class="border-t border-gray-300 my-2" /></div>`
      );

      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const startDay = firstDay === 0 ? 6 : firstDay - 1;
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      for (let i = 0; i < startDay; i++) {
        $calendarDays.append("<div></div>");
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

        const baseClasses = `aspect-square w-full h-10 flex flex-col gap-1 pl-2  items-start rounded-lg text-sm font-medium border border-gray-300 cursor-pointer transition`;

        const dateClass = isToday
          ? `bg-${highlightColor} text-white`
          : `hover:bg-${highlightColor} hover:text-white`;

        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        const events = getEventsForDate(dateStr);
        let eventsHtml = "";

        events.forEach((event) => {
          eventsHtml += `
  <div class="flex items-center gap-1 w-full">
    <div class="h-2 w-2 rounded-full ${event.color} shrink-0"></div>
    
  </div>
`;
        });

        $calendarDays.append(`
        <div class="${baseClasses} ${dateClass}" data-date="${dateStr}">
          ${day}
          ${eventsHtml}
        </div>
      `);
      }

      updateMonthYearLabel();
    }

    $root
      .find(".bg-light-sea-green")
      .removeClass("bg-light-sea-green")
      .addClass(`bg-${highlightColor}`);

    $dropdownToggle.on("click", function (e) {
      e.stopPropagation();
      $dropdown.toggle();
    });

    $dropdown.on("click", "div", function () {
      currentMonth = +$(this).data("month");
      currentYear = +$(this).data("year");
      $dropdown.hide();
      renderCalendar();
    });

    $prevBtn.on("click", function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    $nextBtn.on("click", function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });

    $(document).on("click", function (e) {
      if (
        !$dropdownToggle.is(e.target) &&
        $dropdownToggle.has(e.target).length === 0
      ) {
        $dropdown.hide();
      }
    });

    generateMonthYearDropdown();
    renderCalendar();
  });

  //Enquirers Map on Pharmacy Home Page
  function initMap() {
    const map = L.map("map").setView([28.6139, 77.209], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setView([lat, lng], 13);
          L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();
        },
        function () {
          window.showToaster(
            "error",
            "Geolocation permission denied. Showing default location."
          );
        }
      );
    } else {
      window.showToaster("error", "Geolocation not supported by your browser.");
    }
    const enquirerData = [
      { lat: 18.5308, lng: 73.8476, count: 5 },
      { lat: 18.509, lng: 73.8077, count: 15 },
      { lat: 18.5913, lng: 73.7386, count: 25 },
      { lat: 18.5989, lng: 73.7705, count: 8 },
      { lat: 18.4966, lng: 73.9489, count: 20 },

      { lat: 19.1197, lng: 72.8468, count: 5 },
      { lat: 19.0184, lng: 72.8436, count: 15 },
      { lat: 19.2183, lng: 72.9781, count: 25 },
    ];
    enquirerData.forEach((data) => {
      const color = "#3AAFA9";
      L.circleMarker([data.lat, data.lng], {
        radius: data.count * 0.8,
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
      }).addTo(map);
      L.marker([data.lat, data.lng], {
        icon: L.divIcon({
          className: "custom-label",
          html: `<div style="color: black; font-weight: bold; font-size: 12px; text-align:center;">${data.count}</div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
        interactive: false,
      }).addTo(map);
    });
  }
  if (document.getElementById("map")) {
    initMap();
  }

  //Date and Location of User on  Home Page of All Sections
  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  $("#date").text(`${formattedDate}`);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const apiKey = "0ea1953645414eb789b5329c020bc214";
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

        $.get(apiUrl, function (data) {
          if (data.results.length > 0) {
            const components = data.results[0].components;
            const city =
              components.city ||
              components.town ||
              components.village ||
              "New Delhi";
            const state = components.state || "";
            const country = components.country || "";

            $("#location-text").text(` ${city},  ${country}`);
          } else {
            $("#location").text("Location not found.");
          }
        }).fail(function () {
          $("#location").text("Failed to fetch city name.");
        });
      },
      function () {
        $("#location").text("Unable to retrieve location.");
      }
    );
  } else {
    $("#location").text("Geolocation is not supported.");
  }

  //End-customers Calendar
  function initCustomerCalendar() {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function generateMonthYearDropdown() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let options = "";
      for (let y = currentYear - 50; y <= currentYear + 10; y++) {
        for (let m = 0; m < 12; m++) {
          options += `<div class="px-3 py-2 hover:bg-gray-200 cursor-pointer" data-month="${m}" data-year="${y}">
                    ${monthNames[m]} ${y}
                </div>`;
        }
      }
      $("#dropdownContent").html(options);
      updateMonthYearLabel();
    }

    function updateMonthYearLabel() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      $("#monthYearLabel").text(`${monthNames[currentMonth]} ${currentYear}`);
    }

    function renderCalendar(month, year) {
      $("#calendarDays").empty();
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        const dateStr = `${year}-${month + 1}-${day}`;
        const isToday =
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        let classNames = `cursor-pointer p-2 rounded-full font-semibold h-10 w-10 bg-lightest-gray 
          ${
            isToday
              ? "bg-vivid-orange text-white today"
              : "hover:bg-vivid-orange hover:text-white"
          }`;

        $("#calendarDays").append(`
            <div class="calendar-day flex flex-col items-center justify-center gap-1" data-date="${dateStr}">
              <div class="${classNames} day-circle">${day}</div>
              <div>${dayNames[dayOfWeek]}</div>
            </div>
            `);
        $(document).on("click", ".calendar-day", function () {
          $(".calendar-day .day-circle").removeClass(
            "bg-vivid-orange text-white"
          );
          $(this).find(".day-circle").addClass("bg-vivid-orange text-white");
        });
      }

      updateMonthYearLabel();
    }

    $("#monthYearDropdown").click(() => $("#dropdownContent").toggle());

    $(document).on("click", "#dropdownContent div", function () {
      currentMonth = $(this).data("month");
      currentYear = $(this).data("year");
      $("#dropdownContent").hide();
      renderCalendar(currentMonth, currentYear);
    });

    $(document).click(function (e) {
      if (!$(e.target).closest("#monthYearDropdown").length) {
        $("#dropdownContent").hide();
      }
    });

    generateMonthYearDropdown();
    renderCalendar(currentMonth, currentYear);
  }
  if (document.getElementById("customer-calendar")) {
    initCustomerCalendar();
  }

  //Client company dashboard calendar
  //   function initClientCalendar(){

  //  $(".client-calendar-container").each(function () {
  //   const $root = $(this);
  //   const highlightColor = $root.data("color");

  //   const $label = $root.find("#monthYearLabel");
  //   const $dropdown = $root.find("#dropdownContent");
  //   const $calendarDays = $root.find("#calendarDays");
  //   const $prevBtn = $root.find("#prevMonth");
  //   const $nextBtn = $root.find("#nextMonth");
  //   const $dropdownToggle = $root.find("#monthYearDropdown");

  //   const today = new Date();
  //   let currentMonth = today.getMonth();
  //   let currentYear = today.getFullYear();

  //   const monthNames = [
  //     "January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];
  //   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //   // Example event data
  //   const calendarEvents = [
  //     { date: "2025-06-01", text: "PF Deposit", color: "bg-slate-blue" },
  //     { date: "2025-06-15", text: "ESI", color: "bg-green" },
  //     { date: "2025-06-21", text: "GST", color: "bg-strong-red" },
  //     { date: "2025-06-29", text: "INCOME TAX", color: "bg-vivid-orange" },
  //     { date: "2025-06-06", text: "PF Deposit", color: "bg-slate-blue" },
  //     { date: "2025-06-12", text: "ESI", color: "bg-green" },
  //     { date: "2025-06-27", text: "GST", color: "bg-strong-red" },
  //     { date: "2025-06-31", text: "INCOME TAX", color: "bg-vivid-orange" },
  //     { date: "2025-06-03", text: "PF Deposit", color: "bg-slate-blue" },
  //     { date: "2025-06-05", text: "ESI", color: "bg-green" },
  //     { date: "2025-06-09", text: "GST", color: "bg-strong-red" },
  //     { date: "2025-06-23", text: "INCOME TAX", color: "bg-vivid-orange" },

  //   ];

  //   function updateMonthYearLabel() {
  //     $label.text(`${monthNames[currentMonth]} ${currentYear}`);
  //   }

  //   function generateMonthYearDropdown() {
  //     let options = "";
  //     for (let y = currentYear - 20; y <= currentYear + 10; y++) {
  //       for (let m = 0; m < 12; m++) {
  //         options += `<div class="px-3 py-2 hover:bg-gray-200 cursor-pointer" data-month="${m}" data-year="${y}">
  //           ${monthNames[m]} ${y}
  //         </div>`;
  //       }
  //     }
  //     $dropdown.html(options);
  //   }

  //   function getEventsForDate(dateStr) {
  //     return calendarEvents.filter(event => event.date === dateStr);
  //   }

  //   function renderCalendar() {
  //     $calendarDays.empty();
  //     dayNames.forEach(day => {
  //       $calendarDays.append(`<div class="font-semibold text-sm text-gray-700 pt-2">${day}</div>`);
  //     });
  //     $calendarDays.append(`<div class="col-span-7"><hr class="border-t border-gray-300 my-2" /></div>`);

  //     const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  //     const startDay = firstDay === 0 ? 6 : firstDay - 1;
  //     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  //     for (let i = 0; i < startDay; i++) {
  //       $calendarDays.append("<div></div>");
  //     }

  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const isToday =
  //         day === today.getDate() &&
  //         currentMonth === today.getMonth() &&
  //         currentYear === today.getFullYear();

  //       const baseClasses = `aspect-square w-full h-10 flex flex-col gap-1 pl-0.5 items-start rounded-lg text-sm font-medium border border-gray-300 cursor-pointer transition`;

  //       const dateClass = isToday
  //         ? `bg-${highlightColor} text-white`
  //         : `hover:bg-${highlightColor} hover:text-white`;

  //       const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  //       const events = getEventsForDate(dateStr);
  //       let eventsHtml = "";

  //       events.forEach(event => {
  //         eventsHtml += `
  //           <div class="flex items-center gap-1">
  //             <div class="h-2 w-2 rounded-full ${event.color}"></div>

  //           </div>
  //         `;
  //       });

  //       $calendarDays.append(`
  //         <div class="${baseClasses} ${dateClass}" data-date="${dateStr}">
  //           ${day}
  //           ${eventsHtml}
  //         </div>
  //       `);
  //     }

  //     updateMonthYearLabel();
  //   }

  //   $root.find(".bg-light-sea-green").removeClass("bg-light-sea-green").addClass(`bg-${highlightColor}`);

  //   $dropdownToggle.on("click", function (e) {
  //     e.stopPropagation();
  //     $dropdown.toggle();
  //   });

  //   $dropdown.on("click", "div", function () {
  //     currentMonth = +$(this).data("month");
  //     currentYear = +$(this).data("year");
  //     $dropdown.hide();
  //     renderCalendar();
  //   });

  //   $prevBtn.on("click", function () {
  //     currentMonth--;
  //     if (currentMonth < 0) {
  //       currentMonth = 11;
  //       currentYear--;
  //     }
  //     renderCalendar();
  //   });

  //   $nextBtn.on("click", function () {
  //     currentMonth++;
  //     if (currentMonth > 11) {
  //       currentMonth = 0;
  //       currentYear++;
  //     }
  //     renderCalendar();
  //   });

  //   $(document).on("click", function (e) {
  //     if (!$dropdownToggle.is(e.target) && $dropdownToggle.has(e.target).length === 0) {
  //       $dropdown.hide();
  //     }
  //   });

  //   generateMonthYearDropdown();
  //   renderCalendar();
  // });

  //    }
  //    if(document.getElementById('client-calendar')){
  //    initClientCalendar()
  //  }

  //Select Patient Dropdown on End Customers Home Page
  //  $('.dropdown-btn').on('click', function () {
  //   $(this).siblings('.dropdown-option').toggleClass('hidden');
  // });
  // $('.dropdown-option .option-item').on('click', function () {
  //   const selectedOption = $(this).text();
  //   $(this).closest('.dropdown').find('.dropdown-btn span.block').text(selectedOption);
  //   $(this).closest('.dropdown-option').addClass('hidden');
  // });
  // $(document).on('click', function (e) {
  //   if (!$(e.target).closest('.dropdown').length) {
  //     $('.dropdown-option').addClass('hidden');
  //   }
  // });

  $(".add-event-btn").on("click", function () {
    $(".event-calendar").removeClass("hidden");
  });

  function initEventCalendar() {
    $(".event-calendar-container").each(function () {
      const $root = $(this);
      const highlightColor = $root.data("color");

      const $label = $root.find("#monthYearLabel");
      const $dropdown = $root.find("#dropdownContent");
      const $calendarDays = $root.find("#calendarDays");
      const $prevBtn = $root.find("#prevMonth");
      const $nextBtn = $root.find("#nextMonth");
      const $dropdownToggle = $root.find("#monthYearDropdown");

      const today = new Date();
      let currentMonth = today.getMonth();
      let currentYear = today.getFullYear();
      let selectedDate = null; // ✅ track selected date

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      function updateMonthYearLabel() {
        $label.text(`${monthNames[currentMonth]} ${currentYear}`);
      }

      function generateMonthYearDropdown() {
        let options = "";
        for (let y = currentYear - 20; y <= currentYear + 10; y++) {
          for (let m = 0; m < 12; m++) {
            options += `<div class="px-3 py-2 hover:bg-gray-200 cursor-pointer" data-month="${m}" data-year="${y}">
            ${monthNames[m]} ${y}
          </div>`;
          }
        }
        $dropdown.html(options);
      }

      function renderCalendar() {
        $calendarDays.empty();
        dayNames.forEach((day) => {
          $calendarDays.append(
            `<div class="font-semibold text-sm text-smoke-gray">${day}</div>`
          );
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        const daysInMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();

        for (let i = 0; i < startDay; i++) {
          $calendarDays.append("<div></div>");
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isSelected = selectedDate === dateStr;

          const baseClasses = `cursor-pointer font-normal text-xl text-jet-black w-1/2 text-center rounded-full`;

          let extraClasses = "";
          if (isSelected) {
            // Selected date
            extraClasses = `bg-${highlightColor} text-white`;
          } else {
            // Normal hover
            extraClasses = `hover:bg-${highlightColor} hover:text-white`;
          }
          $calendarDays.append(`
          <div class="${baseClasses} ${extraClasses}" data-date="${dateStr}">
            ${day}
          </div>
        `);
        }

        $calendarDays.append(
          `<div class="col-span-7"><hr class="border-t border-gray-300 my-2" /></div>`
        );
        updateMonthYearLabel();
      }

      // ✅ Date click selection
      $calendarDays.on("click", "div[data-date]", function () {
        selectedDate = $(this).data("date");
        renderCalendar(); // ✅ re-render to highlight
      });

      // Replace color class in header
      // $root.find(".bg-light-sea-green").removeClass("bg-light-sea-green").addClass(`bg-${highlightColor}`);

      $dropdownToggle.on("click", function (e) {
        e.stopPropagation();
        $dropdown.toggle();
      });

      $dropdown.on("click", "div", function () {
        currentMonth = +$(this).data("month");
        currentYear = +$(this).data("year");
        $dropdown.hide();
        renderCalendar();
      });

      $prevBtn.on("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderCalendar();
      });

      $nextBtn.on("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderCalendar();
      });

      $(document).on("click", function (e) {
        if (
          !$dropdownToggle.is(e.target) &&
          $dropdownToggle.has(e.target).length === 0
        ) {
          $dropdown.hide();
        }
      });

      generateMonthYearDropdown();
      renderCalendar();
    });
  }

  if (document.getElementById("eventCal")) {
    initEventCalendar();
  }

  function initClientCompanyChart() {
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById("dataTrendsChart")?.getContext("2d");
    if (!ctx) return; // Safeguard if chart container is missing

    const dataTrendsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Monthly Data",
            data: [120, 200, 150, 80, 70, 110, 130, 130, 50, 65, 95, 110],
            backgroundColor: "#3586FC",
            borderRadius: { topLeft: 6, topRight: 6 },
            barThickness: window.innerWidth < 640 ? 10 : 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: "end",
            align: "end",
            color: "#A1A9BC",
            font: { weight: "normal" },
            formatter: (value) => value,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
              font: { size: 14, weight: "bold", color: "#1F1F1F" },
            },
            grid: { display: false },
          },
          y: {
            title: {
              display: true,
              text: "Reports Downloaded",
              font: { size: 14, weight: "bold", color: "#1F1F1F" },
            },
            beginAtZero: true,
            grid: { display: true, drawBorder: false },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    // Handle resize
    window.addEventListener("resize", () => {
      dataTrendsChart.resize();
    });
  }
  if (document.getElementById("dataTrendsChart")) {
    initClientCompanyChart();
  }
  $(".meridian-btn").on("click", function () {
    $(".meridian-btn")
      .removeClass("bg-white text-black shadow-md active")
      .addClass("text-jet-black hover:bg-gray-200");
    $(this)
      .removeClass("text-jet-black hover:bg-gray-200")
      .addClass("bg-white text-black shadow-md active");
  });

  $(".cancelEvent-btn").on("click", function () {
    $(".event-calendar").addClass("hidden");
  });

  $('.material-symbols-outlined:contains("bookmark")').on("click", function () {
    $(this).toggleClass("material-filled text-dark-blue");
  });

  $(".chatTrigger").on("click", function () {
    $(".avatar").removeClass("hidden");
    $(".chatTrigger").hide();
  });
  $(".close-avatar-btn").on("click", function () {
    $(".avatar").addClass("hidden");
    $(".chatTrigger").show();
  });

  $(".popup-btn").on("click", function () {
    let popupId = $(this).data("popup");
    $("." + popupId)
      .removeClass("hidden")
      .addClass("flex");
  });

  // Close popup
  $(".close-popup").on("click", function () {
    let popupId = $(this).data("popup");
    $(this)
      .closest("." + popupId)
      .addClass("hidden")
      .removeClass("flex");
  });

  $(".section-dropdown-toggle").on("click", function () {
    $(this).siblings(".section-dropdown-menu").toggleClass("hidden");
  });
  $(".section-dropdown-option").on("click", function () {
    const selectedText = $(this).text().trim();
    const $container = $(this).closest(".section-dropdown-container");

    $container.find(".section-dropdown-input").val(selectedText);
    $container.find(".section-dropdown-menu").addClass("hidden");
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".section-dropdown-container").length) {
      $(".section-dropdown-menu").addClass("hidden");
    }
  });

  $(".calendar-wrapper").each(function () {
    const $wrapper = $(this);
    const $input = $wrapper.find(".start-date-range");
    const $label = $wrapper.find(".selected-date");
    const $trigger = $wrapper.find(".custom-date-trigger");

    $input.datepicker({
      dateFormat: "dd/mm/yy",
      changeYear: true,
      changeMonth: true,
      yearRange: "2015:" + new Date().getFullYear(),
      onSelect: function (dateText) {
        $label.text(dateText);
      },
    });

    $trigger.on("click", function () {
      $input.datepicker("show");
    });
  });

  const availableTags = [
    "john.doe@gmail.com",
    "jane.smith@gmail.com",
    "alex.jordan@gmail.com",
    "emma.wilson@gmail.com",
    "chris.brown@gmail.com",
    "linda.white@gmail.com",
    "michael.scott@gmail.com",
    "sara.connor@gmail.com",
    "peter.parker@gmail.com",
    "tony.stark@gmail.com",
  ];

  let tags = [];
  const maxTags = 8;

  // Render selected tags inside #tag-box before the input
  function renderTags() {
    $("#tag-box .tag-chip").remove();

    tags.forEach((tag, index) => {
      const tagEl = $(`
      <span class="tag-chip inline-flex items-center bg-[#F1F8FF] text-dark-gray px-2 py-0.5 rounded-full text-sm font-normal">
        ${tag}
        <button type="button" class="ml-1 text-jet-black text-sm cursor-pointer" data-index="${index}">&times;</button>
      </span>
    `);

      $("#tag-input").before(tagEl);
    });
  }

  // Handle suggestions
  $("#tag-input").on("input", function () {
    const query = $(this).val().trim().toLowerCase();
    const $suggestions = $("#tag-suggestions");

    if (!query) {
      $suggestions.empty().css("visibility", "hidden");
      return;
    }

    const matches = availableTags
      .filter((tag) => tag.toLowerCase().includes(query) && !tags.includes(tag))
      .slice(0, 5);

    if (matches.length === 0) {
      $suggestions.empty().css("visibility", "hidden");
      return;
    }

    const html = matches
      .map(
        (tag) => `
    <div class="px-4 py-2 hover:bg-dark-blue hover:text-white cursor-pointer" data-tag="${tag}">
      ${tag}
    </div>
  `
      )
      .join("");

    $suggestions.html(html).css("visibility", "visible");
  });

  // Select tag from suggestions
  $("#tag-suggestions").on("mousedown", "[data-tag]", function (e) {
    e.stopPropagation();

    const selectedTag = $(this).data("tag");

    if (tags.includes(selectedTag)) {
      window.showToaster?.("error", "Tag already selected.");
      return;
    }

    if (tags.length >= maxTags) {
      window.showToaster?.("error", "Only 8 tags can be selected.");
      return;
    }

    tags.push(selectedTag);
    renderTags();
    $("#tag-input").val("");
    $("#tag-suggestions").empty().css("visibility", "hidden");
  });

  // Add tag on Enter
  $("#tag-input").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      const newTag = $(this).val().trim();
      if (newTag && !tags.includes(newTag)) {
        if (tags.length < maxTags) {
          tags.push(newTag);
          renderTags();
          $(this).val("");
          $("#tag-suggestions").empty().css("visibility", "hidden");
        } else {
          window.showToaster?.("error", "Only 8 tags can be selected.");
        }
      } else {
        $("#tag-suggestions").empty().css("visibility", "hidden");
      }
    }
  });

  // Remove tag
  $("#tag-box").on("click", "button", function () {
    const index = $(this).data("index");
    tags.splice(index, 1);
    renderTags();
  });

  $(".dropdown-toggle").on("click", function () {
    const $wrapper = $(this).closest(".dropdown-wrapper");
    $wrapper.find(".dropdown-menu").toggleClass("hidden");
  });

  $(".dropdown-option").on("click", function () {
    const selectedText = $(this)
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();

    const $wrapper = $(this).closest(".dropdown-wrapper");
    const $display = $wrapper.find(".dropdown-display");
    const $menu = $wrapper.find(".dropdown-menu");

    // Reset dropdown visual states
    $menu.find(".dropdown-option").removeClass("font-bold");
    $menu.find(".check-icon").addClass("hidden");

    // Highlight selected item
    $(this).addClass("font-bold");
    $(this).find(".check-icon").removeClass("hidden");

    // Clear old chip and placeholder
    $display.find(".dropdown-placeholder, .selected-chip").remove();

    // Add new chip
    const chip = `
    <span class="selected-chip bg-white text-dark-gray font-semibold text-sm rounded-full px-3 py-1 shadow-[4px_4px_10px_#00000026] flex items-center gap-2">
      ${selectedText}
   
    </span>`;
    $display.append(chip);

    // Hide menu
    $menu.addClass("hidden");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".dropdown-wrapper").length) {
      $(".dropdown-menu").addClass("hidden");
    }
  });

  $(".save-schedule-btn").on("click", function (e) {
    $(".reportSchedulerPopup").addClass("hidden");
    $(".successPopup").removeClass("hidden");
    setTimeout(() => {
      $(".successPopup").addClass("hidden");
    }, 5000);
  });

  $(".close-success-popup").on("click", function (e) {
    $(".successPopup").addClass("hidden");
  });

  $(".remove-schedule-btn").on("click", function () {
    const popup = $(".reportSchedulerPopup");
    if (!popup.length) return;
    popup.find(".dropdown-display").each(function () {
      const placeholder =
        $(this).closest(".dropdown-wrapper").data("placeholder") || "Select";
      $(this).html(
        `<span class="dropdown-placeholder text-dark-gray text-xs font-semibold">${placeholder}</span>`
      );
    });
    popup.find(".section-dropdown-input").val("");
    popup.find('input[type="checkbox"]').prop("checked", false);
    popup
      .find('input[type="text"], input[type="number"]')
      .not(".custom-date-range")
      .val("");
    popup.find(".selected-date").text("DD/MM/YY");
    popup.find(".dropdown-menu, .section-dropdown-menu").addClass("hidden");
    $("#tag-box .tag-chip").remove();
    $("#tag-input").val("");
    $("#tag-suggestions").addClass("invisible");
    tags = [];
  });

  $(".addEventButton").on("click", function () {
    $(".eventsuccessPopup").removeClass("hidden");
    setTimeout(() => {
      $(".eventsuccessPopup").addClass("hidden");
    }, 5000);
  });

  $(".close-eventsuccess-popup").on("click", function () {
    $(".eventsuccessPopup").addClass("hidden");
  });

  //Accept Button Click
  $(".accept-button").on("click", function () {
    $(".enquiredDetail").hide();
    $(".acceptedDetail").removeClass("hidden");
  });

  //Complete Button Click
  $(".complete-btn").on("click", function () {
    $(".enquiredDetail").hide();
    $(".acceptedDetail").addClass("hidden");
    $(".completeDetail").removeClass("hidden");
  });

  //Save Button Click
  $(".save-btn").on("click", function () {
    $(".enquiredDetail").hide();
    $(".acceptedDetail").addClass("hidden");
    $(".completeDetail").addClass("hidden");
    $(".missingDetails").removeClass("hidden");
  });

  //Cancel Appointment Button Click
  $(".cancelAppointmentBtn").on("click", function () {
    $(".enquiredDetail").hide();
    $(".acceptedDetail").addClass("hidden");
    $(".completeDetail").addClass("hidden");
    $(".missingDetails").addClass("hidden");
    $(".cancelDetails").removeClass("hidden");
  });

  $(".accept-icon, .reject-icon").on("click", function (e) {
    e.stopPropagation();

    // Get the parent container that holds all the icons
    let parent = $(this).parent();

    // Hide both icons
    parent.find(".accept-icon, .reject-icon").hide();

    if ($(this).hasClass("accept-icon")) {
      parent.find(".accepted").removeClass("hidden");
      parent.find(".rejected").addClass("hidden");
      toastr.success("Appointment accepted");
    } else {
      parent.find(".rejected").removeClass("hidden");
      parent.find(".accepted").addClass("hidden");
      toastr.error("Appointment rejected");
    }
  });

  $(".view-attachment").on("click", function () {
    $(".attachmentPopup").removeClass("hidden");
  });

  $(".close-attachment").on("click", function () {
    $(".attachmentPopup").addClass("hidden");
  });
});
