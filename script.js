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

// get chart

let table2 = document.getElementById("table2");
let canvas2 = document.createElement("canvas");
canvas2.id = "homicidesChart";
table2.parentNode.insertBefore(canvas2, table2);

// number of prisoners and country list arrays

let prisoners /*countryStats2*/ = {};
let list2Country = [];

// table rows

for (var i = 1; i < table2.rows.length; i++) {
  let Country = table2.rows[i].cells[1].innerHTML;
  let years0709 /*list07Till09*/ = table2.rows[i].cells[2].innerHTML;
  let years1012 /*list10Till12*/ = table2.rows[i].cells[3].innerHTML;

  let prisoners = {
    country: Country,
    year07_09: years0709 /*list07Till09*/,
    year10_12: years1012 /*list10Till12*/
  };

  list2Country.push(prisoners);
}

// array to get all the info for chart

let countryData2 = [];
let listTill09 = [];
let listTill12 = [];

for (j = 0; j < list2Country.length; j++) {
  country = list2Country[j].country;
  // replace error with a correct string
  list2Country[7].country = "Angleterreet - paysdeGalles(UK)";
  year07_09 = list2Country[j].year07_09;
  year10_12 = list2Country[j].year10_12;

  countryData2.push(country);
  listTill09.push(list2Country[j].year07_09);
  listTill12.push(list2Country[j].year10_12);
}

// info to chart

var ctx = document.getElementById("homicidesChart").getContext("2d");
var homicidesChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: countryData2,
    datasets: [
      {
        label: "2007–09",
        data: listTill09,
        backgroundColor: "#AA04FF",
        fill: false,
        borderColor: "#AA04FF",
        borderWidth: 1
      },
      {
        label: "2010–12",
        data: listTill12,
        backgroundColor: "#IIIIII",
        fill: false,
        borderColor: "#IIIIII",
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

// --------------------- graph 3 --------------------------------- //
// display graph on screen

let canvas3 = document.createElement("canvas");
canvas3.id = "graphUnderH1";
document.getElementsByTagName("h1")[0].appendChild(canvas3);

// data from API

var dataPoints = [];
$.getJSON(
  "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json",
  function(data) {
    $.each(data, function(key, value) {
      dataPoints.push({ x: value[0], y: parseInt(value[1]) });
    });
    chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Live Chart with dataPoints from External JSON"
      },
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }
      ]
    });
    chart.render();
    updateChart();
  }
);

// gets data from JSON and adds it to dataPoints

function updateChart() {
  $.getJSON(
    "https://canvasjs.com/services/data/datapoints.php?xstart=" +
      (dataPoints.length + 1) +
      "&ystart=" +
      dataPoints[dataPoints.length - 1].y +
      "&length=1&type=json",
    function(data) {
      $.each(data, function(key, value) {
        dataPoints.push({
          x: parseInt(value[0]),
          y: parseInt(value[1])
        });
      });
      chart.render();
      setTimeout(function() {
        updateChart();
      }, 1000);
    }
  );
}
