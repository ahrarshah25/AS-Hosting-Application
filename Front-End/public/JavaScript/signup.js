console.log("JS Connected - Signup Page!");

import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/+esm";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);
emailjs.init("irJn2J3oWn-KthFuO");

async function userSignup() {
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userPassword = document.getElementById("userPassword");
  let confirmPassword = document.getElementById("confirm-password");
  let privacyCheckbox = document.getElementById("privacyCheckbox");
  // let atamp = 0;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !userName.value.trim() ||
    !userEmail.value.trim() ||
    !userPassword.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    Swal.fire({
      title: "Error!",
      text: "Please Fill All The Fields!",
      icon: "error",
    });
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    confirmPassword.value = "";
    return;
  }

  if (!regex.test(userEmail.value.trim())) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Email With Correct Syntax!\nFor Example: name@domain.com",
      icon: "error",
    });
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    confirmPassword.value = "";
    return;
  }

  if (userPassword.value.trim().length < 8) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Password Which Contain 8 Characters!",
      icon: "error",
    });
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    confirmPassword.value = "";
    return;
  }

  if (confirmPassword.value.trim() !== userPassword.value.trim()) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Same Password In Confirm Password Section!",
      icon: "error",
    });
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    confirmPassword.value = "";
    return;
  }

  if (!privacyCheckbox.checked) {
    Swal.fire({
      title: "Warning",
      text: "You Can Face Some Dificulties If You Don't Agree To Our Privacy Policies!",
      icon: "warning",
    });
    return;
  }

  const apiUri = `https://api.apilayer.com/email_verification/${userEmail.value}`;

  const option = {
    method: "Get",
    headers: {
      apiKey: "N2eYdpoV5D3TaTNDaIzxSKStMXYTl8CU",
    },
  };
  try {
    const response = await fetch(apiUri, option);
    if (!response.ok) {
      throw new Error(
        Swal.fire({
          title: "Error!",
          text: `HTTP Error! Status: ${response.status}`,
          icon: "error",
        })
      );
    }

    const data = await response.json();
    const isDeliverable = data.is_deliverable;
    const isSyntaxValid = data.syntax_valid;
    if (isDeliverable && isSyntaxValid) {
      Swal.fire({
        title: "Success!",
        text: "Email Verified Successfully!",
        icon: "success",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "API Error!",
      icon: "error",
    });
    return;
  }

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: userEmail.value.trim(),
    password: userPassword.value.trim(),
    options: {
      data: {
        username: userName.value.trim(),
      },
    },
  });
  if (signupError) {
    Swal.fire({
      title: "Error!",
      text: "Error: " + signupError,
      icon: "error",
    });
    return;
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await supabase.from("otp_codes").upsert({
    id: signupData.user.id,
    code: otp,
  });
  await emailjs.send(config.emailjsServiceId, config.emailjsTempelateId, {
    to_email: userEmail.value.trim(),
    passcode: otp,
    time: "15 minutes",
  });
  Swal.fire({
    title: "Success",
    text: "Signup Successfully!",
    icon: "success",
  });
  setInterval(function () {
    window.location.href = "verify.html?user=" + signupData.user.id;
  }, 20000);
}

const userSignupBtn = document.getElementById("userSignup");
userSignupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const key = e.keyCode || e.which;
  if (key === 13) {
    userSignup();
    return;
  }
  userSignup();
});

const togglePassword = document.getElementById("toggle-password");
togglePassword.addEventListener("click", function () {
  const userPassword = document.getElementById("userPassword");
  if (userPassword.type === "password") {
    userPassword.type = "text";
  } else {
    userPassword.type = "password";
  }
});

const toggleConfirmPassword = document.getElementById(
  "toggle-confirm-password"
);
toggleConfirmPassword.addEventListener("click", function () {
  const confirmPassword = document.getElementById("confirm-password");
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
  } else {
    confirmPassword.type = "password";
  }
});

const githubLogin = document.getElementById("githubLogin");
githubLogin.addEventListener("click", async () => {
  const { data: githubLoginData, error: githubLoginError } =
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/Front-End/public/oauth-callback.html`,
      },
    });

  if (githubLoginError) {
    Swal.fire({
      title: "Error!",
      text: githubLoginError,
      icon: "error",
    });
  }
});

const googleLogin = document.getElementById("googleLogin");
googleLogin.addEventListener("click", async () => {
  const { data: googleLoginData, error: googleLoginError } =
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Front-End/public/oauth-callback.html`,
        flowType: "pkce",
      },
    });

  if (googleLoginError) {
    Swal.fire({
      title: "Error!",
      text: googleLoginError,
      icon: "error",
    });
  }
});