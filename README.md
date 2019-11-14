## Korte introductie
In deze "Read.me" wordt duidelijk wat precies mijn concept is en voor wie die bedoelt is, hoe ik te werk ben gegaan (met d3.js) en wat ik precies geleerd heb. Wil je een uitgebreide versie zien? Bekijk dan even mijn wiki. 

## De opdrachtgever 
Het museum Volkenkunde heeft ons de opdracht gegeven om een datavisualisatie te maken die "collectiebreed" is. Het hoeft juist niet specifiek te zijn, maar het moet te maken hebben met (een groot deel van) de gehele collectie van 700.000 voorwerpen (!). In begin 2020 opent het museum namelijk een kleine tentoonstelling die gaat over de missie en het DNA van het museum. Hierop zal een datavisualisatie gepresenteerd worden.

## Het concept


## Target audience (doelgroep)
De datavisualisatie is gemaakt voor bezoekers die naar de kleine tentoonstelling komen in 2020. Daarom moet de visualisatie in één oogslag een duidelijk verhaal vertellen die wat zegt over het museum.

## Wat haal ik uit mijn database?
Met behulp van Sparql heb ik data geselecteerd die relevant ik voor mijn concept. Ik focus me op twee variabelen: het wapentype en het aantal wapens per wapentype. Met behulp van de query heb ik deze data kunnen ophalen: <br>

> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> <br>
> PREFIX dc: <http://purl.org/dc/elements/1.1/> <br>
> PREFIX dct: <http://purl.org/dc/terms/> <br>
> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> <br>
> PREFIX edm: <http://www.europeana.eu/schemas/edm/> <br>
> PREFIX foaf: <http://xmlns.com/foaf/0.1/> <br>
> <br>
> /# tel de materiaalsoorten bij wapens <br>
> SELECT ?typeLabel (COUNT(?cho) AS ?choCount) WHERE { <br>
> /# selecteer soorten wapens <br> 
>  <https://hdl.handle.net/20.500.11840/termmaster12445> skos:narrower* ?type . <br>
>  ?type skos:prefLabel ?typeLabel . <br>
> <br>
> /# geef objecten van een soort wapen <br>
>  ?cho edm:object ?type . <br>
> <br>
> } <br>
> GROUP BY ?typeLabel <br>
> ORDER BY DESC(?choCount) <br>




## Aan de slag met d3.js


## Mijn leerpunten


## Bronnen
