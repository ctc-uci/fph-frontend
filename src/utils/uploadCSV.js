async function UploadCSV( file ) {
    const csvString = await file.blob.text();
    const businessData = csvToArray(csvString);
    for (const business of businessData) {
        try {
            await fetch(
                `http://localhost:3001/donation/`,
                {
                  method: 'POST',
                  body: JSON.stringify(business),
                },
              );
        } catch (error) {
            console.error('Error uploading business:', error);
        }
    }
}

function csvToArray( csv ) {
    const csvToDB = {
        "Customer": "name",
        "State": "state",
        "City": "city",
        "Zip": "zip_code",
        "Customer Type": "type",
        "Main Email": "email",
        "Street1": "street",
    }
    const [header, ...lines] = csv.split('\n');
    var businesses = [];
    for (const line of lines) {
        const business = {};
        const values = line.split(',');
        for (const [i, value] of values.entries()) {
            if (header[i] in csvToDB) {
                business[csvToDB[header[i]]] = value;
            }
            else if (header[i] == "First Name") {
                business["contact_name"] = value;
            }
            else if (header[i] == "Last Name"){
                business["contact_name"] += " " + value;
            }
            else if (header[i] == "Primary Phone"){
                business["primary_phone"] = value.replace(/\D/g, '');
            }
            else if (header[i] == "Street2"){
                business["street"] = value ? value : business["street"];
            }
            else if (header[i] == "Date Joined"){
                business["join_date"] = value.split(/[^0-9]/).join('-');
            }else if (header[i] == "Website"){
                if (business["website"]) {
                    business["website"] = value;
                }
            }
        }
        businesses.push(business);
    }
}

export default UploadCSV;