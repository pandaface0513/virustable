let HEADERS = [
    "date", "filename", "action", "submit-type", "rating"
];

let TIMEOFFSET = {
    "day": 24*3600,
    "week": 24*3600*7,
    "month": 24*3600*7*4,
    "century": 3600*24*7*4*12*100
}

let RATINGS = {
    "malicious": 5,
    "high-risk": 4,
    "medium-risk": 3,
    "low-risk": 2,
    "clean": 1
}

let METADATA = [];

let currentSortColumn = "";
let asc = true;

$(document).ready(function() {
    $("#time-filter").change(filterUpdate);
    requestVirusData();
});

let filterUpdate = (e) => {
    updateTable(filterByTime(METADATA));
}

let updateTable = (newDataList) => {
    clearTable();
    renderTable(newDataList);
}

let getFilterValue = () => {
    let filterDOM = $("#time-filter").get(0);
    return TIMEOFFSET[filterDOM.options[filterDOM.selectedIndex].value];
}

let requestVirusData = () => {
    $.ajax({
        url: "http://127.0.0.1:8000/vtableapp",
        crossDomain : true,
        success: function(data) {
            METADATA = data.vlist;

            let trimData = filterByTime(METADATA);
            renderTable(trimData);
        }
    })
}

let clearTable = () => {
    let tableDiv = document.getElementById("virus-table");
    tableDiv.parentNode.removeChild(tableDiv);
}

let sortTable = (index) => {
    console.log("Sort by " + HEADERS[index]);
    let key = HEADERS[index];

    if (currentSortColumn === key) {
        asc = !asc;
    } else {
        asc = true;
    }
    currentSortColumn = key;

    let trimData = filterByTime(METADATA);
    let result = trimData.sort((a, b) => {
        let key = HEADERS[index];
        let valueA, valueB;

        if (key === "date") { 
            valueA = new Date(a[key]).getTime();
            valueB = new Date(b[key]).getTime();
        }
        else if (key === "rating") {
            valueA = RATINGS[a[key]];
            valueB = RATINGS[b[key]];
        }
        else {
            valueA = a[key];
            valueB = b[key];
        }

        if (valueA > valueB) {
            return asc ? 1 : -1;
        }

        if (valueA < valueB) {
            return asc ? -1 : 1;
        }

        return 0;
    });
    updateTable(result);
}

let filterByTime = (dataList) => {
    let currentTimeInSeconds = Date.now() / 1000;
    let cutOffTimeInSeconds = currentTimeInSeconds - getFilterValue();
    
    let result = dataList.filter(
        function(item) {
            let itemTimeInSeconds = new Date(item.date).getTime() / 1000;
            return (itemTimeInSeconds > cutOffTimeInSeconds && itemTimeInSeconds < currentTimeInSeconds);
        }
    )
    return result;
}

let renderTable = (dataList) => {
    let tableDiv = document.createElement("table");
    tableDiv.setAttribute("id", "virus-table");

    let firstRow = document.createElement("tr");
    tableDiv.appendChild(firstRow);

    for (let i = 0; i < HEADERS.length; i++) {
        let header = document.createElement("th");
        header.innerText = HEADERS[i];
        header.setAttribute("onclick", "sortTable("+i+")");
        firstRow.appendChild(header);
    }
    
    for (let i = 0; i < dataList.length; i++) {
        let virusData = dataList[i];

        let dataRow = document.createElement("tr");
        dataRow.classList.add(virusData.rating);

        for (let j = 0; j < HEADERS.length; j++) {
            let dataColumn = document.createElement("td");
            dataColumn.innerText = virusData[HEADERS[j]];
            dataRow.appendChild(dataColumn);
        }

        tableDiv.appendChild(dataRow);
    }

    document.getElementById("app").appendChild(tableDiv);
}