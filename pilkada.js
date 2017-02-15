$(document).ready(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    $.get('/getall', function(data_all) {
        data_all = data_all.split('\n')
        // add the point
        var data_parsed0 = [], data_parsed1 = [], data_parsed2 = [];
        for (var i = 0; i < data_all.length - 1; i++) {
            data_all[i] = JSON.parse(data_all[i])
            data_parsed0.push([data_all[i][0], data_all[i][1]['1']['suaraTPS']])
            data_parsed1.push([data_all[i][0], data_all[i][1]['2']['suaraTPS']])
            data_parsed2.push([data_all[i][0], data_all[i][1]['3']['suaraTPS']])
        }
        data_parsed0.sort(function(a, b) { return a[0] - b[0] })
        data_parsed1.sort(function(a, b) { return a[0] - b[0] })
        data_parsed2.sort(function(a, b) { return a[0] - b[0] })
        var chart1, chart2, chart3;
        var requestData = function() {
            $.ajax({
                url: '/getdata',
                success: function(data) {
                    var data = JSON.parse(data)
                    // add the point
                    if (chart1 && chart2 && chart3 && chart1.series && chart2.series && chart3.series) {
                        chart1.series[0].addPoint([data[0], data[1]['1']['suaraTPS']], true, chart1.series[0].data.length > 50);
                        chart2.series[1].addPoint([data[0], data[1]['2']['suaraTPS']], true, chart2.series[1].data.length > 50);
                        chart3.series[2].addPoint([data[0], data[1]['3']['suaraTPS']], true, chart3.series[2].data.length > 50);
                    }
                    // call it again after one second
                    setTimeout(requestData, 2000);
                },
                cache: false
            });
        }
        requestData()

        Highcharts.chart('container1', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
                        var chart1 = this;
                    }
                }
            },
            title: {
                text: 'Live pilkada dki'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Agus Sylvi',
                data: data_parsed0
            }]
        });

        Highcharts.chart('container2', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
                        var chart2 = this;
                    }
                }
            },
            title: {
                text: 'Ahok Djarot'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'ahok djarot',
                data: data_parsed1
            }]
        });

        Highcharts.chart('container3', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
                        var chart3 = this;
                    }
                }
            },
            title: {
                text: 'Sandiaga Uno'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'sandiaga uno',
                data: data_parsed2
            }]
        });
    })
});