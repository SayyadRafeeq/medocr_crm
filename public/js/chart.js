$(document).ready(function () {

  /* ---------- BAR CHART ---------- */
  if (document.getElementById("barChart")) {
    const barCtx = document.getElementById("barChart").getContext("2d");
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["CBC", "RT-PCR", "Lipid", "Thyroid", "HBAC"],
        datasets: [{
          data: [120, 160, 70, 150, 100],
          backgroundColor: ["#3b82f6", "#f97316", "#22c55e", "#8b5cf6", "#a855f7"],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });
  }

  /* ---------- PIE CHART ---------- */
  if (document.getElementById("pieChart")) {
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["CBC", "RT-PCR", "Lipid", "Thyroid", "Others"],
        datasets: [{
          data: [30, 25, 18, 12, 12],
          backgroundColor: ["#3b82f6", "#f97316", "#22c55e", "#ef4444", "#eab308"],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
      },
    });
  }

  /* ---------- LINE CHART ---------- */
  if (document.getElementById("lineChart")) {
    const lineCtx = document.getElementById("lineChart").getContext("2d");
    new Chart(lineCtx, {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "CBC",
            data: [320, 340, 310, 360],
            borderColor: "#3b82f6",
            fill: false,
          },
          {
            label: "RT-PCR",
            data: [420, 380, 460, 400],
            borderColor: "#f97316",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
      },
    });
  }

  /* ---------- USER RATINGS ---------- */
  if ($("#ratings").length) {
    const ratingData = [
      { stars: 5, percent: 74 },
      { stars: 4, percent: 54 },
      { stars: 3, percent: 38 },
      { stars: 2, percent: 18 },
      { stars: 1, percent: 3 },
    ];

    ratingData.forEach(r => {
      $("#ratings").append(`
        <div class="flex items-center justify-between">
          <span class="text-dodger-blue">${r.stars} star</span>
          <div class="w-3/4 bg-[#D3D3D3] rounded-full h-2">
            <div class="bg-[#FFCC48] h-2 rounded-full" style="width:${r.percent}%"></div>
          </div>
          <span>${r.percent}%</span>
        </div>
      `);
    });
  }

  /* ---------- DOWNLOAD PDF ---------- */
  $(".download-btn").on("click", function () {
    const targetId = $(this).data("target");
    if (!document.getElementById(targetId)) return;

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.html(document.getElementById(targetId), {
      callback: function (doc) {
        doc.save(`${targetId}.pdf`);
      },
      x: 10,
      y: 10,
    });
  });



  // Toggle dropdown visibility
  $(document).on('click', '.dropdown-btn', function (e) {
    e.stopPropagation();
    const $dropdown = $(this).closest('.dropdown');
    $('.dropdown-menu').not($dropdown.find('.dropdown-menu')).addClass('hidden');
    $dropdown.find('.dropdown-menu').toggleClass('hidden');
  });

  // Handle selection
  $(document).on('click', '.dropdown-menu li', function (e) {
    const $dropdown = $(this).closest('.dropdown');
    const value = $(this).text();
    $dropdown.find('.dropdown-value').text(value);
    $dropdown.find('.dropdown-menu').addClass('hidden');
  });

  // Close dropdown when clicking outside
  $(document).click(function () {
    $('.dropdown-menu').addClass('hidden');
  });
});


$(document).ready(function () {

  const $filterToggle = $("#filterToggle");
  const $dropdown = $("#filterDropdown");

  const $mainMenu = $("#mainMenu");
  const $dateMenu = $("#dateMenu");
  const $visitMenu = $("#visitMenu");

  let state = {
    date: "Week",
    visit: "Home"
  };

  /* ---------------- TOGGLE DROPDOWN ---------------- */
  $filterToggle.on("click", function (e) {
    e.stopPropagation();
    $dropdown.toggleClass("hidden");
    showMainMenu();
  });

  /* ---------------- OPEN SUB MENUS ---------------- */
  $("[data-open]").on("click", function () {
    const menu = $(this).data("open");

    $mainMenu.addClass("hidden");

    if (menu === "date") {
      $dateMenu.removeClass("hidden");
    } else {
      $visitMenu.removeClass("hidden");
    }
  });

  /* ---------------- BACK NAVIGATION ---------------- */
  $("[data-back]").on("click", function () {
    showMainMenu();
  });

  function showMainMenu() {
    $mainMenu.removeClass("hidden");
    $dateMenu.addClass("hidden");
    $visitMenu.addClass("hidden");
    updateChecks();
  }

  /* ---------------- HANDLE SELECTION ---------------- */
  $(".option").on("click", function () {
    const type = $(this).data("type");
    const value = $(this).data("value");

    state[type] = value;
    showMainMenu();
  });

  /* ---------------- UPDATE CHECK ICONS ---------------- */
  function updateChecks() {
    $(".check-icon").remove();

    $(".option").each(function () {
      const type = $(this).data("type");
      const value = $(this).data("value");

      if (state[type] === value) {
        $(this).append(
          `<span class="material-symbols-outlined text-dodger-blue check-icon">check</span>`
        );
      }
    });
  }

  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */
  $(document).on("click", function () {
    $dropdown.addClass("hidden");
  });

  $dropdown.on("click", function (e) {
    e.stopPropagation();
  });

});

