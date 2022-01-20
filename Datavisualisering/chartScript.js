function updateChart(){
  console.log("updatingChart")
}

const barChart = {
    chart: null,
    data: [
      ['Product', 'Sales'],
      ['Laptops', 1708],
      ['Desktops', 1457],
      ['Cameras', 660],
      ['Phones', 1507],
      ['Accessories', 768]
    ],
    element: '#bar-chart',
    options:  {
      title: 'Printer Success',
      width: 1000,
      height: 800,
      colors: ['#FE1925'],
    }
  };
   // https://developers.google.com/chart/interactive/docs/gallery/piechart
  // https://developers.google.com/chart/interactive/docs/gallery/barchart
  // https://developers.google.com/chart/interactive/docs/gallery/linechart
  // https://developers.google.com/chart/interactive/docs/reference#draw
  // https://developers.google.com/chart/interactive/docs/reference#arraytodatatable
  const init = () => {
   
    
    barChart.chart = new google.visualization.ColumnChart(
      document.querySelector(barChart.element)
    );
    barChart.chart.draw(
      google.visualization.arrayToDataTable(barChart.data),
      barChart.options
    );
    
   
  };
  
  // https://developers.google.com/chart/interactive/docs/quick_start
  google.charts.load('current', {
    packages: ['corechart'],
    callback: init
  });
  
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 /*document.querySelector('#update-bar-chart').addEventListener('click', () => {
    barChart.data = [
      ['Product', 'Sales'],
      ['Laptops', 1508],
      ['Desktops', 1497],
      ['Cameras', 360],
      ['Phones', 1790],
      ['Accessories', 518]
    ];
    barChart.chart.draw(
      google.visualization.arrayToDataTable(barChart.data),
      barChart.options
    );
  });*/

