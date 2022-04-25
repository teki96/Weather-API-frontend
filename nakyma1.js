console.log("Loading script.js");

const tableBody = document.getElementById("tablebody");
let currentPage = window.location.pathname;

const getLatestData = async () => {
  console.log("Entering async function..");
  console.log(currentPage);

  const serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50`
  );

  const data = await serverResponse.json();

  if ((currentPage = "/nakyma1.html")) {
    data.forEach((rowData, index) => {
      const row = document.createElement("tr");

      const cellDataArray = [
        index + 1,
        new Date(rowData.date_time).toLocaleString(),
        rowData.id,
        rowData.device_id,
        Object.keys(rowData.data),
        rowData.data[Object.keys(rowData.data)],
      ];
      for (const cellData of cellDataArray) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(cellData);
        cell.appendChild(cellText);

        row.appendChild(cell);
      }

      tableBody.appendChild(row);
    });
  }
};

getLatestData();
