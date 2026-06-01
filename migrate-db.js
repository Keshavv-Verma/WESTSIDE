const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const OLD_DB_URI = 'mongodb+srv://osc-chitkara:K9nQgWP-iz63vSR@atlascluster.erhic.mongodb.net/westside';
const NEW_DB_URI = 'mongodb+srv://keshavverma987678_db_user:9Oo8fzkfugJLQsEI@cluster0.k65j7gl.mongodb.net/westside';

async function migrateDatabase() {
  let oldClient, newClient;
  
  try {
    console.log('🔗 Connecting to old database...');
    oldClient = new MongoClient(OLD_DB_URI);
    await oldClient.connect();
    const oldDb = oldClient.db('westside');
    
    console.log('🔗 Connecting to new database...');
    newClient = new MongoClient(NEW_DB_URI);
    await newClient.connect();
    const newDb = newClient.db('westside');
    
    // Get all collections from old database
    console.log('\n📋 Fetching collections...');
    const collections = await oldDb.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log(`Found ${collectionNames.length} collections:`, collectionNames);
    
    // Migrate each collection
    let totalDocuments = 0;
    
    for (const collectionName of collectionNames) {
      try {
        console.log(`\n📦 Migrating collection: ${collectionName}`);
        
        const oldCollection = oldDb.collection(collectionName);
        const newCollection = newDb.collection(collectionName);
        
        // Get all documents from old collection
        const documents = await oldCollection.find({}).toArray();
        
        if (documents.length === 0) {
          console.log(`  ⚠️  No documents found`);
          continue;
        }
        
        // Clear the new collection first
        await newCollection.deleteMany({});
        
        // Insert documents into new collection
        const result = await newCollection.insertMany(documents);
        console.log(`  ✅ Migrated ${result.insertedIds.length} documents`);
        totalDocuments += result.insertedIds.length;
        
      } catch (error) {
        console.error(`  ❌ Error migrating ${collectionName}:`, error.message);
      }
    }
    
    console.log(`\n✨ Migration completed! Total documents migrated: ${totalDocuments}`);
    
    // Verify migration
    console.log('\n🔍 Verification:');
    for (const collectionName of collectionNames) {
      const oldCount = await oldDb.collection(collectionName).countDocuments();
      const newCount = await newDb.collection(collectionName).countDocuments();
      const status = oldCount === newCount ? '✅' : '❌';
      console.log(`${status} ${collectionName}: Old(${oldCount}) -> New(${newCount})`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (oldClient) await oldClient.close();
    if (newClient) await newClient.close();
    console.log('\n✅ Databases disconnected');
  }
}

// Run migration
migrateDatabase().catch(console.error);
