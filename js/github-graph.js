//jshint esversion: 6
// When this script loads, scrape GitHub profile for contrib graph

function getContribGraph() {
    $.get({
        url: "https://github.com/krab7191"
    }).then(function (data) {
        appendContribs(data);
    });
}
function appendContribs(data) {
    var graph = data.substring(data.indexOf("graph-before-activity-overview") - 41, data.length);
    graph = graph.substring(graph.indexOf(">") + 2, graph.indexOf("</svg>") + 6);
    graph = graph + "</div>";
    $("#github-graph").html("<a href='https://github.com/krab7191'>My GitHub contributions</a>" + graph);
    $("#github-graph > div").addClass("col-md-12").addClass("col-lg-12").addClass("mx-auto");
}

// When document ready, put graph in 'github-graph' container

$(document).ready(function() {
    getContribGraph();
});