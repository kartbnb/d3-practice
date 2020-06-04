var svg = d3.select("svg")
var projection = d3.geoMercator()
console.log(projection)
var path = d3.geoPath().projection(projection)
var g = svg.append("g")
d3.json("./countries.geo.json", function (error, country) {
    console.log(country.features)
    if(error) {
        console.log(error);
    }
    console.log(country.features);
    svg.selectAll("path").data(country.features).enter().append("path").attr("d", path)
})