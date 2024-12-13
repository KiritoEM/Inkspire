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
