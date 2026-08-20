export interface Product {
    amount: number;
    ownerName: string;
    productName: string;
    description: string;
    imageUrl: string;
    recommendedImages: string[];
    title: string;
    subtitle: string;
    ownerImage:string
    isActive: boolean,
    isOutOfStock: boolean,
    createdAt: any
    id:string
  }
  

  export interface Transaction {
    id:string
    amount: number;
    balance: number;
    created: Date;
    custoer: string;
    type: 'debit' | 'credit';
    userId: string;
  }
  

  export interface BankAccountDetails {
    accountName: string;        // "kingsley aldk"
    accountNumber: string;      // "1234567890"
    amount: number;             // "111111111"
    bankAddress: string;        // "2222"
    bankName: string;           // "123456"
    createdAt: Date;            // Timestamp
    holderAddress: string;      // "123456"
    narration: string;          // "111111111111"
    pin: string;                // "1234"
    routingNumber: string;      // "11111"
    swiftBicIban: string;       // "" (Empty)
    transferType: "local" | "international";  // Transfer type (fixed as "local")
    userId:string,
        userRole:string,
        id:string
        balance:number
        status:""
  }


 export interface UserLoanDetails {
    address: string;
    closed: boolean;
    createdAt: Date; // You can convert this to Date if needed.
    email: string;
    fullName: string;
    id: string;
    loanAmount: string;
    loanPurpose: string;
    phone: string;
    status: string;
    userRole: string;
  }