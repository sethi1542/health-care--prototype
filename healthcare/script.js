// Global variables
let currentUser = null;
let currentRole = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animations
    addLoadingAnimations();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add real-time clock
    updateClock();
    setInterval(updateClock, 1000);
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const role = document.getElementById('userRole').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!role || !username || !password) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }
    
    // Simulate login process
    showLoading();
    
    setTimeout(() => {
        currentUser = username;
        currentRole = role;
        
        // Hide login page
        document.getElementById('loginPage').classList.remove('active');
        
        // Show appropriate dashboard
        switch(role) {
            case 'doctor':
                document.getElementById('doctorDashboard').classList.add('active');
                initializeDoctorDashboard();
                break;
            case 'nurse':
                document.getElementById('nurseDashboard').classList.add('active');
                initializeNurseDashboard();
                break;
            case 'admin':
                document.getElementById('adminDashboard').classList.add('active');
                initializeAdminDashboard();
                break;
        }
        
        hideLoading();
        showAlert(`Welcome, ${username}!`, 'success');
        
        // Add entrance animation
        addEntranceAnimation();
        
    }, 1500);
}

// Logout functionality
function logout() {
    showLoading();
    
    setTimeout(() => {
        // Hide all dashboards
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show login page
        document.getElementById('loginPage').classList.add('active');
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        // Clear user data
        currentUser = null;
        currentRole = null;
        
        hideLoading();
        showAlert('Logged out successfully', 'info');
        
    }, 1000);
}

// Section navigation
function showSection(sectionId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update navigation
        updateNavigation(sectionId);
        
        // Add animation
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.5s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Update navigation active state
function updateNavigation(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the corresponding nav link
    const navLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
}

// Dashboard initialization functions
function initializeDoctorDashboard() {
    // Simulate real-time data updates
    updateDoctorStats();
    
    // Start periodic updates
    setInterval(updateDoctorStats, 30000); // Update every 30 seconds
    
    // Add interactive elements
    addInteractiveElements();
}

function initializeNurseDashboard() {
    // Initialize medication alerts
    initializeMedicationAlerts();
    
    // Start alert checking
    setInterval(checkMedicationAlerts, 60000); // Check every minute
    
    // Add priority notifications
    addPriorityNotifications();
}

function initializeAdminDashboard() {
    // Initialize charts
    initializeCharts();
    
    // Load appointment data
    loadAppointmentData();
    
    // Start real-time updates
    setInterval(updateAdminStats, 45000); // Update every 45 seconds
}

// Update functions
function updateDoctorStats() {
    // Simulate dynamic stat updates
    const stats = [
        { id: 'todayPatients', value: Math.floor(Math.random() * 30) + 20 },
        { id: 'completed', value: Math.floor(Math.random() * 25) + 15 },
        { id: 'pending', value: Math.floor(Math.random() * 10) + 3 },
        { id: 'prescriptions', value: Math.floor(Math.random() * 15) + 8 }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(`[data-stat="${stat.id}"]`);
        if (element) {
            animateNumber(element, stat.value);
        }
    });
}

function updateAdminStats() {
    // Simulate admin dashboard updates
    const revenue = (Math.random() * 10000 + 20000).toFixed(0);
    const appointments = Math.floor(Math.random() * 50) + 150;
    
    // Update with animation
    animateValue('revenue', revenue);
    animateValue('appointments', appointments);
}

// Medication alert system
function initializeMedicationAlerts() {
    // Simulate medication schedule
    const alerts = [
        {
            time: '14:00',
            patient: 'Room 205 - John Doe',
            medication: 'Insulin injection - 10 units',
            urgent: true
        },
        {
            time: '15:30',
            patient: 'Room 312 - Sarah Wilson',
            medication: 'Antibiotics - 500mg',
            urgent: false
        }
    ];
    
    // Display alerts
    displayMedicationAlerts(alerts);
}

function checkMedicationAlerts() {
    // Simulate real-time alert checking
    const now = new Date();
    const currentTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    
    // Check for due medications
    document.querySelectorAll('.medication-alert').forEach(alert => {
        const alertTime = alert.querySelector('.med-time').textContent;
        if (alertTime === currentTime) {
            alert.classList.add('urgent');
            showNotification('Medication Due!', `${alert.querySelector('.med-details').textContent}`, 'warning');
        }
    });
}

