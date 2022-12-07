jQuery(document).ready(function() {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});
var Page = function() {
    var initPageControl=function(){
    };

    return {
        init: function() {
            initPageControl();
        },
    }
}();