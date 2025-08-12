# README

About: Save data to into Tana

## **Step 1: Get Your Tana API Token**

You need an API token to work with the Input API. Tokens are assigned per workspace and can be generated in the Tana client:

- In the lower left corner of Tana, go Settings > API Tokens  
- Select which workspace you want to create a token for, and click Create token
- Click Copy to copy the token you just created

## **Step 2: Understand the API Endpoint and Restrictions**

**API Endpoint:**
<https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2>

**Key Restrictions:**

- POST only
- One call per second per token
- A maximum of 100 nodes created per call
- The payload size is limited to 5000 characters
- Will not sync on workspaces with more than 750k nodes

## **Step 3: Basic JSON Structure**

Creating a node is done by sending a JSON object to the addToNoteV2 endpoint. The object has two keys:

- targetNodeId refers to where the nodes will be created. By default, nodes will be placed in the Library. Other targets include SCHEMA, INBOX, or any nodeID.
- The nodes key is an array of one or more objects.

## **Step 4: Create Your First Simple Node**

Here's the simplest example to post a basic node:

```json
{
  "nodes": [
    {
      "name": "My first API node",
      "description": "This is created via the Tana Input API"
    }
  ]
}
```

## **Step 5: Make the HTTP Request**

Use any HTTP client (curl, Postman, Python requests, etc.) to make a POST request:

**Headers:**

- `Authorization: Bearer YOUR_API_TOKEN`
- `Content-Type: application/json`

**Example with curl:**

```bash
curl -X POST https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2 \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {
        "name": "My first API node",
        "description": "This is created via the Tana Input API"
      }
    ]
  }'
```

## **Step 6: Advanced Node Types**

### **Target Specific Locations:**

```json
{
  "targetNodeId": "INBOX",
  "nodes": [
    {
      "name": "Node in my inbox"
    }
  ]
}
```

### **Create Different Data Types:**

**Date Node:**

```json
{
  "nodes": [
    {
      "dataType": "date",
      "name": "2023-12-01 08:00:00"
    }
  ]
}
```

**URL Node:**

```json
{
  "nodes": [
    {
      "dataType": "url",
      "name": "https://example.com"
    }
  ]
}
```

**Checkbox Node:**

```json
{
  "nodes": [
    {
      "dataType": "boolean",
      "name": "My checkbox node",
      "value": true
    }
  ]
}
```

## **Step 7: Working with Supertags and Fields**

To apply existing supertags to a node, use its nodeID. Get the nodeID of a supertag in Tana by going to the supertag config panel and use the command line Show API schema

**To get supertag information:**

1. In Tana, go to your supertag configuration panel
2. Run the command "Show API Schema" on the supertag title
3. This will give you the complete structure and IDs needed

## **Step 8: Create Fields and Supertags**

**Create a new field:**

```json
{
  "targetNodeId": "SCHEMA",
  "nodes": [
    {
      "name": "Author",
      "description": "Who wrote the book?",
      "supertags": [{"id": "SYS_T02"}]
    }
  ]
}
```

**Create a new supertag:**

```json
{
  "targetNodeId": "SCHEMA",
  "nodes": [
    {
      "name": "Book",
      "description": "A supertag for my books",
      "supertags": [{"id": "SYS_T01"}]
    }
  ]
}
```

## **Step 9: Getting Node IDs**

To retrieve the nodeID for different types of objects, use the command Copy link to get the URL, and grab the part after the = sign. Example:

- URL: <https://app.tana.inc?nodeid=z-p8LdQk6I76>  
- nodeID: z-p8LdQk6I76

## **Next Steps for Organization**

Since you mentioned you're working on organizing your life, I'd recommend:

1. **Start simple** - Create a few basic nodes first to test the connection
2. **Plan your structure** - Think about what supertags you'll need (Projects, Tasks, People, etc.)
3. **Create your supertags and fields** using the Schema target
4. **Build automation** gradually by connecting the API to your other tools

Would you like me to help you create specific JSON payloads for your organization needs, or do you have questions about any of these steps?