function displayMedicationAlerts(alerts) {
    const container = document.getElementById('medicationAlerts');
    if (!container) return;
    
    const alertsHTML = alerts.map(alert => `
        <div class="medication-alert ${alert.urgent ? 'urgent' : ''}">
            <div class="med-time">${alert.time}</div>
            <div class="med-details">
                <strong>${alert.patient}</strong><br>
                ${alert.medication}
            </div>
            <div class="med-actions">
                <button class="btn btn-success btn-sm" onclick="markAdministered(this)">Administered</button>
                <button class="btn btn-warning btn-sm" onclick="delayMedication(this)">Delay</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = alertsHTML;
}

// Medication actions
function markAdministered(button) {
    const alert = button.closest('.medication-alert');
    alert.style.transition = 'all 0.5s ease';
    alert.style.opacity = '0.5';
    alert.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        alert.remove();
        showNotification('Success', 'Medication marked as administered', 'success');
    }, 500);
}

function delayMedication(button) {
    const alert = button.closest('.medication-alert');
    const timeElement = alert.querySelector('.med-time');
    const currentTime = timeElement.textContent;
    
    // Add 30 minutes
    const [hours, minutes] = currentTime.split(':');
    const newMinutes = (parseInt(minutes) + 30) % 60;
    const newHours = parseInt(hours) + Math.floor((parseInt(minutes) + 30) / 60);
    
    timeElement.textContent = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    
    showNotification('Delayed', 'Medication delayed by 30 minutes', 'info');
}

// Chart initialization
function initializeCharts() {
    // Simulate chart data (in a real app, you'd use Chart.js or similar)
    const chartContainer = document.getElementById('revenueChart');
    if (chartContainer) {
        chartContainer.innerHTML = `
            <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white;">
                <div style="text-align: center;">
                    <h4>Revenue Chart</h4>
                    <p>Interactive chart would be implemented here</p>
                </div>
            </div>
        `;
    }
}

// Appointment management
function loadAppointmentData() {
    // Simulate loading appointment data
    const appointments = [
        { time: '09:00', patient: 'John Doe', doctor: 'Dr. Smith', type: 'Checkup' },
        { time: '10:30', patient: 'Sarah Wilson', doctor: 'Dr. Johnson', type: 'Follow-up' },
        { time: '14:00', patient: 'Mike Brown', doctor: 'Dr. Davis', type: 'Consultation' }
    ];
    
    displayAppointments(appointments);
}

function displayAppointments(appointments) {
    const container = document.querySelector('.calendar-body');
    if (!container) return;
    
    const appointmentHTML = appointments.map(apt => `
        <div class="calendar-slot">
            <div class="time">${apt.time}</div>
            <div class="appointment">${apt.patient}</div>
        </div>
    `).join('');
    
    container.innerHTML = appointmentHTML;
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function showNotification(title, message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast position-fixed';
    notification.style.cssText = `
        top: 20px; 
        right: 20px; 
        z-index: 10000; 
        background: white; 
        border-radius: 12px; 
        padding: 20px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border-left: 4px solid var(--bs-${type});
        min-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-start">
            <i class="fas fa-${getIconForType(type)} me-3 mt-1"></i>
            <div class="flex-grow-1">
                <h6 class="mb-1">${title}</h6>
                <p class="mb-0 text-muted">${message}</p>
            </div>
            <button class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, 4000);
}

function getIconForType(type) {
    const icons = {
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'danger': 'times-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.className = 'position-fixed w-100 h-100 d-flex align-items-center justify-content-center';
    loader.style.cssText = 'top: 0; left: 0; background: rgba(0,0,0,0.7); z-index: 9999;';
    loader.innerHTML = `
        <div class="text-center text-white">
            <div class="loading mb-3"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.remove();
    }
}

function animateNumber(element, targetValue) {
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function animateValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (element) {
        animateNumber(element, targetValue);
    }
}

function addLoadingAnimations() {
    // Add staggered animations to elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

function addEntranceAnimation() {
    const dashboard = document.querySelector('.page.active');
    if (dashboard) {
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            dashboard.style.transition = 'all 0.8s ease';
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'scale(1)';
        }, 100);
    }
}

function addInteractiveElements() {
    // Add hover effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function addPriorityNotifications() {
    // Simulate priority notifications for nurses
    const notifications = [
        { type: 'critical', message: 'Patient in Room 205 needs immediate attention', time: '2 min ago' },
        { type: 'medication', message: 'Medication due for Room 312', time: '5 min ago' },
        { type: 'discharge', message: 'Discharge paperwork ready for Room 108', time: '10 min ago' }
    ];
    
    notifications.forEach((notif, index) => {
        setTimeout(() => {
            showNotification('Priority Alert', notif.message, notif.type === 'critical' ? 'danger' : 'warning');
        }, index * 2000);
    });
}

function initializeTooltips() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    // Update clock displays if they exist
    document.querySelectorAll('.current-time').forEach(element => {
        element.textContent = timeString;
    });
    
    document.querySelectorAll('.current-date').forEach(element => {
        element.textContent = dateString;
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-toast {
        animation: slideInRight 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initialize real-time features
function startRealTimeUpdates() {
    // Simulate real-time patient monitoring
    setInterval(() => {
        if (currentRole === 'nurse') {
            // Random chance of new alert
            if (Math.random() < 0.1) {
                const alerts = [
                    'New vital signs reading available',
                    'Patient call button pressed',
                    'Medication reminder',
                    'Doctor consultation requested'
                ];
                const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
                showNotification('Real-time Alert', randomAlert, 'info');
            }
        }
    }, 30000);
    
    // Update dashboard stats periodically
    setInterval(() => {
        if (currentRole === 'admin') {
            updateAdminStats();
        } else if (currentRole === 'doctor') {
            updateDoctorStats();
        }
    }, 45000);
}

// Start real-time updates when user logs in
document.addEventListener('DOMContentLoaded', () => {
    startRealTimeUpdates();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + L for logout
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (currentUser) {
            logout();
        }
    }
    
    // Escape to close notifications
    if (e.key === 'Escape') {
        document.querySelectorAll('.notification-toast, .alert').forEach(el => {
            el.remove();
        });
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe right to open sidebar (mobile)
    if (deltaX > 100 && Math.abs(deltaY) < 50) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && window.innerWidth <= 768) {
            sidebar.style.transform = 'translateX(0)';
        }
    }
    
    // Swipe left to close sidebar (mobile)
    if (deltaX < -100 && Math.abs(deltaY) < 50) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && window.innerWidth <= 768) {
            sidebar.style.transform = 'translateX(-100%)';
        }
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Add scroll-based animations or effects here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Add service worker for offline functionality (basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('HealthCare Pro Management System initialized successfully!');