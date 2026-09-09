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



  function sessionGuides() {
    return {
      m1: {
        label: "Module 1",
        title: "Setup & navigation",
        href: "modules/01-setup.html",
        heading: "Start here if you have five minutes",
        steps: [
          'Install Docker if needed, then from the repo: <code>cd setup && docker compose up -d</code>',
          'Open <a href="http://localhost:8069">http://localhost:8069</a> and create database <code>primer_learn</code> (demo data on).',
          'Work <a href="modules/01-setup.html">Module 1 — Setup &amp; navigation</a> with a timer.',
          'Tick boxes as you go. They save in this browser. Mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      m2: {
        label: "Module 2",
        title: "CRM + Sales pipeline",
        href: "modules/02-crm-sales.html",
        heading: "Continue with Module 2",
        steps: [
          'Confirm Odoo is up at <a href="http://localhost:8069">http://localhost:8069</a> (use <code>primer_learn</code>).',
          'Open CRM. Enable Leads if needed, then capture one raw lead.',
          'Work <a href="modules/02-crm-sales.html">Module 2 — CRM + Sales pipeline</a> with a timer: lead → opportunity → quotation → sales order.',
          'Tick boxes as you go. They save in this browser. Mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      m3: {
        label: "Module 3",
        title: "Inventory + products",
        href: "modules/03-inventory.html",
        heading: "Continue with Module 3",
        steps: [
          'Confirm Odoo is up at <a href="http://localhost:8069">http://localhost:8069</a>.',
          'Open Inventory / Products. Know storable vs service before you receive stock.',
          'Work <a href="modules/03-inventory.html">Module 3 — Inventory + products</a> with a timer: products, receipt, delivery, reordering rule.',
          'Tick boxes as you go. They save in this browser. Mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      m4: {
        label: "Module 4",
        title: "Accounting for implementers",
        href: "modules/04-accounting.html",
        heading: "Continue with Module 4",
        steps: [
          'Confirm Odoo is up at <a href="http://localhost:8069">http://localhost:8069</a>.',
          'Open Invoicing / Accounting. Stay on Community Invoicing for the lab.',
          'Work <a href="modules/04-accounting.html">Module 4 — Accounting for implementers</a> with a timer: chart, tax, invoice, bill, payment.',
          'Tick boxes as you go. They save in this browser. Mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      m5: {
        label: "Module 5",
        title: "Custom module starter",
        href: "modules/05-custom-module.html",
        heading: "Continue with Module 5",
        steps: [
          'Confirm Docker mounts the lab addons folder (see Module 5 setup notes).',
          'Open Apps with developer mode on so you can install the primer module.',
          'Work <a href="modules/05-custom-module.html">Module 5 — Custom module starter</a> with a timer: scaffold, model, view, ACL.',
          'Tick boxes as you go. They save in this browser. Mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      ex1: {
        label: "Exercise 01",
        title: "Harborline wholesale",
        href: "exercises/01-wholesale-erp.html",
        heading: "Start the exercises",
        steps: [
          'Modules 1–5 are checked. Move into portfolio work.',
          'Open <a href="exercises/01-wholesale-erp.html">Exercise 01 — Harborline wholesale</a>.',
          'Run the company setup, master data, and quote → receipt → delivery → invoice path.',
          'Pack the folder when done. Tick boxes; mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      ex2: {
        label: "Exercise 02",
        title: "Lead-to-cash reel",
        href: "exercises/02-lead-to-cash.html",
        heading: "Continue with Exercise 02",
        steps: [
          'Open <a href="exercises/02-lead-to-cash.html">Exercise 02 — Lead-to-cash reel</a>.',
          'Write the Loom script, then record the demo.',
          'Attach screenshots + script to the pack.',
          'Tick boxes; mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      ex3: {
        label: "Exercise 03",
        title: "Custom document",
        href: "exercises/03-custom-delivery-module.html",
        heading: "Continue with Exercise 03",
        steps: [
          'Open <a href="exercises/03-custom-delivery-module.html">Exercise 03 — Custom document</a>.',
          'Install the delivery-instruction module and prove ACL with two users.',
          'Push the module folder story for the portfolio.',
          'Tick boxes; mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      ex4: {
        label: "Exercise 04",
        title: "Contacts + products import",
        href: "exercises/04-data-import.html",
        heading: "Continue with Exercise 04",
        steps: [
          'Open <a href="exercises/04-data-import.html">Exercise 04 — Contacts + products import</a>.',
          'Clean the sample CSVs, then import contacts and products.',
          'Capture before/after import screenshots.',
          'Tick boxes; mirror them in <a href="progress.html">Progress</a>.',
        ],
      },
      done: {
        label: "Progress",
        title: "Spaced review",
        href: "progress.html",
        heading: "All modules and exercises checked",
        steps: [
          'Open <a href="progress.html">Progress</a> and run any open spaced reviews.',
          'Re-demo a weak module with a timer.',
          'Pack a fresh artifact if an Upwork bid needs one.',
          'Keep ticking reviews so the streak stays honest.',
        ],
      },
    };
  }

  function firstOpenTrack(state, catalog) {
    const order = ["m1", "m2", "m3", "m4", "m5", "ex1", "ex2", "ex3", "ex4"];
    for (const key of order) {
      const ids = catalog.filter((id) => id.startsWith(key + "-"));
      if (ids.length && !ids.every((id) => state[id])) return key;
    }
    return "done";
  }

  function renderTodaySession(state, catalog) {
    const btn = document.getElementById("today-start");
    const steps = document.getElementById("today-steps");
    const heading = document.getElementById("today-heading");
    if (!btn || !steps) return;
    const key = firstOpenTrack(state, catalog);
    const guide = sessionGuides()[key] || sessionGuides().done;
    const depth = document.body.getAttribute("data-depth") || "0";
    const prefix = depth === "1" ? "../" : depth === "2" ? "../../" : "";
    btn.href = prefix + guide.href + (key === "m1" ? "#start" : "");
    btn.textContent = key === "done" ? "Open Progress → reviews" : `Start here → ${guide.label}`;
    if (heading) heading.textContent = guide.heading;
    steps.innerHTML = guide.steps.map((s) => `<li>${s}</li>`).join("");
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
    renderTodaySession(state, catalog);
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
