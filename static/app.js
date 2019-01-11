/* variable for table headers name */
let HEADERS = [
    "date", "filename", "action", "submit-type", "rating"
];

/* variable for the time offset */
let TIMEOFFSET = {
    "day": 24*3600,
    "week": 24*3600*7,
    "month": 24*3600*7*4
}

/* variable to convert rating string to a numeric value */
let RATINGS = {
    "malicious": 5,
    "high-risk": 4,
    "medium-risk": 3,
    "low-risk": 2,
    "clean": 1
}

/* variable to store the data from backend in session */
let METADATA = [];

/* variable for the sort toggles */
let currentSortColumn = "";
let asc = true;

/**
 * The filter update callback handler
 * @public
 * @param {Event} e - the event triggers this callback
 */
function filterUpdate(e) {
    updateTable(filterByTime(METADATA));
}

/**
 * Function to call to update the table
 * It clears the old table and recreate a new one with the passed in data
 * @public
 * @param {Array<Object>} newDataList - List of json objects that has the virus data
 */
function updateTable(newDataList) {
    clearTable();
    renderTable(newDataList);
}

/**
 * Helper method to clear the old table
 * @public
 */
function clearTable() {
    let tableDiv = document.getElementById("virus-table");
    tableDiv.parentNode.removeChild(tableDiv);
}

/**
 * Helper method to get value of selected filter
 * @public
 */
function getFilterValue() {
    let filterDOM = $("#time-filter").get(0);
    return TIMEOFFSET[filterDOM.options[filterDOM.selectedIndex].value];
}

/**
 * Helper method to request virus data from Django server using AJAX
 * @public
 */
function requestVirusData() {
    $.ajax({
        url: "http://127.0.0.1:8000/vtableapp",
        crossDomain : true,
        success: function(data) {
            // Store the retreieved data in a global variable (probably better to store in a model)
            METADATA = data.vlist;

            let trimData = filterByTime(METADATA);
            renderTable(trimData);
        }
    })
}

/**
 * Helper method to help sorting table
 * @public
 * @param {number} index - table column index to sort
 */
function sortTable(index) {
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
    // Update table after sorting
    updateTable(result);
}

/**
 * Helper method to filter out json objects that are not within the timestamp range
 * @public
 * @param {Array<Object>} dataList - List of json objects that has the virus data
 */
function filterByTime(dataList) {
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

/**
 * Method to render table with the passed in list of json objects
 * @public
 * @param {Array<Object>} dataList - List of json objects that has the virus data
 */
function renderTable(dataList) {
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

/**
 * This is where the app starts
 * When the document is ready
 */
$(document).ready(function() {
    // Add listener for when the time filter changes
    $("#time-filter").change(filterUpdate);
    // Request virus data
    requestVirusData();
});