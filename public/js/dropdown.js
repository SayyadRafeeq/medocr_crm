$(document).ready(function () {
  // Initialize the datepicker
  // Handle date selection from datepicker
  if ($.fn.datepicker) {
    $(".datepicker-inline").datepicker({
      changeYear: true,
      changeMonth: true,
      yearRange: "2015:" + new Date().getFullYear(),
      onSelect: function (dateText) {
        // Find the corresponding dropdown for this datepicker
        let $container = $(this).closest(".dropdown");

        // Update the label text with selected date
        $container.find("p.font-semibold").text(dateText);

        // Hide the calendar after selection
        $container.find(".datepicker-container").hide();
        $container.find(".filterDropdown").hide();
      },
    });
  }

  // Toggle filter dropdown
  $(".filterToggle").click(function (e) {
    e.stopPropagation();
    const $container = $(this).closest(".dropdown");
    const $dropdown = $container.find(".filterDropdown");

    $(".filterDropdown").not($dropdown).hide();
    $(".filterDropdown .absolute").hide();
    $(".datepicker-container").hide(); // Also hide datepickers
    $dropdown.toggle();
  });

  // Toggle datepicker (calendar icon click) – this MUST come BEFORE document click!
  $(".calendar-icon").click(function (e) {
    e.stopPropagation();
    const $container = $(this).closest(".dropdown");
    const $datepicker = $container.find(".datepicker-container");

    $(".datepicker-container").not($datepicker).hide();
    $datepicker.toggle();
  });

  // Status dropdown logic
  $(".statusDropdown").each(function () {
    const $dropdown = $(this);
    const $selected = $dropdown.find(".selectedStatus");
    const $options = $dropdown.find(".statusOptions");
    const $label = $dropdown.find(".status-label");

    $selected.on("click", function () {
      $(".statusOptions").not($options).hide();
      $options.toggle();
    });

    $options.find("div").on("click", function () {
      const selectedText = $(this).text();
      const bgClass = $(this)
        .attr("class")
        .match(/bg-[^\s]+/)[0];
      const textClass = $(this)
        .attr("class")
        .match(/text-[^\s]+/)[0];

      $label.text(selectedText);
      $selected
        .removeClass(function (i, className) {
          return (className.match(/(bg|text)-[^\s]+/g) || []).join(" ");
        })
        .addClass(`${bgClass} ${textClass}`);

      $options.hide();
    });
  });

  // Hide all dropdowns when clicking outside
  $(document).on("mousedown", function (e) {
    const $target = $(e.target);
    const isInsideDropdown =
      $target.closest(".dropdown").length ||
      $target.closest(".datepicker-container").length ||
      $target.closest(".ui-datepicker").length ||
      $target.closest(".statusDropdown").length;

    if (!isInsideDropdown) {
      $(".filterDropdown").hide();
      $(".filterDropdown .absolute").hide();
      $(".datepicker-container").hide();
      $(".statusOptions").hide();
    }
  });

  // Update filter text when an option is clicked
  $(".filterDropdown > div").on("click", function (e) {
    e.stopPropagation();

    let $dropdown = $(this).closest(".filterDropdown");

    // Reset all check icons to gray
    $dropdown
      .find(".material-symbols-outlined:first-child")
      .removeClass("text-dodger-blue")
      .addClass("text-light-gray");

    // Set current option check icon to dodger-blue
    $(this)
      .find(".material-symbols-outlined:first-child")
      .removeClass("text-light-gray")
      .addClass("text-dodger-blue");

    // Update filter label text (ignore icons)
    let selectedText = $(this).clone().children().remove().end().text().trim();
    $(this).closest(".dropdown").siblings("p").text(selectedText);

    // Hide dropdown unless it's Custom with calendar
    if (!$(this).find(".calendar-icon").length) {
      $dropdown.hide();
    }
  });
});
