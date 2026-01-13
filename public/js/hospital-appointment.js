$(document).ready(function () {
  const itemsPerPage = 5;

  // Initialize pagination
  function initializePagination() {
    const container = $("#cards-container");
    const allCards = container.children(".card-all-accepted, .card-pending");
    const totalPages = Math.ceil(allCards.length / itemsPerPage);

    if (allCards.length === 0) return;

    // Hide all cards initially
    allCards.hide();

    // Create pagination HTML if it doesn't exist
    if ($(".pagination-container").length === 0) {
      const paginationHTML = `
        <div class="pagination-container flex justify-center items-center gap-3 mt-6">
          <button class="prev-btn  text-spanish-gray font-normal text-xs px-4 py-2 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <div class="page-numbers flex gap-2"></div>
          <button class="next-btn  text-spanish-gray font-normal text-xs px-4 py-2 rounded-lg  transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      `;
      container.after(paginationHTML);
    }

    // Show first page
    showPage(1, allCards, totalPages);
  }

  // Show specific page
  function showPage(page, cards, totalPages) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Hide all cards and show only current page cards
    cards.hide();
    cards.slice(start, end).show();

    // Update pagination buttons
    updatePaginationButtons(page, totalPages, cards);
  }

  // Update pagination buttons
  function updatePaginationButtons(currentPage, totalPages, cards) {
    const paginationContainer = $(".pagination-container");
    const pageNumbersContainer = paginationContainer.find(".page-numbers");
    const prevBtn = paginationContainer.find(".prev-btn");
    const nextBtn = paginationContainer.find(".next-btn");

    // Clear existing page numbers
    pageNumbersContainer.empty();

    // Calculate page range to show (max 5 page numbers)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbersContainer.append(createPageButton(1, currentPage));
      if (startPage > 2) {
        pageNumbersContainer.append(
          '<span class="px-2 text-spanish-gray">...</span>'
        );
      }
    }

    // Generate page number buttons
    for (let i = startPage; i <= endPage; i++) {
      pageNumbersContainer.append(createPageButton(i, currentPage));
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbersContainer.append(
          '<span class="px-2 text-spanish-gray">...</span>'
        );
      }
      pageNumbersContainer.append(createPageButton(totalPages, currentPage));
    }

    // Enable/disable prev and next buttons
    prevBtn.prop("disabled", currentPage === 1);
    nextBtn.prop("disabled", currentPage === totalPages);

    // Store current page and total pages
    paginationContainer.data("current-page", currentPage);
    paginationContainer.data("total-pages", totalPages);
    paginationContainer.data("cards", cards);
  }

  // Create page button
  function createPageButton(pageNum, currentPage) {
    const isActive = pageNum === currentPage;
    return $(`
      <button class="page-btn w-8 h-8 rounded-lg font-normal text-xs transition cursor-pointer ${
        isActive
          ? "bg-dodger-blue text-white"
          : "bg-light-gray text-dark-gray hover:bg-gray-300"
      }" data-page="${pageNum}">
        ${pageNum}
      </button>
    `);
  }

  // Handle pagination clicks
  $(document).on("click", ".prev-btn, .next-btn, .page-btn", function () {
    const button = $(this);
    const paginationContainer = $(".pagination-container");
    const cards = paginationContainer.data("cards");
    const totalPages = paginationContainer.data("total-pages");
    let currentPage = paginationContainer.data("current-page");

    if (button.hasClass("prev-btn")) {
      currentPage = Math.max(1, currentPage - 1);
    } else if (button.hasClass("next-btn")) {
      currentPage = Math.min(totalPages, currentPage + 1);
    } else if (button.hasClass("page-btn")) {
      currentPage = parseInt(button.data("page"));
    }

    showPage(currentPage, cards, totalPages);

    // Scroll to top of cards container
    $("html, body").animate(
      {
        scrollTop: $("#cards-container").offset().top - 100,
      },
      300
    );
  });

  // Handle accept/reject actions
  $(document).on("click", ".accept-icon", function () {
    const card = $(this).closest(".card-pending");
    const icons = card.find(".accept-icon, .reject-icon");
    const accepted = card.find(".accepted");

    icons.hide();
    accepted.removeClass("hidden").show();

    // Convert to accepted card after animation
    setTimeout(() => {
      card.removeClass("card-pending").addClass("card-all-accepted");
      reinitializePagination();
    }, 1000);
  });

  $(document).on("click", ".reject-icon", function () {
    const card = $(this).closest(".card-pending");
    const icons = card.find(".accept-icon, .reject-icon");
    const rejected = card.find(".rejected");

    icons.hide();
    rejected.removeClass("hidden").show();

    // Remove card after animation
    setTimeout(() => {
      card.fadeOut(300, function () {
        $(this).remove();
        reinitializePagination();
      });
    }, 1000);
  });

  // Reinitialize pagination after changes
  function reinitializePagination() {
    $(".pagination-container").remove();
    initializePagination();
  }

  // Modal handlers
  $(document).on("click", ".card-all-accepted", function () {
    $(".modal-all-accepted").removeClass("hidden");
  });

  $(document).on("click", ".card-pending", function () {
    $(".modal-pending").removeClass("hidden");
  });

  $(document).on(
    "click",
    ".modal-close-all-accepted, .modal-close-pending",
    function () {
      $(this).closest(".modal-all-accepted, .modal-pending").addClass("hidden");
    }
  );

  // Initialize on page load
  initializePagination();

  // All Accepted
  $(document).on("click", ".card-all-accepted", function () {
    $(".modal-all-accepted").removeClass("hidden");
  });

  // Close modal when close button is clicked
  $(".modal-close-all-accepted").on("click", function () {
    $(".modal-all-accepted").addClass("hidden");
  });

  // All Completed
  $(document).on("click", ".card-all-completed", function () {
    $(".modal-all-completed").removeClass("hidden");
  });

  // Close modal when close button is clicked
  $(".modal-close-all-completed").on("click", function () {
    $(".modal-all-completed").addClass("hidden");
  });

  // For "missed" modal
  $(document).on("click", ".card-missed", function () {
    $(".modal-missed").removeClass("hidden");
  });

  // Close "missed" modal
  $(".modal-close-missed").on("click", function () {
    $(".modal-missed").addClass("hidden");
  });

  // For "canceled" modal
  $(document).on("click", ".card-canceled", function () {
    $(".modal-canceled").removeClass("hidden");
  });

  // Close "canceled" modal
  $(".modal-close-canceled").on("click", function () {
    $(".modal-canceled").addClass("hidden");
  });

  // For "pending" modal
  $(document).on("click", ".card-pending", function () {
    $(".modal-pending").removeClass("hidden");
  });

  // Close "pending" modal
  $(".modal-close-pending").on("click", function () {
    $(".modal-pending").addClass("hidden");
  });

  // Image Attachment Preview (for all)
  $(document).on("click", ".view-attachment", function () {
    $(".attachment-modal").removeClass("hidden");
  });

  // Close attachment modal
  $(".close-attachment-modal").on("click", function () {
    $(".attachment-modal").addClass("hidden");
  });

  // Close modal if background clicked
  $(".attachment-modal").on("click", function (e) {
    if ($(e.target).is(".attachment-modal")) {
      $(this).addClass("hidden");
    }
  });
});
