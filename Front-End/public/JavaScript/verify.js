console.log("JS Connected --- Verify Page!");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

const otpInputs = document.querySelectorAll(".code-input");
const submitBtn = document.getElementById("submitBtn");

function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

function getEnteredOTP() {
  return Array.from(otpInputs)
    .map((input) => input.value)
    .join("");
}

otpInputs.forEach((input, idx) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].focus();
    }
  });
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const enteredOtp = getEnteredOTP();
  const userId = getUserIdFromURL();

  if (!enteredOtp || enteredOtp.length !== 6) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Valid OTP Send To Your Mail!",
      icon: "error",
    });
    return;
  }

  const { data: otpData, error: otpError } = await supabase
    .from("otp_codes")
    .select("code")
    .eq("id", userId)
    .single();

  if (otpError || !otpData) {
    Swal.fire({
      title: "Error!",
      text: otpError,
      icon: "error",
    });
    return;
  }

  if (otpData.code === enteredOtp) {
    await supabase.from("otp_codes").delete().eq("id", userId);

    Swal.fire({
      title: "Success!",
      text: "Success Verification Success!",
      icon: "success",
    });

    setTimeout(() => {
      window.location.href = "login.html";
    }, 10000);
  }
});
