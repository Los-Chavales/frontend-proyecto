import DataTable from "react-data-table-component"

function TableReports(report) {
    console.log(report.title, report.data, report.columns)
    const columns = report.columns

    return (
        <div>
            <h1>{report.title}</h1>
            <DataTable
                columns={columns}
                data={report.data}
                pagination
                paginationPerPage={3}
            />
        </div>
    )
}

export default TableReports;