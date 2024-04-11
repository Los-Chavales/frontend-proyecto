import DataTable from "react-data-table-component"
import "../styles/table.css"

function TableReports(report) {
    //console.log(report.title, report.data, report.columns, report.number, report.styles, report.select, report.funSelDel, report.funDel)
    return (
        <div className="tables">
            <h1 className="tables-title">{report.title}</h1>
            {report.select && <button className="tables-button" onClick={report.funDel}>Eliminar</button>}
            <DataTable
                columns={report.columns}
                data={report.data}
                pagination
                paginationPerPage={report.number}
                customStyles={report.styles}
                selectableRows={report.select}
                onSelectedRowsChange={report.funSelDel}
            />
        </div>
    )
}

export default TableReports;