console.log("Loading script.js");
const tableBody = document.getElementById("tablebody");
const canvasElement = document.getElementById("myChart");
const time_option = document.getElementById("time");
let chart = document.getElementById("myChart");

const getData = async () => {
  console.log("Entering async function..");

  signal_option = signal.value;
  timeline = time.value;

  console.log(signal_option);
  const serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/${signal_option}/${timeline}`
  );

  console.log(serverResponse);
  const data = await serverResponse.json();

  tableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");
    const cellDataArray = [
      new Date(rowData.date_time).toLocaleString().slice(0, 9),
      new Date(rowData.date_time).toLocaleString().slice(14),
      rowData[signal_option],
    ];

    for (const cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });

  const motherOfCanvas = chart.parentNode;
  console.log("motherOfCanvas", motherOfCanvas);

  console.log("chart.remove();");
  chart.remove();

  const newCanvas = document.createElement("canvas");

  motherOfCanvas.appendChild(newCanvas);

  chart = newCanvas;

  const myChart = new Chart(chart, {
    type: "bar",
    data: {
      labels: data.map((values) => values.date_time),
      datasets: [
        {
          label: signal.value,
          data: data.map((values) => values[signal_option]),
          backgroundColor: "rgb(75, 192, 192)",
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
getData();
