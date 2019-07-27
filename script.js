// ------------------- graph 1 -------------------------//

let header1 = document.getElementsByTagName("h3")[0];
let canvas = document.createElement("canvas");
canvas.id = "myCanvas";
header1.appendChild(canvas);

let list = table1.childNodes[5].children;
let dataRow = {};

for (i = 0; i < list.length; i++) {
  dataRow[i] = [];

  for (j = 1; j < list[i].children.length; j++) {
    let newInteger = list[i].children[j].innerText;
    dataRow[i].push(newInteger);
  }
}

let countryName = dataRow[1].slice(1, 0);
let yearList = dataRow[0].slice(1);
let dataList = dataRow[1].slice(1, 12);
let numberList = [];

for (k = 0; k < dataList.length; k++) {
  newNumber = parseInt(dataList[k]);
  numberList.push(newNumber);
}

var ctx = document.getElementById("myCanvas").getContext("2d");
var myBarChart = new Chart(ctx, {
  type: "horizontalBar",
  data: {
    labels: yearList,
    datasets: [
      {
        label: countryName,
        data: numberList,
        borderWidth: 1.5,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(25, 117, 155, 0.2)",
          "rgba(64, 159, 64, 0.2)",
          "rgba(10, 195, 247, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(32, 102, 241, 0.2)",
          "rgba(58, 202, 140, 0.2)",
          "rgba(05, 83, 152, 0.2)"
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            max: 7000,
            min: 0
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            reverse: true
          }
        }
      ]
    }
  }
});

// -------------------------- graph 2 ---------------------------------------------------------------------//

// display chart

let table2 = document.getElementById("table2");
let canvas2 = document.createElement("canvas");
canvas2.id = "homicidesChart";
table2.parentNode.insertBefore(canvas2, table2);

console.log(canvas2);
