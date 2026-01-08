document.addEventListener("DOMContentLoaded", () => {

  // ===== ACCEPTED CARD =====
  document.querySelectorAll(".card-all-accepted").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelector(".modal-all-accepted").classList.remove("hidden");
    });
  });

  document.querySelector(".modal-close-all-accepted")
    .addEventListener("click", () => {
      document.querySelector(".modal-all-accepted").classList.add("hidden");
    });


  // ===== PENDING CARD =====
  document.querySelectorAll(".card-pending").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelector(".modal-pending").classList.remove("hidden");
    });
  });

  document.querySelector(".modal-close-pending")
    .addEventListener("click", () => {
      document.querySelector(".modal-pending").classList.add("hidden");
    });

});
