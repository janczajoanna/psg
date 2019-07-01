$(document).ready(function(){
   var mymap = L.map('mymap',
                    {
                     center: [54.1, 23.3], 
                     zoom: 10,
                     zoomControl:true,
                     attributionControl:false
                    }
                    );
    
    
    var lyrORTO = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer',
        {
         layers:"Raster",
         format:'image/png',
         transparent:'true',
         version:'1.1.1'
        }
    );
        
    var lyrSOZO = L.tileLayer('http://mapy.geoportal.gov.pl/wss/service/img/guest/SOZO/MapServer/WMSServer',
        {
         layers:"Raster",
         format:'image/png',
         transparent:'true',
         version:'1.1.1'
        }
    );
    
    
    var lyrPRGWOJ = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
        {
            layers:'wojewodztwa',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
        }
    );
    
    var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    mymap.addLayer(lyrOSM);
    
    var lyrDROGI = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'drogi',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrKOLEJE = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'kolej',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrRZEKI = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'rzeki',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrWODY = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'wody',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrREKREACJA = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'rekreacja',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrSZKOŁY = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'szkoly',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrOSIEDLA = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'osiedla',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrCMENTARZE = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'cmentarze',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    
    var lyrOCZYSZCZALNIE = L.tileLayer.wms('http://localhost:8080/geoserver/ATE_Workspace/wms',
            {
            layers:'oczyszczalnie',
            format:'image/png',
            transparent: 'true',
            version:'1.1.1'
            }
    );
    var BaseMaps = {
        "OpenStreetMaps":lyrOSM,
        "ORTOFOTOMAPA":lyrORTO,
        "Mapa Sozologiczna":lyrSOZO
        
    };
    
    
    
    
    //lista warstw w checkboxach
    var overlays = {
                    "Wykaz wojewodztw":lyrPRGWOJ,
                    "Drogi": lyrDROGI,
                    "Koleje": lyrKOLEJE,
                    "Rzeki": lyrRZEKI,
                    "Wody powierzchniowe": lyrWODY,
                    "Tereny rekreacyjne": lyrREKREACJA,
                    "Szkoły": lyrSZKOŁY,
                    "Osiedla mieszkaniowe": lyrOSIEDLA,
                    "Cmentarze": lyrCMENTARZE,
                    "Oczyszczalnie ścieków": lyrOCZYSZCZALNIE
                    };
    
    L.control.layers(BaseMaps, overlays).addTo(mymap);
    L.control.scale({imperial:false}).addTo(mymap);
    
});