# Architecture Diagram

## AWS Bedrock RAG Chatbot Architecture

```text
User Browser
    ↓
S3 Static Website Frontend
    ↓
Amazon API Gateway
    ├── OPTIONS /chat  → CORS preflight request
    └── POST /chat     → Chatbot request
    ↓
AWS Lambda
    ↓
Amazon Bedrock Knowledge Base
    ↓
Vector Store
    ↓
Amazon S3 Document Bucket
    ↓
Amazon Nova Micro Foundation Model
    ↓
AI-generated response
```

## Main Components

### S3 Static Website Frontend

Hosts the chatbot frontend files:

```text
index.html
style.css
script.js
```

### API Gateway

Exposes the chatbot backend through an HTTP API.

Routes:

```text
POST /chat
OPTIONS /chat
```

### AWS Lambda

Handles API requests, processes the user question, calls Amazon Bedrock Knowledge Bases, and returns the AI-generated response.

### Amazon Bedrock Knowledge Base

Retrieves relevant information from private documents stored in Amazon S3.

### S3 Document Bucket

Stores the source document used by the Knowledge Base.

Example:

```text
gokhan-profile-cloud-engineer.txt
```

### CORS Handling

The browser sends an `OPTIONS /chat` preflight request before the actual `POST /chat` request.

This project handles CORS by:

1. Creating an `OPTIONS /chat` route in API Gateway.
2. Connecting the route to the Lambda function.
3. Returning CORS headers from Lambda.
