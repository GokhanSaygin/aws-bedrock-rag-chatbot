# AWS Bedrock RAG Chatbot | AI Cloud Portfolio Assistant

A serverless AI-powered cloud portfolio assistant built with **Amazon Bedrock Knowledge Bases, AWS Lambda, Amazon API Gateway, Amazon S3, CloudFront, Terraform, and GitHub Actions**.

This project allows recruiters and interviewers to ask questions about my AWS cloud engineering background, infrastructure experience, Terraform skills, CI/CD work, migration projects, certifications, and AI cloud project experience.

## Live Demo

**Portfolio Website:** https://ahmetsaygin.dev

## Project Overview

This project is a real-world AWS serverless application that uses Retrieval-Augmented Generation (RAG) to answer questions based on a curated professional profile document.

The application was first built manually in the AWS Console to understand each service, then the application code was moved to GitHub, CI/CD workflows were added with GitHub Actions, and the main infrastructure components were converted into Terraform.

## Architecture

User Browser
→ CloudFront
→ S3 Static Website
→ API Gateway HTTP API
→ AWS Lambda
→ Amazon Bedrock Knowledge Base
→ Source documents stored in Amazon S3

## AWS Services Used

* Amazon S3
* Amazon CloudFront
* Amazon API Gateway
* AWS Lambda
* Amazon Bedrock Knowledge Bases
* AWS IAM
* Amazon CloudWatch
* AWS Certificate Manager
* Terraform
* GitHub Actions

## Key Features

* Serverless frontend hosted on Amazon S3
* HTTPS custom domain served through Amazon CloudFront
* AI-powered Q&A using Amazon Bedrock Knowledge Bases
* Lambda backend integrated with API Gateway
* Source documents stored in S3 and indexed by Bedrock Knowledge Base
* Infrastructure managed with Terraform
* CI/CD pipeline for frontend deployment using GitHub Actions
* API Gateway throttling to help control excessive requests
* AWS Budget alarm configured for cost monitoring

## Security and Cost Controls

This project includes several cost and security-conscious design decisions:

* CloudFront provides HTTPS access for the portfolio website
* API Gateway throttling limits excessive API requests
* AWS Budget alarm monitors monthly cost
* Public profile documents do not include sensitive personal information
* GitHub Secrets are used for deployment credentials
* Terraform state files and local environment files are excluded from GitHub

## CI/CD

GitHub Actions is used to deploy application code.

### Frontend Deployment

When files inside the `frontend/` directory are updated and pushed to the `main` branch, GitHub Actions syncs the frontend files to the S3 website bucket.

### Lambda Deployment

A separate GitHub Actions workflow can deploy Lambda backend changes when Lambda source code is updated.

## Infrastructure as Code

Terraform is used to provision and manage the main AWS infrastructure components, including:

* S3 frontend bucket
* S3 static website configuration
* IAM roles and policies
* Lambda function
* API Gateway HTTP API
* API Gateway routes
* Lambda permissions
* Terraform outputs

Amazon Bedrock Knowledge Base and the document source were initially configured manually in the AWS Console and integrated with the Terraform-managed backend.

## What I Learned

Through this project, I practiced and demonstrated:

* Building a serverless AWS application
* Connecting S3, API Gateway, Lambda, and Bedrock
* Using Amazon Bedrock Knowledge Bases for RAG
* Deploying frontend code with GitHub Actions
* Managing AWS infrastructure with Terraform
* Configuring CloudFront with a custom HTTPS domain
* Adding API Gateway throttling for cost protection
* Troubleshooting CORS, caching, DNS, and CloudFront origin issues

## Example Questions

Recruiters and interviewers can ask the assistant:

* Who is Ahmet?
* What AWS experience does Ahmet have?
* Tell me about Ahmet's Lowe's migration project.
* Does Ahmet have Terraform experience?
* What DevOps tools has Ahmet used?
* What certifications does Ahmet have?
* What is Ahmet's AWS Bedrock RAG project?

## Tech Stack

**Cloud:** AWS
**AI/RAG:** Amazon Bedrock Knowledge Bases
**Backend:** AWS Lambda, API Gateway
**Frontend:** HTML, CSS, JavaScript, S3 Static Website
**CDN/HTTPS:** CloudFront, AWS Certificate Manager
**Infrastructure:** Terraform
**CI/CD:** GitHub Actions
**Version Control:** Git, GitHub

## Author

**Ahmet Saygin**
Cloud Infrastructure Engineer
Portfolio: https://ahmetsaygin.dev
GitHub: https://github.com/GokhanSaygin/aws-bedrock-rag-chatbot
