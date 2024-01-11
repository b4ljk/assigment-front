export interface SuccessFullAuthType {
  user: User;
  tokens: Tokens;
}

export interface Tokens {
  access: Access;
  refresh: Access;
}

export interface Access {
  token: string;
  expires: string;
}

export interface User {
  id: number;
  email: null;
  name: null;
  role: string;
  isEmailVerified: boolean;
  publicAddress: string;
  phone: null;
  createdAt: string;
  updatedAt: string;
  CryptoLoginNonce: CryptoLoginNonce;
}

export interface CryptoLoginNonce {
  userId: number;
  nonce: string;
  expires: string;
}
