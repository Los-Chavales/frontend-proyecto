const sort_dates = (data) => {
  for (const dates of data) {
    let date = dates.date_sighting
    let formatDate = new Date(date);
    dates.date_sighting = formatDate
  }

  data.sort((a, b) => b.date_sighting - a.date_sighting)

  for (const row of data) {
    let dateFormat = new Date(row.date_sighting);
    if (dateFormat != "Invalid Date") row.date_sighting = dateFormat.toLocaleDateString("es-ES", { timeZone: 'UTC' });
  } 

}

export default sort_dates;