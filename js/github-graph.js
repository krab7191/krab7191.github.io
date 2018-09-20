//jshint esversion: 6
// When this script loads, scrape GitHub profile for contrib graph

// Author: Karsten Rabe

function getContribGraph() {
    //Use proxy to avoid CORS issues
    var proxy = 'https://urlreq.appspot.com/req?method=GET&url=';
    var url = proxy + 'https://github.com/krab7191';
    $.get({
        url: url
    }).then(function (data) {
        appendContribs(data);
    });
}
function appendContribs(data) {
    var graph = data.substring(data.indexOf("graph-before-activity-overview") - 41, data.length);
    graph = graph.substring(graph.indexOf(">") + 6, graph.indexOf("</svg>") + 6) + "</div>";
    $("#github-graph").html("<a href='https://github.com/krab7191'>My GitHub contributions</a>" + graph);
    $("#github-graph > div").addClass("col-md-12").addClass("col-lg-12").addClass("mx-auto");
}

// When document ready, put graph in 'github-graph' container

$(document).ready(function () {
    getContribGraph();
    $("#expand-code").on("click", function () {
        var but = $("#expand-code").html();
        if (but === "Expand") {
            $("#expand-code").html("Collapse");
            $("#github-scraper-code").animate({
                height: "toggle"
            }, 500);
        }
        else {
            $("#expand-code").html("Expand");
            $("#github-scraper-code").animate({
                height: "toggle"
            }, 500);
        }
    });
});

