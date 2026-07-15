document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial State Setup
    const DEFAULT_RESTAURANTS = [
        { id: "wiseman", name: "Wiseman", emoji: "🍽️" },
        { id: "sakura", name: "Resto Sakura", emoji: "🍜" },
        { id: "senja", name: "Cafe Senja", emoji: "☕" },
        { id: "pizza", name: "Pizza Corner", emoji: "🍕" }
    ];

    function getRestaurants() {
        const stored = localStorage.getItem("qrinity_restaurants");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing restaurants", e);
            }
        }
        return DEFAULT_RESTAURANTS;
    }

    function saveRestaurants(list) {
        localStorage.setItem("qrinity_restaurants", JSON.stringify(list));
    }

    function getActiveRestaurantId() {
        return localStorage.getItem("qrinity_active_restaurant_id") || "wiseman";
    }

    function setActiveRestaurantId(id) {
        localStorage.setItem("qrinity_active_restaurant_id", id);
    }

    // 2. Initialize UI for all store dropdowns on the page
    const storeDropdown = document.querySelector(".store-dropdown");
    if (!storeDropdown) return;

    // Make sure container has position relative for menu positioning
    storeDropdown.style.position = "relative";

    // Create dropdown menu container if not exists
    let menuContainer = storeDropdown.querySelector(".store-dropdown-menu");
    if (!menuContainer) {
        menuContainer = document.createElement("div");
        menuContainer.className = "store-dropdown-menu";
        storeDropdown.appendChild(menuContainer);
    }

    // Synchronize the dropdown header display
    function syncHeader() {
        const list = getRestaurants();
        const activeId = getActiveRestaurantId();
        const activeObj = list.find(r => r.id === activeId) || list[0];

        const titleEl = storeDropdown.querySelector(".store-title");
        const avatarEl = storeDropdown.querySelector(".store-avatar");

        if (titleEl) {
            titleEl.textContent = activeObj.name;
        }
        if (avatarEl) {
            // Replace the SVG with emoji
            avatarEl.innerHTML = `<span style="font-size: 15px; line-height: 1;">${activeObj.emoji}</span>`;
        }
    }

    // Render the dropdown menu items
    function renderMenu() {
        const list = getRestaurants();
        const activeId = getActiveRestaurantId();

        menuContainer.innerHTML = "";

        // Add each restaurant
        list.forEach((rest, idx) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "store-dropdown-item";
            if (rest.id === activeId) {
                item.classList.add("active");
            }

            const leftDiv = document.createElement("div");
            leftDiv.className = "store-dropdown-item-left";
            
            const emojiSpan = document.createElement("span");
            emojiSpan.className = "store-dropdown-item-emoji";
            emojiSpan.textContent = rest.emoji;

            const nameSpan = document.createElement("span");
            nameSpan.className = "store-dropdown-item-name";
            nameSpan.textContent = rest.name;

            leftDiv.appendChild(emojiSpan);
            leftDiv.appendChild(nameSpan);
            item.appendChild(leftDiv);

            if (rest.id === activeId) {
                const checkSpan = document.createElement("span");
                checkSpan.className = "store-dropdown-item-check";
                checkSpan.textContent = "✓";
                item.appendChild(checkSpan);
            }

            item.addEventListener("click", (e) => {
                e.stopPropagation();
                setActiveRestaurantId(rest.id);
                syncHeader();
                renderMenu();
                storeDropdown.classList.remove("open");
            });

            menuContainer.appendChild(item);

            // Add divider after the first item (Wiseman) as shown in the user mockup
            if (idx === 0) {
                const div = document.createElement("div");
                div.className = "store-dropdown-divider";
                menuContainer.appendChild(div);
            }
        });

        // Add second divider before actions (Add Restaurant, Restaurant Settings)
        const secondDivider = document.createElement("div");
        secondDivider.className = "store-dropdown-divider";
        menuContainer.appendChild(secondDivider);

        // Add Restaurant Action
        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "store-dropdown-item action-item";
        addBtn.innerHTML = `
            <div class="store-dropdown-item-left">
                <span class="store-dropdown-item-emoji">➕</span>
                <span>Add Restaurant</span>
            </div>
        `;
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            storeDropdown.classList.remove("open");
            showAddRestaurantModal();
        });
        menuContainer.appendChild(addBtn);

        // Restaurant Settings Action
        const settingsBtn = document.createElement("button");
        settingsBtn.type = "button";
        settingsBtn.className = "store-dropdown-item action-item";
        settingsBtn.innerHTML = `
            <div class="store-dropdown-item-left">
                <span class="store-dropdown-item-emoji">⚙️</span>
                <span>Restaurant Settings</span>
            </div>
        `;
        settingsBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.href = "settings.html";
        });
        menuContainer.appendChild(settingsBtn);
    }

    // Toggle dropdown open/close
    storeDropdown.addEventListener("click", (e) => {
        // If clicking inside the menu or modal, don't toggle
        if (e.target.closest(".store-dropdown-menu")) return;
        storeDropdown.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!storeDropdown.contains(e.target)) {
            storeDropdown.classList.remove("open");
        }
    });

    // 3. Custom Modal for Adding Restaurant
    function showAddRestaurantModal() {
        // Remove existing modal if any
        const existing = document.getElementById("add-store-modal");
        if (existing) existing.remove();

        const backdrop = document.createElement("div");
        backdrop.id = "add-store-modal";
        backdrop.className = "store-modal-backdrop";

        const modal = document.createElement("div");
        modal.className = "store-modal";

        modal.innerHTML = `
            <div class="store-modal-header">
                <h3>Add New Restaurant</h3>
                <button type="button" class="store-modal-close">&times;</button>
            </div>
            <form id="add-store-form" class="store-modal-form">
                <div class="form-group">
                    <label for="store-name">Restaurant Name</label>
                    <input type="text" id="store-name" required placeholder="e.g. Burger Barn" autocomplete="off" />
                </div>
                <div class="form-group">
                    <label>Select Emoji Icon</label>
                    <div class="emoji-picker">
                        <span class="emoji-option active" data-emoji="🍔">🍔</span>
                        <span class="emoji-option" data-emoji="🌮">🌮</span>
                        <span class="emoji-option" data-emoji="🍣">🍣</span>
                        <span class="emoji-option" data-emoji="🍦">🍦</span>
                        <span class="emoji-option" data-emoji="🍰">🍰</span>
                        <span class="emoji-option" data-emoji="🍳">🍳</span>
                        <span class="emoji-option" data-emoji="🥩">🥩</span>
                        <span class="emoji-option" data-emoji="🍱">🍱</span>
                        <span class="emoji-option" data-emoji="🍲">🍲</span>
                        <span class="emoji-option" data-emoji="🥗">🥗</span>
                    </div>
                    <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 12px; color: var(--clr-muted);">Or type custom emoji:</span>
                        <input type="text" id="store-emoji-custom" maxlength="2" placeholder="🍕" style="width: 50px; text-align: center; padding: 4px;" />
                    </div>
                </div>
                <div class="store-modal-footer">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-submit">Add Restaurant</button>
                </div>
            </form>
        `;

        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        // Focus the name input
        setTimeout(() => {
            const nameInput = modal.querySelector("#store-name");
            if (nameInput) nameInput.focus();
        }, 100);

        // Modal Close Handlers
        const closeBtn = modal.querySelector(".store-modal-close");
        const cancelBtn = modal.querySelector(".btn-cancel");
        
        function closeModal() {
            backdrop.classList.add("fade-out");
            setTimeout(() => {
                backdrop.remove();
            }, 200);
        }

        closeBtn.addEventListener("click", closeModal);
        cancelBtn.addEventListener("click", closeModal);
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) closeModal();
        });

        // Emoji Selection Logic
        let selectedEmoji = "🍔";
        const emojiOptions = modal.querySelectorAll(".emoji-option");
        const customEmojiInput = modal.querySelector("#store-emoji-custom");

        emojiOptions.forEach(opt => {
            opt.addEventListener("click", () => {
                emojiOptions.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");
                selectedEmoji = opt.getAttribute("data-emoji");
                customEmojiInput.value = ""; // clear custom input
            });
        });

        customEmojiInput.addEventListener("input", (e) => {
            const val = e.target.value.trim();
            if (val) {
                emojiOptions.forEach(o => o.classList.remove("active"));
                selectedEmoji = val;
            }
        });

        // Form Submit Handler
        const form = modal.querySelector("#add-store-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = modal.querySelector("#store-name");
            const name = nameInput.value.trim();

            if (!name) return;

            const list = getRestaurants();
            const newId = "custom_" + Date.now();
            const newRest = {
                id: newId,
                name: name,
                emoji: selectedEmoji
            };

            list.push(newRest);
            saveRestaurants(list);
            setActiveRestaurantId(newId);

            // Update UI
            syncHeader();
            renderMenu();
            closeModal();
        });
    }

    // =========================================================
    // 5. INTERACTIVE SELECTORS (date-filter-box & mini-selectors)
    // =========================================================
    
    // Mock data for Dashboard stats and charts updates based on date filter selection
    const dashboardData = {
        "Today": {
            sales: "Rp 8.420.000", salesTrend: "↑ +4.2% vs yesterday",
            orders: "124", ordersTrend: "↑ +6.8% vs yesterday",
            avg: "Rp 67.900", avgTrend: "↑ +1.2% vs yesterday",
            cust: "18", custTrend: "↑ +12.5% vs yesterday",
            chartPoints: "40,120 80,110 120,95 160,80 200,60 240,50 280,40 320,35 360,25 400,20",
            barHeights: [60, 45, 90, 110, 80, 120, 130]
        },
        "Yesterday": {
            sales: "Rp 7.890.000", salesTrend: "↓ -2.1% vs day before",
            orders: "115", ordersTrend: "↓ -1.5% vs day before",
            avg: "Rp 68.600", avgTrend: "↑ +0.5% vs day before",
            cust: "15", custTrend: "↓ -5.0% vs day before",
            chartPoints: "40,140 80,125 120,130 160,110 200,105 240,90 280,85 320,70 360,65 400,60",
            barHeights: [50, 40, 75, 95, 70, 105, 115]
        },
        "This Week": {
            sales: "Rp 58.750.000", salesTrend: "↑ +12.5% vs last week",
            orders: "845", ordersTrend: "↑ +8.2% vs last week",
            avg: "Rp 68.850", avgTrend: "↓ -1.5% vs last week",
            cust: "128", custTrend: "↑ +20.4% vs last week",
            chartPoints: "40,130 80,90 120,110 160,70 200,75 240,45 280,35 320,40 360,30 400,28",
            barHeights: [115, 100, 105, 110, 98, 90, 125]
        },
        "Last 30 Days": {
            sales: "Rp 245.890.000", salesTrend: "↑ +18.4% vs prev 30 days",
            orders: "3.580", ordersTrend: "↑ +14.2% vs prev 30 days",
            avg: "Rp 68.680", avgTrend: "↑ +2.4% vs prev 30 days",
            cust: "542", custTrend: "↑ +25.1% vs prev 30 days",
            chartPoints: "40,80 80,70 120,60 160,50 200,45 240,35 280,30 320,25 360,20 400,15",
            barHeights: [130, 110, 125, 115, 120, 135, 140]
        },
        "This Month": {
            sales: "Rp 189.500.000", salesTrend: "↑ +15.2% vs last month",
            orders: "2.760", ordersTrend: "↑ +11.8% vs last month",
            avg: "Rp 68.650", avgTrend: "↑ +1.8% vs last month",
            cust: "410", custTrend: "↑ +22.5% vs last month",
            chartPoints: "40,100 80,90 120,80 160,75 200,65 240,55 280,45 320,40 360,30 400,22",
            barHeights: [120, 100, 115, 95, 110, 125, 130]
        }
    };

    const salesSummaryData = {
        "This Week": {
            sales: "Rp 58.750.000",
            orders: "845",
            avg: "Rp 68.850",
            cust: "128"
        },
        "Last Week": {
            sales: "Rp 52.340.000",
            orders: "765",
            avg: "Rp 68.420",
            cust: "112"
        },
        "This Month": {
            sales: "Rp 189.500.000",
            orders: "2.760",
            avg: "Rp 68.650",
            cust: "410"
        }
    };

    const salesOverviewData = {
        "This Week": "40,130 80,90 120,110 160,70 200,75 240,45 280,35 320,40 360,30 400,28",
        "Last Week": "40,140 80,120 120,115 160,95 200,90 240,80 280,75 320,85 360,60 400,50",
        "This Month": "40,100 80,90 120,80 160,75 200,65 240,55 280,45 320,40 360,30 400,22"
    };

    const hourlyOrdersData = {
        "Today": [115, 100, 105, 110, 98, 90, 125],
        "Yesterday": [50, 40, 75, 95, 70, 105, 115],
        "This Week": [90, 80, 110, 125, 85, 100, 130]
    };

    // Main update functions
    function updateDashboardStats(data) {
        const cards = document.querySelectorAll(".stat-item-card");
        if (cards.length < 4) return;

        // Total Sales card
        const salesVal = cards[0].querySelector(".stat-value");
        const salesTrend = cards[0].querySelector(".stat-trend");
        if (salesVal) salesVal.textContent = data.sales;
        if (salesTrend) {
            salesTrend.textContent = data.salesTrend;
            salesTrend.className = "stat-trend " + (data.salesTrend.includes("↓") ? "trend-down" : "trend-up");
        }

        // Total Orders card
        const ordersVal = cards[1].querySelector(".stat-value");
        const ordersTrend = cards[1].querySelector(".stat-trend");
        if (ordersVal) ordersVal.textContent = data.orders;
        if (ordersTrend) {
            ordersTrend.textContent = data.ordersTrend;
            ordersTrend.className = "stat-trend " + (data.ordersTrend.includes("↓") ? "trend-down" : "trend-up");
        }

        // Average Order Value card
        const avgVal = cards[2].querySelector(".stat-value");
        const avgTrend = cards[2].querySelector(".stat-trend");
        if (avgVal) avgVal.textContent = data.avg;
        if (avgTrend) {
            avgTrend.textContent = data.avgTrend;
            avgTrend.className = "stat-trend " + (data.avgTrend.includes("↓") ? "trend-down" : "trend-up");
        }

        // New Customers card
        const custVal = cards[3].querySelector(".stat-value");
        const custTrend = cards[3].querySelector(".stat-trend");
        if (custVal) custVal.textContent = data.cust;
        if (custTrend) {
            custTrend.textContent = data.custTrend;
            custTrend.className = "stat-trend " + (data.custTrend.includes("↓") ? "trend-down" : "trend-up");
        }
    }

    function updateLineChart(pointsString) {
        // pointsString is in format "x,y x,y ..." with old viewBox 420x160 coords.
        // Convert to new bezier path for the 480x200 chart (baseline y=186, top y=24, 1M=16.2px).
        // Old chart range: y=140 (0) to y=20 (10M). New chart: y=186 (0) to y=24 (10M) = 162px / 10M
        const OLD_BOTTOM = 140;
        const OLD_RANGE = 120; // 140 - 20
        const NEW_BOTTOM = 186;
        const NEW_RANGE = 162; // 186 - 24
        const POINTS_X = [40, 112, 184, 256, 328, 400, 472]; // 7 evenly-spaced x positions

        const oldPoints = pointsString.trim().split(" ").map(p => {
            const [ox, oy] = p.split(",").map(Number);
            return oy;
        });

        // Map old y values to new y values (preserving relative position)
        const newYs = oldPoints.map(oy => {
            const fraction = (OLD_BOTTOM - oy) / OLD_RANGE; // 0=bottom,1=top in old
            return Math.round(NEW_BOTTOM - fraction * NEW_RANGE);
        });

        // Use 7 dots at most (clip or repeat last value if fewer)
        const ys7 = POINTS_X.map((_, i) => newYs[Math.min(i, newYs.length - 1)] || NEW_BOTTOM);

        // Build smooth bezier path (cubic)
        function buildBezier(xs, ys) {
            let d = `M${xs[0]},${ys[0]}`;
            for (let i = 0; i < xs.length - 1; i++) {
                const cpx1 = xs[i] + (xs[i + 1] - xs[i]) * 0.45;
                const cpx2 = xs[i + 1] - (xs[i + 1] - xs[i]) * 0.45;
                d += ` C${cpx1},${ys[i]} ${cpx2},${ys[i + 1]} ${xs[i + 1]},${ys[i + 1]}`;
            }
            return d;
        }

        const linePath = buildBezier(POINTS_X, ys7);
        const lastX = POINTS_X[POINTS_X.length - 1];
        const areaPath = linePath + ` L${lastX},${NEW_BOTTOM} L${POINTS_X[0]},${NEW_BOTTOM} Z`;

        const lineEl = document.getElementById("sales-line-path");
        const areaEl = document.querySelector("#sales-overview-svg path:first-of-type");
        if (lineEl) lineEl.setAttribute("d", linePath);
        if (areaEl) areaEl.setAttribute("d", areaPath);

        // Update dots
        POINTS_X.forEach((x, i) => {
            const dot = document.getElementById(`dot-${i}`);
            if (dot) {
                dot.setAttribute("cx", x);
                dot.setAttribute("cy", ys7[i]);
            }
        });
    }

    // Function to update the bar graph with layout transition
    function updateBarChart(heights) {
        const svg = document.querySelector(".vector-bar-graph");
        if (!svg) return;

        const rects = svg.querySelectorAll("rect");
        const labels = svg.querySelectorAll(".bar-value-label");
        
        heights.forEach((h, idx) => {
            if (rects[idx]) {
                rects[idx].setAttribute("height", h);
                rects[idx].setAttribute("y", 140 - h);
            }
            if (labels[idx]) {
                // Calculate display label
                const val = Math.round(h / 7);
                labels[idx].textContent = val;
                labels[idx].setAttribute("y", 140 - h - 5);
            }
        });
    }

    function updateSalesSummary(data) {
        const summaryCard = document.querySelector(".sales-summary-dark-theme");
        if (!summaryCard) return;

        const cells = summaryCard.querySelectorAll(".summary-cell strong");
        if (cells.length >= 4) {
            cells[0].textContent = data.sales;
            cells[1].textContent = data.orders;
            cells[2].textContent = data.avg;
            cells[3].textContent = data.cust;
        }
    }

    // Initialize all custom dropdown selectors
    function initCustomSelectors() {
        const dateBoxes = document.querySelectorAll(".date-filter-box");
        const miniSelectors = document.querySelectorAll(".mini-selector");

        // Helper to setup single selector
        function setupDropdown(element, options, currentDefault, onSelectCallback) {
            let selectedValue = currentDefault;
            
            // Create menu container
            const dropdown = document.createElement("div");
            dropdown.className = "selector-dropdown-menu";

            // Function to render items
            function renderItems() {
                dropdown.innerHTML = "";
                options.forEach(opt => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "selector-dropdown-item";
                    if (opt === selectedValue) {
                        btn.classList.add("active");
                    }
                    btn.innerHTML = `
                        <span>${opt}</span>
                        ${opt === selectedValue ? '<span class="selector-dropdown-item-check">✓</span>' : ''}
                    `;
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        selectedValue = opt;
                        const labelSpan = element.querySelector("span");
                        if (labelSpan) labelSpan.textContent = opt;
                        renderItems();
                        element.classList.remove("open");
                        
                        if (onSelectCallback) {
                            onSelectCallback(opt);
                        }
                    });
                    dropdown.appendChild(btn);
                });
            }

            renderItems();
            element.appendChild(dropdown);

            // Click listener to toggle open/close
            element.addEventListener("click", (e) => {
                if (e.target.closest(".selector-dropdown-menu")) return;
                
                // Close other opened selector dropdowns
                document.querySelectorAll(".date-filter-box, .mini-selector").forEach(box => {
                    if (box !== element) box.classList.remove("open");
                });

                element.classList.toggle("open");
            });
        }

        // Helper to get formatted date range dynamically
        function getFormattedDateRange(option) {
            const today = new Date();
            const formatDate = (d) => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
            };
            const formatDateShort = (d) => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return `${months[d.getMonth()]} ${d.getDate()}`;
            };

            if (option === "Today") {
                return formatDate(today);
            } else if (option === "Yesterday") {
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                return formatDate(yesterday);
            } else if (option === "This Week") {
                const start = new Date();
                start.setDate(today.getDate() - 6);
                return `${formatDateShort(start)} - ${formatDate(today)}`;
            } else if (option === "Last 30 Days") {
                const start = new Date();
                start.setDate(today.getDate() - 29);
                return `${formatDateShort(start)} - ${formatDate(today)}`;
            } else if (option === "This Month") {
                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                return `${formatDateShort(start)} - ${formatDate(today)}`;
            }
            return "";
        }

        // Helper to format custom range
        function formatCustomRange(startStr, endStr) {
            const start = new Date(startStr);
            const end = new Date(endStr);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            if (start.getFullYear() === end.getFullYear()) {
                return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
            } else {
                return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} - ${months[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
            }
        }

        function showCustomDatePickerModal(onApply) {
            const existing = document.getElementById("custom-datepicker-modal");
            if (existing) existing.remove();

            const backdrop = document.createElement("div");
            backdrop.id = "custom-datepicker-modal";
            backdrop.className = "datepicker-modal-backdrop";

            const modal = document.createElement("div");
            modal.className = "datepicker-modal";

            modal.innerHTML = `
                <div class="datepicker-modal-header">
                    <h3>Select Custom Date Range</h3>
                    <button type="button" class="datepicker-modal-close">&times;</button>
                </div>
                <form id="datepicker-form" class="datepicker-form">
                    <div class="datepicker-inputs-row">
                        <div class="form-group">
                            <label for="start-date">Start Date</label>
                            <input type="date" id="start-date" required />
                        </div>
                        <div class="form-group">
                            <label for="end-date">End Date</label>
                            <input type="date" id="end-date" required />
                        </div>
                    </div>
                    <div class="datepicker-modal-footer">
                        <button type="button" class="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-submit">Apply Range</button>
                    </div>
                </form>
            `;

            backdrop.appendChild(modal);
            document.body.appendChild(backdrop);

            // Focus the start date
            setTimeout(() => {
                const startInput = modal.querySelector("#start-date");
                if (startInput) startInput.focus();
            }, 100);

            // Close logic
            const closeBtn = modal.querySelector(".datepicker-modal-close");
            const cancelBtn = modal.querySelector(".btn-cancel");
            
            function closeModal() {
                backdrop.classList.add("fade-out");
                setTimeout(() => backdrop.remove(), 200);
            }
            
            closeBtn.addEventListener("click", closeModal);
            cancelBtn.addEventListener("click", closeModal);
            backdrop.addEventListener("click", (e) => {
                if (e.target === backdrop) closeModal();
            });

            // Pre-fill dates
            const todayStr = new Date().toISOString().split('T')[0];
            modal.querySelector("#start-date").value = todayStr;
            modal.querySelector("#end-date").value = todayStr;

            // Submit logic
            const form = modal.querySelector("#datepicker-form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const startVal = modal.querySelector("#start-date").value;
                const endVal = modal.querySelector("#end-date").value;
                if (startVal && endVal) {
                    onApply(startVal, endVal);
                    closeModal();
                }
            });
        }

        // Setup Date Filter Boxes (Header Date Filters)
        dateBoxes.forEach(box => {
            const labelSpan = box.querySelector("span");
            let selectedValue = "This Week";

            // Populate current text with dynamic "This Week" date range
            if (labelSpan) {
                labelSpan.textContent = getFormattedDateRange("This Week");
            }

            const dropdown = document.createElement("div");
            dropdown.className = "selector-dropdown-menu";
            dropdown.style.width = "240px";

            const dateOptions = ["Today", "Yesterday", "This Week", "Last 30 Days", "This Month", "Custom Range..."];

            function renderDateItems() {
                dropdown.innerHTML = "";
                dateOptions.forEach(opt => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "selector-dropdown-item";
                    if (opt === selectedValue) {
                        btn.classList.add("active");
                    }

                    const dateValStr = getFormattedDateRange(opt);

                    btn.innerHTML = `
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <span style="font-weight: 600;">${opt}</span>
                            ${dateValStr ? `<span style="font-size: 11px; color: var(--clr-muted); font-weight: normal;">${dateValStr}</span>` : ''}
                        </div>
                        ${opt === selectedValue ? '<span class="selector-dropdown-item-check" style="align-self: center;">✓</span>' : ''}
                    `;

                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        
                        if (opt === "Custom Range...") {
                            box.classList.remove("open");
                            showCustomDatePickerModal((startDate, endDate) => {
                                selectedValue = "Custom Range...";
                                const formatted = formatCustomRange(startDate, endDate);
                                if (labelSpan) labelSpan.textContent = formatted;
                                renderDateItems();
                                
                                // Update stats with some dynamic changes for custom range
                                const data = dashboardData["This Week"]; // fallback mock base
                                const customData = {
                                    ...data,
                                    sales: "Rp 12.450.000",
                                    orders: "185",
                                    avg: "Rp 67.300",
                                    cust: "32",
                                    chartPoints: "40,110 80,95 120,80 160,90 200,70 240,65 280,55 320,50 360,40 400,32",
                                    barHeights: [85, 70, 90, 80, 75, 110, 95]
                                };
                                updateDashboardStats(customData);
                                updateLineChart(customData.chartPoints);
                                updateBarChart(customData.barHeights);
                            });
                        } else {
                            selectedValue = opt;
                            if (labelSpan) labelSpan.textContent = dateValStr;
                            renderDateItems();
                            box.classList.remove("open");

                            if (dashboardData[opt]) {
                                const data = dashboardData[opt];
                                updateDashboardStats(data);
                                updateLineChart(data.chartPoints);
                                updateBarChart(data.barHeights);
                            }
                        }
                    });

                    dropdown.appendChild(btn);
                });
            }

            renderDateItems();
            box.appendChild(dropdown);

            box.addEventListener("click", (e) => {
                if (e.target.closest(".selector-dropdown-menu")) return;
                
                // Close other opened selector dropdowns
                document.querySelectorAll(".date-filter-box, .mini-selector").forEach(el => {
                    if (el !== box) el.classList.remove("open");
                });

                box.classList.toggle("open");
            });
        });

        // Setup Mini Selectors
        miniSelectors.forEach(selector => {
            const isWhite = selector.classList.contains("text-white");
            const labelSpan = selector.querySelector("span");
            const defaultVal = labelSpan ? labelSpan.textContent.trim() : "This Week";

            if (isWhite) {
                // Sales Summary selector
                const options = ["This Week", "Last Week", "This Month"];
                setupDropdown(selector, options, defaultVal, (value) => {
                    if (salesSummaryData[value]) {
                        updateSalesSummary(salesSummaryData[value]);
                    }
                });
            } else {
                // Check parent header or title to identify chart type
                const cardTitle = selector.closest(".card-title-row");
                const headingText = cardTitle && cardTitle.querySelector("h3") ? cardTitle.querySelector("h3").textContent : "";

                if (headingText.includes("Sales Overview")) {
                    const options = ["This Week", "Last Week", "This Month"];
                    setupDropdown(selector, options, defaultVal, (value) => {
                        if (salesOverviewData[value]) {
                            updateLineChart(salesOverviewData[value]);
                        }
                    });
                } else if (headingText.includes("Orders per Hour")) {
                    const options = ["Today", "Yesterday", "This Week"];
                    setupDropdown(selector, options, defaultVal, (value) => {
                        if (hourlyOrdersData[value]) {
                            updateBarChart(hourlyOrdersData[value]);
                        }
                    });
                } else {
                    // Generic selector fallbacks
                    const options = ["Today", "This Week", "This Month"];
                    setupDropdown(selector, options, defaultVal);
                }
            }
        });

        // Global click to close selector dropdowns when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".date-filter-box") && !e.target.closest(".mini-selector")) {
                document.querySelectorAll(".date-filter-box, .mini-selector").forEach(box => {
                    box.classList.remove("open");
                });
            }
        });
    }

    // Initialize selectors
    initCustomSelectors();

    // =========================================================
    // 6. NOTIFICATION PANEL
    // =========================================================
    const NOTIFICATIONS = [
        {
            id: 1, type: "new-order", icon: "🛒", iconClass: "notif-icon-orange",
            title: "New Order", desc: "Table 5 has placed a new order.",
            time: "2 minutes ago", read: false, link: "orders.html"
        },
        {
            id: 2, type: "payment-success", icon: "💳", iconClass: "notif-icon-green",
            title: "Payment Confirmed", desc: "QRIS payment from Table 3 has been verified.",
            time: "5 minutes ago", read: false, link: "orders.html"
        },
        {
            id: 3, type: "order-ready", icon: "👨‍🍳", iconClass: "notif-icon-purple",
            title: "Order Ready", desc: "Kitchen has finished Order #128.",
            time: "10 minutes ago", read: false, link: "orders.html"
        },
        {
            id: 4, type: "customer-calling", icon: "🔔", iconClass: "notif-icon-blue",
            title: "Customer Calling", desc: "Table 8 is requesting assistance.",
            time: "15 minutes ago", read: false, link: "tables.html"
        },
        {
            id: 5, type: "delayed-order", icon: "⚠️", iconClass: "notif-icon-red",
            title: "Delayed Order", desc: "Order #115 has exceeded preparation time.",
            time: "18 minutes ago", read: false, link: "orders.html"
        },
        {
            id: 6, type: "daily-report", icon: "📊", iconClass: "notif-icon-teal",
            title: "Daily Report Ready", desc: "Today's analytics report has been generated.",
            time: "1 hour ago", read: false, link: "analytics.html"
        },
        {
            id: 7, type: "payment-failed", icon: "❌", iconClass: "notif-icon-red",
            title: "Payment Failed", desc: "Manual payment from Table 6 could not be processed.",
            time: "1 hour ago", read: true, link: "orders.html"
        },
        {
            id: 8, type: "table-reserved", icon: "🪑", iconClass: "notif-icon-yellow",
            title: "Table Reserved", desc: "A reservation for Table 10 at 7:00 PM has been made.",
            time: "2 hours ago", read: true, link: "tables.html"
        },
        {
            id: 9, type: "system-update", icon: "🔄", iconClass: "notif-icon-purple",
            title: "System Update", desc: "Qrinty has been updated to v2.4.1 with new features.",
            time: "3 hours ago", read: true, link: "#"
        }
    ];

    let notifications = [...NOTIFICATIONS];

    function getUnreadCount() {
        return notifications.filter(n => !n.read).length;
    }

    function updateBadge() {
        const badge = document.getElementById("notifBadge");
        const countEl = document.getElementById("notifUnreadCount");
        const count = getUnreadCount();
        if (!badge) return;

        if (count === 0) {
            badge.classList.add("hidden");
        } else {
            badge.classList.remove("hidden");
            badge.textContent = count > 9 ? "9+" : count;
        }

        if (countEl) {
            countEl.textContent = count > 0 ? `${count} unread` : "All read";
        }
    }

    function renderNotifications() {
        const listEl = document.getElementById("notifList");
        if (!listEl) return;

        listEl.innerHTML = "";

        const unread = notifications.filter(n => !n.read);
        const read   = notifications.filter(n => n.read);

        // "Recent" section
        if (unread.length > 0) {
            const recentLabel = document.createElement("div");
            recentLabel.className = "notif-section-label";
            recentLabel.textContent = "Recent";
            listEl.appendChild(recentLabel);

            unread.forEach(n => listEl.appendChild(buildNotifItem(n)));
        }

        // "Earlier" section
        if (read.length > 0) {
            const earlierLabel = document.createElement("div");
            earlierLabel.className = "notif-section-label";
            earlierLabel.textContent = "Earlier";
            listEl.appendChild(earlierLabel);

            read.forEach(n => listEl.appendChild(buildNotifItem(n)));
        }

        updateBadge();
    }

    function buildNotifItem(notif) {
        const item = document.createElement("div");
        item.className = `notif-item${notif.read ? "" : " unread"}`;
        item.dataset.id = notif.id;

        item.innerHTML = `
            <div class="notif-icon-wrap ${notif.iconClass}">${notif.icon}</div>
            <div class="notif-content">
                <div class="notif-title">${notif.title}</div>
                <div class="notif-desc">${notif.desc}</div>
                <div class="notif-time">${notif.time}</div>
            </div>
        `;

        // Click: mark as read + navigate
        item.addEventListener("click", (e) => {
            // Ripple
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            const rect = item.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top  = (e.clientY - rect.top)  + "px";
            item.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            // Mark as read
            const target = notifications.find(n => n.id === notif.id);
            if (target) target.read = true;
            renderNotifications();

            // Navigate
            setTimeout(() => {
                const panel = document.getElementById("notifPanel");
                if (panel) panel.classList.remove("open");
                if (notif.link && notif.link !== "#") {
                    window.location.href = notif.link;
                }
            }, 250);
        });

        return item;
    }

    // Bell toggle
    const bellBtn    = document.getElementById("notificationBellBtn");
    const notifPanel = document.getElementById("notifPanel");
    const markAllBtn = document.getElementById("markAllReadBtn");

    if (bellBtn && notifPanel) {
        bellBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notifPanel.classList.toggle("open");

            // Close store dropdown if open
            const storeDropdownEl = document.querySelector(".store-dropdown");
            if (storeDropdownEl) storeDropdownEl.classList.remove("open");
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!e.target.closest("#notificationBellWrapper")) {
                notifPanel.classList.remove("open");
            }
        });
    }

    // Mark all read
    if (markAllBtn) {
        markAllBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notifications.forEach(n => n.read = true);
            renderNotifications();
        });
    }

    // Sidebar toggle support for desktop and mobile
    const toggleSidebar = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const mainWrapper = document.querySelector(".db-main-wrapper");

    if (toggleSidebar && sidebar && mainWrapper) {
        toggleSidebar.addEventListener("click", () => {
            if (window.innerWidth >= 992) {
                const isClosed = sidebar.classList.toggle("closed");
                sidebar.classList.remove("mobile-open");
                mainWrapper.classList.toggle("sidebar-closed", isClosed);
            } else {
                sidebar.classList.toggle("mobile-open");
                sidebar.classList.remove("closed");
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth < 992) {
                sidebar.classList.remove("closed");
                mainWrapper.classList.remove("sidebar-closed");
            }
        });
    }

    // Initial render
    renderNotifications();

    // 4. Initial Render
    syncHeader();
    renderMenu();
});

