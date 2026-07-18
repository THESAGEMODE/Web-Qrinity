(function () {
  const orders = {
    "QR-1289": {
      id: "QR-1289",
      customer: "Dewi Lestari",
      phone: "+62 812-3456-7890",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      guests: 2,
      table: "T5",
      itemCount: 2,
      total: 125000,
      status: "Pending",
      statusClass: "tag-orange-dot",
      statusTag: "tag-orange-soft-solid",
      payment: "Unpaid",
      paymentClass: "badge-red-bg",
      paymentMethod: "Unpaid",
      paymentMethodClass: "red-alert-txt",
      paymentStatus: "Pending Payment",
      paymentStatusClass: "orange-alert-txt",
      time: "10:30 AM",
      orderType: "Dine In",
      serviceFee: 0,
      items: [
        {
          name: "Beef Steak",
          qty: 1,
          price: 105000,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100",
        },
        {
          name: "Lemon Tea",
          qty: 1,
          price: 20000,
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100",
        },
      ],
    },
    "QR-1288": {
      id: "QR-1288",
      customer: "Budi Santoso",
      phone: "+62 813-9876-5432",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      guests: 3,
      table: "T2",
      itemCount: 3,
      total: 85000,
      status: "Preparing",
      statusClass: "tag-blue-dot",
      statusTag: "tag-orange-soft-solid",
      payment: "Cash",
      paymentClass: "badge-green-bg",
      paymentMethod: "Cash",
      paymentMethodClass: "value-dark-bold",
      paymentStatus: "Paid",
      paymentStatusClass: "value-dark-bold",
      time: "10:28 AM",
      orderType: "Dine In",
      serviceFee: 0,
      items: [
        {
          name: "Chicken Wings",
          qty: 1,
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1567620832904-9fe5cf7bcfe6?w=100",
        },
        {
          name: "Fries",
          qty: 1,
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1573080496219-bf080df97061?w=100",
        },
        {
          name: "Ice Tea",
          qty: 1,
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100",
        },
      ],
    },
    "QR-1287": {
      id: "QR-1287",
      customer: "Siti Aisyah",
      phone: "+62 821-4567-8901",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      guests: 4,
      table: "T8",
      itemCount: 2,
      total: 78000,
      status: "Preparing",
      statusClass: "tag-blue-dot",
      statusTag: "tag-orange-soft-solid",
      payment: "QRIS",
      paymentClass: "badge-indigo-bg",
      paymentMethod: "QRIS",
      paymentMethodClass: "value-dark-bold",
      paymentStatus: "Paid",
      paymentStatusClass: "value-dark-bold",
      time: "10:24 AM",
      orderType: "Dine In",
      serviceFee: 0,
      items: [
        {
          name: "Spaghetti Carbonara",
          qty: 1,
          price: 48000,
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=100",
        },
        {
          name: "Lemon Tea",
          qty: 1,
          price: 30000,
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100",
        },
      ],
    },
    "QR-1286": {
      id: "QR-1286",
      customer: "Andi Wijaya",
      phone: "+62 856-1234-5678",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      guests: 2,
      table: "T1",
      itemCount: 2,
      total: 125000,
      status: "Ready",
      statusClass: "tag-green-dot",
      statusTag: "tag-orange-soft-solid",
      payment: "Card",
      paymentClass: "badge-slate-bg",
      paymentMethod: "Card",
      paymentMethodClass: "value-dark-bold",
      paymentStatus: "Paid",
      paymentStatusClass: "value-dark-bold",
      time: "10:20 AM",
      orderType: "Dine In",
      serviceFee: 0,
      items: [
        {
          name: "Beef Steak",
          qty: 1,
          price: 105000,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100",
        },
        {
          name: "Lemon Tea",
          qty: 1,
          price: 20000,
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100",
        },
      ],
    },
    "QR-1285": {
      id: "QR-1285",
      customer: "Rina Marlina",
      phone: "+62 878-9012-3456",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      guests: 2,
      table: "T3",
      itemCount: 1,
      total: 25000,
      status: "Completed",
      statusClass: "tag-green-dot",
      statusTag: "tag-orange-soft-solid",
      payment: "QRIS",
      paymentClass: "badge-indigo-bg",
      paymentMethod: "QRIS",
      paymentMethodClass: "value-dark-bold",
      paymentStatus: "Paid",
      paymentStatusClass: "value-dark-bold",
      time: "10:15 AM",
      orderType: "Dine In",
      serviceFee: 0,
      items: [
        {
          name: "Iced Lemon Tea",
          qty: 1,
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100",
        },
      ],
    },
  };

  const formatCurrency = (value) => "Rp " + value.toLocaleString("id-ID");

  const renderPanel = (order) => {
    const panel = document.getElementById("orderDetailsPanel");
    if (!panel || !order) return;

    const itemsHtml = order.items
      .map(
        (item) => `
        <div class="food-item-panel-row">
          <div class="food-img-avatar-box" style="background-image: url('${item.image}')"></div>
          <div class="food-item-meta-details">
            <h5>${item.name}</h5>
            <span class="qty-multiplier">x${item.qty}</span>
          </div>
          <span class="item-computed-price">${formatCurrency(item.price * item.qty)}</span>
        </div>`
      )
      .join("");

    panel.innerHTML = `
      <div class="panel-header-title-row">
        <h3>Order Details</h3>
        <button type="button" class="close-panel-btn" id="closeOrderPanel" aria-label="Tutup panel">✕</button>
      </div>

      <div class="panel-scroll-body">
        <div class="panel-order-id-block">
          <div>
            <h2 class="panel-id-heading">#${order.id}</h2>
            <div class="panel-meta-grid-specs">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
                Table ${order.table}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                </svg>
                ${order.guests} Guests
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                ${order.time}
              </span>
            </div>
          </div>
          <span class="${order.statusTag}">${order.status}</span>
        </div>

        <div class="panel-section-block">
          <h4 class="section-mini-heading">Customer</h4>
          <div class="customer-profile-cell margin-top-md">
            <div class="cust-avatar-frame large-avatar" style="background-image: url('${order.avatar}')"></div>
            <div>
              <strong class="cust-name-title font-14">${order.customer}</strong>
              <span class="cust-guests-sub">${order.phone}</span>
            </div>
          </div>
        </div>

        <div class="panel-section-block">
          <h4 class="section-mini-heading">Order Items (${order.itemCount})</h4>
          <div class="food-items-panel-stack">${itemsHtml}</div>
        </div>

        <div class="panel-financial-pricing-summary">
          <div class="pricing-summary-line">
            <span>Subtotal</span>
            <span>${formatCurrency(order.total)}</span>
          </div>
          <div class="pricing-summary-line">
            <span>Service Fee</span>
            <span>${formatCurrency(order.serviceFee)}</span>
          </div>
          <div class="pricing-summary-line grand-total-style-row">
            <strong>Total</strong>
            <strong class="purple-color-txt">${formatCurrency(order.total)}</strong>
          </div>
        </div>

        <div class="panel-section-block no-border-bottom">
          <h4 class="section-mini-heading">Payment Information</h4>
          <div class="info-list-rows-stack">
            <div class="info-data-row">
              <span class="label-muted">Method</span>
              <span class="value-dark-bold ${order.paymentMethodClass}">${order.paymentMethod}</span>
            </div>
            <div class="info-data-row">
              <span class="label-muted">Status</span>
              <span class="value-dark-bold ${order.paymentStatusClass}">${order.paymentStatus}</span>
            </div>
            <div class="info-data-row">
              <span class="label-muted">Order Type</span>
              <span class="value-dark-bold">${order.orderType}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-action-footer-buttons-grid">
        <button type="button" class="btn-cancel-order-action">Cancel Order</button>
        <button type="button" class="btn-update-status-split-dropdown">
          <span>Update Status</span>
          <span class="dropdown-arrow-divider-icon">▼</span>
        </button>
      </div>`;

    panel.querySelector("#closeOrderPanel")?.addEventListener("click", closePanel);
  };

  const openPanel = (orderId) => {
    const order = orders[orderId];
    if (!order) return;

    document.getElementById("ordersLayout")?.classList.add("panel-open");
    document.getElementById("orderDetailsPanel")?.setAttribute("aria-hidden", "false");

    document.querySelectorAll(".order-table-row").forEach((row) => {
      row.classList.toggle("is-selected", row.dataset.orderId === orderId);
    });

    renderPanel(order);
  };

  const closePanel = () => {
    document.getElementById("ordersLayout")?.classList.remove("panel-open");
    document.getElementById("orderDetailsPanel")?.setAttribute("aria-hidden", "true");

    document.querySelectorAll(".order-table-row").forEach((row) => {
      row.classList.remove("is-selected");
    });
  };

  document.getElementById("ordersTableBody")?.addEventListener("click", (e) => {
    if (e.target.closest(".table-action-dot-btn")) return;

    const row = e.target.closest(".order-table-row");
    if (row?.dataset.orderId) {
      openPanel(row.dataset.orderId);
    }
  });
})();
