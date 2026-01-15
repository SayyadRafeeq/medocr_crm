$(document).ready(function () {
    const ctx = $('#bidsChart')[0].getContext('2d');
            
            const data = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Bids Won',
                        data: [63, 58, 50, 38, 56, 71, 65],
                        backgroundColor: '#2ecc71',
                        borderWidth: 0
                    },
                    {
                        label: 'Bids Lost',
                        data: [37, 22, 43, 12, 29, 6, 35],
                        backgroundColor: '#e74c3c',
                        borderWidth: 0
                    }
                ]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 25
                            },
                            grid: {
                                color: '#f0f0f0'
                            }
                        }
                    }
                }
            };

            const bidsChart = new Chart(ctx, config);

            // Custom legend functionality with checkboxes
            $('input[type="checkbox"]').on('change', function() {
                const index = $(this).data('index');
                const dataset = bidsChart.data.datasets[index];
                
                // Toggle dataset visibility based on checkbox state
                dataset.hidden = !this.checked;
                
                bidsChart.update();
            });
   
   
    // --------- DOWNLOAD AS PDF ----------
  $(".download-btn").on("click", function () {
    const targetId = $(this).data("target");
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

    // --------- HEATMAP ----------
    // Wait for DOM to be ready using jQuery
  
    am4core.useTheme(am4themes_animated);

    // Create map instance
    var chart = am4core.create("heatmap", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_india2019High;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Set min/max fill color for each area
    polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    polygonSeries.data = [
        { id: "IN-JK", value: 0 },
        { id: "IN-MH", value: 6269321325 },
        { id: "IN-UP", value: 0 },
        { id: "US-AR", value: 0 },
        { id: "IN-RJ", value: 0 },
        { id: "IN-AP", value: 0 },
        { id: "IN-MP", value: 0 },
        { id: "IN-TN", value: 0 },
        { id: "IN-JH", value: 0 },
        { id: "IN-WB", value: 0 },
        { id: "IN-GJ", value: 0 },
        { id: "IN-BR", value: 0 },
        { id: "IN-TG", value: 0 },
        { id: "IN-GA", value: 0 },
        { id: "IN-DN", value: 0 },
        { id: "IN-DL", value: 0 },
        { id: "IN-DD", value: 0 },
        { id: "IN-CH", value: 0 },
        { id: "IN-CT", value: 0 },
        { id: "IN-AS", value: 0 },
        { id: "IN-AR", value: 0 },
        { id: "IN-AN", value: 0 },
        { id: "IN-KA", value: 0 },
        { id: "IN-KL", value: 0 },
        { id: "IN-OR", value: 0 },
        { id: "IN-SK", value: 0 },
        { id: "IN-HP", value: 0 },
        { id: "IN-PB", value: 0 },
        { id: "IN-HR", value: 0 },
        { id: "IN-UT", value: 0 },
        { id: "IN-LK", value: 0 },
        { id: "IN-MN", value: 0 },
        { id: "IN-TR", value: 0 },
        { id: "IN-MZ", value: 0 },
        { id: "IN-NL", value: 0 },
        { id: "IN-ML", value: 0 }
    ];

    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3c5bdc");

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

     // Initialize all jQuery UI Datepickers
  if ($.fn.datepicker) {
    $(".datepicker-inline").datepicker({
      changeYear: true,
      changeMonth: true,
      yearRange: "2015:" + new Date().getFullYear(),
      onSelect: function (dateText) {
        console.log("Selected date: " + dateText);
        
        // Find the corresponding dropdown container
        let $container = $(this).closest(".dropdown");
        
        // Update the date label
        $container.find("p.font-semibold").text(dateText);
        
        // Mark Custom option as selected in the main filter dropdown
        $("#dateSubmenu .trigger-custom .material-symbols-outlined")
          .first()
          .removeClass("text-light-gray")
          .addClass("!text-dodger-blue");
        
        // Close all dropdowns and calendar
        $(".filterDropdown, .submenu").addClass("hidden");
        $("#calendarContainer").addClass("hidden");
        $(".datepicker-container").hide();
      },
    });
  }

  // ===== MAIN FILTER DROPDOWN LOGIC =====
  
  // 1. Toggle Main Filter Dropdown
  $(".filterToggle").on("click", function (e) {
    e.stopPropagation();
    const $dropdown = $(this).siblings(".filterDropdown");
    const isHidden = $dropdown.hasClass("hidden");
    
    // Close all other dropdowns
    $(".filterDropdown, .submenu").addClass("hidden");
    $("#calendarContainer").addClass("hidden");
    $(".datepicker-container").hide();
    
    // Toggle current dropdown
    if (isHidden) $dropdown.removeClass("hidden");
  });

  // 2. Open Date Submenu
  $(".trigger-date").on("click", function (e) {
    e.stopPropagation();
    $(".submenu").not("#dateSubmenu").addClass("hidden");
    $("#calendarContainer").addClass("hidden");
    $("#dateSubmenu").removeClass("hidden").css("top", $(this).position().top);
  });

  // 3. Handle Date Submenu Options (Week/Month - not Custom)
  $("#dateSubmenu > div:not(.trigger-custom)").on("click", function (e) {
    e.stopPropagation();
    
    // Remove active state from all options
    $("#dateSubmenu .material-symbols-outlined")
      .removeClass("!text-dodger-blue")
      .addClass("text-light-gray");
    
    // Add active state to clicked option
    $(this)
      .find(".material-symbols-outlined")
      .removeClass("text-light-gray")
      .addClass("!text-dodger-blue");
    
    // Close all dropdowns
    $(".filterDropdown, .submenu").addClass("hidden");
  });

  // 4. Open Calendar when clicking "Custom"
  $(".trigger-custom").on("click", function (e) {
    e.stopPropagation();
    const topPos = $(this).position().top;
    $("#calendarContainer").removeClass("hidden").css("top", topPos);
  });

  // 5. Open Status Submenu
  $(".trigger-status").on("click", function (e) {
    e.stopPropagation();
    $(".submenu").addClass("hidden");
    $("#calendarContainer").addClass("hidden");
    $("#statusSubmenu").removeClass("hidden").css("top", $(this).position().top);
  });

  // 6. Open Visit Type Submenu
  $(".trigger-visit").on("click", function (e) {
    e.stopPropagation();
    $(".submenu").addClass("hidden");
    $("#calendarContainer").addClass("hidden");
    $("#visitSubmenu").removeClass("hidden").css("top", $(this).position().top);
  });

  // 7. Handle Status and Visit Submenu Options
  $("#statusSubmenu > div, #visitSubmenu > div").on("click", function (e) {
    e.stopPropagation();
    const $submenu = $(this).closest(".submenu");
    
    // Remove active state from all options in this submenu
    $submenu
      .find(".material-symbols-outlined")
      .removeClass("!text-dodger-blue")
      .addClass("text-light-gray");
    
    // Add active state to clicked option
    $(this)
      .find(".material-symbols-outlined")
      .removeClass("text-light-gray")
      .addClass("!text-dodger-blue");
    
    // Close all dropdowns
    $(".filterDropdown, .submenu").addClass("hidden");
  });

  // ===== CHART SECTION CALENDAR ICONS =====
  
  // Toggle datepicker for chart sections (calendar icon click)
  $(".calendar-icon").on("click", function (e) {
    e.stopPropagation();
    const $container = $(this).closest(".dropdown");
    const $datepicker = $container.find(".datepicker-container");
    
    // Close other datepickers
    $(".datepicker-container").not($datepicker).hide();
    
    // Toggle current datepicker
    $datepicker.toggle();
  });

  // ===== CUSTOM DROPDOWN LOGIC (for Department Revenue, Load Analytics, etc.) =====
  
  $(".dropdown-btn").on("click", function (e) {
    e.stopPropagation();
    const $menu = $(this).siblings(".dropdown-menu");
    
    // Close other dropdown menus
    $(".dropdown-menu").not($menu).addClass("hidden");
    
    // Toggle current menu
    $menu.toggleClass("hidden");
  });

  $(".dropdown-menu li").on("click", function (e) {
    e.stopPropagation();
    const selectedText = $(this).text();
    const $dropdown = $(this).closest(".dropdown");
    
    // Update dropdown button text
    $dropdown.find(".dropdown-value").text(selectedText);
    
    // Hide menu
    $(this).parent().addClass("hidden");
  });

  // ===== STATUS DROPDOWN LOGIC =====
  
  $(".statusDropdown").each(function () {
    const $dropdown = $(this);
    const $selected = $dropdown.find(".selectedStatus");
    const $options = $dropdown.find(".statusOptions");
    const $label = $dropdown.find(".status-label");

    $selected.on("click", function (e) {
      e.stopPropagation();
      $(".statusOptions").not($options).hide();
      $options.toggle();
    });

    $options.find("div").on("click", function (e) {
      e.stopPropagation();
      const selectedText = $(this).text();
      const bgClass = $(this).attr("class").match(/bg-[^\s]+/)[0];
      const textClass = $(this).attr("class").match(/text-[^\s]+/)[0];

      $label.text(selectedText);
      $selected
        .removeClass(function (i, className) {
          return (className.match(/(bg|text)-[^\s]+/g) || []).join(" ");
        })
        .addClass(`${bgClass} ${textClass}`);

      $options.hide();
    });
  });

  // ===== GLOBAL CLOSE HANDLERS =====
  
  // Close all dropdowns when clicking outside
  $(document).on("click", function (e) {
    const $target = $(e.target);
    const isInsideDropdown =
      $target.closest(".dropdown").length ||
      $target.closest(".datepicker-container").length ||
      $target.closest(".ui-datepicker").length ||
      $target.closest(".statusDropdown").length ||
      $target.closest(".filterDropdown").length ||
      $target.closest(".submenu").length ||
      $target.closest("#calendarContainer").length;

    if (!isInsideDropdown) {
      $(".filterDropdown, .submenu").addClass("hidden");
      $("#calendarContainer").addClass("hidden");
      $(".datepicker-container").hide();
      $(".statusOptions").hide();
      $(".dropdown-menu").addClass("hidden");
    }
  });

  // Prevent dropdowns from closing when clicking inside them
  $(".filterDropdown, .submenu, #calendarContainer, .datepicker-container").on("click", function (e) {
    e.stopPropagation();
  });

});
