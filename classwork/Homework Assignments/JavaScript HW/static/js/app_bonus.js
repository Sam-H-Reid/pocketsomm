const tableData = data
const filters = {}

function buildTable() {
    const tbody = d3.select('tbody')
    tbody.html('')
    data.forEach(dataRow => {
        const elements = tbody.append('tr')
        Object.values(dataRow).forEach(value => tbody.append('td').text(value))
    })
}

function updateFilters() {
    const changedElement = d3.select(this).select("input");
    const elementValue = changedElement.property("value");
    const filterId = changedElement.attr("id");

    elementValue ? filters[filterId] = elementValue : delete filters[filterId]

    filterTable()
}

function filterTable() {
    let filteredData = tableData

    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value)
    })

    buildTable(filteredData)
}

d3.selectAll('.filter').on('change', updateFilters)
buildTable()