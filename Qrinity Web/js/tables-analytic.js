(function () {
  const tables = [
    {
      id: 1,
      name: "Table 1",
      area: "Indoor",
      guests: 4,
      items: 12,
      totalBill: 450000,
      payment: "QRIS",
      orderStatus: "preparing",
      orderStatusLabel: "Preparing",
      orderStatusSub: "In Kitchen",
      orderTime: "12:11 PM",
      occupied: true,
      checkIn: "12:10 PM",
      orderedItems: [
        { name: "Beef Steak", qty: 1, price: 120000 },
        { name: "Chicken Wings", qty: 2, price: 80000 },
        { name: "Caesar Salad", qty: 1, price: 45000 },
        { name: "Iced Latte", qty: 2, price: 35000 },
        { name: "French Fries", qty: 2, price: 30000 },
        { name: "Mineral Water", qty: 4, price: 20000 },
      ],
      revenue: 450000,
    },
    {
      id: 2,
      name: "Table 2",
      area: "Outdoor",
      guests: 2,
      items: 8,
      totalBill: 280000,
      payment: "Card",
      orderStatus: "ready",
      orderStatusLabel: "Ready",
      orderStatusSub: "Ready to Serve",
      orderTime: "12:05 PM",
      occupied: true,
      checkIn: "11:58 AM",
      orderedItems: [
        { name: "Grilled Salmon", qty: 1, price: 95000 },
        { name: "Pasta Carbonara", qty: 1, price: 65000 },
        { name: "Lemon Tea", qty: 2, price: 30000 },
        { name: "Garlic Bread", qty: 2, price: 30000 },
      ],
      revenue: 320000,
    },
    {
      id: 3,
      name: "Table 3",
      area: "Indoor",
      guests: 6,
      items: 15,
      totalBill: 620000,
      payment: "QRIS",
      orderStatus: "served",
      orderStatusLabel: "Served",
      orderStatusSub: "Enjoy Your Meal",
      orderTime: "11:45 AM",
      occupied: true,
      checkIn: "11:30 AM",
      orderedItems: [
        { name: "Family Platter", qty: 1, price: 250000 },
        { name: "Pizza Margherita", qty: 2, price: 140000 },
        { name: "Soft Drink", qty: 6, price: 90000 },
      ],
      revenue: 580000,
    },
    {
      id: 4,
      name: "Table 4",
      area: "VIP Room",
      guests: 8,
      items: 20,
      totalBill: 1200000,
      payment: "Card",
      orderStatus: "preparing",
      orderStatusLabel: "Preparing",
      orderStatusSub: "In Kitchen",
      orderTime: "12:20 PM",
      occupied: true,
      checkIn: "12:15 PM",
      orderedItems: [
        { name: "Premium Wagyu", qty: 2, price: 400000 },
        { name: "Lobster Thermidor", qty: 2, price: 360000 },
        { name: "Champagne", qty: 1, price: 280000 },
      ],
      revenue: 720000,
    },
    {
      id: 5,
      name: "Table 5",
      area: "Outdoor",
      guests: null,
      items: null,
      totalBill: null,
      payment: null,
      orderStatus: "available",
      orderStatusLabel: "Available",
      orderStatusSub: "Ready to Seat",
      orderTime: "—",
      occupied: false,
      checkIn: "—",
      orderedItems: [],
      revenue: 210000,
    },
    {
      id: 6,
      name: "Table 6",
      area: "Indoor",
      guests: 3,
      items: 6,
      totalBill: 185000,
      payment: "QRIS",
      orderStatus: "ready",
      orderStatusLabel: "Ready",
      orderStatusSub: "Ready to Serve",
      orderTime: "12:30 PM",
      occupied: true,
      checkIn: "12:25 PM",
      orderedItems: [
        { name: "Nasi Goreng", qty: 2, price: 70000 },
        { name: "Es Teh Manis", qty: 3, price: 45000 },
      ],
      revenue: 390000,
    },
    {
      id: 7,
      name: "Table 7",
      area: "Indoor",
      guests: 5,
      items: 10,
      totalBill: 510000,
      payment: "QRIS",
      orderStatus: "served",
      orderStatusLabel: "Served",
      orderStatusSub: "Enjoy Your Meal",
      orderTime: "11:20 AM",
      occupied: true,
      checkIn: "11:05 AM",
      orderedItems: [
        { name: "Rendang", qty: 2, price: 120000 },
        { name: "Gado-Gado", qty: 1, price: 55000 },
      ],
      revenue: 470000,
    },
    {
      id: 8,
      name: "Table 8",
      area: "Outdoor",
      guests: null,
      items: null,
      totalBill: null,
      payment: null,
      orderStatus: "available",
      orderStatusLabel: "Available",
      orderStatusSub: "Ready to Seat",
      orderTime: "—",
      occupied: false,
      checkIn: "—",
      orderedItems: [],
      revenue: 260000,
    },
  ];

  const mostVisited = [
    { rank: 1, name: "Table 3", orders: 32, revenue: 3250000 },
    { rank: 2, name: "Table 1", orders: 28, revenue: 2800000 },
    { rank: 3, name: "Table 4", orders: 24, revenue: 4100000 },
    { rank: 4, name: "Table 6", orders: 21, revenue: 1950000 },
    { rank: 5, name: "Table 2", orders: 19, revenue: 1680000 },
  ];

  const revenueBars = [
    { label: "T1", value: 450000, tableId: 1 },
    { label: "T2", value: 320000, tableId: 2 },
    { label: "T3", value: 580000, tableId: 3 },
    { label: "T4", value: 720000, tableId: 4 },
    { label: "T5", value: 210000, tableId: 5 },
    { label: "T6", value: 390000, tableId: 6 },
    { label: "T7", value: 470000, tableId: 7 },
    { label: "T8", value: 260000, tableId: 8 },
    { label: "T9", value: 340000, tableId: null },
    { label: "T10", value: 290000, tableId: null },
  ];

  const formatCurrency = (value) => {
    if (value == null) return "—";
    return "Rp " + value.toLocaleString("id-ID");
  };

  const paymentBadge = (payment) => {
    if (!payment) return "—";
    const cls = payment === "QRIS" ? "pay-qris" : "pay-card";
    return `<span class="ta-pay-badge ${cls}">${payment}</span>`;
  };

  const statusBadge = (table) => {
    return `<span class="ta-status-badge status-${table.orderStatus}">
      <strong>${table.orderStatusLabel}</strong>
      <small>${table.orderStatusSub}</small>
    </span>`;
  };

  const renderTableRows = () => {
    const tbody = document.getElementById("taTableBody");
    if (!tbody) return;

    tbody.innerHTML = tables
      .map(
        (table) => `
      <tr class="ta-table-row" data-table-id="${table.id}">
        <td>
          <div class="ta-table-cell-name">
            <span class="ta-table-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </span>
            <div>
              <strong>${table.name}</strong>
              <small>${table.area}</small>
            </div>
          </div>
        </td>
        <td>${table.guests ?? "—"}</td>
        <td>${table.items ?? "—"}</td>
        <td class="ta-bill">${formatCurrency(table.totalBill)}</td>
        <td>${paymentBadge(table.payment)}</td>
        <td>${statusBadge(table)}</td>
        <td>${table.orderTime}</td>
        <td>
          <button type="button" class="ta-view-btn" data-view-id="${table.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View
          </button>
        </td>
      </tr>`
      )
      .join("");
  };

  const renderMostVisited = () => {
    const list = document.getElementById("taMostVisitedList");
    if (!list) return;

    list.innerHTML = mostVisited
      .map(
        (item) => `
      <li>
        <span class="ta-rank">${item.rank}</span>
        <div class="ta-visited-info">
          <strong>${item.name}</strong>
          <small>${item.orders} Orders</small>
        </div>
        <span class="ta-visited-revenue">${formatCurrency(item.revenue)}</span>
      </li>`
      )
      .join("");
  };

  const renderRevenueChart = () => {
    const chart = document.getElementById("taRevenueChart");
    if (!chart) return;

    const max = Math.max(...revenueBars.map((b) => b.value));

    chart.innerHTML = revenueBars
      .map((bar) => {
        const height = Math.round((bar.value / max) * 100);
        return `
        <div class="ta-revenue-bar-wrap">
          <div class="ta-revenue-bar ${bar.tableId === 1 ? "is-active" : ""}"
               style="height: ${height}%"
               data-label="${bar.label}"
               data-value="${formatCurrency(bar.value)}"
               data-table-id="${bar.tableId || ""}">
            <span class="ta-bar-tooltip">${bar.label.replace("T", "Table ")}: ${formatCurrency(bar.value)}</span>
          </div>
          <span class="ta-bar-label">${bar.label}</span>
        </div>`;
      })
      .join("");
  };

  const renderDetailPanel = (table) => {
    const panel = document.getElementById("taDetailPanel");
    if (!panel || !table) return;

    const itemsHtml =
      table.orderedItems.length > 0
        ? table.orderedItems
            .map(
              (item) => `
          <li>
            <div>
              <strong>${item.name}</strong>
              <small>x${item.qty}</small>
            </div>
            <span>${formatCurrency(item.price * item.qty)}</span>
          </li>`
            )
            .join("")
        : `<li class="ta-empty-items"><span>No active orders</span></li>`;

    panel.innerHTML = `
      <div class="ta-panel-header">
        <h2>${table.name}</h2>
        <button type="button" class="ta-panel-close" id="taPanelClose" aria-label="Tutup panel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="ta-panel-badges">
        <span class="ta-panel-badge ${table.occupied ? "badge-occupied" : "badge-available"}">
          ${table.occupied ? "Occupied" : "Available"}
        </span>
        <span class="ta-panel-badge badge-area">${table.area}</span>
      </div>

      <ul class="ta-panel-meta">
        <li><span>Guests</span><strong>${table.guests ? table.guests + " People" : "—"}</strong></li>
        <li><span>Check-in Time</span><strong>${table.checkIn}</strong></li>
        <li><span>Order Time</span><strong>${table.orderTime}</strong></li>
        <li><span>Total Items</span><strong>${table.items ? table.items + " Items" : "—"}</strong></li>
      </ul>

      <div class="ta-panel-summary">
        <div class="ta-summary-row highlight">
          <span>Total Bill</span>
          <strong>${formatCurrency(table.totalBill)}</strong>
        </div>
        <div class="ta-summary-row">
          <span>Payment Method</span>
          <strong>${table.payment || "—"}</strong>
        </div>
        <div class="ta-summary-row">
          <span>Payment Status</span>
          <span class="ta-mini-badge badge-paid">${table.payment ? "Paid" : "—"}</span>
        </div>
        <div class="ta-summary-row">
          <span>Order Status</span>
          ${statusBadge(table)}
        </div>
      </div>

      <div class="ta-panel-items">
        <h3>Ordered Items</h3>
        <ul>${itemsHtml}</ul>
      </div>

      <div class="ta-panel-footer">
        <div class="ta-panel-total">
          <span>Total</span>
          <strong>${formatCurrency(table.totalBill)}</strong>
        </div>
        <button type="button" class="ta-order-details-btn">View Order Details</button>
      </div>`;

    panel.querySelector("#taPanelClose")?.addEventListener("click", closePanel);
  };

  let selectedId = null;

  const openPanel = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;

    selectedId = tableId;
    const layout = document.getElementById("taLayout");
    const panel = document.getElementById("taDetailPanel");
    layout?.classList.add("panel-open");
    panel?.setAttribute("aria-hidden", "false");

    document.querySelectorAll(".ta-table-row").forEach((row) => {
      row.classList.toggle("is-selected", Number(row.dataset.tableId) === tableId);
    });

    document.querySelectorAll(".ta-revenue-bar").forEach((bar) => {
      bar.classList.toggle("is-active", Number(bar.dataset.tableId) === tableId);
    });

    renderDetailPanel(table);
  };

  const closePanel = () => {
    selectedId = null;
    const panel = document.getElementById("taDetailPanel");
    document.getElementById("taLayout")?.classList.remove("panel-open");
    panel?.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".ta-table-row").forEach((row) => {
      row.classList.remove("is-selected");
    });
    document.querySelectorAll(".ta-revenue-bar").forEach((bar) => {
      bar.classList.remove("is-active");
    });
  };

  const bindEvents = () => {
    document.getElementById("taTableBody")?.addEventListener("click", (e) => {
      const viewBtn = e.target.closest("[data-view-id]");
      const row = e.target.closest(".ta-table-row");
      const tableId = viewBtn
        ? Number(viewBtn.dataset.viewId)
        : row
          ? Number(row.dataset.tableId)
          : null;

      if (tableId) openPanel(tableId);
    });

    document.getElementById("taRevenueChart")?.addEventListener("click", (e) => {
      const bar = e.target.closest(".ta-revenue-bar");
      if (bar?.dataset.tableId) {
        openPanel(Number(bar.dataset.tableId));
      }
    });

    document.getElementById("taResetFilters")?.addEventListener("click", () => {
      document.getElementById("taFilterArea").value = "all";
      document.getElementById("taFilterStatus").value = "all";
      document.getElementById("taFilterPayment").value = "all";
      document.getElementById("taTableSearch").value = "";
    });
  };

  renderTableRows();
  renderMostVisited();
  renderRevenueChart();
  bindEvents();
})();
