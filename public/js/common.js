$(document).ready(function () {
  let rowToDelete = null;

  $(document).ready(function () {

    // Navbar User Dropdown
    $('.profile-btn').on('click', function () {
      $('.profile-dropdown').toggle();
    });

    // Hide dropdown when clicking outside
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.profile-btn, .profile-dropdown').length) {
        $('.profile-dropdown').hide();
      }
    });


    // Table row Delete Icon Modal Functionality
    $(".material-symbols-outlined.delete-icon").click(function () {
      rowToDelete = $(this).closest("tr");
      $(".deleteModal").removeClass("hidden").addClass("flex");;
    });

    $("#cancelDelete").click(function () {
      rowToDelete = null;
      $(".deleteModal").removeClass("flex").addClass("hidden");
    });

    $("#confirmDelete").click(function () {
      if (rowToDelete) {
        rowToDelete.remove();
      }
      $(".deleteModal").removeClass("flex").addClass("hidden");
    });


    //Code For copying referral code to clipboard
    $('.copy-btn').on('click', function () {
      const code = $("#referral-code").text().trim();
      navigator.clipboard.writeText(code).then(function () {
        console.log("Copied to Clipboard" + code)
      }).catch(function (err) {
        console.log("Failed to copy", err)
      })
    })

    // Copy Code Functionlity
    $('.copy-btn').click(async function (e) {
      e.preventDefault();

      const targetSelector = $(this).data('target');
      const $target = $(targetSelector);

      if ($target.length === 0) {
        console.log('Target not found!');
        return;
      }

      let textToCopy = '';
      if ($target.is('input') || $target.is('textarea')) {
        textToCopy = $target.val();
      } else {
        textToCopy = $target.text();
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        console.log('Copied: ' + textToCopy);
      } catch (err) {
        console.error('Failed to copy: ', err);

      }
    });

    // Scan Virus Functionality
    const checkbox = $('.scan-toggle');
    const statusText = $('.status-text');


    checkbox.on('change', function () {
      if (checkbox.is(':checked')) {
        checkbox.prop('indeterminate', false);
        statusText.text('Safe to upload').removeClass().addClass('text-green text-16-nr');
      } else if (!checkbox.is(':checked') && checkbox.prop('indeterminate') !== true) {
        checkbox.prop('indeterminate', true);
        statusText.text('This file may contain viruses').removeClass().addClass('text-strong-red text-16-nr');
      }
    });

    $('.closecart-btn').on("click", function () {
      window.history.back();
    })

    //Notification Dropdown on  Home Page of All Sections
    $("#bell-icon").on("click", function (e) {
      e.stopPropagation();
      $("#notificationDropdown").toggleClass("hidden");
    });
    $(".close-notifications").on("click", function () {
      $("#notificationDropdown").toggleClass("hidden");
    });
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest("#notificationDropdown").length &&
        !$(e.target).is("#bell-icon")
      ) {
        $("#notificationDropdown").addClass("hidden");
      }
    });

    //Share Popup on  Home Page of All Sections
    $(".open-share-modal").on("click", function () {
      $("#shareModal").removeClass("hidden").addClass("flex");
    });
    $(".close-share-modal").on("click", function () {
      $("#shareModal").addClass("hidden").removeClass("flex");
    });
    $("#shareModal").on("click", function (e) {
      if ($(e.target).is("#shareModal")) {
        $("#shareModal").addClass("hidden").removeClass("flex");
      }
    });


  });

  // Open Pharmacy Share modal
  $(".pharmacy-open-share").on("click", function () {
    $(".pharmacy-order-popup").addClass("hidden"); // close pharmacy parent popup
    $(".pharmacy-share-modal").removeClass("hidden").addClass("flex");
  });

  // Close Pharmacy Share modal
  $(".pharmacy-close-share").on("click", function () {
    $(".pharmacy-share-modal").addClass("hidden").removeClass("flex");
  });

  // Click outside to close
  $(".pharmacy-share-modal").on("click", function (e) {
    if ($(e.target).hasClass("pharmacy-share-modal")) {
      $(".pharmacy-share-modal").addClass("hidden").removeClass("flex");
    }
  });



  // Scan Virus Functionality
  const fileInput = $('.pan-upload-input');
  const checkbox = $('.scan-toggle-donate');
  const statusText = $('.status-text-donate');

  // Handle file upload
  fileInput.on('change', function () {
    if (this.files.length > 0) {
      checkbox.prop({
        checked: true,
        disabled: true,
        indeterminate: false
      });

      statusText
        .text('Virus Scan')
        .removeClass()
        .addClass('status-text-donate text-green text-16-nr');
    } else {
      checkbox.prop({
        checked: false,
        disabled: true,
        indeterminate: false
      });

      statusText
        .text('Virus scan')
        .removeClass()
        .addClass('status-text-donate text-dark-gray text-16-nr');
    }
  });

  // Prevent interaction before upload
  checkbox.on('click', function (e) {
    if (fileInput[0].files.length === 0) {
      e.preventDefault();
    }
  });

  // Monitor file selection
  fileInput.on('change', function () {
    if (fileInput[0].files.length > 0 && checkbox.is(':checked')) {
      checkbox.prop('disabled', true); // Lock checkbox if already checked
    }
  });



  //  $('.calendar-icon').on('click', function (e) {
  //     e.stopPropagation();
  //     const $filterDropdown = $(this).closest('.filterDropdown');
  //     const $container = $filterDropdown.closest('.dropdown');
  //     $filterDropdown.addClass('hidden');
  //     $container.find('.datepicker-container').removeClass('hidden');
  //   });


  //   $(document).on('click', '.datepicker-container [data-date]', function () {    
  //     const selectedDate = $(this).attr('data-date');
  //     console.log("Selected Date:", selectedDate);   
  //     $('.datepicker-container').addClass('hidden');
  //   }); 
  //   $(document).on('click', function (e) {
  //     if (!$(e.target).closest('.datepicker-container, .calendar-icon').length) {
  //       $('.datepicker-container').addClass('hidden');
  //       $('.filterDropdown').addClass('hidden');
  //     }
  //   });

  $('.closesaved-btn').on("click", function () {
    window.history.back();
  })

  // Avatar

  $('.chatTrigger').on('click', function () {
    $('.avatar').removeClass('hidden')
    $('.chatTrigger').hide();
  })
  $('.close-avatar-btn').on('click', function () {
    $('.avatar').addClass('hidden')
    $('.chatTrigger').show();
  })

  $('.trigger-time').on('click', function () {
    const inputId = $(this).data('target');
    const $input = $('#' + inputId);

    // Show the native time picker
    if ($input[0].showPicker) {
      $input[0].showPicker(); // Chrome & modern
    } else {
      $input.focus(); // Fallback
    }
  });
})

$('.open-popup').on('click', function () {
  const targetPopup = $(this).data('target');
  $('.popup-overlay').removeClass('flex').addClass('hidden');
  $(`.${targetPopup}`).removeClass('hidden').addClass('flex');
});

// Close popup
$(document).on('click', ' .close-icon', function () {
  $(this).closest('.popup-overlay').removeClass('flex').addClass('hidden');
});