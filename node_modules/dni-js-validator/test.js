const dni = require('./index');

// DNI
test('12345678Z is valid DNI', () => {
    expect(dni.isValid("12345678Z")).toBeTruthy();
});

test('12345678L is an invalid DNI', () => {
    expect(dni.isValid("X1234567L")).toBeTruthy();
});

test('Empty string is an invalid DNI', () => {
    expect(dni.isValid("")).toBeFalsy();
});

test('Number 2 is an invalid DNI', () => {
    expect(dni.isValid("2")).toBeFalsy();
});

test('null is an invalid DNI', () => {
    expect(dni.isValid(null)).toBeFalsy();
});

test('123456789101112 string is an invalid DNI', () => {
    expect(dni.isValid("123456789101112")).toBeFalsy();
});

// NIE
test('X1234567L is a valid NIE', () => {
    expect(dni.isValid("X1234567L")).toBeTruthy();
});

test('Y7890923M is a valid NIE', () => {
    expect(dni.isValid("Y7890923M")).toBeTruthy();
});

test('12345678 is an invalid DNI', () => {
    expect(dni.isValid("12345678")).toBeFalsy();
});