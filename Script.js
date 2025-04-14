require([
  "esri/Map",
  "esri/views/MapView",  
  "esri/layers/FeatureLayer",   //https://developers.arcgis.com/javascript/latest/sample-code/intro-mapview
  "esri/widgets/Legend",
  "esri/widgets/Search"         // loading the modules required for the app
//https://developers.arcgis.com/javascript/latest/
], function (Map, MapView, FeatureLayer, Legend, Search
) {

  const map = new Map({ basemap: "streets" });
//definig the basemap as street
  const view = new MapView({
    container: "viewDiv",//view in the css id viewDiv with 100% widh and height
    map: map,
    center: [-78.32, 44.3],  // cenre at pererborough
    zoom: 13
  });
  view.when(() => {  //when the map is loaded,is what inside loads
    
    view.when(() => {
      // Disable legend for all layers except NatStreetLayer. because although its 7 layers, it will be visible as one. so all others expect one has been disabled
      [
        highMoistureLayer,
        highMoistureStreetsLayer,
        naturalCommonLayer,
        highHeatStreetView1Layer,
        highHeatCommonLayer,    
        intersectionLayer
      ].forEach(layer => layer.legendEnabled = false);
    //To hide layers completely from the legend,  the legendEnabled property of the layer to false.
// Default Value:false  //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html
      // Legend for one layer
      const legend = new Legend({    
        view: view,
        container: "legendDiv",
        layerInfos: [
          {
            layer: NatStreetLayer,
            title: "Potential Planting Area"
          }
        ]
      });//https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html when legend is enabled for a layer
    
      // HTML VISIBILITY https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
      const Button_legend = document.getElementById("LEgend");
      const Container_legend = document.getElementById("Container_legend");
    
      Button_legend.addEventListener("click", function () {
        const isHidden = Container_legend.style.display === "none";
        Container_legend.style.display = isHidden ? "block" : "none";
        Button_legend.textContent = isHidden ? "Hide Legend" : "Show Legend";
      });//https://developers.arcgis.com/javascript/3/jssamples/widget_legendvisible.html
    
      // 
      const searchWidget = new Search({
        view: view
      });
      view.ui.add(searchWidget, {
        position: "top-right" //https://developers.arcgis.com/javascript/3/jsapi/search-amd.html
      });
    
      // Show single toggle for all layers tis will ensure that the layers are made with one toggle 
      document.getElementById("commonToggl").addEventListener("change", function (event) {
        const show = event.target.checked;
        [
          NatStreetLayer,
          highMoistureLayer,
          highMoistureStreetsLayer,
          naturalCommonLayer,
          highHeatStreetView1Layer,
          highHeatCommonLayer,
          intersectionLayer
        ].forEach(layer => {
          layer.visible = show;
        });
      });
    });
    
  });//https://developers.arcgis.com/javascript/3/jssamples/
  
  
  
    
    

 
  const Natstreetoptions =  { "Small": [   "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", "Hedge Maple", "Zelkova",  "Amur Maackia", "Paperbark Maple"
    ],
    "Medium": [  "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac",   "Whitebeam", "Hedge Maple", "Zelkova",   "Amur Maackia", "Paperbark Maple"
    ],
    "Large": [
      "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", 
      "Whitebeam", "Hedge Maple", 
      "Amur Maackia", "Paperbark Maple"
    ]
  };

  const highMoisturespecies = {
    "Large": [
      "River Birch", "Swamp White Oak", "Red Maple",   "Tamarack", "Moraine Sweetgum", "Sycamore",   "Black Gum"
    ],
    "Medium": [   "Red Maple", "Tamarack", "Moraine Sweetgum",    "Sycamore", "Black Gum"
    ],"Small": [  "Tamarack", "Moraine Sweetgum", "Sycamore",   "Black Gum"
    ]};

  const HighMoistureStreetsSpecies = { "Small": [   "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", "Hedge Maple", "Zelkova",  "Amur Maackia", "Paperbark Maple"
  ],
  "Medium": [  "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac",   "Whitebeam", "Hedge Maple", "Zelkova",   "Amur Maackia", "Paperbark Maple"
  ],
  "Large": [
    "Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", 
    "Whitebeam", "Hedge Maple", 
    "Amur Maackia", "Paperbark Maple"
  ]
};

  const CommonAreaSpecies = { "Small": [  "Paperbark Maple", "Apollo Sugar Maple", "Smooth Serviceberry", "Blue Beech",  "Eastern Redbud", "Thornless Cockspur Hawthorn", "Amur Maackia",
      "Eastern Redcedar"
    ], "Medium": [  "Paperbark Maple", "Apollo Sugar Maple", "Smooth Serviceberry", "Blue Beech",  "Eastern Redbud", "Thornless Cockspur Hawthorn", "Amur Maackia",
      "Eastern Redcedar", "Northern Pin Oak"
    ], "Large": [  "Sugar Maple", "White Oak", "Basswood",  "Eastern Redcedar", "Northern Pin Oak", "Ohio Buckeye", "Bur Oak"
    ]
  };
  
   
  const HighHeatStreetView1Species = {
    "Small": ["Hedge Maple"],
    "Medium": ["Hedge Maple", "Zelkova"],
    "Large": ["Hedge Maple", "Zelkova"]
  };

  const HighHeatCommonSpecies = {"Small": [
        "Honey Locust",  "Eastern Redcedar", "Skyline Honey Locust",  "Espresso Kentucky Coffeetree","Street Keeper Honey Locust",
        "Shademaster Honey Locust"
      ],
"Medium": [
        "Kentucky Coffeetree",  "Princeton Elm",  "Ohio Buckeye",
        "Northern Pin Oak",  "English Oak"
      ],
      "Large": [
        "Bur Oak",                      
        "Red Oak",                       
        "Valley Forge Elm"
      ]
  
    
  };

  const IntersectionHeatMoistureSpecies = {
    "Large": ["River Birch", "Swamp White Oak", "Red Maple", "Tamarack", "Moraine Sweetgum", "Sycamore"]
  };
//https://developers.arcgis.com/javascript/3/jsapi/popuptemplate-amd.html#:~:text=The%20PopupTemplate%20class%20extends%20esri%2FInfoTemplate%20and%20provides%20support,that%20use%20this%20class.%20new%20PopupTemplate%20%28popupInfo%2C%20options%3F%29
 
  const NatStreetLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_streets_view1/FeatureServer",
    title: "Naturalized Streets",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {const a = feature.graphic.attributes;
 const list = (Natstreetoptions[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }
    }
  });

  const highMoistureLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Moisture_Area_view1/FeatureServer",
    title: "High Moisture Areas",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {
        const a = feature.graphic.attributes;
        const list = (highMoisturespecies[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }
    }
  });

  const highMoistureStreetsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High__Moisture_Streets_view1/FeatureServer",
    title: "High Moisture Streets",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {
   const a = feature.graphic.attributes;
        const list = (HighMoistureStreetsSpecies[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;    }
    }
  });

  const naturalCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_Area_view/FeatureServer",
    title: "Common Area Naturalization", visible: true,
    outFields: ["*"],
    popupTemplate: {  title: "Ownership: {Ownership}",
 content: function (feature) {
 const a = feature.graphic.attributes;
const list = (CommonAreaSpecies[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }
    }
  });

  const highHeatStreetView1Layer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/_High_Heat_Street_view1/FeatureServer",
    title: "High Heat Street",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {
        const a = feature.graphic.attributes;
        const list = (HighHeatStreetView1Species[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }
    }
  });

  const highHeatCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Heat_common_view1/FeatureServer",
    title: "High Heat Common Area",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {
        const a = feature.graphic.attributes;
        const list = (HighHeatCommonSpecies[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }
    }
  });

  const intersectionLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/intersection_heat_moisture_view1/FeatureServer",
    title: "Heat Moisture Intersection",
    visible: true,
    outFields: ["*"],
    popupTemplate: {
      title: "Ownership: {Ownership}",
      content: function (feature) {
        const a = feature.graphic.attributes;
        const list = (IntersectionHeatMoistureSpecies[a.Area_Category] || []).map(x => `<li>${x}</li>`).join("");
        return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
      }//https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
    }
  });//https://developers.arcgis.com/javascript/latest/sample-code/popuptemplate-function
  NatStreetLayer.renderer = {
      type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    };
    //https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html
    
    highMoistureLayer.renderer = {
      type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    };
    
    highMoistureStreetsLayer.renderer = {
      type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    };
    
    naturalCommonLayer.renderer = {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "#A9DFBF", 
        outline: {
          color: "#A9DFBF", 
        }
      }
    };
    
    highHeatStreetView1Layer.renderer = {
     type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    };
    
    highHeatCommonLayer.renderer = {
      type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    };
    
    intersectionLayer.renderer = {
      type: "simple",
symbol: {
  type: "simple-fill",
  color: "#A9DFBF",
  outline: {
    color: "#A9DFBF",
    width: 1
        }
      }
    
    };
    
    
    

  // Add all layers to map
  map.addMany([
    NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer,
    naturalCommonLayer, highHeatStreetView1Layer, highHeatCommonLayer, intersectionLayer
  ]);

  
  // Ownership defining https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
  window.OWfiltr = function (type) {
    let expr = "1=1";
    if (type === "Public Owned") expr = "Ownership LIKE '%Public%'";
    else if (type === "Private Owned") expr = "Ownership LIKE '%Private%'"; 
    [
      NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer,// checks if the ownership is private or public
      naturalCommonLayer, highHeatStreetView1Layer, highHeatCommonLayer, intersectionLayer
    ].forEach(layer => layer.definitionExpression = expr);
  };

  
