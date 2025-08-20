
// Example data for children's bubble chart
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('childrenBubbleChart').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Medical',
                    data: [
                        { x: 8, y: 7, r: 15 }, // e.g., x: health score, y: checkup frequency, r: severity
                        { x: 6, y: 5, r: 10 }
                    ],
                    backgroundColor: 'rgba(78,121,167,0.6)',
                    borderColor: '#4e79a7'
                },
                {
                    label: 'Academic',
                    data: [
                        { x: 9, y: 8, r: 18 }, // x: test score, y: attendance, r: improvement
                        { x: 7, y: 6, r: 12 }
                    ],
                    backgroundColor: 'rgba(242,142,43,0.6)',
                    borderColor: '#f28e2b'
                },
                {
                    label: 'Social',
                    data: [
                        { x: 5, y: 9, r: 14 }, // x: peer rating, y: activities, r: engagement
                        { x: 6, y: 7, r: 10 }
                    ],
                    backgroundColor: 'rgba(118,183,178,0.6)',
                    borderColor: '#76b7b2'
                },
                {
                    label: 'Behavior',
                    data: [
                        { x: 4, y: 6, r: 11 }, // x: incidents, y: positive notes, r: improvement
                        { x: 3, y: 5, r: 8 }
                    ],
                    backgroundColor: 'rgba(225,87,89,0.6)',
                    borderColor: '#e15759'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Children's Data Bubble Chart"
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const d = context.raw;
                            return `x: ${d.x}, y: ${d.y}, size: ${d.r}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Score/Metric'
                    },
                    min: 0,
                    max: 10
                },
                y: {
                    title: {
                        display: true,
                        text: 'Frequency/Participation'
                    },
                    min: 0,
                    max: 10
                }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Data for the ring chart
    const data = {
        labels: ["Sales", "Donations", "Purchases", "Expenses"],
        datasets: [{
            data: [3500, 1200, 900, 700],
            backgroundColor: [
                "#4e79a7", // Sales
                "#f28e2b", // Donations
                "#e15759", // Purchases
                "#76b7b2"  // Expenses
            ],
            borderWidth: 2,
            hoverOffset: 8
        }]
    };

    // Get the canvas element
    const ctx = document.getElementById('financeRingChart').getContext('2d');

    // Create the ring (doughnut) chart
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
});

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