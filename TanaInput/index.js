require('dotenv').config();
const axios = require('axios');

// Tana API configuration
const TANA_API_URL = 'https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2';
const API_TOKEN = process.env.TANA_API_TOKEN;

// Validate environment variables
if (!API_TOKEN) {
    console.error('❌ Error: TANA_API_TOKEN not found in environment variables');
    console.log('Please create a .env file with your Tana API token');
    console.log('Example: TANA_API_TOKEN=your_token_here');
    process.exit(1);
}

// Function to create a test node in Tana
async function createTestNode() {
    const currentTime = new Date().toISOString();
    
    // Basic test payload - creates a simple node
    const payload = {
        nodes: [
            {
                name: `Test Node - ${currentTime}`,
                description: `This is a test node created via the Tana Input API at ${currentTime}`
            }
        ]
    };

    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log('🚀 Sending test node to Tana...');
        console.log('📝 Payload:', JSON.stringify(payload, null, 2));
        
        const response = await axios.post(TANA_API_URL, payload, { headers });
        
        console.log('✅ Success! Node created in Tana');
        console.log('📊 Response status:', response.status);
        console.log('📋 Response data:', response.data);
        
        return response.data;
        
    } catch (error) {
        console.error('❌ Error creating node in Tana:');
        
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        
        throw error;
    }
}

// Function to create a node in the INBOX
async function createInboxNode() {
    const currentTime = new Date().toISOString();
    
    const payload = {
        targetNodeId: "INBOX",
        nodes: [
            {
                name: `Inbox Test - ${currentTime}`,
                description: "This test node was sent directly to your Tana inbox"
            }
        ]
    };

    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log('\n📥 Sending test node to Tana INBOX...');
        console.log('📝 Payload:', JSON.stringify(payload, null, 2));
        
        const response = await axios.post(TANA_API_URL, payload, { headers });
        
        console.log('✅ Success! Node created in Tana INBOX');
        console.log('📊 Response status:', response.status);
        console.log('📋 Response data:', response.data);
        
        return response.data;
        
    } catch (error) {
        console.error('❌ Error creating inbox node:', error.message);
        throw error;
    }
}

// Main function to run the tests
async function main() {
    console.log('🎯 Starting Tana Input API Test');
    console.log('🔑 Using API token:', API_TOKEN.substring(0, 10) + '...');
    console.log('🌐 API endpoint:', TANA_API_URL);
    console.log('⚠️  Rate limit: 1 call per second per token\n');

    try {
        // Test 1: Create a basic node (goes to Library by default)
        await createTestNode();
        
        // Wait 1 second to respect rate limit
        console.log('\n⏱️  Waiting 1 second (rate limit)...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test 2: Create a node in INBOX
        await createInboxNode();
        
        console.log('\n🎉 All tests completed successfully!');
        console.log('📱 Check your Tana workspace to see the new nodes');
        
    } catch (error) {
        console.error('\n💥 Test failed:', error.message);
        process.exit(1);
    }
}

// Run the tests
if (require.main === module) {
    main();
}

module.exports = {
    createTestNode,
    createInboxNode
};
