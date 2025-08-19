document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('multiBarChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Boarding Fees',
                'Sales',
                'Donations',
                'Inventory'
            ],
            datasets: [
                {
                    label: 'Expected',
                    backgroundColor: '#4e79a7',
                    data: [12000, 8000, 0, 500],
                    // Boarding Fees Expected, Sales Expected, Donations (N/A), Inventory Expected
                },
                {
                    label: 'Paid / Issued / In-Kind',
                    backgroundColor: '#f28e2b',
                    data: [9000, 6500, 2000, 350],
                    // Boarding Fees Paid, Sales Paid, Donations In-Kind, Inventory Issued
                },
                {
                    label: 'Balance / Cash',
                    backgroundColor: '#e15759',
                    data: [3000, 1500, 1500, 150],
                    // Boarding Fees Balance, Sales Balance, Donations Cash, Inventory Balance
                },
                {
                    label: 'Total Donations',
                    backgroundColor: '#76b7b2',
                    data: [0, 0, 3500, 0],
                    // Only for Donations (Total), others 0
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
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
                        text: 'Revenue Categories'
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Amount'
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
            label: 'Poultry',
            data: [120, 150, 170, 140, 180, 200, 210],
            borderColor: '#4e79a7',
            backgroundColor: 'rgba(78,121,167,0.1)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Eggs',
            data: [90, 100, 110, 105, 120, 130, 140],
            borderColor: '#f28e2b',
            backgroundColor: 'rgba(242,142,43,0.1)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Rabbits',
            data: [30, 35, 40, 38, 45, 50, 55],
            borderColor: '#e15759',
            backgroundColor: 'rgba(225,87,89,0.1)',
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
        },
        {
            label: 'Fish',
            data: [40, 45, 50, 48, 55, 60, 65],
            borderColor: '#59a14f',
            backgroundColor: 'rgba(89,161,79,0.1)',
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
                position: 'top'
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