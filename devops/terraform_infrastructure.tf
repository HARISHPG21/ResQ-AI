# Terraform Infrastructure Specification for ResQ-AI Cloud Deployment
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1" # Mumbai Data Center for Low Latency
}

# AWS RDS PostgreSQL 16 Instance with PostGIS Extension
resource "aws_db_instance" "resq_postgis_db" {
  allocated_storage    = 100
  max_allocated_storage = 500
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.r6g.xlarge"
  db_name              = "resq_db"
  username             = "resq_admin"
  password             = "resq_secure_prod_password"
  skip_final_snapshot  = true
  multi_az             = true
}

# Elastic Kubernetes Service (EKS) Cluster
resource "aws_eks_cluster" "resq_cluster" {
  name     = "resq-ai-production-cluster"
  role_arn = "arn:aws:iam::123456789012:role/eks-cluster-role"

  vpc_config {
    subnet_ids = ["subnet-abc123", "subnet-def456"]
  }
}
