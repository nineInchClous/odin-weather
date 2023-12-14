/**
 * Inputs, label and error messages must be placed inside a div.
 * Error messages must have the class "form-error" and be placed after the input they are related to.
 * Inputs can have an attribute called 'data-name'. The value will be displayed inside the error message to mention the name of the input. Example: for en email input, set the attribute to "email address". The result will then be "You need to enter a valid email address" in the error message.
 * For the small star near the label for required input, just use a span inside the label element.
 * Set the form to novalidate to not display default error messages.
 * Use the HTML built-in validation features like minLength, pattern, etc...
 */

import '../css/formValidation.scss';

const forms = document.getElementsByTagName('form');

/**
 * Capitalize a word for the error message
 * @param {string} pWord The word to capitalize
 * @returns The capitalized word
 */
function capitalize(pWord) {
  return pWord[0].toUpperCase() + pWord.substring(1);
}

/**
 * Show a personalized error on a given input
 * @param {HTMLElement} pInput The invalid input
 * @param {string} pError The personalized error message to show
 */
export function showPersonalizedError(pInput, pError) {
  const errorSpan = pInput.nextElementSibling;
  errorSpan.classList.add('show-form-error');
  errorSpan.textContent = pError;
  pInput.classList.add('invalid-input');
}

/**
 * Validate an input element. If it's invalid, display an error message
 * @param {HTMLElement} pInput The input element to validate
 * @returns True if the input is valid, otherwise false
 */
export function validateInput(pInput) {
  const errorSpan = pInput.nextElementSibling;
  errorSpan.classList.remove('show-form-error');
  errorSpan.textContent = '';

  pInput.classList.remove('invalid-input');
  let inputName = pInput.name;
  if (pInput.hasAttribute('data-name')) {
    inputName = pInput.getAttribute('data-name');
  }

  if (pInput.validity.patternMismatch || pInput.validity.typeMismatch) {
    errorSpan.textContent += `You need to enter a valid ${inputName}. `;
  }
  if (pInput.validity.tooLong) {
    errorSpan.textContent += `${capitalize(
      inputName
    )} is too long. It should be under ${
      pInput.maxLength
    } characters. You entered ${pInput.value.length}. `;
  }
  if (pInput.validity.tooShort) {
    errorSpan.textContent += `${capitalize(
      inputName
    )} is too short. It should be at least ${
      pInput.minLength
    } characters. You entered ${pInput.value.length}. `;
  }
  if (pInput.validity.rangeOverflow) {
    errorSpan.textContent += `${capitalize(
      inputName
    )} value is too high. It should be under ${pInput.max}. `;
  }
  if (pInput.validity.rangeUnderflow) {
    errorSpan.textContent += `${capitalize(
      inputName
    )} value is too low. It should be at least ${pInput.min}. `;
  }
  if (pInput.validity.valueMissing) {
    errorSpan.textContent += `${capitalize(inputName)} is required. `;
  }

  if (errorSpan.textContent.length > 0) {
    errorSpan.classList.add('show-form-error');
    pInput.classList.add('invalid-input');
    return false;
  }

  return true;
}

/**
 * Validate a form
 * @param {HTMLElement} pForm The form to validate
 * @returns True if the form is valid, otherwise false
 */
export function validateForm(pForm) {
  const inputs = pForm.querySelectorAll('input, select, textarea');
  let validForm = true;

  Object.values(inputs).forEach((input) => {
    if (!validateInput(input)) {
      validForm = false;
    }
  });

  return validForm;
}

/**
 * Remove the error message on input event if the input element is valid
 * @param {HTMLElement} pInput The input element to validate
 */
function updateIfValid(pInput) {
  if (pInput.validity.valid) {
    const errorSpan = pInput.nextElementSibling;
    errorSpan.className = 'form-error';
    errorSpan.textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Object.values(forms).forEach((form) => {
    const inputs = form.querySelectorAll('input, select, textarea');
    Object.values(inputs).forEach((input) => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => updateIfValid(input));
    });

    // form.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   validateInputs(inputs);
    // });
  });
});
