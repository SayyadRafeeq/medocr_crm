$(document).ready(function () {
  $(".menu-toggle").click(function () {
    const sidebar = $(".sidebar");

    sidebar.removeClass("translate-x-0").addClass("absolute -translate-x-full");
    $(".main-content").addClass("w-full");
    $(".menu-toggle").hide();
    $(".show-sidebar-toggle").removeClass("hidden").addClass("flex");
  });

  $(".show-sidebar-toggle").click(function () {
    const sidebar = $(".sidebar");

    sidebar.removeClass("absolute -translate-x-full").addClass("translate-x-0");
    $(".main-content").removeClass("w-full");
    $(".menu-toggle").show();
    $(".show-sidebar-toggle").removeClass("flex").addClass("hidden");
  });

  const currentPath = window.location.pathname.toLowerCase(); // lowercase for matching

  // Map keywords to style properties
  const themeStyles = {
    customers: {
      backgroundColor: "#FF98001A",
      color: "#F79E1B",
      borderRight: "3px solid #F79E1B",
      fontWeight: "bold",
    },
    advertiser: {
      backgroundColor: "#FF725E1A",
      color: "#FF725E",
      borderRight: "3px solid #FF725E",
      fontWeight: "bold",
    },
    ngo: {
      backgroundColor: "#8F81FF1A",
      color: "#8F81FF",
      borderRight: "3px solid #8F81FF",
      fontWeight: "bold",
    },
    pharmacy: {
      backgroundColor: "#DDEBE7", 
      color: "#1A7A5E",
      borderRight: "3px solid #1A7A5E",
      fontWeight: "bold",
    },
    client: {
      backgroundColor: "#12345626",
      color: "#123456",
      borderRight: "3px solid #123456",
      fontWeight: "bold",
    },
    hospital: {
      backgroundColor: "#D9EBFF",
      color: "#007BFF",
      borderRight: "3px solid #007BFF",
      fontWeight: "bold",
    },
    lab: {
      backgroundColor: "#D9EBFF",
      color: "#007BFF",
      borderRight: "3px solid #007BFF",
      fontWeight: "bold",
    },
     doctor: {
      backgroundColor: "#D9EBFF",
      color: "#007BFF",
      borderRight: "3px solid #007BFF",
      fontWeight: "bold",
    },
  };

  let appliedStyles = {
    backgroundColor: "#20B2AA1A",
    color: "#20B2AA",
    borderRight: "3px solid #20B2AA",
    fontWeight: "bold",
  };

  // Find matching style based on path
  $.each(themeStyles, function (keyword, styles) {
    if (currentPath.includes(keyword.toLowerCase())) {
      appliedStyles = styles;
      return false; // break loop
    }
  });

  // Apply inline styles to matching sidebar link
  $(".sidebar nav a").each(function () {
    const href = $(this).attr("href").toLowerCase();
    console.log(href, currentPath);

    if (
      href === currentPath ||
      (currentPath === "/" && href.includes("index.html")) ||
      (currentPath.includes("purchase-my-cart.html") &&
        href.includes("purchase")) ||
      (currentPath.includes("donate") && href.includes("donate")) // ✅ Covers donate-pay and all donate pages
    ) {
      $(this).css(appliedStyles);
    }
  });

  // Set CSS variables for scrollbar
  $(".scroll").each(function () {
    $(this).css("--scroll-thumb-color", `${appliedStyles.backgroundColor}`);
  });
});
