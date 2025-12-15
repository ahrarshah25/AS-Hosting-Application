console.log("JS Connected!");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

const {data: { user }} = await supabase.auth.getUser();

if(user){
    window.location.href = "/dashboard/dashboard.html"
}
console.log(user);

async function userLogin() {
    let userEmail = document.getElementById("userEmail");
    let userPassword = document.getElementById("userPassword");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userEmail.value.trim() || !userPassword.value.trim()) {
        Swal.fire({
            title: "Error!",
            text: "Please Fill All The Fields!",
            icon: "error"
        });
        userEmail.value = "";
        userPassword.value = "";
        return;
    }

    if (!regex.test(userEmail.value)) {
        Swal.fire({
            title: "Error!",
            text: "Please Enter Email With Correct Syntax!\nFor Example: name@domain.com",
            icon: "error"
        });
        userEmail.value = "";
        userPassword.value = "";
        return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: userPassword.value
    });

    if (loginError) {
        Swal.fire({
            title: "Error!",
            text: "Error: " + loginError.message,
            icon: "error"
        })
        userEmail.value = "";
        userPassword.value = "";
        return;
    }

    const userName = loginData.user.user_metadata.username;

    Swal.fire({
        title: "Success!",
        text: "Login Successfully!\nWelcome, " + userName,
        icon: "success"
    })
    setInterval(() => {
        window.location.href = "/Front-End/public/oauth-callback.html"
    }, 3000)
}

const userLoginBtn = document.getElementById("userLogin");
userLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const key = e.keyCode || e.which;
    if (key === 13) {
        userLogin();
        return;
    }
    userLogin();
})

const togglePassword = document.getElementById("toggle-password");
togglePassword.addEventListener("click", () => {
    let userPassword = document.getElementById("userPassword");
    if(userPassword.type === "password"){
        userPassword.type = "text"
    }else{
        userPassword.type = "password"
    };
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