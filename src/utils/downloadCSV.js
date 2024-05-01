// DownloadCSV.js

async function DownloadCSV(ids, tableName) {
  const headers = [];
  try {
    const response = await fetch(
      `http://localhost:3001/donation/${tableName}/selectByIds?ids=${ids.join(',')}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }

    const data = await response.json();

    // Create CSV string
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(','));

    // Add data
    data.forEach(row => {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Escape double quotes
        return `"${escaped}"`; // Encapsulate in quotes to handle commas in data
      });
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');

    // Create Blob
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Create link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tableName}_data.csv`; // Name of the file to download
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}

export default DownloadCSV;
