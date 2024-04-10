import DataTable from "react-data-table-component"

function TableReports(report) {
    console.log(report.title, report.data)
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
            selector: row => row.date_sighting.toString(),
        },
        {
            name: "Mensaje",
            selector: row => row.description,
        },
        {
            name: "Evidencia",
            selector: row => <button><a href={`http://localhost:4000/${row.photo}`} target="_blank" rel="noopener noreferrer">Ver foto</a></button>,
        },
    ]

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