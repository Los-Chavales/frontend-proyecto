import DataTable from "react-data-table-component"

function TableReports(report) {
    //console.log(report.data)
    const columns = [
        {
            name: "Reportado",
            selector: row => row.reported_name,
        },
        {
            name: "Nombre",
            selector: row => row.name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Teléfono",
            selector: row => row.phone,
        },
        {
            name: "Fecha",
            selector: row => row.date_sighting,
        },
        {
            name: "Mensaje",
            selector: row => row.description,
        },
        {
            name: "Evidencia",
            selector: row => row.photo,
        },
    ]

    return (
        <div>
            <h1>Reportes de Alertas Rojas</h1>
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