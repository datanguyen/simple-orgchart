import OrgChart from "./main/org-chart"

let orgChartDOM = document.getElementById("orgChart");

if (typeof (Storage) !== "undefined") {
    let orgChartRawData = sessionStorage.rawData;

    if (orgChartRawData !== undefined) {
        orgChartDOM.appendChild((new OrgChart(JSON.parse(orgChartRawData))).render());
    } else {
        fetch('./data/contacts.json')

            .then((res) => {
                res.json()
                    .then((data) => {
                        sessionStorage.rawData = JSON.stringify(data);
                        orgChartDOM.appendChild((new OrgChart(data).render()));
                    })

            })
            .catch(err => orgChartDOM.innerHTML = `Your browser does not support Fetch API: ${err}`);
    }
} else {
    orgChartDOM.innerHTML = "Your browser does not support session Storage";
}

