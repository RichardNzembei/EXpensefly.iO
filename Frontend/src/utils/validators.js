/**
 * Validates a phone number (Kenyan format)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhone = (phone) => {
    // Kenyan phone number regex (starts with 07, 01, or +254)
    const regex = /^(?:0|254|\+254)?(7|1)\d{8}$/;
    return regex.test(phone);
  };
  
  /**
   * Validates an email address
   * @param {string} email - The email to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const validateEmail = (email) => {
    // Standard email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Validates password strength
   * @param {string} password - The password to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };
  
  /**
   * Validates a name (first or last name)
   * @param {string} name - The name to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const validateName = (name) => {
    // Allows letters, hyphens, apostrophes, and spaces (2-30 chars)
    const regex = /^[a-zA-Z' -]{2,30}$/;
    return regex.test(name);
  };
  
  /**
   * Validates a Kenyan ID number (optional)
   * @param {string} idNumber - The ID number to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const validateIdNumber = (idNumber) => {
    // Kenyan ID format (8 digits)
    const regex = /^\d{8}$/;
    return regex.test(idNumber);
  };
  
  /**
   * Validates a date string (YYYY-MM-DD format)
   * @param {string} date - The date to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const validateDate = (date) => {
    // Basic date format validation
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    
    // Additional check for valid date
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  };
  
  export default {
    validatePhone,
    validateEmail,
    validatePassword,
    validateName,
    validateIdNumber,
    validateDate
  };