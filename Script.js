<script src="https://js.arcgis.com/4.26/"></script>
<script>
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "streets"
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-78.32, 44.3],
    zoom: 13
  });
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
  const HighMoistureStreetsSpecies= {
    "Small": ["Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam",
       "Amur Maackia", "Paperbark Maple"],
    "Medium": ["Oakleaf Mountain Ash", "Ivory Silk Japanese Tree Lilac", "Whitebeam", 
      "Amur Maackia"],
    "Large": ["Ivory Silk Japanese Tree Lilac", "Whitebeam", "Amur Maackia"]}
    const CommonAreaSpecies = {
      "Small": [
        "Paperbark Maple","Apollo Sugar Maple","Smooth Serviceberry","Blue Beech","Eastern Redbud",
        "Thornless Cockspur Hawthorn",
        "Amur Maackia"
      ],
      "Medium": ["Paperbark Maple","Apollo Sugar Maple", "Smooth Serviceberry","Blue Beech","Eastern Redbud","Thornless Cockspur Hawthorn","Amur Maackia","Autumn Spire Red Maple","Redpointe Maple",
        "Ruby-Red Horsechestnut",
        "Whitespire Birch", "European Hornbeam",
        "Northern Catalpa",
        "Chicagoland Hackberry", "Katsura",
        "Yellowwood",
        "Turkish Hazel",
        "Princeton Sentry Ginkgo",
        "Scarlet Oak",
        "Black Maple",
        "Silver Queen Silver Maple",
        "Sugar Maple",
        "Autumn Blaze Freeman Maple",
        "Cucumber Magnolia",
        "White Oak",
        "Basswood",
        "Grey Birch",
        "Alternate-Leaf Dogwood",
        "Common Hoptree",
        "Ostrya virginiana",
        "Eastern Cottonwood",
        "Quercus Ellipsoidalis",
        "Populus tremuloides",
        "Acer saccharinum",
        "Tsuga canadensis"
      ]
    };
    const HighHeatStreetView1Species = {
      "Small": ["Hedge Maple"],
      "Medium": ["Hedge Maple", "Zelkova"],
      "Large": ["Hedge Maple", "Zelkova"]
    };
  
  const NatStreetLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_streets_view/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attributes = feature.graphic.attributes;
        const areaCategory = attributes.Area_Category;
        const recommendedTrees = Natstreetoptions[areaCategory] || ["NILL"];
        const treeList = recommendedTrees.map(tree => `<li>${tree}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCategory}<br>
          <b>Recommended Tree Species for this area:</b>
          <ul>${treeList}</ul>
        `;
      }
    }
  });
  const highMoistureLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Moisture_Area_view/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attrs = feature.graphic.attributes;
        const areaCat = attrs.Area_Category || "Null";
        const recommendedTrees = highMoisturespecies[areaCat] || ["NULLe"];
        const treeList = recommendedTrees.map(species => `<li>${species}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Recommended Trees for this High Moisture Area:</b>
          <ul>${treeList}</ul>
        `;
      }
    }
  });
  const highMoistureStreetsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High__Moisture_Streets_view/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attrs = feature.graphic.attributes;
        const areaCat = attrs.Area_Category || "None";
        const recommendedTrees = HighMoistureStreetsSpecies[areaCat] || ["NULL"];
        const treeList = recommendedTrees.map(species => `<li>${species}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Recommended Tree Species:</b>
          <ul>${treeList}</ul>
        `;
      }
    }
  });
  const HighHeatCommonSpecies = {
    "Small": [
      "Honey Locust",
      "Street Keeper Honey Locust",
      "Shademaster Honey Locust",
      "Eastern Redcedar"
    ],
    "Medium": [
      "Kentucky Coffeetree",
      "Northern Pin Oak",
      "Princeton Elm",
      "English Oak"
    ],
    "Large": [
      "Bur Oak",
      "Red Oak",
      "Valley Forge Elm"
    ]
  };

  const IntersectionHeatMoistureSpecies = {"Large": ["River Birch", "Swamp White Oak", "Red Maple", "Tamarack", "Moraine Sweetgum", "Sycamore"] };

  const naturalCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalization_Common_Area_view/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attributes = feature.graphic.attributes;
        const areaCat = attributes.Area_Category || "None";
        const speciesList = CommonAreaSpecies[areaCat] || ["null"];
        const listItems = speciesList.map(species => `<li>${species}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Recommended Tree Species:</b>
          <ul>${listItems}</ul>
        `;
      }
    }
  });
  const highHeatStreetView1Layer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/_High_Heat_Street_view1/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attrs = feature.graphic.attributes;
        const areaCat = attrs.Area_Category || "None";
        const commonName = attrs.Trees_common_name || "No name";
        const recommendedList = HighHeatStreetView1Species[areaCat] || ["No recommended species available"];
        const listItems = recommendedList.map(s => `<li>${s}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Trees_common_name:</b> ${commonName}<br>
          <b>Recommended Species:</b>
          <ul>${listItems}</ul>
        `;
      }
    }
  });
  const highHeatCommonLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Heat_common_view/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attrs = feature.graphic.attributes;
        const areaCat = attrs.Area_Category || "None";
        const fieldName = attrs.Treea_common_name || "No name";
        const recommended = HighHeatCommonSpecies[areaCat] || ["No recommended species available"];
        const listItems = recommended.map(s => `<li>${s}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Treea_common_name:</b> ${fieldName}<br>
          <b>Recommended Species:</b>
          <ul>${listItems}</ul>
        `;
      }
    }
  });
  const intersectionLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/intersection_heat_moisture_view/FeatureServer",
    outFields: ["*"],
    popupTemplate: {
      title: function(feature) {
        return "Ownership: " + feature.graphic.attributes.Ownership;
      },
      content: function(feature) {
        const attrs = feature.graphic.attributes;
        const areaCat = attrs.Area_Category || "None";
        const speciesList = IntersectionHeatMoistureSpecies[areaCat] || ["No recommended species available"];
        const listItems = speciesList.map(s => `<li>${s}</li>`).join("");
        return `
          <b>Area Category:</b> ${areaCat}<br>
          <b>Recommended Tree Species:</b>
          <ul>${listItems}</ul>
        `;
      }
    }
  });
