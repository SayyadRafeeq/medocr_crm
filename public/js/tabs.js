$(document).ready(function () {
  $(".tab-btn").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn").removeClass(
      "border-b-2 text-light-sea-green px-4 text-18-fs"
    );
    $(this).addClass("border-b-2 text-light-sea-green px-4 text-18-fs");
    $(".tab-content").addClass("hidden");
    $("#" + target).removeClass("hidden");
  });

  $(".tab-btn-customer").click(function () {
    var target = $(this).data("tab");

    $(".tab-btn-customer").removeClass("active-tab");
    $(this).addClass("active-tab");

    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }
  });

  // $('.tab-btn-client').click(function () {
  //     var target = $(this).data('tab');

  //     $('.tab-btn-client').removeClass('active-tab-client');
  //     $(this).addClass('active-tab-client');

  //     $('.tab-content').addClass('hidden');
  //     $('.' + target).removeClass('hidden');
  // });

  $(".tab-btn-advertiser").click(function () {
    var target = $(this).data("tab");

    // Remove active styles from all tabs
    $(".tab-btn-advertiser")
      .removeClass(
        "active-tab-advertiser font-semibold text-dark-gray border-b-2 border-living-coral"
      )
      .addClass("font-medium text-light-gray1");

    // Add active styles to the clicked tab
    $(this)
      .addClass(
        "active-tab-advertiser font-semibold text-dark-gray border-b-2 border-living-coral"
      )
      .removeClass("font-medium text-light-gray1");

    // Show the selected tab content
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");

    // Conditional visibility for diamond user
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }

    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

  $(".tab-btn-pharmacy").click(function () {
    var target = $(this).data("tab");

    // Remove active styles from all tabs
    $(".tab-btn-pharmacy")
      .removeClass(
        "active-tab-pharmacy font-semibold border-b-2 border-light-sea-green text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");

    // Apply active styles to clicked tab
    $(this)
      .addClass(
        "active-tab-pharmacy font-semibold border-b-2 border-light-sea-green text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");

    // Show relevant tab content
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");

    // Show/hide diamond-user section
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
    // Show specific chat profiles
    if ($(".active-tab-pharmacy").data("tab") === "enquiry") {
      $('.chat-profile[data-id="1"]').removeClass("hidden");
      $('.chat-profile[data-id="2"]').addClass("hidden");
    } else {
      $('.chat-profile[data-id="2"]').removeClass("hidden");
      $('.chat-profile[data-id="1"]').addClass("hidden");
    }
  });

  $(".tab-btn-ngo").click(function () {
    var target = $(this).data("tab");

    // Remove active styles from all tabs
    $(".tab-btn-ngo")
      .removeClass(
        "active-tab-ngo font-semibold text-dark-gray border-b-2 border-violet-sky"
      )
      .addClass("font-medium text-light-gray1");

    // Add active styles to the clicked tab
    $(this)
      .addClass(
        "active-tab-ngo font-semibold text-dark-gray border-b-2 border-violet-sky"
      )
      .removeClass("font-medium text-light-gray1");

    // Show the selected tab content
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");

    // Conditional visibility for diamond user
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }

    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

  $(".tab-btn-client").click(function () {
    var target = $(this).data("tab");

    // Reset all tabs
    $(".tab-btn-client")
      .removeClass(
        "active-tab-client font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");

    // Activate clicked tab
    $(this)
      .addClass(
        "active-tab-client font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");

    // Toggle tab content visibility
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");

    // Optional: if you have diamond-user logic
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

  $(".tab-btn-hospital").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-hospital")
      .removeClass(
        "active-tab-hospital font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-hospital font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });



   $(".tab-btn-settings-pharmacy").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-settings-pharmacy")
      .removeClass(
        "active-tab-settings-pharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-settings-pharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content-settings").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

   $(".tab-btn-support-pharmacy").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-support-pharmacy")
      .removeClass(
        "active-tab-support-pharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-support-pharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content-support").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

  $(".tab-btn-points").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-points")
      .removeClass(
        "active-tab-points font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-points font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content-points").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user-points").show();
    } else {
      $(".diamond-user-points").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

   $(".tab-btn-donate").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-donate")
      .removeClass(
        "active-tab-donate font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-donate font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content-donate").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user-points").show();
    } else {
      $(".diamond-user-points").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });

    $(".tab-btn-support").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-support")
      .removeClass(
        "active-tab-support font-semibold border-b-2 border-dodger-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-support font-semibold border-b-2 border-dodger-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content-support").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user-points").show();
    } else {
      $(".diamond-user-points").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });


  $(".tab-btn-supportnewpharmacy").click(function () {
  var target = $(this).data("tab");
  $(".tab-btn-supportnewpharmacy")
    .removeClass(
      "active-tab-supportnewpharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
    )
    .addClass("font-medium text-light-gray1");

  $(this)
    .addClass(
      "active-tab-supportnewpharmacy font-semibold border-b-2 border-deep-teal-green text-dark-gray"
    )
    .removeClass("font-medium text-light-gray1");

  $(".tab-content-supportnewpharmacy").addClass("hidden");
  $("." + target).removeClass("hidden");

  if (target === "points") {
    $(".diamond-user-points").show();
  } else {
    $(".diamond-user-points").hide();
  }

  if (target === "documents") {
    $(".editIcon").hide();
    $(".fileLimit").removeClass("hidden");
  } else {
    $(".editIcon").show();
    $(".fileLimit").addClass("hidden");
  }

  if (target === "notification-control") {
    $(".edit-toggle").hide();
  } else {
    $(".edit-toggle").show();
  }
});


    $(".tab-btn-rewards").click(function () {
    var target = $(this).data("tab");
    $(".tab-btn-rewards")
      .removeClass(
        "active-tab-rewards font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .addClass("font-medium text-light-gray1");
    $(this)
      .addClass(
        "active-tab-rewards font-semibold border-b-2 border-dark-blue text-dark-gray"
      )
      .removeClass("font-medium text-light-gray1");
    $(".tab-content").addClass("hidden");
    $("." + target).removeClass("hidden");
    if (target === "points") {
      $(".diamond-user").show();
    } else {
      $(".diamond-user").hide();
    }

    if (target === "documents") {
      $(".editIcon").hide();
      $(".fileLimit").removeClass("hidden");
    } else {
      $(".editIcon").show();
      $(".fileLimit").addClass("hidden");
    }
    if (target === "notification-control") {
      $(".edit-toggle").hide();
    } else {
      $(".edit-toggle").show();
    }
  });
});
