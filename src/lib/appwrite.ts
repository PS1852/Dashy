import { Client, Account, Databases, Storage } from 'appwrite';

export const DB_ID = 'dashy-database';
export const COLLECTION_ID_PAGES = 'pages';
export const COLLECTION_ID_PROJECTS = 'projects';
export const COLLECTION_ID_BLOCKS = 'blocks';
export const COLLECTION_ID_USER_SETTINGS = 'user_settings';
export const COLLECTION_ID_TEMPLATES = 'templates';
export const STORAGE_BUCKET_IMAGES = 'dashy-images';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('69c506d800024c6eebac');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query } from 'appwrite';
