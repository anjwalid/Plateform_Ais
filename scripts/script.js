// password visibility toggle

let passwordVisible = false;

function toggleLoginPasswordVisibility() {
  passwordVisible = !passwordVisible;
  const newPassword = document.getElementById("password");
  const type = passwordVisible ? "text" : "password";
  newPassword.setAttribute("type", type);
  // Update eye icon
  const eyeIcon = document.querySelector(".toggle-password svg");
  if (passwordVisible) {
    eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <circle cx="12" cy="12" r="3"></circle>
      `;
  } else {
    eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
      `;
  }
}

function togglePasswordVisibility() {
  passwordVisible = !passwordVisible;
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const type = passwordVisible ? "text" : "password";
  newPassword.setAttribute("type", type);
  console.log("Toggle Password Function Called");
  confirmPassword.setAttribute("type", type);

  // Update eye icon
  const eyeIcon = document.querySelector(".toggle-password svg");
  if (passwordVisible) {
    eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <circle cx="12" cy="12" r="3"></circle>
      `;
  } else {
    eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
      `;
  }
}
// OTP Logic
document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp-input");
  const resendLink = document.getElementById("resendCode");
  const timerSpan = document.getElementById("timer");
  let countdown;

  const otpForm = document.getElementById("otpForm");
  if (otpForm) {
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        const value = e.target.value;
        if (value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        } else if (value.length === 0 && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && index > 0 && input.value === "") {
          otpInputs[index - 1].focus();
        }
      });

      // regex only numbers
      input.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      });
    });

    otpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const otpCode = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");
      if (otpCode.length === 6 && /^\d+$/.test(otpCode)) {
        // send OTP to server
        console.log(
          "OTP verification would be implemented here. Code: ",
          otpCode
        );
      } else {
        alert("Please enter a valid 6-digit code.");
      }
    });
  }

  if (resendLink) {
    function startTimer(duration) {
      let timer = duration;
      resendLink.style.pointerEvents = "none";
      resendLink.style.opacity = "0.5";

      countdown = setInterval(() => {
        timerSpan.textContent = `(${timer}s)`;
        if (--timer < 0) {
          clearInterval(countdown);
          timerSpan.textContent = "";
          resendLink.style.pointerEvents = "auto";
          resendLink.style.opacity = "1";
        }
      }, 1000);
    }

    function resendOTP() {
      clearInterval(countdown);

      // logic to resend the OTP
      setTimeout(() => {
        alert("A new code has been sent to your email.");
        startTimer(60);
      }, 1000);
    }

    resendLink.addEventListener("click", function (e) {
      e.preventDefault();
      resendOTP();
    });
  }

  // password Validation
  function validatePassword() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const submitButton = document.querySelector('button[type="submit"]');

    const requirements = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      match: newPassword === confirmPassword && newPassword !== "",
    };

    for (const [key, valid] of Object.entries(requirements)) {
      const li = document.getElementById(key);
      if (valid) {
        li.classList.add("valid");
      } else {
        li.classList.remove("valid");
      }
    }

    const allValid = Object.values(requirements).every(Boolean);
    submitButton.disabled = !allValid;
  }

  document
    .getElementById("newPassword")
    .addEventListener("input", validatePassword);
  document
    .getElementById("confirmPassword")
    .addEventListener("input", validatePassword);

  document
    .getElementById("newPasswordForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      alert("Password successfully changed!");
      // redirection
      window.location.href = "login.html";
    });
});