// the layers have been added and the layers are given with popup and species suggestion. now with symbology

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

const NatStreetLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalized_streets_view/FeatureSer
  title: "Naturalized Streets",
  visible: true
});
const highMoistureLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Moisture_Area_view/FeatureServ
  title: "High Moisture Areas",
  visible: true
});
const highMoistureStreetsLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High__Moisture_Streets_view/Feature
  title: "High Moisture Streets",
  visible: true
});
const naturalCommonLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Naturalization_Common_Area_view/Fea
  title: "Common Area Naturalization",
  visible: true
});
const highHeatStreetView1Layer = new FeatureLayer({
   url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/_High_Heat_Street_view1/FeatureSer
   title: "High Heat Street",
   visible: true
});
const highHeatCommonLayer = new FeatureLayer({
   url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/High_Heat_common_view/FeatureServe
   title: "High Heat Common Area",
   visible: true
});
const intersectionLayer = new FeatureLayer({
   url: "https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/intersection_heat_moisture_view/Fe
   title: "Heat Moisture Intersection",
   visible: true
});
// Add layers to map
map.addMany([NatStreetLayer, highMoistureLayer, highMoistureStreetsLayer, naturalCommonLayer, highHeatStreetVi
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
  map.addMany([NatStreetLayer, highMoistureLayer,highMoistureStreetsLayer,naturalCommonLayer,highHeatStreetView1Layer,highHeatCommonLayer,intersectionLayer]);
});

});
</script>


