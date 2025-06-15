const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener("click", runValidation);


function runValidation() {
  if (validatedName() &&
      validatedEmail() &&
      validatedMessage())
      {
        window.alert('Form has been submitted successfully');
        setErrorText('Form has been submitted successfully');
      }      
}

function validatedName() {
  const txtName = document.getElementById('input_name');
  const theName = txtName.value.trim();
  
  if (!isSafe(theName))
  {
    setErrorText('Malicious code detected');
    return false;
  }

  if (theName.length < 1)
  {
    window.alert('Name is required');
    setErrorText('Name is required');
    return false;
  }
  return true;
}

function validatedEmail() {
  const txtEmail = document.getElementById('input_email');
  const theEmail = txtEmail.value.trim();

  if (!isSafe(theEmail))
  {
    setErrorText('Malicious code detected');
    return false;
  }

  if (theEmail.length < 5)
  {
    window.alert('Valid email is required');
    setErrorText('Valid email is required');
    return false;
  }
  
  const emailRegexExpr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegexExpr.test(theEmail))
  {
    window.alert('Valid email is required');
    setErrorText('Valid email is required');
    return false;
  }
  return true;
}

function validatedMessage() {
  const txtMessage = document.getElementById('input_message');
  const theMessage = txtMessage.value.trim();
  
  if (!isSafe(theMessage))
  {
    setErrorText('Malicious code detected');
    return false;
  }

  if (theMessage.length < 2)
  {
    window.alert('Message cannot be empty');
    setErrorText('Message cannot be empty');
    return false;
  }

  return true;
}

function setErrorText(theText) {
  const txtResult = document.getElementById('form_result');
  txtResult.innerText = theText;
}

// checks for malicious code injection
function isSafe(theMessage)  {  
  const pattern = /<[^>]*script[^>]*>|<[^>]+>|javascript:/gi;
  return !pattern.test(theMessage);
}