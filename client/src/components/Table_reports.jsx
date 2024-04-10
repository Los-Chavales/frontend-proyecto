import DataTable from "react-data-table-component"
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
                selectableRows
                onSelectedRowsChange={data => registerSelect(data)}
            />
        </div>
    )
}

export default TableReports;