// bid win calendar
$(document).ready(function () {

  let selectedDate = "Today";

  /* -------- TOGGLE CALENDAR POPUP -------- */
  $(".calendarToggle").on("click", function (e) {
    e.stopPropagation();
    $(".calendarPopup").toggleClass("hidden");
  });

  /* -------- SELECT OPTION (KEEP OPEN) -------- */
  $(".calendar-option").on("click", function (e) {
    e.stopPropagation(); // 🔑 IMPORTANT FIX

    selectedDate = $(this).data("value");

    // Reset checks
    $(".calendar-option span:first-child")
      .removeClass("text-dodger-blue")
      .addClass("text-light-gray");

    // Activate selected
    $(this).find("span:first-child")
      .removeClass("text-light-gray")
      .addClass("text-dodger-blue");

    // ❌ DO NOT close popup here
    // $(".calendarPopup").addClass("hidden");
  });

  /* -------- CLOSE ONLY ON OUTSIDE CLICK -------- */
  $(document).on("click", function () {
    $(".calendarPopup").addClass("hidden");
  });

  $(".calendarPopup").on("click", function (e) {
    e.stopPropagation();
  });

});

//heatmap calendar
$(document).ready(function () {

  let heatmapDate = "Today";

  /* ---- TOGGLE HEATMAP CALENDAR ---- */
  $(".heatmapCalendarToggle").on("click", function (e) {
    e.stopPropagation();
    $(".heatmapCalendarPopup").toggleClass("hidden");
  });

  /* ---- SELECT OPTION (KEEP POPUP OPEN) ---- */
  $(".heatmap-cal-option").on("click", function (e) {
    e.stopPropagation(); // 🔑 IMPORTANT FIX

    heatmapDate = $(this).data("value");

    // reset checks
    $(".heatmap-cal-option span:first-child")
      .removeClass("text-dodger-blue")
      .addClass("text-light-gray");

    // activate selected
    $(this).find("span:first-child")
      .removeClass("text-light-gray")
      .addClass("text-dodger-blue");

    // ❌ DO NOT close popup here
    // $(".heatmapCalendarPopup").addClass("hidden");
  });

  /* ---- CLOSE ONLY ON OUTSIDE CLICK ---- */
  $(document).on("click", function () {
    $(".heatmapCalendarPopup").addClass("hidden");
  });

  $(".heatmapCalendarPopup").on("click", function (e) {
    e.stopPropagation();
  });

});

// Consolidation calendar
// $(document).ready(function () {

//   let consolidationDate = "Today";

//   /* ---- TOGGLE CONSOLIDATION CALENDAR ---- */
//   $(".consolidationCalendarToggle").on("click", function (e) {
//     e.stopPropagation();
//     $(".consolidationCalendarPopup").toggleClass("hidden");
//   });

//   /* ---- SELECT OPTION (KEEP POPUP OPEN) ---- */
//   $(".consolidation-cal-option").on("click", function (e) {
//     e.stopPropagation(); // 🔑 critical

//     consolidationDate = $(this).data("value");

//     // reset checks
//     $(".consolidation-cal-option span:first-child")
//       .removeClass("text-dodger-blue")
//       .addClass("text-light-gray");

//     // activate selected
//     $(this).find("span:first-child")
//       .removeClass("text-light-gray")
//       .addClass("text-dodger-blue");

//     // ❌ do NOT close popup here
//   });

//   /* ---- CLOSE ONLY ON OUTSIDE CLICK ---- */
//   $(document).on("click", function () {
//     $(".consolidationCalendarPopup").addClass("hidden");
//   });

//   $(".consolidationCalendarPopup").on("click", function (e) {
//     e.stopPropagation();
//   });

// });

//custome calendar logic
// function setupCalendar({
//   toggle,
//   popup,
//   option,
//   dateText
// }) {
//   let selected = "Today";

//   // Toggle popup
//   $(toggle).on("click", function (e) {
//     e.stopPropagation();
//     $(popup).toggleClass("hidden");
//   });

//   // Option click
//   $(option).on("click", function (e) {
//     e.stopPropagation();

//     selected = $(this).data("value");

//     // reset all checks
//     $(option).find("span:first-child")
//       .removeClass("text-dodger-blue")
//       .addClass("text-light-gray");

//     // activate selected
//     $(this).find("span:first-child")
//       .removeClass("text-light-gray")
//       .addClass("text-dodger-blue");

