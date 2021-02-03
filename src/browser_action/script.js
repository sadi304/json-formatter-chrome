// helpers
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


// form
const form = document.querySelector(".form");

const handleSubmit = async e => {
  e.preventDefault();

  errorElement.classList.add('is-hidden');
  
  const jsonToFormat = jsonInput.value;

  if (isJson(jsonToFormat)) {
    var formattedJson = JSON.stringify(JSON.parse(jsonToFormat), null, "\t");
    jsonInput.value = formattedJson;
    navigator.clipboard.writeText(formattedJson).then(function() {
      errorElement.classList.remove('is-hidden');
      errorElement.innerHTML = "JSON Copied!";
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  } else {
    errorElement.classList.remove('is-hidden');
    errorElement.innerHTML = "Invalid JSON!";
  }

};

form.addEventListener("submit", e => handleSubmit(e));

// input 
const jsonInput = document.querySelector(".json-input");

// alert
const errorElement = document.querySelector('.error');