$(document).ready(function () {
  // Form Validation
  $("#register-form").validate({
    rules: {
      "company-name": {
        required: true,
        minlength: 3,
        validname: true,
      },
      "phone-number1": {
        required: true,
        maxlength: 10,
      },
      "phone-number2": {
        required: true,
        maxlength: 10,
      },
      "registration-number": {
        required: true,
      },
      "select-dropdown1": {
        required: true,
      },
      "select-dropdown2": {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      "gst-number": {
        required: true,
      },
      address: {
        required: true,
        minlength: 10,
      },
      dist: {
        required: true,
      },
      state: {
        required: true,
      },
      country: {
        required: true,
      },
      pincode: {
        required: true,
        digits: true,
        minlength: 6,
        maxlength: 6,
      },
      password: {
        required: true,
        minlength: 6,
      },
      "confirm-password": {
        required: true,
        equalTo: "#Password",
      },
      otp1: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 6,
      },
      otp2: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 6,
      },
      name: {
        required: true,
        minlength: 3,
        validname: true,
      },
      designation: {
        required: true,
      },
      terms: {
        required: true,
      },
    },
    messages: {
      "company-name": {
        required: "Please enter your company name",
        minlength: "Company name must be at least 3 characters",
        validname:
          "Company name cannot contain special characters like @, #, $, etc.",
      },
      "phone-number": {
        required: "Please enter your phone number",
        maxlength: "Phone number must not exceed 10 digits",
        digits: "Phone number must contain only digits",
      },
      "phone-number2": {
        required: "Please enter your phone number",
        maxlength: "Phone number must not exceed 10 digits",
        digits: "Phone number must contain only digits",
      },
      "registration-number": {
        required: "Please enter your company registration number",
      },
      "select-dropdown1": {
        required: "Please select a value",
      },
      "select-dropdown2": {
        required: "Please select a value",
      },
      email: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
      "gst-number": {
        required: "Please enter your GST number",
      },
      address: {
        required: "Please enter your address",
        minlength: "Address must be at least 10 characters long",
      },
      dist: {
        required: "Please enter your city, town, district",
      },
      state: {
        required: "Please enter your state",
      },
      country: {
        required: "Please enter your country",
      },
      pincode: {
        required: "Please enter your pincode",
        digits: "Pincode must contain only numbers",
        minlength: "Pincode must be 6 digits",
        maxlength: "Pincode must be 6 digits",
      },
      password: {
        required: "Please enter a new password",
        minlength: "Password must be at least 6 characters",
      },
      "confirm-password": {
        required: "Please confirm your password",
        equalTo: "Passwords do not match",
      },
      otp1: {
        required: "Please enter the OTP",
        digits: "OTP must contain only numbers",
        minlength: "OTP must be at least 4 digits",
        maxlength: "OTP must not exceed 6 digits",
      },
      otp2: {
        required: "Please enter the OTP",
        digits: "OTP must contain only numbers",
        minlength: "OTP must be at least 4 digits",
        maxlength: "OTP must not exceed 6 digits",
      },
      name: {
        required: "Please enter your Name",
        minlength: "Name must be at least 3 characters",
        validname: "Name cannot contain special characters like @, #, $, etc.",
      },
      designation: {
        required: "*Field Missing",
      },
      terms: {
        required: "You must agree to the Terms of Service and Privacy Policy.",
      },
    },
    errorPlacement: function (error, element) {
      error.addClass("text-xs text-dark-red");
      error.insertAfter(element);
    },
    highlight: function (element) {
      $(element)
        .addClass("border-dark-red placeholder:text-semi-transparent-red")
        .removeClass("border-primary-color placeholder:text-blue-teal");
      $(element).prev("label").addClass("text-dark-red");
    },
    unhighlight: function (element) {
      $(element).removeClass(
        "border-dark-red placeholder:text-semi-transparent-red"
      );
      $(element).prev("label").removeClass("text-dark-red");
    },
  });
  // Country code js
  const $dropdown = $(".code-dropdown");
  const $btn = $dropdown.find(".code-btn");
  const $options = $dropdown.find(".code-option");
  const $selectedCode = $btn.find(".selected-code");

  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    method: "GET",
    success: function (data) {
      const countryList = data
        .filter((c) => c.idd && c.idd.root)
        .map((c) => {
          const name = c.name.common;
          const code = c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "");
          return { name, code };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      countryList.forEach(({ name, code }) => {
        const isIndia = name === "India";
        const optionHtml = `<div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" data-code="${code}">${name} (${code})</div>`;
        $options.append(optionHtml);

        if (isIndia) {
          $selectedCode.text(code);
        }
      });
    },
    error: function () {
      $options.append(
        `<div class="px-4 py-2 text-red-500">Failed to load country codes</div>`
      );
    },
  });

  $btn.on("click", function () {
    $options.toggleClass("hidden");
  });

  $options.on("click", "div", function () {
    const code = $(this).data("code");
    $selectedCode.text(code);
    $options.addClass("hidden");
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".code-dropdown").length) {
      $options.addClass("hidden");
    }
  });
  
  //Dropdowns code
  const dropdownConfig = {
  singleSelect: ["Timing", "Opening Time", "Closing Time", "Opening Days", "Type of Medical Provider", "Home Visit", "Experience", "Gender", "Specialization","Advertiser Type"],
  multiSelect: ["Services", "Facilities"],
};
function isSingleSelect($dropdown) {
  const labelText = $dropdown.find("> label").text();
  return dropdownConfig.singleSelect.some((keyword) =>
    labelText.includes(keyword)
  );
}
function getPlaceholderText($dropdown) {
  const labelText = $dropdown.find("> label").text();
  if (labelText.includes("Timing") || labelText.includes("Time")) {
    return "Select Time";
  }
  if (labelText.includes("Services") || labelText.includes("Service")) {
    return "Select Service";
  }
  if (labelText.includes("Facilities") || labelText.includes("Facility")) {
    return "Select Facility";
  }
  return "Select Option";
}
$(".dropdown-btn").on("click", function (e) {
  e.stopPropagation();
  const $dropdown = $(this).closest(".dropdown");
  const $currentOption = $dropdown.find(".dropdown-option");
  $(".dropdown-option").not($currentOption).hide();
  $(".dropdown-arrow")
    .not($(this).find(".dropdown-arrow"))
    .removeClass("rotate-180");
  $currentOption.toggle();
  $(this).find(".dropdown-arrow").toggleClass("rotate-180");
});

