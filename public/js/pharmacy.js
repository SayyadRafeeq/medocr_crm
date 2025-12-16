$(document).ready(function () {
  const ctx = document.getElementById("bidsChart");

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bids Won",
        data: [65, 59, 50, 45, 60, 70, 68],
        backgroundColor: "#10b981",
        borderWidth: 0,
        barPercentage: 0.7,
      },
      {
        label: "Bids Lost",
        data: [35, 21, 40, 5, 20, 5, 32],
        backgroundColor: "#ef4444",
        borderWidth: 0,
        barPercentage: 0.7,
      },
    ],
  };

  const chart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 25,
          },
          grid: {
            color: "#e5e7eb",
          },
          border: {
            display: false,
          },
        },
      },
    },
  });

  $("#bidsWon").on("change", function () {
    chart.data.datasets[0].hidden = !$(this).is(":checked");
    chart.update();
  });

  $("#bidsLost").on("change", function () {
    chart.data.datasets[1].hidden = !$(this).is(":checked");
    chart.update();
  });

  // --------- HEATMAP ----------
  // Wait for DOM to be ready using jQuery

  am4core.useTheme(am4themes_animated);

  // Create map instance
  var chartHeat = am4core.create("heatmap", am4maps.MapChart);

  // Set map definition
  chartHeat.geodata = am4geodata_india2019High;

  // Create map polygon series
  var polygonSeries = chartHeat.series.push(new am4maps.MapPolygonSeries());

  // Set min/max fill color for each area
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chartHeat.colors.getIndex(1).brighten(1),
    max: chartHeat.colors.getIndex(1).brighten(-0.3),
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
    { id: "IN-ML", value: 0 },
  ];

  // Configure series tooltip
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}: {value}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#3c5bdc");

// Zoom buttons with amCharts native methods
$("#zoom-in").on("click", function () {
  chartHeat.zoomIn();
  updateThumbFromChart();
});

$("#zoom-out").on("click", function () {
  chartHeat.zoomOut();
  updateThumbFromChart();
});



// Update thumb position based on chart's current zoom level
function updateThumbFromChart() {
  const currentZoom = chartHeat.zoomLevel;
  const minZoom = 1;
  const maxZoom = 32; // amCharts default max zoom
  
  const sliderHeight = 140; // h-35 = 140px
  const percentage = Math.min(1, (currentZoom - minZoom) / (maxZoom - minZoom));
  const position = sliderHeight * (1 - percentage);
  $("#zoom-reset").css("top", `${position}px`);
}

// Make thumb draggable
let isDragging = false;
const $slider = $(".slider");
const $thumb = $("#zoom-reset");

$thumb.on("mousedown", function (e) {
  isDragging = true;
  $thumb.css("cursor", "grabbing");
  e.preventDefault();
  e.stopPropagation();
});

$(document).on("mousemove", function (e) {
  if (isDragging) {
    const sliderOffset = $slider.offset().top;
    const sliderHeight = $slider.height();
    const mouseY = e.pageY - sliderOffset;
    
    // Calculate zoom level based on position
    const percentage = 1 - Math.max(0, Math.min(1, mouseY / sliderHeight));
    const minZoom = 1;
    const maxZoom = 32;
    const targetZoom = minZoom + (maxZoom - minZoom) * percentage;
    
    // Get current center point
    const centerGeoPoint = chartHeat.zoomGeoPoint;
    
    // Zoom to the center point with new zoom level (smooth zoom)
    chartHeat.zoomToGeoPoint(centerGeoPoint, targetZoom, false);
    
    // Update thumb position
    const position = sliderHeight * (1 - percentage);
    $thumb.css("top", `${position}px`);
  }
});

$(document).on("mouseup", function () {
  if (isDragging) {
    isDragging = false;
    $thumb.css("cursor", "grab");
  }
});

// Initialize
$thumb.css("cursor", "grab");
setTimeout(updateThumbFromChart, 100); // Wait for chart to initialize

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
