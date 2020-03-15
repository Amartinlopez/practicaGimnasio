"use strict";

exports.isValid = function (value) {
    var validChars = 'trwagmyfpdxbnjzsqvhlcket';
    var dniRexp = /^[0-9]{8}[trwagmyfpdxbnjzsqvhlcket]{1}$/i;
    var nieRexp = /^[XY]{1}[0-9]{7}[trwagmyfpdxbnjzsqvhlcket]{1}$/i;
    var string = ((value == null) ? "" : value).toString().toLowerCase();

    if (!dniRexp.test(string) && !nieRexp.test(string)) return false;

    var nie = string
        .replace(/^[x]/, '0')
        .replace(/^[y]/, '1')

    var letter = string.substr(-1);
    var charIndex = parseInt(nie.slice(0, -1)) % 23;

    return validChars.charAt(charIndex) === letter;
}

