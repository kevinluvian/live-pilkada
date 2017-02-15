$(document).ready(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    Highcharts.chart('container', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function() {
                    var self = this;
                    var requestData = function() {
                        $.ajax({
                            url: '/getdata',
                            success: function(data) {
                                var data = JSON.parse(data)
                                // add the point
                                var time = (new Date()).getTime()
                                self.series[0].addPoint([time, data['1']['suaraTPS']], true, self.series[0].data.length > 20);
                                self.series[1].addPoint([time, data['2']['suaraTPS']], true, self.series[1].data.length > 20);
                                self.series[2].addPoint([time, data['3']['suaraTPS']], true, self.series[2].data.length > 20);
                                
                                // call it again after one second
                                setTimeout(requestData, 5000);
                            },
                            cache: false
                        });
                    }
                    requestData()
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
            name: 'agus sylvi',
            data: []
        }, {
            name: 'ahok djarot',
            data: []
        }, {
            name: 'sandiaga uno',
            data: []
        }]
    });
});