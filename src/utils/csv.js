export function downloadCSV(data, filename = "bulk_wallet_scores.csv") {
  if (!data || data.length === 0) return;

  const headers = ["address", "score", "band", "summary"];

  const csvRows = [
    headers.join(","), // header row
    ...data.map((row) =>
      [row.address, row.score, row.band, `"${row.summary}"`].join(",")
    ),
  ];

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}