import "./App.css";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <div className="container">
      <Plot
        data={[
          {
            type: "bar",
            x: Object.keys(data),
            y: Object.values(data).map((item: any) => item.length),
          },
        ]}
        layout={{ width: 1200, height: 600, title: "1" }}
      />
    </div>
  );
}

export default App;
