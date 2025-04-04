require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
  ], function (Map, MapView, FeatureLayer, Legend) {
  
    const map = new Map({ basemap: "streets" });
  
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-78.32, 44.3],
      zoom: 13
    });
  
    // ✅ Wait until view is ready
    view.when(() => {
      // ✅ Add legend
      const legend = new Legend({
        view: view,
        container: "legendDiv"
      });
  
      // ✅ Toggle visibility logic
      const toggleButton = document.getElementById("toggleLegend");
      const legendContainer = document.getElementById("legendContainer");
  
      toggleButton.addEventListener("click", function () {
        const isHidden = legendContainer.style.display === "none";
        legendContainer.style.display = isHidden ? "block" : "none";
        toggleButton.textContent = isHidden ? "Hide Legend" : "Show Legend";
      });
    });
  
    // Tree Species by area category
    const Natstreetoptions = {
      "Small": ["Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", "Hedge Maple", "Zelkova", "Amur Maackia", "Paperbark Maple"],
      "Medium": ["Hedge Maple", "Zelkova"],
      "Large": ["Amur Maackia", "Paperbark Maple"]
    };
  
    const highMoisturespecies = {
      "Large": ["River Birch", "Swamp White Oak", "Red Maple", "Tamarack", "Moraine Sweetgum", "Sycamore"],
      "Medium": ["Red Maple", "Tamarack", "Moraine Sweetgum", "Sycamore"],
      "Small": ["Tamarack", "Moraine Sweetgum", "Sycamore"]
    };
  
    const HighMoistureStreetsSpecies = {
      "Small": ["Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", "Amur Maackia", "Paperbark Maple"],
      "Medium": ["Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", "Amur Maackia"],
      "Large": ["Ivory Silk Japanese Tree Lilac", "Whitebeam", "Amur Maackia"]
    };
  
    const CommonAreaSpecies = {
      "Small": ["Paperbark Maple", "Apollo Sugar Maple", "Smooth Serviceberry", "Blue Beech", "Eastern Redbud", "Thornless Cockspur Hawthorn", "Amur Maackia"],
      "Medium": ["Paperbark Maple", "Apollo Sugar Maple", "Smooth Serviceberry", "Blue Beech", "Eastern Redbud", "Thornless Cockspur Hawthorn", "Amur Maackia"],
      "Large": ["Sugar Maple", "White Oak", "Basswood"]
    };
  
    const HighHeatStreetView1Species = {
      "Small": ["Hedge Maple"],
      "Medium": ["Hedge Maple", "Zelkova"],
      "Large": ["Hedge Maple", "Zelkova"]
    };
  
    const HighHeatCommonSpecies = {
      "Small": ["Honey Locust", "Eastern Redcedar"],
      "Medium": ["Kentucky Coffeetree", "Princeton Elm"],
      "Large": ["Bur Oak", "Red Oak"]
    };
  
    const IntersectionHeatMoistureSpecies = {
      "Large": ["River Birch", "Swamp White Oak", "Red Maple", "Tamarack", "Moraine Sweetgum", "Sycamore"]
    };
  
    // Layer definitions with popup and suggestions
    const NatStreetLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_streets_view1/FeatureServer",
      title: "Naturalized Streets",
      visible: true,
      outFields: ["*"],
      popupTemplate: {
        title: "Ownership: {Ownership}",
        content: function (feature) {
          const a = feature.graphic.attributes;
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
          return `<b>Area Category:</b> ${a.Area_Category}<br><b>Suggested Trees:</b><ul>${list}</ul>`;
        }
      }
    });
  
    const naturalCommonLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_Area_view/FeatureServer",
      title: "Common Area Naturalization",
      visible: true,
      outFields: ["*"],
      popupTemplate: {
        title: "Ownership: {Ownership}",
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
        }
      }
    });
    NatStreetLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#1B7837", 
          outline: {
            color: "#1B7837", 
            width: 1
          }
        }
      };
      //
      
      highMoistureLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#84B9E599", 
          outline: {
            color: "#84B9E599", 
            width: 1
          }
        }
      };
      
      highMoistureStreetsLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#4575B480", 
          outline: {
            color: "#4575B480", 
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
          color: "#FC8D59", 
          outline: {
            color: "#FC8D59", 
            width: 1
          }
        }
      };
      
      highHeatCommonLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#B2182B99",
          outline: {
            color:"rgba(178, 24, 43, 0.2)", 
            width: 1
          }
        }
      };
      
      intersectionLayer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#FEE090", 
          outline: {
            color: "#FEE090", 
            width: 1
          }
        }
      
      };
      
      
      
  
    // Add all layers to map
    map.addMany([
      NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer,
      naturalCommonLayer, highHeatStreetView1Layer, highHeatCommonLayer, intersectionLayer
    ]);
  
    
    // Ownership filter
    window.OwernshipFilter = function (type) {
      let expr = "1=1";
      if (type === "Public Owned") expr = "Ownership LIKE '%Public%'";
      else if (type === "Private Owned") expr = "Ownership LIKE '%Private%'";
      [
        NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer,
        naturalCommonLayer, highHeatStreetView1Layer, highHeatCommonLayer, intersectionLayer
      ].forEach(layer => layer.definitionExpression = expr);
    };
  
    // Layer toggles
    document.getElementById("natStreetChk").addEventListener("change", () => {
      NatStreetLayer.visible = event.target.checked;
    });
    document.getElementById("highMoistureChk").addEventListener("change", () => {
      highMoistureLayer.visible = event.target.checked;
    });
    document.getElementById("highMoistureStChk").addEventListener("change", () => {
      highMoistureStreetsLayer.visible = event.target.checked;
    });
    document.getElementById("naturalCommonChk").addEventListener("change", () => {
      naturalCommonLayer.visible = event.target.checked;
    });
    document.getElementById("HighHeatStreetChk").addEventListener("change", () => {
      highHeatStreetView1Layer.visible = event.target.checked;
    });
    document.getElementById("HighHeatCommonchk").addEventListener("change", () => {
      highHeatCommonLayer.visible = event.target.checked;
    });
    document.getElementById("HeatMoistureInteractionChk").addEventListener("change", () => {
      intersectionLayer.visible = event.target.checked;
    });
  
    // Add Legend (AFTER View is Ready)
    const legend = new Legend({ view: view, container: "legendDiv" });
  
  });
  
