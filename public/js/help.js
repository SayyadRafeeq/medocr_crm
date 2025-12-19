// Function to check if the form is valid
function checkFormValidity() {
  const issueType = $(".issue-type").val().trim();
  const issueDesc = $(".issue-description").val().trim();
  const issueImage = $(".issue-image")[0].files.length > 0;

  if (issueType && issueDesc && issueImage) {
    $(".issue-submit-btn")
      .prop("disabled", false)
      .removeClass("text-medium-gray bg-light-gray cursor-not-allowed")
      .addClass("bg-light-sea-green text-white cursor-pointer");
  } else {
    $(".issue-submit-btn")
      .prop("disabled", true)
      .removeClass("bg-light-sea-green text-white cursor-pointer")
      .addClass("text-medium-gray bg-light-gray cursor-not-allowed");
  }
}

// Event listeners for input changes to validate the form
$(function () {
  $(".issue-type, .issue-description").on("input", checkFormValidity);
  $("#issue-image").on("change", checkFormValidity);
});

// Toggle functionality for various sections with accordion-style behavior

$(".toggle-subscription").click(function () {
  var content = $(this)
    .closest(".account-subscription")
    .find(".subscription-content");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

$(".toggle-avatar").click(function () {
  var content = $(this).closest(".avatar-creation").find(".avatar-content");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

$(".toggle-troubleshooting").click(function () {
  var content = $(this)
    .closest(".troubleshooting-section")
    .find(".troubleshooting-content");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

$(".toggle-billing-payments").click(function () {
  var content = $(this)
    .closest(".billing-payments-section")
    .find(".billing-payments-content");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

$(".toggle-support-contact").click(function () {
  var content = $(this)
    .closest(".support-contact-section")
    .find(".support-contact-content");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

$(".toggle-support-contact1").click(function () {
  var content = $(this)
    .closest(".support-contact-section1")
    .find(".support-contact-content1");
  var icon = $(this).find(".chevron-icon");

  content.toggleClass("hidden");
  icon.toggleClass("rotate-180");
});

// Function to toggle the visibility of the chat popup
function toggleChat() {
  // Toggle the 'hidden' class on all elements with the 'chat-popup' class
  document.querySelectorAll(".chat-popup").forEach(function (popup) {
    popup.classList.toggle("hidden");
  });
}

function sendEmailSupport() {
  // You can add form validation or sending logic here
  window.showToaster("success", "Message sent!");
  document.querySelector(".emailPopup").classList.add("hidden");
}

const issueMap = {
  type1: [
    "Unable to log in or reset password",
    "Profile update not saving",
    "Mobile number or email verification failed",
    "App crashing or freezing on startup",
  ],
  type2: [
    "Bid request not showing in history",
    "No response from pharmacies on my bid",
    "My accepted bid disappeared",
    "Can't upload or attach prescription",
  ],
  type3: [
    "Not receiving order or bid notifications",
    "Chat with pharmacy not working",
    "In-app notifications are delayed",
  ],
  type4: [
    "App interface glitches (e.g., buttons not working)",
    "Location detection issue",
    "Images or attachments not uploading",
    "Reporting fake or spam pharmacy listing",
  ],
};

// Toggle dropdowns
$(
  ".issue-type-wrapper .issue-type-input, .issue-type-wrapper .material-symbols-outlined"
).on("click", function () {
  $(".issue-type-dropdown").toggleClass("hidden");
});
$(
  ".select-issue-wrapper .select-issue-input, .select-issue-wrapper .material-symbols-outlined"
).on("click", function () {
  $(".select-issue-dropdown").toggleClass("hidden");
});

// Handle issue type checkbox selection
$(".issue-checkbox").on("click", function (e) {
  e.stopPropagation();
  $(".issue-checkbox").not(this).prop("checked", false);

  const isChecked = $(this).is(":checked");
  const selectedType = $(this).data("type");
  const selectedText = $(this).closest("li").find("span").text().trim();
  const options = issueMap[selectedType] || [];

  const $typeWrapper = $(this).closest(".issue-type-wrapper");
  const $selectWrapper = $(".select-issue-wrapper");
  const $issueInput = $typeWrapper.find(".issue-type-input");
  const $selectInput = $selectWrapper.find(".select-issue-input");
  const $selectDropdown = $selectWrapper.find(".select-issue-dropdown");

  // Get custom color classes from the wrapper's data-* attributes
  const hoverClass = $selectWrapper.data("hover-class") || "";
  const checkboxColor = $selectWrapper.data("checkbox-color") || "";
  const ringColor = $selectWrapper.data("ring-color") || "";

  if (isChecked) {
    $issueInput.val(selectedText);
    $(".issue-type-dropdown").addClass("hidden");

    $selectInput.val("");
    $selectDropdown.empty();

    options.forEach((option) => {
      const hoverClass = $selectWrapper.data("hover-class") || "";
      const $li = $("<li>").addClass(
        `dropdown-option px-2 py-2 mb-2 flex justify-between items-center ${hoverClass}`
      );


      const textColor = $selectWrapper.data("text-color") || "";

      const $span = $("<span>").addClass(`text-base ${textColor}`).text(option);

      const $checkbox = $("<input>")
        .attr({
          type: "checkbox",
          name: "selectIssueOption",
          "data-option": option,
        })
        .addClass(
          `select-issue-checkbox form-checkbox  w-5 h-5 cursor-pointer rounded-sm mr-2 ${checkboxColor} ${ringColor}`
        );

      $li.append($span, $checkbox);
      $selectDropdown.append($li);
    });
  } else {
    $issueInput.val("");
    $selectInput.val("");
    $selectDropdown.empty();
  }

  checkFormValidity();
});

// Handle select issue checkbox click
$(".select-issue-dropdown")
  .off("click", ".select-issue-checkbox")
  .on("click", ".select-issue-checkbox", function (e) {
    e.stopPropagation();
    $(".select-issue-checkbox").not(this).prop("checked", false);

    const isChecked = $(this).is(":checked");
    const selectedOption = $(this).data("option");
    const $selectInput = $(".select-issue-input");

    if (isChecked) {
      $selectInput.val(selectedOption);
      $(".select-issue-dropdown").addClass("hidden");
    } else {
      $selectInput.val("");
    }

    checkFormValidity();
  });

// Close dropdowns when clicking outside
$(document).on("click", function (e) {
  if (!$(e.target).closest(".issue-type-wrapper").length) {
    $(".issue-type-dropdown").addClass("hidden");
  }
  if (!$(e.target).closest(".select-issue-wrapper").length) {
    $(".select-issue-dropdown").addClass("hidden");
  }
});
function openModal() {
  document.querySelector(".view-modal").classList.remove("hidden");
}

function closeModal() {
  document.querySelector(".view-modal").classList.add("hidden");
}

// Modal close on overlay click (using class selectors)
$(document).ready(function () {
  $(document).on("click", ".view-modal", function (e) {
    if (e.target === this) {
      $(this).addClass("hidden");
    }
  });
  // ESC key closes any open modal
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".view-modal").addClass("hidden");
    }
  });
});

// You can still use openModal() and closeModal() as before
function openModal() {
  document.querySelector(".view-modal").classList.remove("hidden");
}

function closeModal() {
  document.querySelector(".view-modal").classList.add("hidden");
}

function openModalProgress() {
  document.querySelector(".view-modal-progress").classList.remove("hidden");
}

function closeModalProgress() {
  document.querySelector(".view-modal-progress").classList.add("hidden");
}

$(".custom-dropdown-btn").on("click", function (e) {
  e.stopPropagation();
  const $dropdown = $(this).closest(".custom-dropdown");
  $(".custom-dropdown-option")
    .not($dropdown.find(".custom-dropdown-option"))
    .hide();
  $dropdown.find(".custom-dropdown-option").toggle();
});

$(document).on("click", function () {
  $(".custom-dropdown-option").hide();
});

// File input change event of
document.addEventListener("DOMContentLoaded", function () {
  // End customer upload section
  const issueImage = document.getElementById("issue-image");
  if (issueImage) {
    issueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const fileNameSpan = document.getElementById("file-name");
      const submitBtn = document.getElementById("submit-btn");
      const virusScanStatus = document.getElementById("virus-scan-status");

      if (
        fileInput.files &&
        fileInput.files.length > 0 &&
        fileNameSpan &&
        submitBtn &&
        virusScanStatus
      ) {
        fileNameSpan.textContent = fileInput.files[0].name;
        submitBtn.classList.remove("bg-gray-300");
        submitBtn.classList.add("bg-vivid-orange");
        virusScanStatus.classList.remove("hidden");
      } else if (fileNameSpan && submitBtn && virusScanStatus) {
        fileNameSpan.textContent = "Upload image of the issue";
        submitBtn.classList.remove("bg-vivid-orange");
        submitBtn.classList.add("bg-gray-300");
        virusScanStatus.classList.add("hidden");
      }
    });
  }

  //Advertiser
  const advertiserIssueImage = document.getElementById("advertiser-issue-image");
  const advertiserSelectedFiles = [];
  const containerElementAdvertiser = document.getElementById("advertiser-issue-container");
  const fileContainerElementAdvertiser = document.getElementById("advertiser-file-container");

  if (advertiserIssueImage) {
    advertiserIssueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const submitBtn = document.getElementById("advertiser-issue-submit-btn");

      if (
        fileInput.files &&
        fileInput.files.length > 0 &&
        fileContainerElementAdvertiser &&
        submitBtn
      ) {
        for (let i = 0; i < fileInput.files.length; i++) {
          const file = fileInput.files[i];
          if (
            !advertiserSelectedFiles.some(
              (f) => f.name === file.name && f.size === file.size
            )
          ) {
            advertiserSelectedFiles.push(file);
          }
        }

        updateAdvertiserFileDisplay(submitBtn);
        fileInput.value = "";
      } else if (
        fileContainerElementAdvertiser &&
        submitBtn &&
        advertiserSelectedFiles.length === 0
      ) {
        resetAdvertiserFileDisplay(submitBtn);
      }
    });
  }

  function updateAdvertiserFileDisplay(submitBtn) {
    fileContainerElementAdvertiser.innerHTML = "";

    if (advertiserSelectedFiles.length === 0) {
      fileContainerElementAdvertiser.innerHTML =
        '<span class="advertiser-file-name font-normal text-sm">Upload image of the issue</span>';
      resetAdvertiserSubmitButton(submitBtn);
      adjustAdvertiserContainerHeight();
      return;
    }

    const filesWrapper = document.createElement("div");
    filesWrapper.className = "flex items-center gap-2 h-full flex-nowrap";

    advertiserSelectedFiles.forEach((file, index) => {
      const fileElement = document.createElement("div");
      fileElement.className =
        "flex items-center gap-1 bg-gray-100 px-2 py-1 rounded flex-shrink-0 h-8";

      const fileName = document.createElement("span");
      fileName.className =
        "text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]";
      fileName.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className =
        "material-symbols-outlined text-red-500 cursor-pointer text-sm flex-shrink-0";
      removeBtn.textContent = "close";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeAdvertiserFile(index, submitBtn);
      };

      fileElement.appendChild(fileName);
      fileElement.appendChild(removeBtn);
      filesWrapper.appendChild(fileElement);
    });

    fileContainerElementAdvertiser.appendChild(filesWrapper);
    adjustAdvertiserContainerHeight();

    submitBtn.classList.remove(
      "bg-light-gray",
      "text-medium-gray",
      "cursor-not-allowed"
    );
    submitBtn.classList.add("bg-living-coral", "text-white", "cursor-pointer");
    submitBtn.disabled = false;
  }

  function adjustAdvertiserContainerHeight() {
    containerElementAdvertiser.style.height = "50px";
    void containerElementAdvertiser.offsetWidth;

    const needsScroll =
      fileContainerElementAdvertiser.scrollWidth >
      fileContainerElementAdvertiser.clientWidth;

    containerElementAdvertiser.style.height = needsScroll ? "60px" : "50px";

    if (!needsScroll) {
      void containerElementAdvertiser.offsetWidth;
      if (
        fileContainerElementAdvertiser.scrollWidth >
        fileContainerElementAdvertiser.clientWidth
      ) {
        containerElementAdvertiser.style.height = "60px";
      }
    }
  }

  function removeAdvertiserFile(index, submitBtn) {
    advertiserSelectedFiles.splice(index, 1);
    updateAdvertiserFileDisplay(submitBtn);
  }

  function resetAdvertiserFileDisplay(submitBtn) {
    fileContainerElementAdvertiser.innerHTML =
      '<span class="advertiser-file-name font-normal text-sm">Upload image of the issue</span>';
    resetAdvertiserSubmitButton(submitBtn);
    adjustAdvertiserContainerHeight();
  }

  function resetAdvertiserSubmitButton(submitBtn) {
    submitBtn.classList.remove("bg-living-coral", "text-white", "cursor-pointer");
    submitBtn.classList.add("bg-light-gray", "text-medium-gray", "cursor-not-allowed");
    submitBtn.disabled = true;
  }

  window.addEventListener("resize", () => {
    if (advertiserSelectedFiles.length > 0) {
      adjustAdvertiserContainerHeight();
    }
  });


  //Client upload section

  const clientIssueImage = document.getElementById("client-issue-image");
  const clientSelectedFiles = [];
  const containerElement = document.getElementById("client-issue-container");
  const fileContainerElement = document.getElementById("client-file-container");

  if (clientIssueImage) {
    clientIssueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const submitBtn = document.getElementById("client-issue-submit-btn");

      if (fileInput.files && fileInput.files.length > 0 && fileContainerElement && submitBtn) {
        for (let i = 0; i < fileInput.files.length; i++) {
          const file = fileInput.files[i];
          if (!clientSelectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            clientSelectedFiles.push(file);
          }
        }
        updateClientFileDisplay(submitBtn);
        fileInput.value = "";
      } else if (fileContainerElement && submitBtn && clientSelectedFiles.length === 0) {
        resetClientFileDisplay(submitBtn);
      }
    });
  }

  function updateClientFileDisplay(submitBtn) {
    fileContainerElement.innerHTML = "";

    if (clientSelectedFiles.length === 0) {
      fileContainerElement.innerHTML = '<span class="client-file-name font-normal text-sm">Upload image of the issue</span>';
      resetClientSubmitButton(submitBtn);
      adjustContainerHeight();
      return;
    }

    const filesWrapper = document.createElement("div");
    filesWrapper.className = "flex items-center gap-2 h-full flex-nowrap";

    clientSelectedFiles.forEach((file, index) => {
      const fileElement = document.createElement("div");
      fileElement.className = "flex items-center gap-1 bg-gray-100 px-2 py-1 rounded flex-shrink-0 h-8";

      const fileName = document.createElement("span");
      fileName.className = "text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]";
      fileName.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "material-symbols-outlined text-red-500 cursor-pointer text-sm flex-shrink-0";
      removeBtn.textContent = "close";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeClientFile(index, submitBtn);
      };

      fileElement.appendChild(fileName);
      fileElement.appendChild(removeBtn);
      filesWrapper.appendChild(fileElement);
    });

    fileContainerElement.appendChild(filesWrapper);
    adjustContainerHeight();

    submitBtn.classList.remove("bg-light-gray", "text-medium-gray", "cursor-not-allowed");
    submitBtn.classList.add("bg-dark-blue", "text-white", "cursor-pointer");
    submitBtn.disabled = false;
  }

  function adjustContainerHeight() {
    // Reset to default height first
    containerElement.style.height = '50px';

    // Force reflow to get accurate measurements
    void containerElement.offsetWidth;

    // Check if scrolling is needed
    const needsScroll = fileContainerElement.scrollWidth > fileContainerElement.clientWidth;
    containerElement.style.height = needsScroll ? '60px' : '50px';

    // Additional check after height adjustment
    if (!needsScroll) {
      void containerElement.offsetWidth;
      if (fileContainerElement.scrollWidth > fileContainerElement.clientWidth) {
        containerElement.style.height = '60px';
      }
    }
  }

  function removeClientFile(index, submitBtn) {
    clientSelectedFiles.splice(index, 1);
    updateClientFileDisplay(submitBtn);
  }

  function resetClientFileDisplay(submitBtn) {
    fileContainerElement.innerHTML = '<span class="client-file-name font-normal text-sm">Upload image of the issue</span>';
    resetClientSubmitButton(submitBtn);
    adjustContainerHeight();
  }

  function resetClientSubmitButton(submitBtn) {
    submitBtn.classList.remove("bg-dark-blue", "text-white", "cursor-pointer");
    submitBtn.classList.add("bg-light-gray", "text-medium-gray", "cursor-not-allowed");
    submitBtn.disabled = true;
  }

  // Handle window resize to adjust height if needed
  window.addEventListener('resize', () => {
    if (clientSelectedFiles.length > 0) {
      adjustContainerHeight();
    }
  });


  // Pharmacy upload section

  const pharmacyIssueImage = document.getElementById("pharmacy-issue-image");
  const pharmacySelectedFiles = [];
  const containerElementPharmacy = document.getElementById("pharmacy-issue-container");
  const fileContainerElementPharmacy = document.getElementById("pharmacy-file-container");

  if (pharmacyIssueImage) {
    pharmacyIssueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const submitBtn = document.getElementById("pharmacy-issue-submit-btn");

      if (fileInput.files && fileInput.files.length > 0 && fileContainerElementPharmacy && submitBtn) {
        for (let i = 0; i < fileInput.files.length; i++) {
          const file = fileInput.files[i];
          if (!pharmacySelectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            pharmacySelectedFiles.push(file);
          }
        }
        updatePharmacyFileDisplay(submitBtn);
        fileInput.value = "";
      } else if (fileContainerElementPharmacy && submitBtn && pharmacySelectedFiles.length === 0) {
        resetPharmacyFileDisplay(submitBtn);
      }
    });
  }

  function updatePharmacyFileDisplay(submitBtn) {
    fileContainerElementPharmacy.innerHTML = "";

    if (pharmacySelectedFiles.length === 0) {
      fileContainerElementPharmacy.innerHTML = '<span class="pharmacy-file-name font-normal text-sm">Upload image of the issue</span>';
      resetPharmacySubmitButton(submitBtn);
      adjustContainerHeight();
      return;
    }

    const filesWrapper = document.createElement("div");
    filesWrapper.className = "flex items-center gap-2 h-full flex-nowrap";

    pharmacySelectedFiles.forEach((file, index) => {
      const fileElement = document.createElement("div");
      fileElement.className = "flex items-center gap-1 bg-gray-100 px-2 py-1 rounded flex-shrink-0 h-8";

      const fileName = document.createElement("span");
      fileName.className = "text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]";
      fileName.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "material-symbols-outlined text-red-500 cursor-pointer text-sm flex-shrink-0";
      removeBtn.textContent = "close";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removePharmacyFile(index, submitBtn);
      };

      fileElement.appendChild(fileName);
      fileElement.appendChild(removeBtn);
      filesWrapper.appendChild(fileElement);
    });

    fileContainerElementPharmacy.appendChild(filesWrapper);
    adjustContainerHeight();

    submitBtn.classList.remove("bg-light-gray", "text-medium-gray", "cursor-not-allowed");
    submitBtn.classList.add("bg-light-sea-green", "text-white", "cursor-pointer");
    submitBtn.disabled = false;
  }

  function adjustContainerHeight() {
    // Reset to default height first
    containerElementPharmacy.style.height = '50px';

    // Force reflow to get accurate measurements
    void containerElementPharmacy.offsetWidth;

    // Check if scrolling is needed
    const needsScroll = fileContainerElementPharmacy.scrollWidth > fileContainerElementPharmacy.clientWidth;
    containerElementPharmacy.style.height = needsScroll ? '60px' : '50px';

    // Additional check after height adjustment
    if (!needsScroll) {
      void containerElementPharmacy.offsetWidth;
      if (fileContainerElementPharmacy.scrollWidth > fileContainerElementPharmacy.clientWidth) {
        containerElementPharmacy.style.height = '60px';
      }
    }
  }

  function removePharmacyFile(index, submitBtn) {
    pharmacySelectedFiles.splice(index, 1);
    updatePharmacyFileDisplay(submitBtn);
  }

  function resetPharmacyFileDisplay(submitBtn) {
    fileContainerElementPharmacy.innerHTML = '<span class="pharmacy-file-name font-normal text-sm">Upload image of the issue</span>';
    resetPharmacySubmitButton(submitBtn);
    adjustContainerHeight();
  }

  function resetPharmacySubmitButton(submitBtn) {
    submitBtn.classList.remove("bg-light-sea-green", "text-white", "cursor-pointer");
    submitBtn.classList.add("bg-light-gray", "text-medium-gray", "cursor-not-allowed");
    submitBtn.disabled = true;
  }

  // Handle window resize to adjust height if needed
  window.addEventListener('resize', () => {
    if (pharmacySelectedFiles.length > 0) {
      adjustContainerHeight();
    }
  });



  // Lab Upload section
  const labIssueImage = document.getElementById("lab-issue-image");
  const labSelectedFiles = [];
  const containerElementLab = document.getElementById("lab-issue-container");
  const fileContainerElementLab = document.getElementById("lab-file-container");

  if (labIssueImage) {
    labIssueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const submitBtn = document.getElementById("lab-issue-submit-btn");

      if (
        fileInput.files &&
        fileInput.files.length > 0 &&
        fileContainerElementLab &&
        submitBtn
      ) {
        for (let i = 0; i < fileInput.files.length; i++) {
          const file = fileInput.files[i];
          if (
            !labSelectedFiles.some(
              (f) => f.name === file.name && f.size === file.size
            )
          ) {
            labSelectedFiles.push(file);
          }
        }

        updateLabFileDisplay(submitBtn);
        fileInput.value = "";
      } else if (
        fileContainerElementLab &&
        submitBtn &&
        labSelectedFiles.length === 0
      ) {
        resetLabFileDisplay(submitBtn);
      }
    });
  }

  function updateLabFileDisplay(submitBtn) {
    fileContainerElementLab.innerHTML = "";

    if (labSelectedFiles.length === 0) {
      fileContainerElementLab.innerHTML =
        '<span class="lab-file-name font-normal text-sm">Upload image of the issue</span>';
      resetLabSubmitButton(submitBtn);
      adjustLabContainerHeight();
      return;
    }

    const filesWrapper = document.createElement("div");
    filesWrapper.className = "flex items-center gap-2 h-full flex-nowrap";

    labSelectedFiles.forEach((file, index) => {
      const fileElement = document.createElement("div");
      fileElement.className =
        "flex items-center gap-1 bg-gray-100 px-2 py-1 rounded flex-shrink-0 h-8";

      const fileName = document.createElement("span");
      fileName.className =
        "text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]";
      fileName.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className =
        "material-symbols-outlined text-red-500 cursor-pointer text-sm flex-shrink-0";
      removeBtn.textContent = "close";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeLabFile(index, submitBtn);
      };

      fileElement.appendChild(fileName);
      fileElement.appendChild(removeBtn);
      filesWrapper.appendChild(fileElement);
    });

    fileContainerElementLab.appendChild(filesWrapper);
    adjustLabContainerHeight();

    submitBtn.classList.remove(
      "bg-light-gray",
      "text-medium-gray",
      "cursor-not-allowed"
    );
    submitBtn.classList.add("bg-dodger-blue", "text-white", "cursor-pointer");
    submitBtn.disabled = false;
  }

  function adjustLabContainerHeight() {
    containerElementLab.style.height = "50px";
    void containerElementLab.offsetWidth;

    const needsScroll =
      fileContainerElementLab.scrollWidth >
      fileContainerElementLab.clientWidth;

    containerElementLab.style.height = needsScroll ? "60px" : "50px";

    if (!needsScroll) {
      void containerElementLab.offsetWidth;
      if (
        fileContainerElementLab.scrollWidth >
        fileContainerElementLab.clientWidth
      ) {
        containerElementLab.style.height = "60px";
      }
    }
  }

  function removeLabFile(index, submitBtn) {
    labSelectedFiles.splice(index, 1);
    updateLabFileDisplay(submitBtn);
  }

  function resetLabFileDisplay(submitBtn) {
    fileContainerElementLab.innerHTML =
      '<span class="lab-file-name font-normal text-sm">Upload image of the issue</span>';
    resetLabSubmitButton(submitBtn);
    adjustLabContainerHeight();
  }

  function resetLabSubmitButton(submitBtn) {
    submitBtn.classList.remove("bg-dodger-blue", "text-white", "cursor-pointer");
    submitBtn.classList.add(
      "bg-light-gray",
      "text-medium-gray",
      "cursor-not-allowed"
    );
    submitBtn.disabled = true;
  }

  window.addEventListener("resize", () => {
    if (labSelectedFiles.length > 0) {
      adjustLabContainerHeight();
    }
  });



  // NGO Upload section

  const ngoIssueImage = document.getElementById("ngo-issue-image");
  const ngoSelectedFiles = [];
  const containerElementNgo = document.getElementById("ngo-issue-container");
  const fileContainerElementNgo = document.getElementById("ngo-file-container");

  if (ngoIssueImage) {
    ngoIssueImage.addEventListener("change", function (e) {
      const fileInput = e.target;
      const submitBtn = document.getElementById("ngo-issue-submit-btn");

      if (
        fileInput.files &&
        fileInput.files.length > 0 &&
        fileContainerElementNgo &&
        submitBtn
      ) {
        for (let i = 0; i < fileInput.files.length; i++) {
          const file = fileInput.files[i];
          if (
            !ngoSelectedFiles.some(
              (f) => f.name === file.name && f.size === file.size
            )
          ) {
            ngoSelectedFiles.push(file);
          }
        }

        updateNgoFileDisplay(submitBtn);
        fileInput.value = "";
      } else if (
        fileContainerElementNgo &&
        submitBtn &&
        ngoSelectedFiles.length === 0
      ) {
        resetNgoFileDisplay(submitBtn);
      }
    });
  }

  function updateNgoFileDisplay(submitBtn) {
    fileContainerElementNgo.innerHTML = "";

    if (ngoSelectedFiles.length === 0) {
      fileContainerElementNgo.innerHTML =
        '<span class="ngo-file-name font-normal text-sm">Upload image of the issue</span>';
      resetNgoSubmitButton(submitBtn);
      adjustNgoContainerHeight();
      return;
    }

    const filesWrapper = document.createElement("div");
    filesWrapper.className = "flex items-center gap-2 h-full flex-nowrap";

    ngoSelectedFiles.forEach((file, index) => {
      const fileElement = document.createElement("div");
      fileElement.className =
        "flex items-center gap-1 bg-gray-100 px-2 py-1 rounded flex-shrink-0 h-8";

      const fileName = document.createElement("span");
      fileName.className =
        "text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]";
      fileName.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className =
        "material-symbols-outlined text-red-500 cursor-pointer text-sm flex-shrink-0";
      removeBtn.textContent = "close";
      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeNgoFile(index, submitBtn);
      };

      fileElement.appendChild(fileName);
      fileElement.appendChild(removeBtn);
      filesWrapper.appendChild(fileElement);
    });

    fileContainerElementNgo.appendChild(filesWrapper);
    adjustNgoContainerHeight();

    submitBtn.classList.remove(
      "bg-light-gray",
      "text-medium-gray",
      "cursor-not-allowed"
    );
    submitBtn.classList.add("bg-violet-sky", "text-white", "cursor-pointer");
    submitBtn.disabled = false;
  }

  function adjustNgoContainerHeight() {
    containerElementNgo.style.height = "50px";
    void containerElementNgo.offsetWidth;

    const needsScroll =
      fileContainerElementNgo.scrollWidth > fileContainerElementNgo.clientWidth;
    containerElementNgo.style.height = needsScroll ? "60px" : "50px";

    if (!needsScroll) {
      void containerElementNgo.offsetWidth;
      if (
        fileContainerElementNgo.scrollWidth > fileContainerElementNgo.clientWidth
      ) {
        containerElementNgo.style.height = "60px";
      }
    }
  }

  function removeNgoFile(index, submitBtn) {
    ngoSelectedFiles.splice(index, 1);
    updateNgoFileDisplay(submitBtn);
  }

  function resetNgoFileDisplay(submitBtn) {
    fileContainerElementNgo.innerHTML =
      '<span class="ngo-file-name font-normal text-sm">Upload image of the issue</span>';
    resetNgoSubmitButton(submitBtn);
    adjustNgoContainerHeight();
  }

  function resetNgoSubmitButton(submitBtn) {
    submitBtn.classList.remove(
      "bg-violet-sky",
      "text-white",
      "cursor-pointer"
    );
    submitBtn.classList.add(
      "bg-light-gray",
      "text-medium-gray",
      "cursor-not-allowed"
    );
    submitBtn.disabled = true;
  }

  window.addEventListener("resize", () => {
    if (ngoSelectedFiles.length > 0) {
      adjustNgoContainerHeight();
    }
  });

  // Existing function remains unchanged
  const addedStatuses = new Set();

  function addStatus(container, statusText, timestamp) {
    if (addedStatuses.has(statusText)) {
      return;
    }
    addedStatuses.add(statusText);

    const $container = $(container);
    const $dots = $container.find(".status-dots");
    const $labels = $container.find(".status-labels");
    const $times = $container.find(".status-times");

    let dotsCount = $dots.children("div").length;
    if (dotsCount > 0) {
      $dots.append(
        `<hr class="text-light-sea-green h-6 w-0 ml-1.5 border-2">`
      );
    }

    $dots.append(`<div class="bg-light-sea-green rounded-full h-4 w-4"></div>`);
    $labels.append(`<p class="font-normal text-base">${statusText}</p>`);
    $times.append(`<p class="font-semibold text-base">${timestamp}</p>`);
  }
});




