console.log("JS Connected!");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function sendResetPasswordMail(){
    let userEmail = document.getElementById("userEmail");
    const {data , error} = await supabase.auth.resetPasswordForEmail(userEmail.value, {
        redirectTo: "http://127.0.0.1:5500/Front-End/public/update-password.html"
    })

    if(error){
        Swal.fire({
            title: "Error!",
            text: "Error: " + error.message,
            icon: "error"
        });
        return;
    }

    Swal.fire({
        title: "Success!",
        text: "Password reset email sent. Check your inbox.",
        icon: "success"
    })
}

const authButton = document.querySelector(".auth-button");
authButton.addEventListener("click" , (e) => {
    e.preventDefault();
    const key = e.keyCode || e.which
    if(key === 13){
        sendResetPasswordMail();
        return;
    }
    sendResetPasswordMail()
})