(function () {
  const KEY = "odoo-primer-progress-v1";

  function prefix() {
    const depth = Number(document.body.dataset.depth || "0");
    return depth === 0 ? "" : "../".repeat(depth);
  }

  function nav() {
    const p = prefix();
    const page = document.body.dataset.page || "";
    const items = [
      ["index.html", "Home", "home"],
      ["how-to-learn.html", "How to learn", "learn"],
      ["setup.html", "Setup", "setup"],
      ["modules/index.html", "Modules", "modules"],
      ["exercises/index.html", "Exercises", "exercises"],
      ["progress.html", "Progress", "progress"],
      ["review.html", "Review", "review"],
      ["demand.html", "Demand", "demand"],
      ["portfolio.html", "Portfolio", "portfolio"],
    ];
    const links = items
      .map(([href, label, id]) => {
        const current = page === id ? ' aria-current="page"' : "";
        return `<a href="${p}${href}"${current}>${label}</a>`;
      })
      .join("");
    return `
      <div class="nav-inner">
        <a class="brand" href="${p}index.html">Odoo Primer <small>field workshop</small></a>
        <button class="nav-toggle" type="button" aria-expanded="false">Menu</button>
        <nav class="nav-links">${links}</nav>
      </div>`;
  }

  function footer() {
    const p = prefix();
    return `
      <div class="footer-inner">
        <div>
          <strong>Odoo Primer</strong> — Odoo 18 Community modules and Upwork-aligned exercises.<br>
          GitHub user <a href="https://github.com/Rayoque">Rayoque</a> · MIT License
        </div>
        <div>
          <a href="${p}progress.html">Progress tracker</a> ·
          <a href="${p}setup.html">Docker setup</a> ·
          <a href="${p}demand.html">Upwork demand notes</a>
        </div>
      </div>`;
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function bindChecklists() {
    const state = loadState();
    document.querySelectorAll("input[data-task]").forEach((el) => {
      const id = el.getAttribute("data-task");
      el.checked = Boolean(state[id]);
      el.addEventListener("change", () => {
        const next = loadState();
        if (el.checked) next[id] = true;
        else delete next[id];
        next.updated = new Date().toISOString();
        saveState(next);
        renderProgressWidgets();
      });
    });
  }

  function allTaskIds() {
    return Array.from(document.querySelectorAll("input[data-task]")).map((el) =>
      el.getAttribute("data-task")
    );
  }

  function knownCatalog() {
    return [
      "m1-docker", "m1-db", "m1-apps", "m1-dev", "m1-ui", "m1-backup",
      "m2-leads", "m2-pipe", "m2-quote", "m2-so", "m2-inv",
      "m3-products", "m3-wh", "m3-receipt", "m3-delivery", "m3-rules",
      "m4-coa", "m4-tax", "m4-invoice", "m4-bill", "m4-pay",
      "m5-scaffold", "m5-model", "m5-view", "m5-acl", "m5-install",
      "ex1-company", "ex1-master", "ex1-flow", "ex1-pack",
      "ex2-script", "ex2-record", "ex2-pack",
      "ex3-module", "ex3-security", "ex3-pack",
      "ex4-csv", "ex4-import", "ex4-pack",
      "rev-d0", "rev-d1", "rev-d3", "rev-d7", "rev-d14", "rev-d30",
    ];
  }


  function modulePrefix(key) {
    // m1 -> m1-, ex1 -> ex1-
    return key + "-";
  }

  function markModuleCards(state, catalog) {
    document.querySelectorAll("[data-module]").forEach((card) => {
      const key = card.getAttribute("data-module");
      if (!key) return;
      const prefix = modulePrefix(key);
      const ids = catalog.filter((id) => id.startsWith(prefix));
      const complete = ids.length > 0 && ids.every((id) => state[id]);
      card.classList.toggle("is-complete", complete);
      const badge = card.querySelector(".done-badge");
      if (badge) {
        if (complete) badge.removeAttribute("hidden");
        else badge.setAttribute("hidden", "");
      }
    });
  }

  function renderProgressWidgets() {
    const state = loadState();
    const catalog = knownCatalog();
    const done = catalog.filter((id) => state[id]).length;
    const pct = Math.round((done / catalog.length) * 100);
    document.querySelectorAll("[data-progress-label]").forEach((el) => {
      el.textContent = `${done} / ${catalog.length} tracked items (${pct}%)`;
    });
    document.querySelectorAll(".progress-bar > span").forEach((el) => {
      el.style.width = pct + "%";
    });
    const list = document.getElementById("progress-breakdown");
    if (list) {
      const groups = {
        "Module 1": catalog.filter((x) => x.startsWith("m1-")),
        "Module 2": catalog.filter((x) => x.startsWith("m2-")),
        "Module 3": catalog.filter((x) => x.startsWith("m3-")),
        "Module 4": catalog.filter((x) => x.startsWith("m4-")),
        "Module 5": catalog.filter((x) => x.startsWith("m5-")),
        Exercises: catalog.filter((x) => x.startsWith("ex")),
        Reviews: catalog.filter((x) => x.startsWith("rev-")),
      };
      list.innerHTML = Object.entries(groups)
        .map(([name, ids]) => {
          const n = ids.filter((id) => state[id]).length;
          return `<tr><td>${name}</td><td>${n} / ${ids.length}</td></tr>`;
        })
        .join("");
    }
    const next = document.getElementById("today-next");
    if (next) {
      const labels = {
        "m1-docker": "Start Docker and open http://localhost:8069",
        "m1-db": "Create the primer_learn database",
        "m1-apps": "Install CRM, Sales, Inventory, Invoicing",
        "m1-dev": "Turn on developer mode",
        "m1-ui": "Map the UI and take your first screenshot",
        "m1-backup": "Practice a database backup",
        "m2-leads": "Enable Leads and capture one raw lead",
        "m2-pipe": "Convert the lead and move the opportunity",
        "m2-quote": "Create a quotation from the opportunity",
        "m2-so": "Confirm the sales order",
        "m2-inv": "Deliver and invoice the order",
        "m3-products": "Create storable, consumable, and service products",
        "m3-wh": "Inspect warehouse and locations",
        "m3-receipt": "Receive stock on a purchase or inventory adjustment",
        "m3-delivery": "Deliver from a sales order and read the stock move",
        "m3-rules": "Add a reordering rule",
        "m4-coa": "Open the chart of accounts for your localization",
        "m4-tax": "Check a sales tax on a product",
        "m4-invoice": "Post a customer invoice",
        "m4-bill": "Post a vendor bill",
        "m4-pay": "Register a payment and reconcile the status",
        "m5-scaffold": "Confirm the lab module folder is mounted",
        "m5-model": "Read the model and inheritance files",
        "m5-view": "Install and open the Primer menu",
        "m5-acl": "Test User vs Manager delete rights",
        "m5-install": "Capture the Upwork artifact pack",
        "ex1-company": "Exercise 01: company + apps for Harborline",
        "ex1-master": "Exercise 01: import or key in master data",
        "ex1-flow": "Exercise 01: quote → receipt → delivery → invoice",
        "ex1-pack": "Exercise 01: pack the portfolio folder",
        "ex2-script": "Exercise 02: write the Loom script",
        "ex2-record": "Exercise 02: record the lead-to-cash demo",
        "ex2-pack": "Exercise 02: attach screenshots + script",
        "ex3-module": "Exercise 03: install primer_delivery_instruction",
        "ex3-security": "Exercise 03: prove ACL with two users",
        "ex3-pack": "Exercise 03: push the module folder story",
        "ex4-csv": "Exercise 04: clean the sample CSVs",
        "ex4-import": "Exercise 04: import contacts and products",
        "ex4-pack": "Exercise 04: before/after import screenshots",
        "rev-d0": "Same-day 10 minute recall",
        "rev-d1": "Day-1 review",
        "rev-d3": "Day-3 review",
        "rev-d7": "Day-7 review",
        "rev-d14": "Day-14 review",
        "rev-d30": "Day-30 review",
      };
      const upcoming = knownCatalog().find((id) => !state[id]);
      next.textContent = upcoming
        ? labels[upcoming] || upcoming
        : "All tracked items are checked. Run a spaced review or pack a new artifact.";
    }
    markModuleCards(state, catalog);
  }

  function bindHow() {
    document.querySelectorAll("[data-how]").forEach((el) => {
      if (el.querySelector(":scope > details.how, :scope > .check-body > details.how")) return;
      const text = el.getAttribute("data-how");
      if (!text) return;
      const details = document.createElement("details");
      details.className = "how";
      const summary = document.createElement("summary");
      summary.textContent = "How?";
      const body = document.createElement("div");
      body.className = "how-body";
      body.textContent = text;
      details.append(summary, body);
      const host = el.querySelector(":scope > .check-body") || el;
      host.appendChild(details);
    });
    document.querySelectorAll(".checklist li").forEach((li) => {
      if (li.querySelector("details.how")) li.classList.add("has-how");
    });
  }

  function bindQuizzes() {
    document.querySelectorAll(".quiz button").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".quiz").classList.toggle("open");
      });
    });
  }

  function bindNav() {
    const header = document.getElementById("site-header");
    if (!header) return;
    header.innerHTML = nav();
    const toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindNav();
    const foot = document.getElementById("site-footer");
    if (foot) foot.innerHTML = footer();
    bindChecklists();
    bindHow();
    bindQuizzes();
    renderProgressWidgets();
  });
})();
