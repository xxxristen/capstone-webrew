const { validateName, validatePrice } = require('../js/input-validation.js');

// Test for validateName()
// Use 'describe' to group together related test cases
describe('validateName', () => {

  // Test with input name = "abc", less than 5
  test('displays error messages when input name is too short', () => {
    // Set up our document body
    document.body.innerHTML =
        '<div>' +
        '  <input id="input_bar_name" value="abc"/>' +
        '  <span id="nameErrorCol1" />' +
        '  <span id="nameErrorCol2" />' +
        '</div>';

    // Declare the variable to store the DOM element to be tested
    const nameError = document.getElementById("nameErrorCol1");
    const nameError2 = document.getElementById("nameErrorCol2");

    // Call the function
    validateName();

    // Test result
    expect(nameError.style.display).toBe('block');
    expect(nameError2.style.display).toBe('block');
  });

    // Test with input name = "validName", within 5 and 80
    test('hides error messages when input name is within the valid range 5-80', () => {
      // Set up our document body
      document.body.innerHTML =
          '<div>' +
          '  <input id="input_bar_name" value="validName"/>' +
          '  <span id="nameErrorCol1" />' +
          '  <span id="nameErrorCol2" />' +
          '</div>';

      // Declare the variable to store the DOM element to be tested
      const nameError = document.getElementById("nameErrorCol1");
      const nameError2 = document.getElementById("nameErrorCol2");

      // Call the function
      validateName();

      // Test result
      expect(nameError.style.display).toBe('none');
      expect(nameError2.style.display).toBe('none');
    });
});

// Test for validatePrice()
describe('validatePrice', () => {

  // Test with input price = "invalidPrice", invalid data
  test('displays error messages when input price is invalid', () => {
    // Set up our document body
    document.body.innerHTML =
        '<div>' +
        '  <input id="input_bar_price" value="invalidPrice"/>' +
        '  <span id="priceErrorCol1" />' +
        '  <span id="priceErrorCol2" />' +
        '</div>';

    // Declare the variable to store the DOM element to be tested
    const priceError = document.getElementById("priceErrorCol1");
    const priceError2 = document.getElementById("priceErrorCol2");

    // Call the function
    validatePrice();

    // Test result
    expect(priceError.style.display).toBe('block');
    expect(priceError2.style.display).toBe('block');
  });

  // Test with input price = 50, within 0 - 999.99
  test('hides error messages when input price is valid', () => {
    // Set up our document body
    document.body.innerHTML =
        '<div>' +
        '  <input id="input_bar_price" value=50 />' +
        '  <span id="priceErrorCol1" />' +
        '  <span id="priceErrorCol2" />' +
        '</div>';

    // Declare the variable to store the DOM element to be tested
    const priceError = document.getElementById("priceErrorCol1");
    const priceError2 = document.getElementById("priceErrorCol2");

    // Call the function
    validatePrice();

    // Test result
    expect(priceError.style.display).toBe('none');
    expect(priceError2.style.display).toBe('none');
  });

    // Test with input price = 1000, out of range
    test('hides error messages when input price is valid', () => {
      // Set up our document body
      document.body.innerHTML =
          '<div>' +
          '  <input id="input_bar_price" value=1000 />' +
          '  <span id="priceErrorCol1" />' +
          '  <span id="priceErrorCol2" />' +
          '</div>';

      // Declare the variable to store the DOM element to be tested
      const priceError = document.getElementById("priceErrorCol1");
      const priceError2 = document.getElementById("priceErrorCol2");

      // Call the function
      validatePrice();

      // Test result
      expect(priceError.style.display).toBe('block');
      expect(priceError2.style.display).toBe('block');
    });
});