// Handle checkbox selection
$(document).on("change", ".dropdown-option input[type='checkbox']", function (e) {
  e.stopPropagation();
  const $dropdown = $(this).closest(".dropdown");
  if (isSingleSelect($dropdown)) {
    $dropdown.find("input[type='checkbox']").not(this).prop("checked", false);
  }

  updateSelectedText($dropdown);
});


$(".dropdown-option").on("click", function (e) {
  e.stopPropagation();
});
$(document).on("click", ".dropdown-option label", function (e) {
  e.stopPropagation();
  if ($(this).text().trim() === "Type...") {
    showCustomInput($(this).closest(".dropdown"));
    return;
  }
  let checkbox = $(this).prev('input[type="checkbox"]');
  if (checkbox.length === 0) {
    checkbox = $(this).next('input[type="checkbox"]');
  }
  if (checkbox.length) {
    checkbox.prop("checked", !checkbox.prop("checked")).trigger("change");
  }
});
function showCustomInput($dropdown) {
  const $typeOption = $dropdown.find("label:contains('Type...')").parent();
  if ($typeOption.find("input[type='text']").length > 0) {
    $typeOption.find("input[type='text']").focus();
    return;
  }
  const $input = $(
    '<input type="text" class="custom-input flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-Royal-indigo" placeholder="Enter custom service...">'
  );

  $typeOption.html("").append($input);
  $input.focus();
  $input.on("blur keypress", function (e) {
    if (e.type === "blur" || (e.type === "keypress" && e.which === 13)) {
      const value = $(this).val().trim();

      if (value) {
        const customId = "custom_" + Date.now();
        const $newOption = $(`
          <div class="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer custom-service">
            <input type="checkbox" id="${customId}" class="mr-2 accent-Royal-indigo" checked>
            <label for="${customId}" class="flex-1">${value}</label>
            <span class="material-symbols-outlined text-sm text-red-500 remove-custom cursor-pointer">close</span>
          </div>
        `);
        $typeOption.before($newOption);
        $typeOption.html('<label class="flex-1">Type...</label>');
        attachCustomOptionHandlers($newOption, $dropdown);
        updateSelectedText($dropdown);
      } else {
        $typeOption.html('<label class="flex-1">Type...</label>');
      }
    }
  });

  // Prevent input click from closing dropdown
  $input.on("click", function (e) {
    e.stopPropagation();
  });
}

