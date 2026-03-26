import { Client, Databases } from 'node-appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69c506d800024c6eebac')
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DB_ID = 'dashy-database';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function addAttr(collectionId, fn) {
  try {
    await fn();
    await delay(300);
  } catch (e) {
    if (e.message && e.message.includes('already exists')) {
      console.log(`  Attribute already exists, skipping.`);
    } else {
      console.error(`  Error: ${e.message}`);
    }
  }
}

async function main() {
  console.log('=== Dashy Schema Setup ===\n');

  // ─── Update pages collection ───────────────────────────────────────────
  console.log('📄 Updating pages collection...');
  const pageAttrs = [
    () => databases.createStringAttribute(DB_ID, 'pages', 'icon', 10, false),
    () => databases.createStringAttribute(DB_ID, 'pages', 'cover_url', 2048, false),
    () => databases.createStringAttribute(DB_ID, 'pages', 'parent_id', 36, false),
    () => databases.createBooleanAttribute(DB_ID, 'pages', 'is_favorite', false, false),
    () => databases.createBooleanAttribute(DB_ID, 'pages', 'is_deleted', false, false),
    () => databases.createStringAttribute(DB_ID, 'pages', 'deleted_at', 50, false),
    () => databases.createFloatAttribute(DB_ID, 'pages', 'sort_order', false),
    () => databases.createIntegerAttribute(DB_ID, 'pages', 'word_count', false),
    () => databases.createStringAttribute(DB_ID, 'pages', 'last_edited_by', 100, false),
    () => databases.createStringAttribute(DB_ID, 'pages', 'template_id', 36, false),
  ];
  for (const fn of pageAttrs) await addAttr('pages', fn);
  console.log('  ✅ pages attributes done\n');

  // ─── Create blocks collection ───────────────────────────────────────────
  console.log('🧱 Creating blocks collection...');
  try {
    await databases.createCollection(DB_ID, 'blocks', 'blocks', [
      'read("any")', 'create("any")', 'update("any")', 'delete("any")'
    ]);
    console.log('  Created blocks collection.');
  } catch(e) {
    console.log(`  blocks collection: ${e.message}`);
  }
  await delay(500);

  const blockAttrs = [
    () => databases.createStringAttribute(DB_ID, 'blocks', 'page_id', 36, true),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'userId', 100, true),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'type', 50, true),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'content', 65535, false),
    () => databases.createBooleanAttribute(DB_ID, 'blocks', 'checked', false, false),
    () => databases.createFloatAttribute(DB_ID, 'blocks', 'sort_order', true),
    () => databases.createIntegerAttribute(DB_ID, 'blocks', 'indent_level', false, 0),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'language', 50, false),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'color', 30, false),
    () => databases.createStringAttribute(DB_ID, 'blocks', 'callout_icon', 10, false),
  ];
  for (const fn of blockAttrs) await addAttr('blocks', fn);

  // Wait for attributes to be available before creating indexes
  console.log('  Waiting for attributes to propagate...');
  await delay(3000);

  try {
    await databases.createIndex(DB_ID, 'blocks', 'idx_page_id', 'key', ['page_id']);
    console.log('  Created index: page_id');
  } catch(e) { console.log(`  index page_id: ${e.message}`); }
  await delay(500);
  try {
    await databases.createIndex(DB_ID, 'blocks', 'idx_user_id', 'key', ['userId']);
    console.log('  Created index: userId');
  } catch(e) { console.log(`  index userId: ${e.message}`); }
  console.log('  ✅ blocks attributes done\n');

  // ─── Create user_settings collection ────────────────────────────────────
  console.log('⚙️  Creating user_settings collection...');
  try {
    await databases.createCollection(DB_ID, 'user_settings', 'user_settings', [
      'read("any")', 'create("any")', 'update("any")', 'delete("any")'
    ]);
    console.log('  Created user_settings collection.');
  } catch(e) {
    console.log(`  user_settings collection: ${e.message}`);
  }
  await delay(500);

  const settingsAttrs = [
    () => databases.createStringAttribute(DB_ID, 'user_settings', 'userId', 100, true),
    () => databases.createStringAttribute(DB_ID, 'user_settings', 'full_name', 200, false),
    () => databases.createStringAttribute(DB_ID, 'user_settings', 'avatar_url', 2048, false),
    () => databases.createStringAttribute(DB_ID, 'user_settings', 'theme', 20, false, 'light'),
    () => databases.createStringAttribute(DB_ID, 'user_settings', 'font_style', 30, false, 'serif'),
    () => databases.createIntegerAttribute(DB_ID, 'user_settings', 'sidebar_width', false, 240),
    () => databases.createBooleanAttribute(DB_ID, 'user_settings', 'small_text', false, false),
    () => databases.createBooleanAttribute(DB_ID, 'user_settings', 'full_width', false, false),
  ];
  for (const fn of settingsAttrs) await addAttr('user_settings', fn);

  await delay(3000);
  try {
    await databases.createIndex(DB_ID, 'user_settings', 'idx_user_id_unique', 'unique', ['userId']);
    console.log('  Created unique index: userId');
  } catch(e) { console.log(`  index userId: ${e.message}`); }
  console.log('  ✅ user_settings done\n');

  // ─── Create templates collection ────────────────────────────────────────
  console.log('📚 Creating templates collection...');
  try {
    await databases.createCollection(DB_ID, 'templates', 'templates', [
      'read("any")', 'create("any")', 'update("any")', 'delete("any")'
    ]);
    console.log('  Created templates collection.');
  } catch(e) {
    console.log(`  templates collection: ${e.message}`);
  }
  await delay(500);

  const templateAttrs = [
    () => databases.createStringAttribute(DB_ID, 'templates', 'title', 300, true),
    () => databases.createStringAttribute(DB_ID, 'templates', 'description', 500, false),
    () => databases.createStringAttribute(DB_ID, 'templates', 'icon', 10, false),
    () => databases.createStringAttribute(DB_ID, 'templates', 'category', 50, false),
    () => databases.createStringAttribute(DB_ID, 'templates', 'blocks_json', 65535, true),
    () => databases.createBooleanAttribute(DB_ID, 'templates', 'is_public', false, true),
    () => databases.createStringAttribute(DB_ID, 'templates', 'userId', 100, false),
  ];
  for (const fn of templateAttrs) await addAttr('templates', fn);
  console.log('  ✅ templates done\n');

  console.log('=== Schema setup complete! ===');
}

main().catch(console.error);
