output "frontend_bucket_name" {
  description = "Name of the S3 frontend bucket"
  value       = aws_s3_bucket.frontend.bucket
}

output "frontend_website_endpoint" {
  description = "S3 static website endpoint"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}
output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.chatbot.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.chatbot.arn
}


resource "aws_apigatewayv2_api" "chatbot_api" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.chatbot_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.chatbot.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "post_chat" {
  api_id    = aws_apigatewayv2_api.chatbot_api.id
  route_key = "POST /chat"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "options_chat" {
  api_id    = aws_apigatewayv2_api.chatbot_api.id
  route_key = "OPTIONS /chat"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.chatbot_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.chatbot.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.chatbot_api.execution_arn}/*/*"
}

output "api_endpoint" {
  description = "API Gateway endpoint URL"
  value       = aws_apigatewayv2_api.chatbot_api.api_endpoint
}

output "chat_endpoint" {
  description = "Full chatbot API endpoint"
  value       = "${aws_apigatewayv2_api.chatbot_api.api_endpoint}/chat"
}