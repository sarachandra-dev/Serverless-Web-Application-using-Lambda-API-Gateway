# 🚀 QuickShare - Serverless Web Application using AWS

QuickShare is a **serverless text-sharing web application** that enables users to securely share text using a unique share code. Built with **React.js** and powered by **AWS Cloud Services**, the application leverages a serverless architecture to provide a scalable, reliable, and cost-effective solution without managing traditional backend servers.

---

## 📖 Project Overview

QuickShare is designed to simplify text sharing by generating unique share codes that can be used to retrieve shared content later. The frontend is developed using **React.js** and hosted on **Amazon S3** as a static website. Backend requests are handled by **AWS Lambda**, exposed through **Amazon API Gateway**, while shared data is securely stored in **MongoDB Atlas**.

The application follows an **event-driven serverless architecture**, where backend functions execute only when a request is received, reducing operational costs and improving scalability.

---

## ✨ Features

- 🔹 Secure text sharing using unique share codes
- 🔹 Serverless backend architecture
- 🔹 Responsive React.js frontend
- 🔹 Static website hosting with Amazon S3
- 🔹 REST API integration using API Gateway
- 🔹 Backend processing with AWS Lambda
- 🔹 Cloud-based data storage using MongoDB Atlas
- 🔹 Automatic logging with Amazon CloudWatch
- 🔹 Secure AWS access using IAM Roles
- 🔹 Scalable and cost-effective deployment

---

## 🏗️ System Architecture

```text
                User
                  │
                  ▼
      React Application (Amazon S3)
                  │
          HTTP Request (REST API)
                  ▼
            Amazon API Gateway
                  │
                  ▼
             AWS Lambda
                  │
      Generate Unique Share Code
                  │
                  ▼
            MongoDB Atlas
                  │
                  ▼
           JSON Response
                  │
                  ▼
          React Application

      CloudWatch ← Execution Logs
             ▲
             │
        IAM Execution Role
```

---

## ⚙️ Technology Stack

### Frontend

- React.js

### Backend

- AWS Lambda (node.js/express.js)
- REST APIs
- Amazon API Gateway

### Database

- MongoDB Atlas

### AWS Services

- Amazon S3
- AWS Lambda
- Amazon API Gateway
- Amazon CloudWatch
- AWS IAM

---

## ☁️ AWS Services Used

### Amazon S3
Hosts the React.js frontend as a static website and provides reliable, highly available content delivery.

### Amazon API Gateway
Acts as the entry point for all client requests and routes them to the appropriate Lambda function.

### AWS Lambda
Executes backend logic such as generating unique share codes, processing requests, and interacting with MongoDB Atlas.

### MongoDB Atlas
Stores shared text securely using a cloud-hosted NoSQL database.

### Amazon CloudWatch
Captures Lambda execution logs and helps monitor application performance and troubleshoot issues.

### AWS IAM
Provides secure access control by granting Lambda only the permissions required to write logs to CloudWatch.

---

## 🔄 Project Workflow

1. User opens the React application hosted on Amazon S3.
2. User enters text and clicks the **Share** button.
3. React sends an HTTP request to Amazon API Gateway.
4. API Gateway invokes the AWS Lambda function.
5. Lambda validates the request and generates a unique share code.
6. Lambda stores the shared text in MongoDB Atlas.
7. Lambda returns the generated share code.
8. React displays the share code to the user.
9. CloudWatch records execution logs for monitoring.

---

## 🚀 Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/QuickShare.git
```

### Navigate to the Project

```bash
cd QuickShare
```

### Install Dependencies

```bash
cd frontend
npm install
```

### Run the Application

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Create Share

```http
POST /share
```

**Request**

```json
{
  "text": "Hello World"
}
```

**Response**

```json
{
  "shareCode": "ABC123"
}
```

---

### Retrieve Share

```http
GET /share/{shareCode}
```

**Response**

```json
{
  "text": "Hello World"
}
```

---

## 🔐 Security

- Secure database connection using MongoDB Atlas connection string.
- AWS IAM Execution Role grants Lambda only the required permissions.
- CloudWatch logs are securely managed through IAM policies.
- Serverless architecture minimizes infrastructure exposure.

---

## 📊 Monitoring

Amazon CloudWatch is used to:

- Monitor Lambda executions
- Capture execution logs
- Track application errors
- Analyze performance metrics
- Simplify debugging

---

## ✅ Advantages

- Fully serverless architecture
- Automatic scaling
- No server management
- Cost-effective (Pay only for usage)
- High availability
- Secure cloud deployment
- Easy monitoring and debugging
- Modern cloud-native architecture

---

## 🔮 Future Enhancements

- User authentication using Amazon Cognito
- Secure file sharing
- QR code generation
- Automatic share expiration
- Email notifications
- Analytics dashboard
- Custom domain with CloudFront
- End-to-end encryption

---

## 🎯 Conclusion

QuickShare demonstrates the implementation of a modern serverless web application using AWS Cloud Services. By integrating **React.js**, **Amazon S3**, **API Gateway**, **AWS Lambda**, **MongoDB Atlas**, **CloudWatch**, and **IAM**, the project provides a scalable, secure, and efficient solution for text sharing. The serverless architecture eliminates traditional server management while ensuring high availability, automatic scaling, and reduced operational costs.
