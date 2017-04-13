import OrgChart from "./main/org-chart"

fetch('./data/contacts.json')
  .then((res) => {

      res.json()
        .then((data) => {
            let orgChart = new OrgChart(data);
            console.log(orgChart);
        })

  })
  .catch(function (err) {
      console.log('Data is invalid! Cannot render the chart!', err);
  });

