// Admin Dashboard JavaScript for ADUSTECH MSSN Registration System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    loadDashboardData();
    loadRegistrations();
    loadPayments();
    loadTimetables();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize charts
    initializeCharts();
});

// Load dashboard statistics
function loadDashboardData() {
    // Simulate API call to get dashboard data
    const dashboardData = {
        totalRegistrations: 156,
        completedPayments: 142,
        pendingPayments: 14,
        totalRevenue: 28400,
        classStats: {
            'Qur\'anic Class': 45,
            'Hadith Class': 32,
            'Ta\'alimat Class': 28,
            'Arabic Class': 25,
            'Comparative Religion Class': 26
        },
        recentActivity: [
            { action: 'New registration', student: 'Ahmad Yusuf', class: 'Qur\'anic Class', time: '2 minutes ago' },
            { action: 'Payment completed', student: 'Fatima Hassan', class: 'Hadith Class', time: '5 minutes ago' },
            { action: 'New registration', student: 'Ibrahim Ali', class: 'Arabic Class', time: '10 minutes ago' },
            { action: 'Payment completed', student: 'Aisha Bello', class: 'Ta\'alimat Class', time: '15 minutes ago' }
        ]
    };
    
    // Update statistics
    document.getElementById('totalRegistrations').textContent = dashboardData.totalRegistrations;
    document.getElementById('completedPayments').textContent = dashboardData.completedPayments;
    document.getElementById('pendingPayments').textContent = dashboardData.pendingPayments;
    document.getElementById('totalRevenue').textContent = '₦' + dashboardData.totalRevenue.toLocaleString();
    
    // Update recent activity
    const activityContainer = document.getElementById('recentActivity');
    activityContainer.innerHTML = '';
    
    dashboardData.recentActivity.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'd-flex justify-content-between align-items-center mb-2';
        activityItem.innerHTML = `
            <div>
                <strong>${activity.action}</strong><br>
                <small class="text-muted">${activity.student} - ${activity.class}</small>
            </div>
            <small class="text-muted">${activity.time}</small>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// Load registrations
function loadRegistrations() {
    // Simulate API call to get registrations
    const registrations = [
        { id: 1, name: 'Ahmad Yusuf', regNumber: '2021/CS/001', class: 'Qur\'anic Class', department: 'Computer Science', paymentStatus: 'completed', date: '2024-01-15' },
        { id: 2, name: 'Fatima Hassan', regNumber: '2021/EE/002', class: 'Hadith Class', department: 'Electrical Engineering', paymentStatus: 'completed', date: '2024-01-14' },
        { id: 3, name: 'Ibrahim Ali', regNumber: '2021/ME/003', class: 'Arabic Class', department: 'Mechanical Engineering', paymentStatus: 'pending', date: '2024-01-13' },
        { id: 4, name: 'Aisha Bello', regNumber: '2021/CE/004', class: 'Ta\'alimat Class', department: 'Civil Engineering', paymentStatus: 'completed', date: '2024-01-12' },
        { id: 5, name: 'Yusuf Ahmed', regNumber: '2021/CH/005', class: 'Comparative Religion Class', department: 'Chemical Engineering', paymentStatus: 'pending', date: '2024-01-11' }
    ];
    
    displayRegistrations(registrations);
}

// Display registrations in table
function displayRegistrations(registrations) {
    const tableBody = document.getElementById('registrationsTable');
    tableBody.innerHTML = '';
    
    registrations.forEach(reg => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reg.id}</td>
            <td>${reg.name}</td>
            <td>${reg.regNumber}</td>
            <td>${reg.class}</td>
            <td>${reg.department}</td>
            <td>
                <span class="badge bg-${getPaymentStatusColor(reg.paymentStatus)}">
                    ${reg.paymentStatus}
                </span>
            </td>
            <td>${formatDate(reg.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="viewRegistration(${reg.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success btn-action" onclick="editRegistration(${reg.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteRegistration(${reg.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Load payments
function loadPayments() {
    // Simulate API call to get payments
    const payments = [
        { id: 1, transactionId: 'TXN001', studentName: 'Ahmad Yusuf', amount: 200, method: 'Card', status: 'completed', date: '2024-01-15' },
        { id: 2, transactionId: 'TXN002', studentName: 'Fatima Hassan', amount: 200, method: 'Transfer', status: 'completed', date: '2024-01-14' },
        { id: 3, transactionId: 'TXN003', studentName: 'Ibrahim Ali', amount: 200, method: 'Card', status: 'pending', date: '2024-01-13' },
        { id: 4, transactionId: 'TXN004', studentName: 'Aisha Bello', amount: 200, method: 'Transfer', status: 'completed', date: '2024-01-12' }
    ];
    
    displayPayments(payments);
}

// Display payments in table
function displayPayments(payments) {
    const tableBody = document.getElementById('paymentsTable');
    tableBody.innerHTML = '';
    
    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.transactionId}</td>
            <td>${payment.studentName}</td>
            <td>₦${payment.amount}</td>
            <td>${payment.method}</td>
            <td>
                <span class="badge bg-${getPaymentStatusColor(payment.status)}">
                    ${payment.status}
                </span>
            </td>
            <td>${formatDate(payment.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="viewPayment(${payment.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success btn-action" onclick="approvePayment(${payment.id})">
                    <i class="fas fa-check"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Load timetables
function loadTimetables() {
    const timetables = {
        'Qur\'anic Class': [
            { day: 'Monday', time: '4:00 PM - 6:00 PM', venue: 'MSSN Hall', instructor: 'Ustaz Ahmad' },
            { day: 'Wednesday', time: '4:00 PM - 6:00 PM', venue: 'MSSN Hall', instructor: 'Ustaz Ahmad' },
            { day: 'Friday', time: '3:00 PM - 5:00 PM', venue: 'MSSN Hall', instructor: 'Ustaz Ahmad' }
        ],
        'Hadith Class': [
            { day: 'Tuesday', time: '4:00 PM - 6:00 PM', venue: 'Lecture Room 1', instructor: 'Ustaz Ibrahim' },
            { day: 'Thursday', time: '4:00 PM - 6:00 PM', venue: 'Lecture Room 1', instructor: 'Ustaz Ibrahim' }
        ],
        'Ta\'alimat Class': [
            { day: 'Monday', time: '6:00 PM - 8:00 PM', venue: 'Lecture Room 2', instructor: 'Ustaz Yusuf' },
            { day: 'Wednesday', time: '6:00 PM - 8:00 PM', venue: 'Lecture Room 2', instructor: 'Ustaz Yusuf' }
        ],
        'Arabic Class': [
            { day: 'Tuesday', time: '6:00 PM - 8:00 PM', venue: 'Lecture Room 3', instructor: 'Ustaz Ali' },
            { day: 'Thursday', time: '6:00 PM - 8:00 PM', venue: 'Lecture Room 3', instructor: 'Ustaz Ali' }
        ],
        'Comparative Religion Class': [
            { day: 'Friday', time: '4:00 PM - 6:00 PM', venue: 'Lecture Room 4', instructor: 'Ustaz Hassan' }
        ]
    };
    
    displayTimetables(timetables);
}

// Display timetables
function displayTimetables(timetables) {
    const container = document.getElementById('timetablesContent');
    container.innerHTML = '';
    
    Object.keys(timetables).forEach(className => {
        const classDiv = document.createElement('div');
        classDiv.className = 'mb-4';
        classDiv.innerHTML = `
            <h5 class="text-primary">${className}</h5>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead class="table-light">
                        <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Venue</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${timetables[className].map(schedule => `
                            <tr>
                                <td>${schedule.day}</td>
                                <td>${schedule.time}</td>
                                <td>${schedule.venue}</td>
                                <td>${schedule.instructor}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary" onclick="editSchedule('${className}', '${schedule.day}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.appendChild(classDiv);
    });
}

// Initialize charts
function initializeCharts() {
    // Class distribution chart
    const classCtx = document.getElementById('classChart').getContext('2d');
    new Chart(classCtx, {
        type: 'doughnut',
        data: {
            labels: ['Qur\'anic Class', 'Hadith Class', 'Ta\'alimat Class', 'Arabic Class', 'Comparative Religion Class'],
            datasets: [{
                data: [45, 32, 28, 25, 26],
                backgroundColor: [
                    '#1e3a8a',
                    '#059669',
                    '#0891b2',
                    '#f59e0b',
                    '#dc2626'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Trend chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
            datasets: [{
                label: 'Registrations',
                data: [12, 19, 15, 25, 22, 30, 28],
                borderColor: '#1e3a8a',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Revenue chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Qur\'anic', 'Hadith', 'Ta\'alimat', 'Arabic', 'Comparative'],
            datasets: [{
                label: 'Revenue (₦)',
                data: [9000, 6400, 5600, 5000, 5200],
                backgroundColor: [
                    '#1e3a8a',
                    '#059669',
                    '#0891b2',
                    '#f59e0b',
                    '#dc2626'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter registrations
    document.getElementById('classFilter').addEventListener('change', filterRegistrations);
    document.getElementById('paymentFilter').addEventListener('change', filterRegistrations);
    document.getElementById('searchInput').addEventListener('input', filterRegistrations);
}

// Filter registrations
function filterRegistrations() {
    // Implementation for filtering registrations
    console.log('Filtering registrations...');
}

// Utility functions
function getPaymentStatusColor(status) {
    switch(status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'failed': return 'danger';
        default: return 'secondary';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Action functions
function viewRegistration(id) {
    alert(`Viewing registration ${id}`);
}

function editRegistration(id) {
    alert(`Editing registration ${id}`);
}

function deleteRegistration(id) {
    if(confirm('Are you sure you want to delete this registration?')) {
        alert(`Deleting registration ${id}`);
    }
}

function viewPayment(id) {
    alert(`Viewing payment ${id}`);
}

function approvePayment(id) {
    alert(`Approving payment ${id}`);
}

function editSchedule(className, day) {
    alert(`Editing schedule for ${className} on ${day}`);
}

function exportRegistrations() {
    alert('Exporting registrations...');
}

function logout() {
    if(confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}

// Refresh data periodically
setInterval(() => {
    loadDashboardData();
}, 30000); // Refresh every 30 seconds 