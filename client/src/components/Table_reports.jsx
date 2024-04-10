import DataTable from "react-data-table-component"
import "../styles/table.css"

function TableReports(report) {
    //console.log(report.title, report.data, report.columns, report.styles)
    return (
        <div className="tables">
            <h1 className="tables-title">{report.title}</h1>
            <DataTable
                columns={report.columns}
                data={report.data}
                pagination
                paginationPerPage={3}
                customStyles={report.styles}
            />
        </div>
    )
}

export default TableReports;