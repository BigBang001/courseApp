enum Role {
    ADMIN =
    'ADMIN',
    USER = 'USER'
}

export interface BankAccount {
    id: string
    accountNumber: string
    accountHolderName: string
    ifscCode: string
    userId: string
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    email: string
    fullName: string
    bio: string
    image: string
    phoneNumber: string
    role: Role
    bankAccount: BankAccount 
    createdAt: string
    updatedAt: string
}