#!/bin/bash

# Terraform automation script for CarvedRock

# Check Terraform version
REQUIRED_VERSION="1.5"
CURRENT_VERSION=$(terraform version | head -n 1 | cut -d' ' -f2 | cut -d'v' -f2 | cut -d'.' -f1,2)

if [[ "$CURRENT_VERSION" != "$REQUIRED_VERSION" ]]; then
    echo "Error: Terraform version $REQUIRED_VERSION required, but $CURRENT_VERSION found"
    exit 1
fi

# Function to run terraform commands with error handling
run_terraform() {
    echo "Running: terraform $1"
    if [[ "$1" == "init" ]]; then
        terraform init -input=false
    else
        terraform $1
    fi
    if [ $? -ne 0 ]; then
        echo "Error: terraform $1 failed"
        exit 1
    fi
}

# Format check
echo "Checking Terraform formatting..."
terraform fmt -check
if [ $? -ne 0 ]; then
    echo "Formatting issues found. Running terraform fmt..."
    terraform fmt
fi

# Main workflow
case "$1" in
    init)
        run_terraform "init"
        ;;
    plan)
        run_terraform "plan"
        ;;
    apply)
        run_terraform "apply -auto-approve"
        ;;
    destroy)
        run_terraform "destroy -auto-approve"
        ;;
    all)
        run_terraform "init"
        run_terraform "plan"
        echo "Apply changes? (y/n)"
        read answer
        if [ "$answer" = "y" ]; then
            run_terraform "apply -auto-approve"
        fi
        ;;
    *)
        echo "Usage: $0 {init|plan|apply|destroy|all}"
        exit 1
        ;;
esac