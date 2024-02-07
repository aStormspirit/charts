import "./App.css";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

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

  function calculateTotalTime(callLogs: any): { [key: string]: string } {
    const totalTime: { [key: string]: string } = {};

    for (const key in callLogs) {
      const callEntries = callLogs[key];

      let totalSeconds = 0;
      for (const entry of callEntries) {
        const duration = entry[6];
        const durationParts = duration.split(":");
        const hours = parseInt(durationParts[0]);
        const minutes = parseInt(durationParts[1]);
        const seconds = parseInt(durationParts[2]);

        totalSeconds += hours * 3600 + minutes * 60 + seconds;
      }

      const totalHours = Math.floor(totalSeconds / 3600);
      const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
      const totalSecondsLeft = totalSeconds % 60;

      totalTime[key] = `${totalHours.toString().padStart(2, "0")}:${totalMinutes
        .toString()
        .padStart(2, "0")}:${totalSecondsLeft.toString().padStart(2, "0")}`;
    }

    return totalTime;
  }
  const sumTime = calculateTotalTime(data);

  const entryCount = Object.values(data).map(
    (item: CallEntry[]) => item.length
  );
  const conversationDuration = Object.values(calculateTotalTime(data));

  const mergedArray: [number, string][] = [];
  for (let i = 0; i < entryCount.length; i++) {
    mergedArray.push([entryCount[i], conversationDuration[i]]);
  }

  console.log(mergedArray);

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
  };

  const dataV = [
    {
      type: "bar",
      x: xValue,
      y: Object.values(data).map((item: CallEntry[]) => item.length),
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
    fetch("http://5.53.126.46:8000/data")
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
