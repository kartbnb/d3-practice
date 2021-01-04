var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")
var svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%")

d3.json("./data.json", function (error, data) {
    var nodes = data.nodes
    var links = data.links
    var gLine = svg.append("g")
    var gNode = svg.append("g")
    console.log(links)
    //draw line
    gLine.selectAll().data(links).enter().append("line").style("stroke", "green").style("stroke-width", function(line) {
        return line.amount / 100
    }).attr("x1", function(line) {
        var x;
        nodes.forEach(function (node) {
            if (line.node01.valueOf() == node.id.valueOf()) {
                x = node.x
            }
        })
        return x
    }).attr("y1", function(line) {
        var y;
        nodes.forEach(function (node) {                
            if (line.node01.valueOf() == node.id.valueOf()) {
            y = node.y
            }
        })
        return y
    }).attr("x2", function(line) {
        var x;
         nodes.forEach(function (node) {
            if (line.node02.valueOf() == node.id.valueOf()) {
                x = node.x
            }
        })
        return x
    }).attr("y2", function(line) {
        var y;
        nodes.forEach(function (node) {
            if (line.node02.valueOf() == node.id.valueOf()) {
                y = node.y
            }
        })
        return y
    })
    
    //draw nodes
    
    //draw circle with x and y
    gNode.selectAll().data(nodes).enter().append("circle").attr("class", "node").attr("cx", function(node) {
        return node.x
    }).attr("cy", function(node) {
        return node.y
    }).attr("r", function(node) {
         // calculate radius
        var r = 0
        links.forEach(function(link) {
            if (link.node01.valueOf() == node.id.valueOf() || link.node02.valueOf() == node.id.valueOf()) {
                r += link.amount
            }
        })
        return r / 100
    }).on("mouseover", function(node) {
        // hide all circle
        d3.selectAll("circle").attr("opacity", 0.5)
        // show this circle
        d3.select(this).attr("opacity", 1)
        // hide or show line based on id
        d3.selectAll("line").attr("opacity", function(line) {
            if (line.node01.valueOf() == node.id.valueOf() || line.node02.valueOf() == node.id.valueOf()) {
                return 1
            } else {
                return 0.5
            }
        })
        show(("id:"+ node.id), "amount:" + calculateR(node, links))
    }).on("mouseout", function() {
        // mouse out and show all
        d3.selectAll("circle").attr("opacity", 1)
        d3.selectAll("line").attr("opacity", 1)
        hide()
    })
    
});

function calculateR(node, links) {
    //calculate all amount
    var r = 0
    links.forEach(function(link) {
        if (link.node01.valueOf() == node.id.valueOf() || link.node02.valueOf() == node.id.valueOf()) {
            r += link.amount
        }
    })
    return r
}

function show(id, amount) {
    tooltip.html("<b>" + id + "</b>" + "<br>" + amount + "</br>").style("visibility", "visible")

}

function hide() {
    tooltip.style("visibility", "hidden")
}

