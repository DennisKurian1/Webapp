html, body, #viewDiv {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
}



#mainHeading {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  background: white;
  padding: 10px 20px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  font-size: 22px;
  font-weight: bold;
}

#owernshipControlls {
  position: absolute;
  top: 100px; /* ⬅️ was 70px or 80px — now moved lower */
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  z-index: 99;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}




#owernshipControlls button {
  margin: 4px;
  padding: 6px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

#layerControls {
  position: absolute;
  top: 140px;
  left: 15px;
  background: white;
  padding: 10px 14px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  z-index: 99;
  font-size: 14px;
  line-height: 1.6;
}

#toggleLegend {
  position: absolute;
  top: 140px;
  right: 15px;
  z-index: 100;
  background: white;
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

#legendContainer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  display: none;
  z-index: 100;
  max-width: 250px;
}
