export interface ProofOfIdentity {
    idType: string;
    idNumber: string;
    countryProvided: string;
  }
  
  export interface User {
    userId: string;
    firstName: string;
    lastName: string;  
    email: string;
    password?: string;
    role: string; // "ADMIN", "DRIVER", or "RIDER"
    phone: number;
    address: string;
    proofOfIdentity?: ProofOfIdentity;
    tokenExpiry?: number;
    profilePictureUrl?: string;
  }
  