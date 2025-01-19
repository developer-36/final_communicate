function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]; // Extract the payload part
    if (!base64Url) {
      throw new Error('Invalid token format');
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Decode Base64URL to Base64
    const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '='); // Add padding if needed
    const jsonPayload = decodeURIComponent(
      atob(paddedBase64)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
    return JSON.parse(jsonPayload); // Parse to JSON
  } catch (error) {
    console.error('Failed to parse JWT:', error.message);
    return null; // Handle the error gracefully
  }
}

export default parseJwt;
