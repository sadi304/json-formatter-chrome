// helpers
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// formatter
function formatJson(jsonToFormat) {
  errorElement.classList.add("is-hidden");
  successElement.classList.add("is-hidden");

  if (isJson(jsonToFormat)) {
    const formattedJson = JSON.stringify(JSON.parse(jsonToFormat), null, "\t");
    jsonInput.value = formattedJson;
    navigator.clipboard.writeText(formattedJson).then(
      function () {
        successElement.classList.remove("is-hidden");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  } else {
    errorElement.classList.remove("is-hidden");
  }
}

// form
const form = document.querySelector(".form");

const handleSubmit = async (e) => {
  e.preventDefault();

  formatJson(jsonInput.value);
};

form.addEventListener("submit", (e) => handleSubmit(e));

// input
const jsonInput = document.querySelector(".json-input");
jsonInput.addEventListener("paste", event => {
  event.preventDefault();
  const value = (event.clipboardData || window.clipboardData).getData('text');
  formatJson(value);
});

// alert
const errorElement = document.querySelector(".error");
const successElement = document.querySelector(".success");
