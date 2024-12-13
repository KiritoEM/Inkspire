/**
 * Evaluates the strength of a given password.
 *
 * @param password - The password string to evaluate.
 * @returns A string indicating the strength of the password:
 *          "Fort" for strong passwords,
 *          "Moyen" for medium strength passwords,
 *          "Faible" for weak passwords,
 *          or an empty string if the password is not provided.
 */
const evaluatePasswordStrength = (password: string) => {
    let score = 0;

    if (!password) return "";

    // Check password length
    if (password.length > 8) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains numbers
    if (/\d/.test(password)) score += 1;
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score >= 5) return "Fort";
    if (score >= 3) return "Moyen";
    if (score >= 1) return "Faible";
}


export { evaluatePasswordStrength }
