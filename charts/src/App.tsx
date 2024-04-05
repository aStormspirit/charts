import "./App.css";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { calculateTotalTime } from "./utils";

type CallEntry = [
  string,
  string,
  number,
  string,
  string,
  string,
  string,
  number,
  string,
  string
];

type CallLog = {
  [key: string]: CallEntry[];
};

function App() {
  const [data, setData] = useState<CallLog | []>([]);
  const [date, setDate] = useState<string>("");

  const xValue = Object.keys(data).map((item) => item.split(" ")[0]);
  const yValue = Object.values(data).map((item: CallEntry[]) => item.length);

  const entryCount = Object.values(data).map(
    (item: CallEntry[]) => item.length
  );
  const conversationDuration = Object.values(calculateTotalTime(data));

  const mergedArray: [number, string][] = [];
  for (let i = 0; i < entryCount.length; i++) {
    mergedArray.push([entryCount[i], conversationDuration[i]]);
  }

  const layout = {
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
      title: "Количество звонков",
      titlefont: {
        size: 18,
      },
      tickfont: {
        size: 14,
      },
    },
  };

  const dataV = [
    {
      type: "bar",
      x: xValue,
      y: yValue,
      hoverinfo: "none",
      text: mergedArray.map((item) => `${item[0]} | ${item[1]}`),
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
    fetch("https://chartsplugin.ddns.net/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setDate(json.date);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <Plot data={dataV} layout={layout} />
    </div>
  );
}

export default App;