// Attach handlers to custom options
function attachCustomOptionHandlers($option, $dropdown) {
  $option.find("input[type='checkbox']").on("change", function (e) {
    e.stopPropagation();
    if (isSingleSelect($dropdown)) {
      $dropdown
        .find("input[type='checkbox']")
        .not(this)
        .prop("checked", false);
    }

    updateSelectedText($dropdown);
  });

  // Handle label click
  $option.find("label").on("click", function (e) {
    e.stopPropagation();
    let checkbox = $(this).prev('input[type="checkbox"]');
    if (checkbox.length === 0) {
      checkbox = $(this).next('input[type="checkbox"]');
    }
    if (checkbox.length) {
      checkbox.prop("checked", !checkbox.prop("checked")).trigger("change");
    }
  });

  // Handle remove button
  $option.find(".remove-custom").on("click", function (e) {
    e.stopPropagation();
    $option.remove();
    updateSelectedText($dropdown);
  });
}

// Update selected text based on checked items
function updateSelectedText($dropdown) {
  const $checkedBoxes = $dropdown.find(
    ".dropdown-option input[type='checkbox']:checked"
  );
  const $selectedValue = $dropdown.find(".dropdown-btn .selected-value");

  if ($checkedBoxes.length === 0) {
    $selectedValue.text(getPlaceholderText($dropdown));
  } else if ($checkedBoxes.length === 1) {
    let labelText = $checkedBoxes.first().prev("label").text().trim();
    if (!labelText) {
      labelText = $checkedBoxes.first().next("label").text().trim();
    }
    $selectedValue.text(labelText);
  } else {
    $selectedValue.text($checkedBoxes.length + " selected");
  }
}

// Handle simple dropdown (non-checkbox) selection
$('.dropdown-option div:not(:has(input[type="checkbox"]))').on('click', function(e) {
  e.stopPropagation();
  const selectedText = $(this).text().trim();
  const $dropdown = $(this).closest('.dropdown');
  $dropdown.find('.dropdown-btn .selected-value').text(selectedText);
  $dropdown.find('.select-dropdown').val(selectedText);
  $dropdown.find('.dropdown-option').hide();
  $dropdown.find(".dropdown-arrow").removeClass("rotate-180");
});

