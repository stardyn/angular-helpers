import {Md5} from 'ts-md5';
import * as CryptoJS from 'crypto-js';


export class SecureUtil {
  // Public methods for CAPTCHA-like authentication

  /**
   * Create public hash using CAPTCHA-like methodology
   * @param password - User password
   * @param publicKey - Public site key
   * @param partialSecret - Partial linking secret (first 16 chars from server)
   * @returns string - Public hash for transmission
   */
  public static createCaptchaHash(password: string, publicKey: string, partialSecret: string): string {
    // 1. Create base hash
    const baseHash = CryptoJS.SHA256(password).toString();

    // 2. Create verification hash using CAPTCHA-like linking
    // Client uses: baseHash + publicKey + partialSecret (from server)
    const combinedInput = baseHash + publicKey + partialSecret;
    const verificationHash = CryptoJS.SHA256(combinedInput).toString();

    // 3. Create timestamp
    const timestamp = Date.now();

    // 4. Create public payload
    const publicPayload = {
      baseHash: baseHash,
      verificationHash: verificationHash,
      timestamp: timestamp,
      siteKey: publicKey
    };

    // 5. Encode to base64 for transmission
    const jsonPayload = JSON.stringify(publicPayload);
    const encodedPayload = btoa(jsonPayload);

    // 6. Add checksum
    const checksum = CryptoJS.SHA256(encodedPayload).toString().substring(0, 8);

    const str = `PUB_${encodedPayload}_${checksum}`;

    return str;
  }

  // Keep all existing functions...
  public static Md5Upper(str: string): string {
    return Md5.hashStr(str).toUpperCase();
  }

  public static generateSalt(length: number = 16): string {
    return CryptoJS.lib.WordArray.random(length).toString();
  }

  public static sha256(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }

  public static sha512(input: string): string {
    return CryptoJS.SHA512(input).toString();
  }

  public static encryptAES(text: string, key: string): string {
    return CryptoJS.AES.encrypt(text, key).toString();
  }

  public static decryptAES(encryptedText: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