//     // update date text (for Today / Week / Month)
//     if (selected !== "Custom") {
//       $(dateText).text(selected);
//     }
//   });

//   // Close on outside click
//   $(document).on("click", function () {
//     $(popup).addClass("hidden");
//   });

//   $(popup).on("click", function (e) {
//     e.stopPropagation();
//   });
// }

//Zoom in and zoom out functionality
$(document).ready(function () {
  let zoom = 100;
  const minZoom = 80;
  const maxZoom = 300;

  $(".doctor-report-shadow").on("wheel", function (e) {
    e.preventDefault();

    zoom += e.originalEvent.deltaY < 0 ? 10 : -10;
    zoom = Math.min(maxZoom, Math.max(minZoom, zoom));

    $(this).css("background-size", zoom + "%");
  });
});


$(document).ready(function () {
  $(".bar").on("mouseenter", function (e) {
    const label = $(this).data("label");
    const value = $(this).data("value");

    $("body").append(`
        <div class="bar-tooltip">
          ${label}: ${value}
        </div>
      `);
  });

  $(".bar").on("mousemove", function (e) {
    $(".bar-tooltip").css({
      top: e.clientY - 30 + "px",
      left: e.clientX + 10 + "px"
    });
  });

  $(".bar").on("mouseleave", function () {
    $(".bar-tooltip").remove();
  });
});


//calendar for js
// $(document).ready(function () {

//   /* ---- TOGGLE DROPDOWN ---- */
//   $(".consolidationCalendarToggle").on("click", function (e) {
//     e.stopPropagation();
//     $(".consolidationCalendarPopup").toggleClass("hidden");
//   });

//   /* ---- OPTION CLICK ---- */
//   $(".consolidation-cal-option").on("click", function (e) {
//     e.stopPropagation();

//     const value = $(this).data("value");

//     // reset check icons
//     $(".consolidation-cal-option span:first-child")
//       .removeClass("text-dodger-blue")
//       .addClass("text-light-gray");

//     // activate selected
//     $(this).find("span:first-child")
//       .removeClass("text-light-gray")
//       .addClass("text-dodger-blue");

//     if (value === "Custom") {
//       $(".consolidationDatePicker")
//         .removeClass("hidden")
//         .focus()
//         .trigger("click");
//     } else {
//       $(".calendar-date-text").text(value);
//       $(".consolidationCalendarPopup").addClass("hidden");
//     }
//   });

//   /* ---- DATE SELECT ---- */
//   $(".consolidationDatePicker").on("change", function () {
//     $(".calendar-date-text").text(this.value);
//     $(".consolidationCalendarPopup").addClass("hidden");
//     $(this).addClass("hidden");
//   });

//   /* ---- CLOSE ON OUTSIDE CLICK ---- */
//   $(document).on("click", function () {
//     $(".consolidationCalendarPopup").addClass("hidden");
//     $(".consolidationDatePicker").addClass("hidden");
//   });

//   $(".consolidationCalendarPopup, .consolidationDatePicker").on("click", function (e) {
//     e.stopPropagation();
//   });

// });

$(document).ready(function () {

  const $wrapper = $(".consolidationCalendar");
  const $toggle = $wrapper.find(".consolidationCalendarToggle");
  const $popup = $wrapper.find(".consolidationCalendarPopup");
  const $options = $wrapper.find(".consolidation-cal-option");
  const $dateText = $wrapper.find(".calendar-date-text");
  const $datePicker = $wrapper.find(".consolidationDatePicker");

  /* ---- TOGGLE DROPDOWN ---- */
  $toggle.on("click", function (e) {
    e.stopPropagation();
    $popup.toggleClass("hidden");
  });

  /* ---- OPTION CLICK ---- */
  $options.on("click", function (e) {
    e.stopPropagation();

    const value = $(this).data("value");

    // reset checks
    $options.find("span:first-child")
      .removeClass("text-dodger-blue")
      .addClass("text-light-gray");

    // activate selected
    $(this).find("span:first-child")
      .removeClass("text-light-gray")
      .addClass("text-dodger-blue");

    if (value === "Custom") {
      // ✅ close dropdown
      $popup.addClass("hidden");

      // ✅ open date picker on top
      $datePicker
        .removeClass("hidden")
        .focus()
        .trigger("click");
    } else {
      $dateText.text(value);
      $popup.addClass("hidden");
    }
  });


  /* ---- DATE SELECT ---- */
  $datePicker.on("change", function () {
    $dateText.text(this.value);
    $popup.addClass("hidden");
    $datePicker.addClass("hidden");
  });

  /* ---- CLOSE ON OUTSIDE CLICK ---- */
  $(document).on("click", function () {
    $popup.addClass("hidden");
    $datePicker.addClass("hidden");
  });

  $popup.add($datePicker).on("click", function (e) {
    e.stopPropagation();
  });

});
