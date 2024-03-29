// de grootte van de cirkel bepalen
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
    },
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width / 2;

// arc moet gemaakt worden voor pie, genereert hoeken
const arc = d3.arc()
    .outerRadius(radius - 5)
    .innerRadius(radius - 100);

// scale ordinal maakt schaal met lege domain en range
const color = d3.scaleOrdinal(d3.schemeSet1);

// genereert de pie en bepaalt bogen + pakt numerieke waarden
const pie = d3.pie()
    .sort(null) // de waarden worden niet gesorteerd
    .value(function (d) {
        return d.aantal // pakt de value van aantal
    });

// define svg for piechart
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pie-chart")
    .append("g") // g element groepeert gelijkwaardige elementen
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // het svg element wordt in het midden gezet

// hieronder wordt de query opgehaald (met behulp van Kris)
const mijnQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# tel de materiaalsoorten bij wapens
SELECT ?typeLabel (COUNT(?cho) AS ?choCount) WHERE {
# selecteer soorten wapens
<https://hdl.handle.net/20.500.11840/termmaster12445> skos:narrower* ?type .
?type skos:prefLabel ?typeLabel .

# geef objecten van een soort wapen
?cho edm:object ?type .

}
GROUP BY ?typeLabel
ORDER BY DESC(?choCount)
LIMIT 10
`

const mijnUrl ="https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-10/sparql"

function runQuery(url, query) {
    return fetch(url + "?query=" + encodeURIComponent(query) + "&format=json")
        .then(res => res.json())
        .then(data => data.results.bindings)
        .catch(error => {
            console.log(error)
        })
}

function schoneData(data){
  return  data.map( result => {
    return {
        wapentype: result.typeLabel.value,
        aantal: Number(result.choCount.value)
    }
  })
 }

runQuery(mijnUrl, mijnQuery)
    .then(schoneData)
    .then(resultaten => {
        wapenViz(resultaten)
    })

// soortenWapens()
function wapenViz(data) {
    // parse the  data
    console.log(data)
    data.forEach(function (d) {
        d.aantal = +d.aantal; // cijfer wordt daadwerkelijk een cijfer
        d.wapentype = d.wapentype; // "name" => "name"
    });

//append g element (.arc)
const g = svg.selectAll(".arc") // alle elementen met class arc worden geselecteerd
    .data(pie(data))
    .enter()
    .append('g') // g element wordt toegevoegd
    .attr("class", "arc");

// append path to g(.arc)
    g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.wapentype)
    })

//voeg labels toe aan de slices
    g.append('text')
        .attr('transform', 'translate(0, 30)')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('font-size', '14')
        .attr("dy", ".35em") // shiften op de y-as
        .text(function (d) {
            return d.data.wapentype;
        });

// aantal objecten in het midden in g element
    g.append('text')
        .attr("class", "aantalObjecten")
        .attr('text-anchor', 'middle')
        .attr('font-size', '28')
        .attr("dy", ".35em")
        .text(function (d) {
            return d.data.aantal;
        });

 // titel
    svg.append('text')
        .attr('x', -300)
        .attr('y', -500)
        .attr('fill', 'white')
        .style("font-family", "sans-serif")
        .style("font-size", 20)
        .text("Top 10 wapentypes")
}

// functie die zorgt dat alles op 0 staat voor dat de data binnen komt zodat de animatie werkt van de pie chrt

// Ik heb een tutorial gevolgd om deze donut chart te maken (zie wiki).
// Bron: Introduction to D3.js - Pie Chart and Donut Chart: https://www.youtube.com/watch?v=kK5kKA-0PUQ
