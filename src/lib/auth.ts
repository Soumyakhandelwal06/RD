// Secure session helper using native Web Crypto API (runs in Node.js and Next.js Edge Middleware)

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_ascend_academy_2026_premium";

// Convert a string to an ArrayBuffer
function stringToArrayBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert an ArrayBuffer to a Hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Get the CryptoKey for HMAC
async function getCryptoKey(): Promise<CryptoKey> {
  const secretBytes = stringToArrayBuffer(JWT_SECRET);
  return await crypto.subtle.importKey(
    "raw",
    secretBytes as any,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createToken(payload: object): Promise<string> {
  const dataStr = JSON.stringify({
    ...payload,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
  });
  
  // Encode payload as Base64URL
  const payloadBase64 = btoa(dataStr)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    stringToArrayBuffer(payloadBase64) as any
  );
  
  const signatureHex = bufferToHex(signatureBuffer);
  return `${payloadBase64}.${signatureHex}`;
}

export async function verifyToken(token: string): Promise<any | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadBase64, signatureHex] = parts;

  try {
    const key = await getCryptoKey();
    const payloadBytes = stringToArrayBuffer(payloadBase64);
    
    // Verify signature
    const signatureBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as any,
      payloadBytes as any
    );

    if (!isValid) return null;

    // Decode payload
    const decodedStr = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    );
    const payload = JSON.parse(decodedStr);

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
