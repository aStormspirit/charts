import "./App.css";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  const xValue = Object.keys(data);
  const yValue = Object.values(data).map((item: any) => item.length);

  var layout = {
    title: {
      text: "Звонки за " + date,
      font: {
        size: 24,
      },
    },
    xaxis: {
      title: "Сотрудники",
      titlefont: {
        size: 18,
      },
      tickfont: {
        size: 14,
      },
    },
    yaxis: {
      title: "Колличество звонков",
      titlefont: {
        size: 18,
      },
      tickfont: {
        size: 14,
      },
    },
    description: "Описание графика", // Описание графика
  };

  const dataV = [
    {
      type: "bar",
      x: xValue,
      y: Object.values(data).map((item: any) => item.length),
      hoverinfo: "none",
      text: yValue.map(String),
      textposition: "auto",
      marker: {
        color: "rgb(158,202,225)",
        opacity: 0.6,
        line: {
          color: "rgb(8,48,107)",
          width: 1.5,
        },
      },
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setDate(json.date);
      });
  }, []);

  return (
    <div className="container">
      <Plot data={dataV} layout={layout} />
    </div>
  );
}

export default App;
