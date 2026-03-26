import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('69c506d800024c6eebac');               // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';
