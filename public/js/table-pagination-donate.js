$(document).ready(function () {

  const pathColorMap = {
    '/pharmacy/': 'bg-light-sea-green',
    '/End-customers': 'bg-vivid-orange',
    '/Register-Advertiser':'bg-living-coral',
    '/ngo/': 'bg-violet-sky',
    '/client-company':'bg-dark-blue',
    '/hospital':"bg-dodger-blue"
  };

  let activeColorClass = 'bg-violet-sky';
  const currentPath = window.location.pathname;

  for (const path in pathColorMap) {
    if (currentPath.includes(path)) {
      activeColorClass = pathColorMap[path];
      break;
    }
  }

  console.log('Active color:', activeColorClass);

  const rowsPerPage = 3;
  const cardsPerPage = 4;

  // Pagination for Cards
  function initCardPagination() {
    const reportTab = $('.report-issue.tab-content-donate');
    const cards = reportTab.find('.donation-card');
    const paginationContainer = reportTab.find('.pagination');

    console.log('Cards found:', cards.length);

    if (cards.length === 0) return;

    // Clear and rebuild pagination
    paginationContainer.empty();
    
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    let currentPage = 1;

    // Build pagination HTML
    let paginationHTML = `
      <button class="prevPageCard bg-white px-3 py-1 rounded text-light-gray1 text-sm">Previous</button>
      <div class="paginationBtnsCard flex gap-2"></div>
      <button class="nextPageCard bg-white px-3 py-1 rounded text-light-gray1 text-sm">Next</button>
    `;
    paginationContainer.html(paginationHTML);

    const paginationBtns = paginationContainer.find('.paginationBtnsCard');
    const prevBtn = paginationContainer.find('.prevPageCard');
    const nextBtn = paginationContainer.find('.nextPageCard');

    function renderPaginationButtons() {
      paginationBtns.empty();
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const btn = $(`<button class="page-btn-card px-3 py-1.5 rounded-lg text-sm ${isActive ? activeColorClass + ' text-white' : 'bg-pagination text-dark-gray'}">${i}</button>`);
        btn.data('page', i);
        paginationBtns.append(btn);
      }
    }

    function showPage(page) {
      currentPage = page;
      cards.hide();
      const start = (page - 1) * cardsPerPage;
      cards.slice(start, start + cardsPerPage).show();
      renderPaginationButtons();
      
      // Update prev/next button states
      prevBtn.prop('disabled', currentPage === 1);
      nextBtn.prop('disabled', currentPage === totalPages);
    }

    paginationBtns.on('click', '.page-btn-card', function () {
      const selectedPage = $(this).data('page');
      showPage(selectedPage);
    });

    prevBtn.on('click', function () {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });

    nextBtn.on('click', function () {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });

    showPage(1);
  }

  // Pagination for Tables
  function initTablePagination() {
    const contactTab = $('.contact-support.tab-content-donate');
    const table = contactTab.find('.docTable');
    const rows = table.find('tbody tr');

    console.log('Table rows found:', rows.length);

    if (rows.length === 0) return;

    // Check if pagination already exists
    let paginationContainer = contactTab.find('.pagination-wrapper');
    if (paginationContainer.length === 0) {
      paginationContainer = $(`
        <div class="pagination-wrapper flex gap-2 my-4 justify-center">
          <button class="prevPageTable bg-white px-3 py-1 rounded text-light-gray1 text-sm">Previous</button>
          <div class="paginationBtnsTable flex gap-2"></div>
          <button class="nextPageTable bg-white px-3 py-1 rounded text-light-gray1 text-sm">Next</button>
        </div>
      `);
      contactTab.append(paginationContainer);
    }

    const paginationBtns = paginationContainer.find('.paginationBtnsTable');
    const prevBtn = paginationContainer.find('.prevPageTable');
    const nextBtn = paginationContainer.find('.nextPageTable');
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    let currentPage = 1;

    function renderPaginationButtons() {
      paginationBtns.empty();
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const btn = $(`<button class="page-btn-table px-3 py-1.5 rounded-lg text-sm ${isActive ? activeColorClass + ' text-white' : 'bg-pagination text-dark-gray'}">${i}</button>`);
        btn.data('page', i);
        paginationBtns.append(btn);
      }
    }

    function showPage(page) {
      currentPage = page;
      rows.hide();
      const start = (page - 1) * rowsPerPage;
      rows.slice(start, start + rowsPerPage).show();
      renderPaginationButtons();
      
      // Update prev/next button states
      prevBtn.prop('disabled', currentPage === 1);
      nextBtn.prop('disabled', currentPage === totalPages);
    }

    paginationBtns.on('click', '.page-btn-table', function () {
      const selectedPage = $(this).data('page');
      showPage(selectedPage);
    });

    prevBtn.on('click', function () {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });

    nextBtn.on('click', function () {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });

    showPage(1);
  }

 

  // Card expand/collapse functionality - Read More button
  $(document).on('click', '.read-more-btn', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const card = $(this).closest('.donation-card');
    const expandedPara = card.find('.expanded-para');
    const expandedButtons = card.find('.expanded-buttons');
    const readMoreBtn = card.find('.read-more-btn');
    const defaultHeading = card.find('.default-heading');
    const closeBtn = card.find('.close-expanded');
    const pagination = $('.report-issue .pagination');

    console.log('Read More clicked');
    
    // Show expanded content
    expandedPara.removeClass('hidden');
    expandedButtons.removeClass('hidden');
    defaultHeading.addClass('hidden');
    readMoreBtn.addClass('hidden');
    closeBtn.removeClass('hidden');
    
    // Hide pagination when card is expanded
    pagination.addClass('hidden');
    console.log('Pagination hidden');
  });

  // Close expanded card - Close button
  $(document).on('click', '.close-expanded', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const card = $(this).closest('.donation-card');
    const pagination = $('.report-issue .pagination');
    
    console.log('Close button clicked');
    
    card.find('.expanded-para').addClass('hidden');
    card.find('.expanded-buttons').addClass('hidden');
    card.find('.default-heading').removeClass('hidden');
    card.find('.read-more-btn').removeClass('hidden');
    $(this).addClass('hidden');
    
    // Show pagination when card is collapsed
    pagination.removeClass('hidden');
    console.log('Pagination shown');
  });

  // Initialize both paginations
  initCardPagination();
  initTablePagination();

});