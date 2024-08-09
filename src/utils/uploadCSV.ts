const DUMMY_STRING = '';
const DUMMY_INT = 0;
const DUMMY_BOOL = false;

export async function uploadCSV({ contents, backend }: { contents: string; backend: any }) {
  const businessData = csvToArray(contents);

  const DUMMY_DATE = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

  for (const business of businessData) {
    if (!business['name']) continue;

    try {
      const data = {
        name: business['name'] || DUMMY_STRING,
        contactName: business['contact_name'] || DUMMY_STRING,
        street: business['street'] || DUMMY_STRING,
        zipCode: business['zip_code'] || DUMMY_STRING,
        state: business['state'] || DUMMY_STRING,
        city: business['city'] || DUMMY_STRING,
        website: business['website'] || DUMMY_STRING,
        businessHours: DUMMY_STRING,
        primaryPhone: business['primary_phone'] || DUMMY_STRING,
        primaryEmail: business['email'] || DUMMY_STRING,
        findOut: DUMMY_STRING,
        food: DUMMY_BOOL,
        donation: DUMMY_BOOL,
        familyShelter: DUMMY_BOOL,
        wellness: DUMMY_BOOL,
        spayNeuter: DUMMY_BOOL,
        financial: DUMMY_BOOL,
        reHome: DUMMY_BOOL,
        erBoarding: DUMMY_BOOL,
        senior: DUMMY_BOOL,
        cancer: DUMMY_BOOL,
        dog: DUMMY_BOOL,
        cat: DUMMY_BOOL,
        fphPhone: DUMMY_INT,
        webNotes: DUMMY_STRING,
        internalNotes: DUMMY_STRING,
        published: DUMMY_BOOL,
        shelter: DUMMY_BOOL,
        domesticViolence: DUMMY_BOOL,
        webDateInit: DUMMY_DATE,
        entQb: DUMMY_BOOL,
        serviceRequest: DUMMY_BOOL,
        inactive: true,
        finalCheck: DUMMY_BOOL,
      };

      await backend.post('/business', JSON.stringify(data));
    } catch (error) {
      console.error('Error uploading business:', error);
    }
  }
}

function csvToArray(csv: string) {
  const csvToDB = {
    Customer: 'name',
    State: 'state',
    City: 'city',
    Zip: 'zip_code',
  };

  const [header, ...lines] = csv.split('\n');
  const headers = header.split(',');

  const businesses = [];
  for (const line of lines) {
    const business = {};
    const values = line.split(',');

    values.forEach((value, i) => {
      if (!headers[i]) return;
      if (value == '') return;

      if (headers[i].replace(' ', '_') in csvToDB) {
        business[csvToDB[headers[i]]] = value;
      } else if (headers[i] == 'First Name') {
        business['contact_name'] = value;
      } else if (headers[i] == 'Last Name') {
        business['contact_name'] += ' ' + value;
      } else if (headers[i] == 'Main Phone') {
        business['primary_phone'] = value.replace(/\D/g, '');
      } else if (headers[i] == 'Street1') {
        business['street'] = value;
      } else if (headers[i] == 'Street2') {
        business['street'] = value || business['street'];
      } else if (headers[i] == 'Date Joined') {
        business['join_date'] = value.split(/[^0-9]/).join('-');
      } else if (headers[i] == 'Website') {
        business['website'] = business['website'] || value;
      } else if (headers[i] == 'Main Email') {
        business['email'] = value;
      } else if (headers[i] == 'Customer Type') {
        business['type'] = value;
      }
    });

    businesses.push(business);
  }
  return businesses;
}
