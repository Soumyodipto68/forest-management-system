async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (data.success) {
      // Show message briefly, then redirect
      document.getElementById("msg").innerText = data.message;
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500); // redirect after 1.5 seconds
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "Signup failed. Please try again.";
  }
}


async function sendOTP() {
  const email = document.getElementById("loginEmail").value;

  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    document.getElementById("msg").innerText = data.message;
  } catch (err) {
    document.getElementById("msg").innerText = "Failed to send OTP.";
  }
}

async function verifyOTP() {
  const email = document.getElementById("loginEmail").value;
  const otp = document.getElementById("loginOTP").value;

  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();

    if (data.success) {
      window.location.href = "/landing";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "OTP verification failed.";
  }
}

async function adminLogin() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  try {
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
    const data = await res.json();

    if (data.success) {
      window.location.href = "/admin-dashboard";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "Admin login failed.";
  }
}
async function passwordLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      // Store JWT if needed
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "Login failed.";
  }
}

async function startLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById("msg").innerText = "Password verified. OTP sent to email.";
      document.getElementById("loginOTP").style.display = "block";
      document.getElementById("otpBtn").style.display = "block";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("msg").innerText = "Login failed.";
  }
}