// Chatbot open/close toggle
document.querySelectorAll('.chat-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.chat-popup')?.classList.remove('hidden');
  });
});

document.querySelectorAll('.close-chat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.chat-popup')?.classList.add('hidden');
  });
});

// Billing menu click
document.querySelectorAll('.billing-menu').forEach(menu => {
  menu.addEventListener('click', function () {

    // Highlight clicked menu
    document.querySelectorAll('.menu-btn').forEach(btn => {
      btn.classList.remove('bg-light-blue', 'text-dark-navy');
      btn.classList.add('bg-dodger-blue', 'text-white');
    });

    this.classList.remove('bg-dodger-blue', 'text-white');
    this.classList.add('bg-light-blue', 'text-dark-navy');

    const chatMessages = document.querySelector('.chat-messages');

    // User message bubble
    const userMsg = `
      <div class="w-full flex justify-end">
        <div class="bg-light-dodger-blue2 p-2 rounded-lg max-w-[80%]">
          <div class="bg-dodger-blue text-white rounded-md px-4 py-2 text-sm font-medium">
            📦 Orders & Prescriptions
          </div>
        </div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', userMsg);

    // Bot reply
    const botMsg = `
      <div class="w-full flex justify-start">
        <div class="border border-light-dodger-blue2 text-white rounded-md p-3 max-w-[85%]">
          <p class="text-base font-normal text-black flex items-center gap-2">
  <span class="material-symbols-outlined text-black">
    build
  </span>
  Select from these
</p>

          <button class="submenu-btn bg-dodger-blue text-white w-full mt-2 py-2 rounded-md issue-option cursor-pointer"
            data-reply="Ensure your profile is verified. Go to Orders to see all order requests.">
            Can’t view orders
          </button>

          <button class="submenu-btn bg-dodger-blue text-white w-full mt-2 py-2 rounded-md issue-option  cursor-pointer"
            data-reply="Please refresh your dashboard, the order may not have synced yet. If issue persists, contact support.">
          Upload issues
          </button>

          <button class="go-back bg-dodger-blue text-white w-full mt-2 py-2 rounded-md flex items-center justify-center gap-2  cursor-pointer">
  <span class="material-symbols-outlined text-white">
    arrow_back
  </span>
  Go Back
</button>

        </div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', botMsg);

    document.querySelector('.main-menu')?.classList.add('hidden');
  });
});

// Handle submenu option click (event delegation)
document.addEventListener('click', function (e) {
  const option = e.target.closest('.issue-option');
  if (!option) return;

  const selectedText = option.textContent.trim();
  const replyText = option.getAttribute('data-reply');
  const chatMessages = document.querySelector('.chat-messages');

  // User choice
  const userChoice = `
    <div class="w-full flex justify-end">
      <div class="bg-light-dodger-blue2 p-2 rounded-lg max-w-[80%]">
        <div class="bg-dodger-blue text-white rounded-md px-4 py-2 text-sm font-medium">
          ${selectedText}
        </div>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', userChoice);

  // Bot reply
  const botReply = `
    <div class="w-full flex justify-start">
      <div class="border border-medium-gray2 rounded-md px-4 py-3 text-sm max-w-[85%]">
        ${replyText}
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', botReply);
});

// Handle Go Back (event delegation)
document.addEventListener('click', function (e) {
  if (!e.target.closest('.go-back')) return;

  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.innerHTML = '';

  document.querySelector('.main-menu')?.classList.remove('hidden');

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.classList.remove('bg-light-blue', 'text-dark-navy');
    btn.classList.add('bg-dodger-blue', 'text-white');
  });
});



