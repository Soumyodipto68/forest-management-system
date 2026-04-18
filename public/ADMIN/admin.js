const token = localStorage.getItem("token"); // JWT from login

// Helper function for POST requests
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ---------------- BIOSPHERE ----------------
document.getElementById("biosphere-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const biosphere = {
    name: document.getElementById("bio-name").value,
    location: document.getElementById("bio-location").value,
    area: document.getElementById("bio-area").value,
    description: document.getElementById("bio-description").value
  };
  await postData("/api/biosphere", biosphere);
  loadBiospheres();
});

async function loadBiospheres() {
  const res = await fetch("/api/biosphere");
  const data = await res.json();
  const list = document.getElementById("biosphere-list");
  list.innerHTML = "";
  data.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `${b.name} - ${b.location} (${b.area} sq km)`;
    list.appendChild(li);
  });
}
loadBiospheres();

// ---------------- NEWS ----------------
document.getElementById("news-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const news = {
    title: document.getElementById("news-title").value,
    content: document.getElementById("news-content").value
  };
  await postData("/api/news", news);
  loadNews();
});

async function loadNews() {
  const res = await fetch("/api/news");
  const data = await res.json();
  const list = document.getElementById("news-list");
  list.innerHTML = "";
  data.forEach(n => {
    const li = document.createElement("li");
    li.textContent = `${n.title} - ${n.content}`;
    list.appendChild(li);
  });
}
loadNews();

// ---------------- SAFARI ----------------
document.getElementById("safari-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const safari = {
    name: document.getElementById("safari-name").value,
    location: document.getElementById("safari-location").value,
    description: document.getElementById("safari-description").value
  };
  await postData("/api/safari", safari);
  loadSafaris();
});

async function loadSafaris() {
  const res = await fetch("/api/safari");
  const data = await res.json();
  const list = document.getElementById("safari-list");
  list.innerHTML = "";
  data.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.location}`;
    list.appendChild(li);
  });
}
loadSafaris();

// ---------------- PARKS ----------------
document.getElementById("park-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const park = {
    name: document.getElementById("park-name").value,
    location: document.getElementById("park-location").value,
    description: document.getElementById("park-description").value
  };
  await postData("/api/parks", park);
  loadParks();
});

async function loadParks() {
  const res = await fetch("/api/parks");
  const data = await res.json();
  const list = document.getElementById("park-list");
  list.innerHTML = "";
  data.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - ${p.location}`;
    list.appendChild(li);
  });
}
loadParks();

// ---------------- ANIMAL CENSUS ----------------
document.getElementById("census-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const census = {
    animal: document.getElementById("census-animal").value,
    count: document.getElementById("census-count").value
  };
  await postData("/api/census", census);
  loadCensus();
});

async function loadCensus() {
  const res = await fetch("/api/census");
  const data = await res.json();
  const list = document.getElementById("census-list");
  list.innerHTML = "";
  data.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.animal} - ${c.count}`;
    list.appendChild(li);
  });
}
loadCensus();
