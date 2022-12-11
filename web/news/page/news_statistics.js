jQuery(document).ready(function () {
    // initiate layout and plugins
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});

var Page = function () {

    var initPageControl=function () {
        pageId = $("#page_id").val();
        if(pageId == "news_statistic"){
            initNewsStatistics();
        }
    };

    //存储柱状图信息
    var chartData = [];

    var initNewsStatistics=function () {
        $.ajaxSettings.async = false;
        initNewsStatisticsRecord();
        $.ajaxSettings.async = true;
        initBarChart();
    }

    var initNewsStatisticsRecord=function () {
        var url = "../../news_file_servlet_action";
        var data = {"action":"get_news_count_by_hour"};
        $.post(url,data,function (json) {
            var html = "";
            if (json.result_code == 0){
                console.log(JSON.stringify(json));
                var list = json.aaData;
                if(list!=undefined && list.length > 0){
                    changResultDataToChartData(list,chartData);
                    console.log(JSON.stringify(chartData));
                }
            }else {
                alert("[initNewsStatisticsRecord]与后端交互发生错误！！"+json.result_msg);
            }
        });
    }

    var changResultDataToChartData=function (list,chartData) {
        // chartData = [];
        for(var i = 0; i < list.length; i++){
            //list[i].time_interval = i;
            var json = {"year":list[i].time_interval,"income":list[i].total,"expenses":list[i].total};
            chartData.push(json);
        }
    }

    var initBarChart=function () {
        var chart = AmCharts.makeChart("chart_1", {
            "type": "serial",
            "theme": "light",
            "pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,

            "fontFamily": 'Open Sans',
            "color":    '#888',

            "dataProvider": chartData,
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "startDuration": 1,
            "graphs": [{
                "alphaField": "alpha",
                "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
                "dashLengthField": "dashLengthColumn",
                "fillAlphas": 1,
                "title": "Income",
                "type": "column",
                "valueField": "income"
            }, {
                "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
                "bullet": "round",
                "dashLengthField": "dashLengthLine",
                "lineThickness": 3,
                "bulletSize": 7,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "Expenses",
                "valueField": "expenses"
            }],
            "categoryField": "year",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "tickLength": 0
            }
        });

        $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    }


    //Page return 开始
    return {
        init: function () {
            initPageControl();
        }
    }
}();