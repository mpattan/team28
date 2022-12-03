import json

from flask import Flask, render_template, request
from flask_cors import CORS
from SPARQLWrapper import SPARQLWrapper, JSON

app = Flask(__name__)
cors = CORS(app)

@app.route('/metMuseum', methods=["GET", "POST"])
def results():
    result={}
    if request.method == "POST":
        keyword = request.form['keyword']
        tag = request.form['tag']
        sparql = SPARQLWrapper(
            "http://ec2-54-189-62-129.us-west-2.compute.amazonaws.com:3030/art/"
        )
        sparql.setReturnFormat(JSON)
        if (tag == "Artist Name") :
            sparql.setQuery(("""
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                    PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    PREFIX art: <http://www.semanticweb.org/vthalla2/ontologies/2022/10/untitled-ontology-19#>
                    
                    SELECT DISTINCT ?Title ?Name ?ArtistDisplayBio ?ArtistWikidataURL ?Department ?ObjectName ?Location 
                    ?AccessionYear ?Dimesnions ?ObjectDate
                    WHERE {
                      ?Title a art:Title.
                      ?Title art:hasArtistDisplayName ?Name. 
                      ?Title art:hasArtistDisplayName ?ArtistName.
                      ?Title art:hasArtistDisplayBio ?ArtistDisplayBio.
                      ?Title art:hasArtistWikidataURL ?ArtistWikidataURL.
                      ?Title art:hasDepartment ?Department.
                      ?Title art:hasObjectName ?ObjectName.
                      ?Title art:hasRepository ?Location.
                      ?Title art:hasAccessionYear ?AccessionYear.
                      ?Title art:hasDimesnions ?Dimesnions.
                      ?Title art:hasObjectDate ?ObjectDate.
                      FILTER(?ArtistName = "%s"^^xsd:string)
                    }
                    """%keyword)
                            )

            try:
                ret = sparql.queryAndConvert()
                result = json.dumps(ret, indent = 4)
                print (type(result))
                # return result
                # result variable has all the response data from the SPARQL Query
                for r in ret["results"]["bindings"]:
                    print(r)

            except Exception as e:
                print(e)
        if (tag == "Art Name"):
            sparql.setQuery(("""
                        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                        PREFIX owl: <http://www.w3.org/2002/07/owl#>
                        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                        PREFIX art: <http://www.semanticweb.org/vthalla2/ontologies/2022/10/untitled-ontology-19#>
                        
                        SELECT DISTINCT ?Title ?Name ?ArtistDisplayBio ?ArtistWikidataURL ?Department ?ObjectName ?Location ?AccessionYear ?Dimesnions ?ObjectDate
                        WHERE {
                          ?Title a art:Title.
                          ?Title art:hasArtistDisplayName ?Name. 
                          ?Title art:hasArtistDisplayName ?ArtistName.
                          ?Title art:hasArtistDisplayBio ?ArtistDisplayBio.
                          ?Title art:hasArtistWikidataURL ?ArtistWikidataURL.
                          ?Title art:hasDepartment ?Department.
                          ?Title art:hasObjectName ?ObjectName.
                          ?Title art:hasRepository ?Location.
                          ?Title art:hasAccessionYear ?AccessionYear.
                          ?Title art:hasDimesnions ?Dimesnions.
                          ?Title art:hasObjectDate ?ObjectDate.
                          ?Title art:forTitle ?ArtName.
                          FILTER(?ArtName = "%s"^^xsd:string)
                        }
                        """%keyword)
                            )

            try:
                ret = sparql.queryAndConvert()

                result = json.dumps(ret, indent = 4)
                print (type(result))
                # result variable has all the response data from the SPARQL Query
                for r in ret["results"]["bindings"]:
                    print(r)

            except Exception as e:
                print(e)

    return result

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5009)
