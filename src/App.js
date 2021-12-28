/*     
 * copyright @2021 By   : Siyabonga Gregory
 * Developer's Website  : www.ghostcoder.weebly.com
 * Developer's Number   : 084-492-1275
 * Developer's E-mail   : huge.fuze@gmail.com
 * */

import React, { useRef,useState, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Search from "@arcgis/core/widgets/Search";
import axios from "axios";
import "./App.css";   

function App() {

  const mapDiv = useRef(null);

    const PingAddress = (address) => {
      const request = axios.get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine='+address+'&+category=&outFields=*&forStorage=false&f=pjson')
      .then((response) => {
        console.log(response);
      })
    .catch(console.log)
}

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "dark-gray-vector"
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-29.85,38],
        scale: 10000000
      });
      const searchWidget = new Search({
        view: view,
        popupEnabled:true,
        allPlaceholder: "Please type address here",
        includeDefaultSources: false,
        sources: [
          {
            name: "Siyabonga Gregory",
            placeholder: "Please type address here",
            apiKey: "Pease Enter Your API Key Here",
            singleLineFieldName: "SingleLine",
            locator: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
          }
        ]
      });

      searchWidget.on("select-result", function(event){
        PingAddress(event.result.name);
      });

      view.ui.add(searchWidget, {
        position: "top-right"
      });
      view.ui.remove("zoom"); /*To remove zoom buttons */
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} style={{padding:'0px 10px', position: 'fixed'}}></div>;
}

export default App;
