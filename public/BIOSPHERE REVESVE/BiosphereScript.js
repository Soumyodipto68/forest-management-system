// Example: Add a new biosphere
async function addBiosphere(biosphere) {
  const token = localStorage.getItem("token"); // JWT from login
  const res = await fetch("/api/biosphere", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // secure route
    },
    body: JSON.stringify(biosphere)
  });
  return res.json();
}

// Example: Get all biospheres
async function loadBiospheres() {
  const res = await fetch("/api/biosphere"); // public route
  const data = await res.json();
  console.log(data);
}
