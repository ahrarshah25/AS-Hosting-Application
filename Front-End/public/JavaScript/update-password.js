console.log("JS Connected!");

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if(error){
    Swal.fire({
        title: "Error!",
        text: "Error: " + error.message,
        icon: "error"
    });
    return;
  }
  console.log("Password Changed");
  
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

window.history.replaceState({}, document.title, window.location.pathname);

async function updatePassword(){
    let userNewPassword = document.getElementById("userNewPassword");

    if(!userNewPassword.value.trim()){
        Swal.fire({
            title: "Error!",
            text: "Please Enter Your Password!",
            icon: "error"
        })
        return;
    }

    const {data , error} = await supabase.auth.updateUser({
        password: userNewPassword.value.trim()
    })

    if(error){
        Swal.fire({
            title: "Error",
            text: "Error: " + error.message,
            icon: "error"
        })
        return;
    }

    Swal.fire({
        title: "Success!",
        text: "Password Changed Successfully",
        icon: "success"
    })

    setInterval(() => {
        window.location.href = "login.html"
    } , 3000)
}

const updatePasswordBtn = document.getElementById("updatePasswordBtn");
updatePasswordBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    const key = e.keyCode || e.which;
    if(key === 13){
        updatePassword();
        return;
    }
    updatePassword();
})

signOut()