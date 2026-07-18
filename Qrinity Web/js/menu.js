document.addEventListener("DOMContentLoaded", () => {
  // ==================== MODAL ====================
  const addMenuModal = document.getElementById("addMenuModal");
  const btnAddMenu = document.querySelector(".btn-primary-purple-add");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");

  if (btnAddMenu) {
    btnAddMenu.addEventListener("click", () => {
      addMenuModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  const closeModal = () => {
    addMenuModal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === addMenuModal) closeModal();
  });

  // ==================== REFERENCES ====================
  const cards = Array.from(document.querySelectorAll(".menu-food-card"));
  const grid = document.querySelector(".menu-items-responsive-grid");
  const tabs = document.querySelectorAll(".category-tab-item");
  const viewBtns = document.querySelectorAll(".toggle-view-btn");
  const searchInput = document.querySelector(".filter-inner-search-box input");

  // Filter state
  let activeCategory = "all";
  let activeStatus = "all";
  let searchQuery = "";

  // ==================== CATEGORY TABS ====================
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      activeCategory = tab.dataset.category || "all";

      // Sync the category dropdown to match tab selection
      syncCategoryDropdown(activeCategory);

      applyFilters();
    });
  });

  // ==================== DROPDOWN FILTERS ====================
  const dropdowns = document.querySelectorAll(".dropdown-filter-select");

  dropdowns.forEach((dd) => {
    dd.addEventListener("click", (e) => {
      // Prevent closing when clicking on option items
      if (e.target.closest(".filter-option-item")) return;

      // Close other dropdowns
      dropdowns.forEach((other) => {
        if (other !== dd) other.classList.remove("is-open");
      });

      dd.classList.toggle("is-open");
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-filter-select")) {
      dropdowns.forEach((dd) => dd.classList.remove("is-open"));
    }
  });

  // Category dropdown options
  const categoryDropdown = document.getElementById("categoryDropdown");
  if (categoryDropdown) {
    categoryDropdown.querySelectorAll(".filter-option-item").forEach((opt) => {
      opt.addEventListener("click", () => {
        const value = opt.dataset.value;
        activeCategory = value;

        // Update active state
        categoryDropdown
          .querySelectorAll(".filter-option-item")
          .forEach((o) => o.classList.remove("active-option"));
        opt.classList.add("active-option");

        // Update displayed text
        const textEl = document.querySelector(
          "#categoryFilter .filter-selected-text"
        );
        if (textEl) textEl.textContent = opt.textContent;

        // Sync tabs
        syncTabs(value);

        // Close dropdown
        document.getElementById("categoryFilter")?.classList.remove("is-open");

        applyFilters();
      });
    });
  }

  // Status dropdown options
  const statusDropdown = document.getElementById("statusDropdown");
  if (statusDropdown) {
    statusDropdown.querySelectorAll(".filter-option-item").forEach((opt) => {
      opt.addEventListener("click", () => {
        const value = opt.dataset.value;
        activeStatus = value;

        // Update active state
        statusDropdown
          .querySelectorAll(".filter-option-item")
          .forEach((o) => o.classList.remove("active-option"));
        opt.classList.add("active-option");

        // Update displayed text
        const textEl = document.querySelector(
          "#statusFilter .filter-selected-text"
        );
        if (textEl) textEl.textContent = opt.textContent;

        // Close dropdown
        document.getElementById("statusFilter")?.classList.remove("is-open");

        applyFilters();
      });
    });
  }

  // ==================== SYNC TABS <-> DROPDOWN ====================
  const syncCategoryDropdown = (category) => {
    const dropdown = document.getElementById("categoryDropdown");
    if (!dropdown) return;

    dropdown.querySelectorAll(".filter-option-item").forEach((opt) => {
      opt.classList.toggle("active-option", opt.dataset.value === category);
    });

    const textEl = document.querySelector(
      "#categoryFilter .filter-selected-text"
    );
    const activeOpt = dropdown.querySelector(
      `.filter-option-item[data-value="${category}"]`
    );
    if (textEl && activeOpt) textEl.textContent = activeOpt.textContent;
  };

  const syncTabs = (category) => {
    tabs.forEach((tab) => {
      const tabCat = tab.dataset.category || "all";
      tab.classList.toggle("active-tab", tabCat === category);
    });
  };

  // ==================== VIEW TOGGLE ====================
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewBtns.forEach((b) => b.classList.remove("active-view"));
      btn.classList.add("active-view");

      const isList = btn.querySelector("span")?.textContent.trim() === "List";

      if (isList && grid) {
        grid.classList.add("list-view");
      } else if (grid) {
        grid.classList.remove("list-view");
      }
    });
  });

  // ==================== SEARCH ====================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // ==================== APPLY ALL FILTERS ====================
  const applyFilters = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const title =
        card.querySelector(".food-card-title")?.textContent.toLowerCase() || "";
      const isChecked =
        card.querySelector(".switch-toggle-widget input")?.checked ?? true;

      // Category filter
      const matchCategory =
        activeCategory === "all" || category === activeCategory;

      // Status filter
      const matchStatus =
        activeStatus === "all" ||
        (activeStatus === "available" && isChecked) ||
        (activeStatus === "unavailable" && !isChecked);

      // Search filter
      const matchSearch = !searchQuery || title.includes(searchQuery);

      if (matchCategory && matchStatus && matchSearch) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    });

    // Update pagination text
    const paginationText = document.querySelector(".pagination-meta-text");
    if (paginationText) {
      paginationText.textContent = `Showing ${visibleCount} of ${cards.length} items`;
    }
  };

  // ==================== AVAILABILITY TOGGLE LABEL ====================
  document.querySelectorAll(".switch-toggle-widget input").forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const label = toggle
        .closest(".availability-toggle-group")
        ?.querySelector(".availability-status-label");
      if (label) {
        label.textContent = toggle.checked ? "Available" : "Unavailable";
      }
      // Re-apply status filter after toggle change
      applyFilters();
    });
  });
});
