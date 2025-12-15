console.log("JS Connected!");

// Wrap everything inside an async function
async function initDeploy() {
  // ---------------------
  // Supabase Config Fetch
  // ---------------------
  const BACKEND = "https://as-hosting-application-backend.vercel.app/config"; // Vercel backend
  let supabaseUrl = "";
  let supabaseKey = "";

  try {
    const response = await fetch(BACKEND);
    const config = await response.json();
    supabaseUrl = config.supabaseUrl;
    supabaseKey = config.supabaseAnonKey;
  } catch (err) {
    console.error("Error fetching backend config:", err);
  }

  // Initialize Supabase client
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ---------------------
  // DOM Elements
  // ---------------------
  const methodOptions = document.querySelectorAll(".method-option");
  const uploadSections = document.querySelectorAll(".upload-section");
  const envOptions = document.querySelectorAll(".env-option");
  const customBuildSection = document.querySelector(".custom-build-section");
  const fileInput = document.getElementById("fileInput");
  const browseButton = document.getElementById("browseButton");
  const fileList = document.getElementById("fileList");

  const deployForm = document.getElementById("deployForm");
  const previewProjectName = document.getElementById("previewProjectName");
  const previewProjectDesc = document.getElementById("previewProjectDesc");
  const previewMethod = document.getElementById("previewMethod");
  const previewEnv = document.getElementById("previewEnv");

  // ---------------------
  // Deployment Method Toggle
  // ---------------------
  methodOptions.forEach(option => {
    option.addEventListener("click", () => {
      methodOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      const method = option.dataset.method;
      uploadSections.forEach(sec => sec.classList.remove("active"));
      if(method === "local") document.getElementById("localUpload").classList.add("active");
      if(method === "github") document.getElementById("githubImport").classList.add("active");

      previewMethod.textContent = option.querySelector("h4").textContent;
    });
  });

  // ---------------------
  // Environment Toggle
  // ---------------------
  envOptions.forEach(env => {
    env.addEventListener("click", () => {
      envOptions.forEach(e => e.classList.remove("active"));
      env.classList.add("active");
      if(env.dataset.env === "custom") {
        customBuildSection.style.display = "block";
      } else {
        customBuildSection.style.display = "none";
      }
      previewEnv.textContent = env.querySelector("h4").textContent;
    });
  });

  // ---------------------
  // File Upload Preview
  // ---------------------
  browseButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    fileList.innerHTML = "";
    Array.from(fileInput.files).forEach(file => {
      const li = document.createElement("div");
      li.classList.add("file-item");
      li.textContent = `${file.name} (${(file.size/1024/1024).toFixed(2)} MB)`;
      fileList.appendChild(li);
    });
    document.getElementById("previewStorage").textContent =
      (Array.from(fileInput.files).reduce((a,b)=>a+b.size,0)/1024/1024).toFixed(2) + " MB";
  });

  // ---------------------
  // GitHub Connect Validation
  // ---------------------
  const githubConnectBtn = document.querySelector(".github-connect-btn");
  githubConnectBtn.addEventListener("click", () => {
    const repoUrl = document.getElementById("githubRepo").value.trim();
    const branch = document.getElementById("githubBranch").value.trim() || "main";
    if(!repoUrl) return alert("Please enter a GitHub repository URL");

    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/;
    if(!githubRegex.test(repoUrl)) return alert("Invalid GitHub URL");

    document.querySelector(".repo-info h4").textContent = repoUrl.split("/").pop();
    document.querySelector(".repo-info p").textContent = `Branch: ${branch}`;
  });

  // ---------------------
  // Preview Project Name / Description Update
  // ---------------------
  const projectNameInput = document.getElementById("projectName");
  const projectDescInput = document.getElementById("projectDescription");

  projectNameInput.addEventListener("input", () => {
    previewProjectName.textContent = projectNameInput.value || "my-awesome-project";
    document.getElementById("previewUrl").textContent =
      `https://${projectNameInput.value || "my-awesome-project"}.ashosting.app`;
  });

  projectDescInput.addEventListener("input", () => {
    previewProjectDesc.textContent = projectDescInput.value || "No description provided";
  });

  // ---------------------
  // Form Submit (Real Deployment)
  // ---------------------
  deployForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value.trim();
    if(!projectName) return alert("Project name required!");

    const deployModal = document.getElementById("deployModal");
    deployModal.style.display = "flex";

    const progressBar = document.getElementById("progressBar").querySelector(".progress-fill");
    const progressText = document.getElementById("progressText");

    // ---------------------
    // Convert files to base64
    // ---------------------
    const filesData = await Promise.all(Array.from(fileInput.files).map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ name: file.name, data: reader.result.split(",")[1] });
      reader.onerror = err => reject(err);
    })));

    // ---------------------
    // Upload to Supabase
    // ---------------------
    let uploadResult;
    try {
      const response = await fetch("https://as-hosting-application-backend.vercel.app/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, files: filesData }),
      });
      uploadResult = await response.json();
      if(!uploadResult.success) throw new Error(uploadResult.error);
    } catch(err) {
      alert("Upload failed: " + err.message);
      return;
    }

    // ---------------------
    // Trigger Vercel Deployment
    // ---------------------
    let deployResult;
    try {
      const response = await fetch("https://as-hosting-application-backend.vercel.app/api/deply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, uploadedFiles: uploadResult.uploadedFiles }),
      });
      deployResult = await response.json();
      if(!deployResult.success) throw new Error(deployResult.error);
    } catch(err) {
      alert("Deployment failed: " + err.message);
      return;
    }

    // ---------------------
    // Show Final URL
    // ---------------------
    document.getElementById("previewUrl").textContent = deployResult.url;
    alert("Deployment complete! Your site is live at: " + deployResult.url);

    // ---------------------
    // Animate progress bar to 100%
    // ---------------------
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if(progress >= 100) progress = 100;
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${Math.floor(progress)}% Complete`;
      if(progress === 100) clearInterval(interval);
    }, 500);
  });
}

// Call the init function
initDeploy();
