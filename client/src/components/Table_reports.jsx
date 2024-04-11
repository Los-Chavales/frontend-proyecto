import DataTable from "react-data-table-component"
import "../styles/table.css"
import { useReportV } from "../context/Verified_context";

function TableReports(report) {
    const { register_reportV } = useReportV();

    const registerSelect = async (data) =>{
        let data_v = await data.selectedRows
        for (const data_v_1 of data_v) {
            let date = data_v_1.date_sighting.split("/")
            let formatDate = new Date(date[2]+"/"+date[1]+"/"+date[0]);
            console.log("ASí queda la fecha")
            console.log(formatDate)
            const estructure = {
                reported_name: data_v_1.reported_name,
                date_sighting: formatDate,
                state: data_v_1.state,
                description: data_v_1.description,
                photo: data_v_1.photo
            }
            register_reportV(estructure)
        }
    }


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