document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('multiBarChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Boarding',
                'Sales',
                'Donations',
                'Inventory'
            ],
            datasets: [
                {
                    label: 'Expected/ Total',
                    backgroundColor: '#4e79a7',
                    data: [12000, 8000, 3500, 500],
                    // Boarding Fees Expected, Sales Expected, Donations (N/A), Inventory Expected
                },
                {
                    label: 'Paid/ Received',
                    backgroundColor: '#f28e2b',
                    data: [9000, 6500, 2000, 350],
                    // Boarding Fees Paid, Sales Paid, Donations In-Kind, Inventory Issued
                },
                {
                    label: 'Balance/ Cash',
                    backgroundColor: '#e15759',
                    data: [3000, 1500, 1500, 150],
                    // Boarding Fees Balance, Sales Balance, Donations Cash, Inventory Balance
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Revenue and Expenditure Overview'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Revenue'
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Amount (US$)'
                    }
                }
            }
        }
    });
});

// Example data for farm sales
const farmSalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],

    datasets: [
        {
            label: 'Poultry/ Rabbits',
            data: [150, 183, 210, 185, 225, 250, 265],
            borderColor: '#4e79a7',
            backgroundColor: 'rgba(78,121,167,0.1)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Eggs/ Fish',
            data: [130, 145, 160, 153, 175, 190, 205],
            borderColor: '#f28e2b',
            backgroundColor: 'rgba(242,142,43,0.1)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Vegetables',
            data: [60, 70, 80, 75, 90, 100, 110],
            borderColor: '#76b7b2',
            backgroundColor: 'rgba(118,183,178,0.1)',
            fill: false,
            tension: 0.3
        }
    ]
};

// Chart.js config
const farmSalesConfig = {
    type: 'line',
    data: farmSalesData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Farm Sales Comparison'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales'
                },
                beginAtZero: true
            }
        }
    }
};

// Render the chart
window.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('farmSalesLineChart').getContext('2d');
    new Chart(ctx, farmSalesConfig);
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('financePieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Sales', 'Donations', 'Purchases', 'Bookings', 'Other'],
            datasets: [{
                data: [4200, 1500, 2300, 1200, 800],
                backgroundColor: [
                    '#4e79a7', // Sales
                    '#f28e2b', // Donations
                    '#e15759', // Purchases
                    '#76b7b2', // Bookings
                    '#59a14f'  // Other
                ],
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: $${value.toLocaleString()}`;
                        }
                    }
                }
            }
        }
    });
});