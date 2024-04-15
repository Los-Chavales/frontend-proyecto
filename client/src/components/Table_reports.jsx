import DataTable from "react-data-table-component"
import "../styles/table.css"

function TableReports(report) {
    //console.log(report.title, report.data, report.columns, report.number, report.styles, report.select, report.funSelDel, report.funDel)
    return (
        <div className="tables">
            <h2 className="tables-title">{report.title}</h2>
            {report.select && report.buttonType && <button className="tables-button" onClick={report.funDel}>{report.buttonType}</button>}
            {report.listType &&
                report.listType.map((buttonOp, i) => (
                    <div className="user-options-container" key={i}>
                        <ul className="user-options" key={i}>
                            <li key={i}><button className="tables-button" onClick={report.funDel[i]} key={i}>{buttonOp}</button></li>
                        </ul>
                    </div>
                ))
            }
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