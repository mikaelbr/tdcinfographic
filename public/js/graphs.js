define(['raphael', 'size'], function (Raphael, size) {
    var paper = Raphael("graph-individual", size.width, size.height),
        indi = paper.rect(0, size.height, size.width, 0);

    var papertotal = Raphael("graph-total",size.width,size.height);
        var rect = papertotal.rect(0, 0, 330, 350);
        rect.attr("fill", "#636363");
        totalGraph = papertotal.rect(0,size.height,size.width,0);


    // Color the rectangle nicely
    indi.attr({
        fill:'#dadada',
        stroke:'none'
    });

    totalGraph.attr({
        fill: "fa44451",
        stroke:'none'
    });

    return {
        currentWeight: indi,
        totalWeight: totalGraph
    };
});