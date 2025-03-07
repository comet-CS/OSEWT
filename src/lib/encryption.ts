
// A basic encryption/decryption utility using a simple XOR cipher
// This helps obscure data in localStorage but isn't truly secure

// This key is randomly generated and specific to the client
// If used in production, use a more secure method of key management
const getEncryptionKey = (): string => {
  // Create or retrieve a client-specific key
  let key = localStorage.getItem('_exploit_client_key');
  if (!key) {
    // Generate a random string as a key
    key = Array.from(
      { length: 32 },
      () => Math.floor(Math.random() * 36).toString(36)
    ).join('');
    localStorage.setItem('_exploit_client_key', key);
  }
  return key;
};

// XOR cipher implementation
export const encrypt = (text: string): string => {
  try {
    const key = getEncryptionKey();
    // Convert to base64 first to handle UTF-8 characters
    const input = btoa(encodeURIComponent(text));
    let result = '';
    
    for (let i = 0; i < input.length; i++) {
      // XOR the character code with the key character code
      const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    
    // Convert to base64 again to make it storable
    return btoa(result);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Encryption failed');
  }
};

export const decrypt = (encrypted: string): string => {
  try {
    const key = getEncryptionKey();
    // Decode from base64
    const input = atob(encrypted);
    let result = '';
    
    for (let i = 0; i < input.length; i++) {
      // Reverse the XOR operation
      const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    
    // Decode from base64 and convert from URI encoding
    return decodeURIComponent(atob(result));
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Decryption failed');
  }
};
