// downloadCSV.js

async function downloadCSV(ids, isDonation = false, backend) {
  const headers = {
    'Business Name': 'name',
    'Business Phone': 'primary_phone',
    'Business Email': 'primary_email',
    'Donation Submission Date': 'max_date',
    'Donation Reporter': 'reporter',
    'Food Bank Donation': 'food_bank_donation',
    'Canned Dog Food Quantity': 'canned_dog_food_quantity',
    'Dry Dog Food Quantity': 'dry_dog_food_quantity',
    'Canned Cat Food Quantity': 'canned_cat_food_quantity',
    'Dry Cat Food Quantity': 'dry_cat_food_quantity',
    'Miscellaneous Items': 'miscellaneous_items',
    'Volunteer Hours': 'volunteer_hours',
  };

  try {
    let response;
    if (isDonation) {
      response = await backend.get(`/donation/donation_tracking/selectByIds?ids=${ids.join(',')}`);
      console.log('RESPONSE:', response);
    } else {
      response = await backend.get(`/donation/selectByIds?ids=${ids.join(',')}`);
    }

    if (!response.statusText === 'OK') {
      throw new Error('Failed to fetch data from the server');
    }

    const data = await response.data;

    // Create CSV string
    const csvRows = [];

    csvRows.push(Object.keys(headers).join(','));

    data.forEach((row) => {
      const values = Object.values(headers).map((key) => {
        const escaped = ('' + row[key]).replace(/"/g, '\\"');
        return `"${escaped}"`;
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
    link.download = `business_data.csv`; // Name of the file to download
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up

    return true; // TODO: fix me )= (error handling etc)
  } catch (error) {
    console.error(error);
  }
}

export default downloadCSV;
