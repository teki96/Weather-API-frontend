console.log("Loading nakyma2.js");

const tableBody = document.getElementById("tablebody");
const canvasElement = document.getElementById("myChart");
const option = document.getElementById("time");
let chart = document.getElementById("myChart");

const getTemperatureData = async () => {
  console.log("Entering async function..");

  timeline = time.value;

  const serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/${timeline} `
  );

  const data = await serverResponse.json();

  tableBody.textContent = "";

  data.forEach((rowData) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      new Date(rowData.date_time).toLocaleString().slice(0, 9),
      new Date(rowData.date_time).toLocaleString().slice(14),
      rowData.temperature,
    ];
    for (const cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }
    tableBody.appendChild(row);

    const motherOfCanvas = chart.parentNode;
    console.log("motherOfCanvas", motherOfCanvas);

    console.log("chart.remove();");
    chart.remove();

    const newCanvas = document.createElement("canvas");

    motherOfCanvas.appendChild(newCanvas);

    chart = newCanvas;
  });
  const myChart = new Chart(chart, {
    type: "line",
    data: {
      labels: data.map((values) => values.date_time),
      datasets: [
        {
          label: "Temperature",
          data: data.map((values) => values.temperature),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              tooltipFormat: "d.L.y HH:MM:SS",
            },
          },
        ],
      },
    },
  });
};
getTemperatureData();
