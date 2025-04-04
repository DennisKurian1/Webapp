
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend"
], function(Map, MapView, FeatureLayer, Legend) {

  const map = new Map({ basemap: "streets" });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-78.32, 44.3],
    zoom: 13
  });

  // Ownership filter function
  window.OwernshipFilter = function(type) {
    let expr = "1=1";
    if (type === "Public Owned") {
      expr = "Ownership LIKE '%Public%'";
    } else if (type === "Private Owned") {
      expr = "Ownership LIKE '%Private%'";
    }
    NatStreetLayer.definitionExpression = expr;
    highMoistureLayer.definitionExpression = expr;
    highMoistureStreetsLayer.definitionExpression = expr;
    naturalCommonLayer.definitionExpression = expr;
    highHeatStreetView1Layer.definitionExpression = expr;
    highHeatCommonLayer.definitionExpression = expr;
    intersectionLayer.definitionExpression = expr;
    console.log("Ownership filter applied:", expr);
  };

  // Feature layers
  const NatStreetLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_streets_view/FeatureServer",
    title: "Naturalized Streets",
    visible: true
  });

  const highMoistureLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Moisture_Area_view/FeatureServer",
    title: "High Moisture Areas",
    visible: true
  });

  const highMoistureStreetsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High__Moisture_Streets_view/FeatureServer",
    title: "High Moisture Streets",
    visible: true
  });

  const naturalCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalization_Common_Area_view/FeatureServer",
    title: "Common Area Naturalization",
    visible: true
  });

  const highHeatStreetView1Layer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/_High_Heat_Street_view1/FeatureServer",
    title: "High Heat Street",
    visible: true
  });

  const highHeatCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Heat_common_view/FeatureServer",
    title: "High Heat Common Area",
    visible: true
  });

  const intersectionLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/intersection_heat_moisture_view/FeatureServer",
    title: "Heat Moisture Intersection",
    visible: true
  });

  // Add layers to map
  map.addMany([
    NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer,
    naturalCommonLayer, highHeatStreetView1Layer, highHeatCommonLayer, intersectionLayer
  ]);
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




  // Legend
  const legend = new Legend({
    view: view,
    container: "legendDiv"
  });

  const toggleButton = document.getElementById("toggleLegend");
  const legendContainer = document.getElementById("legendContainer");
  toggleButton.addEventListener("click", function () {
    const isHidden = legendContainer.style.display === "none";
    legendContainer.style.display = isHidden ? "block" : "none";
    toggleButton.textContent = isHidden ? "Hide Legend" : "Show Legend";
  });

  // Layer toggles
  document.getElementById("natStreetChk").addEventListener("change", function () {
    NatStreetLayer.visible = this.checked;
  });
  document.getElementById("highMoistureChk").addEventListener("change", function () {
    highMoistureLayer.visible = this.checked;
  });
  document.getElementById("highMoistureStChk").addEventListener("change", function () {
    highMoistureStreetsLayer.visible = this.checked;
  });
  document.getElementById("naturalCommonChk").addEventListener("change", function () {
    naturalCommonLayer.visible = this.checked;
  });
  document.getElementById("HighHeatStreetChk").addEventListener("change", function () {
    highHeatStreetView1Layer.visible = this.checked;
  });
  document.getElementById("HighHeatCommonchk").addEventListener("change", function () {
    highHeatCommonLayer.visible = this.checked;
  });
  document.getElementById("HeatMoistureInteractionChk").addEventListener("change", function () {
    intersectionLayer.visible = this.checked;
  });

});
