$(document).ready(function () {
    'use strict';
    docs.init();
});

var docs = {
    init: function () {
        theme.initChart();
    },
    initChart: function () {

        $('#chartBar').each(function (i) {

            $(this).appear(function () {
                Chart.defaults.global.defaultFontColor = '#333333';
                var chartBar = $("#chartBar")[0].getContext('2d');

                var myChart = new Chart(chartBar, {
                    type: 'bar',
                    data: {
                        labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
                        datasets: [{
                            label: 'Revenue by Year',
                            data: [22, 24, 25, 26, 29, 31, 34],
                            backgroundColor: 'rgba(52, 152, 219, 1)',
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Revenue by Year'
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Revenue in billion U.S. dollars'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        animation: {
                            duration: 3000
                        }
                    }
                });
            });

        });

    },
};