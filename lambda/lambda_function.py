import json
import boto3

bedrock_agent_runtime = boto3.client(
    service_name="bedrock-agent-runtime",
    region_name="us-east-1"
)

KNOWLEDGE_BASE_ID = "PN8D9UCTLL"
MODEL_ARN = "arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-micro-v1:0"

CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,POST"
}


def lambda_handler(event, context):
    try:
        method = event.get("requestContext", {}).get("http", {}).get("method", "")

        if method == "OPTIONS":
            return {
                "statusCode": 204,
                "headers": CORS_HEADERS,
                "body": ""
            }

        if "body" in event and event["body"]:
            body = json.loads(event["body"])
            question = body.get("question", "What AWS services has Gokhan used?")
        else:
            question = event.get("question", "What AWS services has Gokhan used?")

        response = bedrock_agent_runtime.retrieve_and_generate(
            input={
                "text": question
            },
            retrieveAndGenerateConfiguration={
                "type": "KNOWLEDGE_BASE",
                "knowledgeBaseConfiguration": {
                    "knowledgeBaseId": KNOWLEDGE_BASE_ID,
                    "modelArn": MODEL_ARN
                }
            }
        )

        answer = response["output"]["text"]

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "project": "aws-bedrock-rag-chatbot",
                "question": question,
                "answer": answer
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "project": "aws-bedrock-rag-chatbot",
                "error": str(e)
            })
        }
    
    
