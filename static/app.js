let HEADERS = [
    "date", "filename", "action", "submit-type", "rating"
];

let TIMEOFFSET = {
    "day": 24*3600,
    "week": 24*3600*7,
    "month": 24*3600*7*4,
    "century": 3600*24*7*4*12*100
}

let METADATA = [];

$(document).ready(function() {
    $("#time-filter").change(filterUpdate);
    requestVirusData();
});

let filterUpdate = (e) => {
    clearTable();
    renderTable(filterByTime(METADATA));
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

let sortTable = () => {
    let table, rows, switching, i, x, y, shouldSwitch;
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