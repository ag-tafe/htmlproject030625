// Ninja API form
const ninja_header = document.getElementById('ninja_header');
ninja_header.innerText = 'Ninja API App';

// select checkbox with API
const chkBankRouting = document.getElementById('chkBankRouting');
const chkCommodityPrice = document.getElementById('chkCommodityPrice');

// query parameter section
const ninja_query_parameter = document.getElementById('ninja_query_parameter');
const inpValue = document.createElement('input');
inpValue.type = 'text';
inpValue.id = 'inpValue';
ninja_query_parameter.appendChild(inpValue);
ninja_query_parameter.appendChild(document.createElement('br'));
// Submit button
const btnSubmit = document.createElement('input');
btnSubmit.type = 'button';
btnSubmit.value = 'Submit';
btnSubmit.id = 'btnSubmit';
btnSubmit.style.padding = '10px';
btnSubmit.style.marginTop = '10px';
btnSubmit.addEventListener("click", runApiQuery);
ninja_query_parameter.appendChild(btnSubmit);

// query result section
const ninja_result = document.getElementById('ninja_result');
ninja_result.innerText = 'This is the query result:';

const apiKey ='f1NMKM+ZfNz6MHPK95Y5Ag==QGi57hhhP0FbTEDI';
let apiRouting = '';

document.getElementById('chkBankRouting').addEventListener('change', ClickedOnRouting);

// automatic unticking of the other checkbox
function ClickedOnRouting() {
  if (chkBankRouting.checked == true) {
    chkCommodityPrice.checked = false;
    apiRouting = 'https://api.api-ninjas.com/v1/routingnumber?routing_number=';
    
  }
  ClearInputResponse();
  inpValue.value = '111000012';
}

document.getElementById('chkCommodityPrice').addEventListener('change', ClickedOnCommodity);          

// automatic unticking of the other checkbox
function ClickedOnCommodity() {
  if (chkCommodityPrice.checked == true) {
    chkBankRouting.checked = false;
    apiRouting = 'https://api.api-ninjas.com/v1/commodityprice?name=';
    
  }
  ClearInputResponse();
  inpValue.value = 'platinum';
}

// clear input and response containers
function ClearInputResponse() {
  inpValue.value = '';
  ninja_result.innerText = '';
}

// clicked "Submit" button
async function runApiQuery() {
  if (chkBankRouting.checked == true) {
    // bank routing number is always 9 digits long
    if (inpValue.value.length !== 9) {
      alert("Error! Bank rounting number must be 9 digits long!");
      return;
    }
    // regex for digits
    if (/[^0-9]/.test(inpValue.value)) {
      alert("Error! Bank rounting number can contain only digits!");
      return;
    }
  }
  else {
    // commodity name can't be empty
    if (inpValue.value.length === 0) {
      alert("Error! Please input commodity name!");
      return;
    }
    // commodity name contains only letters and underscore symbol
    if (!/^[A-Za-z_]+$/.test(inpValue.value)) {
      alert("Error! Commodity name must contain only letters and underscore symbol!");
      return;
    }    
  }


  
  const queryString = apiRouting + inpValue.value;
  try {
    const reply = await fetch(queryString, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
          }
    });

    if (!reply.ok) {
      throw new Error(`An HTTP Error has occurred:\n Status code: ` + 
                      `${reply.status}\n Status text: ` +
                      `${reply.statusText || 'Unknown status'}`);
    }

    const jsonReply = await reply.json();
    let resultString = '';
    
    if (chkBankRouting.checked == true) {
      resultString = `City: ${jsonReply[0].city}\n` + 
                      `State: ${jsonReply[0].state}\n` + 
                      `Country: ${jsonReply[0].country}\n` + 
                      `Timezone: ${jsonReply[0].timezone}\n`;

    }
    else {    
      // Unix timestamp (in seconds)
      const unixTime = jsonReply.updated; // Example: May 10, 2024 00:00:00 UTC

      // Convert to milliseconds
      const theDate = new Date(unixTime * 1000);

      // Format in Perth time (Australia/Perth is GMT+8)
      const perthTime = theDate.toLocaleString('en-AU', {
        timeZone: 'Australia/Perth',
        timeStyle: 'medium',
        dateStyle: 'full'
      });

      resultString = `Exchange: ${jsonReply.exchange}\n` + 
                      `Commodity: ${jsonReply.name}\n` + 
                      `Price ($USD): ${jsonReply.price}\n` + 
                      `Updated: ${perthTime}\n`;
    }

    ninja_result.innerText = resultString;
  } catch (error) {
    // Processing errors
    ninja_result.innerText = "An error has occurred: " + error.message;
  }  
}