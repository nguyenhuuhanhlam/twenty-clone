const people = [
  {
    name: "Minh Anh",
    title: "Giám đốc bán hàng",
    email: "minh@saobac.vn",
    company: "Sao Bắc",
    owner: "Lan Anh",
    phone: "0901 111 222",
    city: "TP.HCM",
    color: "#111827",
  },
  {
    name: "Tuấn Khoa",
    title: "Nhà sáng lập",
    email: "khoa@nova.vn",
    company: "Nova",
    owner: "Hoài Nam",
    phone: "0902 222 333",
    city: "Hà Nội",
    color: "#0f766e",
  },
  {
    name: "Thanh Mai",
    title: "Vận hành",
    email: "mai@atlas.vn",
    company: "Atlas",
    owner: "Lan Anh",
    phone: "0903 333 444",
    city: "Đà Nẵng",
    color: "#7c2d12",
  },
  {
    name: "Quang Huy",
    title: "Tài chính",
    email: "huy@ledger.vn",
    company: "Ledger",
    owner: "Minh Quân",
    phone: "0904 444 555",
    city: "Cần Thơ",
    color: "#4338ca",
  },
  {
    name: "Ngọc Linh",
    title: "Tăng trưởng",
    email: "linh@kindly.vn",
    company: "Kindly",
    owner: "Hoài Nam",
    phone: "0905 555 666",
    city: "Hải Phòng",
    color: "#be123c",
  },
  {
    name: "Đức Bảo",
    title: "Sản phẩm",
    email: "bao@signal.vn",
    company: "Signal",
    owner: "Lan Anh",
    phone: "0906 666 777",
    city: "TP.HCM",
    color: "#1d4ed8",
  },
  {
    name: "Hà Vy",
    title: "Nhân sự",
    email: "vy@terra.vn",
    company: "Terra",
    owner: "Minh Quân",
    phone: "0907 777 888",
    city: "Huế",
    color: "#a16207",
  },
  {
    name: "Nam Phong",
    title: "Kỹ thuật",
    email: "phong@stack.vn",
    company: "Stack",
    owner: "Hoài Nam",
    phone: "0908 888 999",
    city: "Nha Trang",
    color: "#166534",
  },
];

const rows = document.querySelector("#peopleRows");
const panel = document.querySelector("#detailPanel");
const closeButton = document.querySelector("#closePanel");
const splitResizer = document.querySelector("#splitResizer");
const recordsLayout = document.querySelector(".records-layout");
const sidebarToggle = document.querySelector("#sidebarToggle");

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function renderRows() {
  rows.innerHTML = "";

  people.forEach((person, index) => {
    const row = document.createElement("tr");
    row.tabIndex = 0;
    row.dataset.index = String(index);
    row.innerHTML = `
      <td class="check-col"><input type="checkbox" aria-label="Chọn ${person.name}" /></td>
      <td>
        <div class="person-cell">
          <span class="avatar" style="background:${person.color}">${initials(person.name).slice(0, 1)}</span>
          <div>
            <div class="person-name">${person.name}</div>
            <div class="subtle">${person.title}</div>
          </div>
        </div>
      </td>
      <td>${person.email}</td>
      <td>Hệ thống</td>
      <td><span class="company-badge">${person.company}</span></td>
    `;

    row.addEventListener("click", (event) => {
      if (event.target instanceof HTMLInputElement) return;
      openPanel(index);
    });

    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPanel(index);
      }
    });

    rows.appendChild(row);
  });
}

function openPanel(index) {
  const person = people[index];

  document
    .querySelectorAll("tbody tr")
    .forEach((row) => row.classList.toggle("selected", row.dataset.index === String(index)));

  document.querySelector("#panelTinyAvatar").textContent = initials(person.name).slice(0, 1);
  document.querySelector("#panelTinyAvatar").style.background = person.color;
  document.querySelector("#panelHeaderName").textContent = person.name;
  document.querySelector("#panelRole").textContent = person.title;
  document.querySelector("#panelEmail").textContent = person.email;
  document.querySelector("#panelCompany").textContent = person.company;
  document.querySelector("#panelCompanyCard").textContent = person.company;
  document.querySelector("#panelPhone").textContent = person.phone;
  document.querySelector("#panelCity").textContent = person.city;
  document.querySelector("#panelOwner").textContent = person.owner;

  document.body.classList.add("panel-open");
  panel.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closePanel() {
  document.body.classList.remove("panel-open");
  panel.setAttribute("aria-hidden", "true");
  document.querySelectorAll("tbody tr").forEach((row) => row.classList.remove("selected"));
}

closeButton.addEventListener("click", closePanel);

sidebarToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Mở rộng menu" : "Thu gọn menu");
});

function resizePanel(clientX) {
  const layoutRect = recordsLayout.getBoundingClientRect();
  const maxWidth = Math.max(320, Math.min(620, layoutRect.width - 360));
  const nextWidth = Math.min(Math.max(layoutRect.right - clientX - 4, 320), maxWidth);

  document.documentElement.style.setProperty("--detail-width", `${nextWidth}px`);
}

splitResizer.addEventListener("pointerdown", (event) => {
  if (!document.body.classList.contains("panel-open")) return;

  event.preventDefault();
  splitResizer.setPointerCapture(event.pointerId);
  document.body.classList.add("resizing-split");
  resizePanel(event.clientX);
});

splitResizer.addEventListener("pointermove", (event) => {
  if (!document.body.classList.contains("resizing-split")) return;
  resizePanel(event.clientX);
});

splitResizer.addEventListener("pointerup", (event) => {
  if (splitResizer.hasPointerCapture(event.pointerId)) {
    splitResizer.releasePointerCapture(event.pointerId);
  }

  document.body.classList.remove("resizing-split");
});

splitResizer.addEventListener("pointercancel", () => {
  document.body.classList.remove("resizing-split");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("panel-open")) {
    closePanel();
  }
});

renderRows();
