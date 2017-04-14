import OrgChart from "./main/org-chart"

fetch('./data/contacts.json')
  .then((res) => {

      res.json()
        .then((data) => {
            let orgChart = new OrgChart(data);

            document.getElementById("orgCharts").appendChild(orgChart.render());
        })

  })
  .catch(function (err) {
      console.log('Data is invalid! Cannot render the chart!', err);
  });

