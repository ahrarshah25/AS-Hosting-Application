import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// // Mock data for projects (would normally be fetched from Supabase)
// const mockProjects = [
//     {
//         id: 1,
//         name: "E-commerce Store",
//         domain: "shop.example.com",
//         status: "active",
//         lastDeployed: "2023-10-15",
//         storage: "2.4 GB",
//         visitors: "12.5K",
//         technology: "React + Node.js"
//     },
//     {
//         id: 2,
//         name: "Portfolio Website",
//         domain: "portfolio.johndoe.com",
//         status: "active",
//         lastDeployed: "2023-10-10",
//         storage: "850 MB",
//         visitors: "3.2K",
//         technology: "HTML/CSS/JS"
//     },
//     {
//         id: 3,
//         name: "Blog Platform",
//         domain: "blog.technews.com",
//         status: "pending",
//         lastDeployed: "2023-10-05",
//         storage: "1.2 GB",
//         visitors: "8.7K",
//         technology: "WordPress"
//     },
//     {
//         id: 4,
//         name: "API Service",
//         domain: "api.myapp.com",
//         status: "active",
//         lastDeployed: "2023-10-18",
//         storage: "3.1 GB",
//         visitors: "45.2K",
//         technology: "Python + FastAPI"
//     },
//     {
//         id: 5,
//         name: "Mobile App Backend",
//         domain: "backend.mobileapp.com",
//         status: "stopped",
//         lastDeployed: "2023-09-28",
//         storage: "4.7 GB",
//         visitors: "25.8K",
//         technology: "Node.js + MongoDB"
//     },
//     {
//         id: 6,
//         name: "Landing Page",
//         domain: "getstarted.example.com",
//         status: "active",
//         lastDeployed: "2023-10-20",
//         storage: "520 MB",
//         visitors: "5.3K",
//         technology: "Vue.js"
//     },
//     {
//         id: 7,
//         name: "Admin Dashboard",
//         domain: "admin.business.com",
//         status: "pending",
//         lastDeployed: "2023-10-12",
//         storage: "1.8 GB",
//         visitors: "980",
//         technology: "React + TypeScript"
//     },
//     {
//         id: 8,
//         name: "Documentation Site",
//         domain: "docs.developer.com",
//         status: "active",
//         lastDeployed: "2023-10-17",
//         storage: "1.1 GB",
//         visitors: "7.4K",
//         technology: "Docusaurus"
//     }
// ];

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const options = { month: 'short', day: 'numeric', year: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
// }

// // Get status badge class
// function getStatusClass(status) {
//     switch(status) {
//         case 'active': return 'status-active';
//         case 'pending': return 'status-pending';
//         case 'stopped': return 'status-stopped';
//         default: return '';
//     }
// }

// // Create project card HTML
// function createProjectCard(project) {
//     return `
//         <div class="project-card" data-status="${project.status}">
//             <div class="project-header">
//                 <div>
//                     <h3 class="project-title">${project.name}</h3>
//                     <p class="project-domain">
//                         <i class="fas fa-globe"></i>
//                         ${project.domain}
//                     </p>
//                 </div>
//                 <div class="project-status ${getStatusClass(project.status)}">
//                     ${project.status}
//                 </div>
//             </div>
            
//             <div class="project-meta">
//                 <div class="meta-item">
//                     <span class="meta-label">Last Deployed</span>
//                     <span class="meta-value">${formatDate(project.lastDeployed)}</span>
//                 </div>
//                 <div class="meta-item">
//                     <span class="meta-label">Storage</span>
//                     <span class="meta-value">${project.storage}</span>
//                 </div>
//                 <div class="meta-item">
//                     <span class="meta-label">Monthly Visits</span>
//                     <span class="meta-value">${project.visitors}</span>
//                 </div>
//             </div>
            
//             <div class="project-tech">
//                 <span class="tech-badge">${project.technology}</span>
//             </div>
            
//             <div class="project-actions">
//                 <button class="action-button primary">
//                     <i class="fas fa-external-link-alt"></i>
//                     Visit Site
//                 </button>
//                 <button class="action-button">
//                     <i class="fas fa-cog"></i>
//                     Settings
//                 </button>
//                 <button class="action-button">
//                     <i class="fas fa-chart-line"></i>
//                     Analytics
//                 </button>
//             </div>
//         </div>
//     `;
// }

// // Load projects into the grid
// function loadProjects(projects) {
//     const projectsGrid = document.getElementById('projectsGrid');
    
//     // Clear loading indicator
//     projectsGrid.innerHTML = '';
    
//     // Add project cards
//     projects.forEach(project => {
//         projectsGrid.innerHTML += createProjectCard(project);
//     });
    
//     // Add CSS for tech badge if not already added
//     if (!document.querySelector('#tech-badge-style')) {
//         const style = document.createElement('style');
//         style.id = 'tech-badge-style';
//         style.textContent = `
//             .project-tech {
//                 margin-bottom: 20px;
//             }
            
//             .tech-badge {
//                 display: inline-block;
//                 padding: 6px 12px;
//                 background: rgba(106, 17, 203, 0.1);
//                 color: var(--primary);
//                 border-radius: 20px;
//                 font-size: 12px;
//                 font-weight: 600;
//             }
//         `;
//         document.head.appendChild(style);
//     }
// }

// // Filter projects by status
// function filterProjects(status) {
//     if (status === 'all') {
//         loadProjects(mockProjects);
//         return;
//     }
    
//     const filteredProjects = mockProjects.filter(project => project.status === status);
//     loadProjects(filteredProjects);
// }

// // Initialize dashboard
// document.addEventListener('DOMContentLoaded', function() {
//     // Set current year in footer
//     document.getElementById('current-year').textContent = new Date().getFullYear();
    
//     // Load projects
//     setTimeout(() => {
//         loadProjects(mockProjects);
//     }, 800); // Simulate loading delay
    
//     // Setup sidebar toggle
//     const sidebarToggle = document.getElementById('sidebarToggle');
//     const sidebar = document.querySelector('.sidebar');
//     const mainContent = document.querySelector('.main-content');
    
//     sidebarToggle.addEventListener('click', function() {
//         sidebar.classList.toggle('collapsed');
//         mainContent.classList.toggle('sidebar-collapsed');
//     });
    
//     // Setup filter dropdown
//     const filterSelect = document.querySelector('.filter-select');
//     filterSelect.addEventListener('change', function() {
//         filterProjects(this.value);
//     });
    
//     // Setup view toggle
//     const viewToggle = document.querySelector('.view-toggle');
//     viewToggle.addEventListener('click', function() {
//         const projectsGrid = document.getElementById('projectsGrid');
//         const isGrid = projectsGrid.classList.toggle('list-view');
        
//         // Update icon
//         const icons = this.querySelectorAll('i');
//         icons[0].style.opacity = isGrid ? '0' : '1';
//         icons[1].style.opacity = isGrid ? '1' : '0';
        
//         // Add CSS for list view if not already added
//         if (isGrid && !document.querySelector('#list-view-style')) {
//             const style = document.createElement('style');
//             style.id = 'list-view-style';
//             style.textContent = `
//                 .projects-grid.list-view {
//                     grid-template-columns: 1fr;
//                 }
                
//                 .projects-grid.list-view .project-card {
//                     display: flex;
//                     align-items: center;
//                     padding: 20px;
//                 }
                
//                 .projects-grid.list-view .project-header {
//                     flex: 2;
//                     margin-bottom: 0;
//                 }
                
//                 .projects-grid.list-view .project-meta {
//                     flex: 3;
//                     margin-bottom: 0;
//                     display: flex;
//                     flex-direction: row;
//                     justify-content: space-between;
//                 }
                
//                 .projects-grid.list-view .project-tech {
//                     flex: 1;
//                     margin-bottom: 0;
//                     text-align: center;
//                 }
                
//                 .projects-grid.list-view .project-actions {
//                     flex: 2;
//                     border-top: none;
//                     border-left: 1px solid var(--gray-light);
//                     padding-top: 0;
//                     padding-left: 20px;
//                 }
                
//                 @media (max-width: 992px) {
//                     .projects-grid.list-view .project-card {
//                         flex-direction: column;
//                         align-items: flex-start;
//                     }
                    
//                     .projects-grid.list-view .project-meta {
//                         flex-direction: column;
//                         gap: 10px;
//                     }
                    
//                     .projects-grid.list-view .project-actions {
//                         border-left: none;
//                         border-top: 1px solid var(--gray-light);
//                         padding-left: 0;
//                         padding-top: 20px;
//                         width: 100%;
//                     }
//                 }
//             `;
//             document.head.appendChild(style);
//         }
//     });
    
//     // Setup nav item active state
//     const navItems = document.querySelectorAll('.nav-item');
//     navItems.forEach(item => {
//         item.addEventListener('click', function() {
//             navItems.forEach(nav => nav.classList.remove('active'));
//             this.classList.add('active');
//         });
//     });
    
//     // Setup add project button
//     const addProjectBtn = document.querySelector('.add-project');
//     addProjectBtn.addEventListener('click', function() {
//         alert('This would open a modal to add a new project in a real application.');
//     });
    
//     // Setup quick action cards
//     const actionCards = document.querySelectorAll('.action-card');
//     actionCards.forEach(card => {
//         card.addEventListener('click', function() {
//             const title = this.querySelector('h3').textContent;
//             alert(`This would open: ${title}`);
//         });
//     });
// });

const BACKEND = "https://as-hosting-application-backend.vercel.app/config";

const response = await fetch(BACKEND);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔐 Auth guard
const { data: { user } } = await supabase.auth.getUser();
if (!user) location.href = "login.html";

// 👤 Profile
userName.innerText =
  user.user_metadata?.full_name ||
  user.user_metadata?.name ||
  user.email;

userEmail.innerText = user.email;

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getStatusClass(status) {
    switch(status) {
        case 'active': return 'status-active';
        case 'pending': return 'status-pending';
        case 'stopped': return 'status-stopped';
        default: return '';
    }
}

function createProjectCard(project) {
    return `
        <div class="project-card" data-status="${project.status}">
            <div class="project-header">
                <div>
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-domain">
                        <i class="fas fa-globe"></i>
                        ${project.domain || `as-hosting.vercel.app/site/${project.slug || ''}`}
                    </p>
                </div>
                <div class="project-status ${getStatusClass(project.status)}">
                    ${project.status}
                </div>
            </div>
            
            <div class="project-meta">
                <div class="meta-item">
                    <span class="meta-label">Last Deployed</span>
                    <span class="meta-value">${formatDate(project.lastDeployed || project.created_at)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Storage</span>
                    <span class="meta-value">${project.storage || "N/A"}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Monthly Visits</span>
                    <span class="meta-value">${project.visitors || "N/A"}</span>
                </div>
            </div>
            
            <div class="project-tech">
                <span class="tech-badge">${project.technology || "N/A"}</span>
            </div>
            
            <div class="project-actions">
                <a class="action-button primary" target="_blank" href="${project.domain ? 'https://' + project.domain : 'https://as-hosting.vercel.app/site/' + project.slug}">
                    <i class="fas fa-external-link-alt"></i>
                    Visit Site
                </a>
                <button class="action-button">
                    <i class="fas fa-cog"></i>
                    Settings
                </button>
                <button class="action-button">
                    <i class="fas fa-chart-line"></i>
                    Analytics
                </button>
            </div>
        </div>
    `;
}

// Load projects dynamically from Supabase
async function loadProjects(statusFilter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');

    // Show loading
    projectsGrid.innerHTML = "<p>Loading projects...</p>";

    try {
        let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            projectsGrid.innerHTML = "<p>No projects deployed yet</p>";
            return;
        }

        let filteredData = data;
        if (statusFilter !== 'all') {
            filteredData = data.filter(p => p.status === statusFilter);
        }

        projectsGrid.innerHTML = '';
        filteredData.forEach(p => {
            projectsGrid.innerHTML += createProjectCard(p);
        });
    } catch (err) {
        console.error(err);
        projectsGrid.innerHTML = "<p>Error loading projects</p>";
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initial load
    loadProjects();

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    });

    // Filter dropdown
    const filterSelect = document.querySelector('.filter-select');
    filterSelect.addEventListener('change', () => {
        loadProjects(filterSelect.value);
    });

    // View toggle
    const viewToggle = document.querySelector('.view-toggle');
    viewToggle.addEventListener('click', () => {
        const projectsGrid = document.getElementById('projectsGrid');
        const isGrid = projectsGrid.classList.toggle('list-view');

        // Update icon
        const icons = viewToggle.querySelectorAll('i');
        icons[0].style.opacity = isGrid ? '0' : '1';
        icons[1].style.opacity = isGrid ? '1' : '0';

        // Add CSS for list view if needed
        if (isGrid && !document.querySelector('#list-view-style')) {
            const style = document.createElement('style');
            style.id = 'list-view-style';
            style.textContent = `
                .projects-grid.list-view { grid-template-columns: 1fr; }
                .projects-grid.list-view .project-card { display: flex; align-items: center; padding: 20px; }
                .projects-grid.list-view .project-header { flex: 2; margin-bottom: 0; }
                .projects-grid.list-view .project-meta { flex: 3; margin-bottom: 0; display: flex; flex-direction: row; justify-content: space-between; }
                .projects-grid.list-view .project-tech { flex: 1; margin-bottom: 0; text-align: center; }
                .projects-grid.list-view .project-actions { flex: 2; border-top: none; border-left: 1px solid var(--gray-light); padding-top: 0; padding-left: 20px; }
                @media (max-width: 992px) {
                    .projects-grid.list-view .project-card { flex-direction: column; align-items: flex-start; }
                    .projects-grid.list-view .project-meta { flex-direction: column; gap: 10px; }
                    .projects-grid.list-view .project-actions { border-left: none; border-top: 1px solid var(--gray-light); padding-left: 0; padding-top: 20px; width: 100%; }
                }
            `;
            document.head.appendChild(style);
        }
    });

    // Nav item active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add project button
    document.querySelector('.add-project').addEventListener('click', () => {
        alert('This would open a modal to add a new project.');
    });

    // Quick action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            alert(`This would open: ${title}`);
        });
    });
});


loadProjects();