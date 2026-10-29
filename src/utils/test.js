import assert from 'node:assert/strict';
import { calculateMortgage } from './calculateMortgage.js';
import { validateInputs } from './validateInputs.js';

const standard = calculateMortgage(5000000, 8.5, 20);
assert.deepEqual(standard, {
  emi: 43391.16,
  totalPayment: 10413878.8,
  totalInterest: 5413878.8
});

const zeroRate = calculateMortgage(1000000, 0, 10);
assert.deepEqual(zeroRate, {
  emi: 8333.33,
  totalPayment: 1000000,
  totalInterest: 0
});

assert.equal(validateInputs(5000000, 8.5, 20).isValid, true);
assert.equal(validateInputs(1000000, 0, 20).isValid, true);
assert.equal(validateInputs('', 8.5, 20).loan, 'Loan amount is required');
assert.equal(validateInputs(5000000, '8.5abc', 20).rate, 'Interest rate must be a valid number');
assert.equal(validateInputs(5000000, 8.5, 20.5).years, 'Loan tenure must be a whole number of years');
assert.throws(() => calculateMortgage(0, 8.5, 20), RangeError);
assert.throws(() => calculateMortgage(1000000, -1, 20), RangeError);

console.log('All mortgage calculation and validation tests passed.');