// Close dropdowns when clicking outside
$(document).on("click", function () {
  $(".dropdown-option").hide();
  $(".dropdown-arrow").removeClass("rotate-180");
});
  // password hide/unhide
  $(".togglePassword").on("click", function () {
    const targetId = $(this).data("target");
    const passwordField = $("#" + targetId);
    if (passwordField.length) {
      const type =
        passwordField.attr("type") === "password" ? "text" : "password";
      passwordField.attr("type", type);
      $(this).text(type === "password" ? "visibility" : "visibility_off");
    }
  });
  // resend
  $(".resend").on("click", function () {
    const $btn = $(this);
    let timeLeft = 30;
    $btn.off("click");
    const timer = setInterval(function () {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
      const seconds = String(timeLeft % 60).padStart(2, "0");
      $btn.html(`Resend in ${minutes}:${seconds}`);
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        $(".otp").html("Code resent").addClass("!text-bright-green");
        setTimeout(function () {
          $(".otp").html("Try again in 60 seconds").addClass("!text-dark-red");
          $btn.on("click", arguments.callee);
        }, 2000);
      }
    }, 1000);
  });
  //otp message
  $(".send-otp").click(function () {
    $(this).addClass("!bg-Dark-Cornflower-Blue");
    $(this).closest(".otp-div").find(".otp-message").html(`
            <div class="flex items-center gap-2 text-bright-green cursor-pointer">
                <div class="h-4 w-4 flex items-center justify-center bg-bright-green rounded">
                    <span class="material-symbols-outlined text-white !text-sm">check</span>
                </div>
              <p>Verified</p>
            </div>
          `);
  });

  // Show popup on upload trigger click
  let lastClickedTrigger = null;

  // Show popup on upload trigger click
  document.querySelectorAll(".uploadTrigger").forEach((trigger) => {
    trigger.addEventListener("click", function () {
      lastClickedTrigger = this; // store the clicked trigger
      document.querySelector(".file-access-popup").classList.remove("hidden");
    });
  });

  // Hide popup on "No" click
  document.querySelector(".deny-access").addEventListener("click", function () {
    document.querySelector(".file-access-popup").classList.add("hidden");
    lastClickedTrigger = null; // reset
  });

  // Allow file access and trigger file input on "Yes" click
  document
    .querySelector(".allow-access")
    .addEventListener("click", function () {
      document.querySelector(".file-access-popup").classList.add("hidden");

      if (lastClickedTrigger) {
        const uploadSection = lastClickedTrigger.closest(".upload-section");
        const input = uploadSection.querySelector(".uploadInput");
        input.click();
      }

      lastClickedTrigger = null;
    });

  // Handles file upload, updates UI with the file name and icon, and allows removal of the uploaded file.
  $(".uploadInput").on("change", function () {
    const file = this.files[0];
    if (!file) return;

    const $section = $(this).closest(".upload-section");
    const $trigger = $section.find(".uploadTrigger");
    const $label = $trigger.find(".upload-label");
    const $icon = $trigger.find(".upload-icon");

    $label.text(file.name);

    $icon
      .text("imagesmode")
      .removeClass("text-primary-color")
      .addClass("text-bright-green");

    $section.find(".remove-file-btn").removeClass("hidden");
    $(".remove-file-btn").on("click", function () {
      const $wrapper = $(this).closest(".upload-section");
      const $fileInput = $wrapper.find(".uploadInput");

      $fileInput.val("");

      $wrapper.find(".upload-label").text("");
      $wrapper
        .find(".upload-icon")
        .text("upload")
        .removeClass("text-green-600")
        .addClass("text-primary-color");

      $(this).addClass("hidden");
    });
  });

  // Toggle dropdown time trigger visibility
  document.querySelectorAll(".dropdown-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const dropdown = this.closest(".dropdown");
      const options = dropdown.querySelector(".dropdown-option");
      options.classList.toggle("hidden");

      // Close other open dropdowns
      document.querySelectorAll(".dropdown-option").forEach(function (option) {
        if (option !== options) {
          option.classList.add("hidden");
        }
      });
    });
  });

  // Time picker trigger
  document.querySelectorAll(".trigger-time").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetId = this.getAttribute("data-target");
      const timeInput = document.getElementById(targetId);
      if (timeInput) {
        timeInput.showPicker();
      }
    });
  });

  // Update dropdown display when time is selected (using input event for immediate update)
  document.querySelectorAll('input[type="time"]').forEach(function (timeInput) {
    timeInput.addEventListener("input", function () {
      updateTimeDisplay(this);
    });

    // Also handle change event for browser compatibility
    timeInput.addEventListener("change", function () {
      updateTimeDisplay(this);
    });
  });

  function updateTimeDisplay(timeInput) {
    const dropdown = timeInput.closest(".dropdown");
    if (dropdown) {
      const selectedValue = dropdown.querySelector(".selected-value");
      if (selectedValue && timeInput.value) {
        // Format the time for display (e.g., "09:00 AM")
        const timeParts = timeInput.value.split(":");
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        selectedValue.textContent = formattedTime;
      }
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-option").forEach(function (option) {
        option.classList.add("hidden");
      });
    }
  });

  // Close dropdown when time is selected (optional)
  document.querySelectorAll('input[type="time"]').forEach(function (timeInput) {
    timeInput.addEventListener("change", function () {
      const dropdownOption = this.closest(".dropdown-option");
      if (dropdownOption) {
        setTimeout(() => {
          dropdownOption.classList.add("hidden");
        }, 200); // Small delay to ensure time is displayed
      }
    });
  });

  const fromRoleSelection = sessionStorage.getItem("fromMedicalProviderRoles");

  // Handle back button click
  $(".back-to-roles").on("click", function (e) {
    e.preventDefault();

    if (fromRoleSelection === "true") {
      // Store flag to show medical provider sub-roles on Welcome page
      sessionStorage.setItem("showMedicalProviderRoles", "true");
      window.location.href = "/src/auth/Welcome.html";
    } else {
      // Default fallback
      window.location.href = "/src/auth/Welcome.html";
    }
  });
});
