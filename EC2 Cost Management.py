import boto3

# Initialize Boto3 clients
ec2_client = boto3.client('ec2')
ce_client = boto3.client('ce')

# Fetch EC2 instance data
instances = ec2_client.describe_instances()

# Fetch cost data
cost_data = ce_client.get_cost_and_usage(
    TimePeriod={'Start': 'start_date', 'End': 'end_date'},
    Granularity='DAILY',
    Filter={
        'Dimensions': {'Key': 'INSTANCE_TYPE', 'Values': ['instance_type']}
    }
)

# Process and analyze cost data
cost_by_instance = {}
for result_by_time in cost_data['ResultsByTime']:
    instance_type = result_by_time['Dimension']['Value']
    cost = result_by_time['Total']['AmortizedCost']['Amount']
    cost_by_instance[instance_type] = cost

# Generate cost reports
for instance_type, cost in cost_by_instance.items():
    print(f"Instance Type: {instance_type}, Cost: {cost}")

# Add logic for alerts, optimization recommendations, and reporting
# To run execute pyton EC2 Cost Management.py The script will run and fetch EC2 instance data and cost data from AWS. 
# It will process and analyze the cost data and generate reports based on the example code provided. 
# The output will be displayed in the terminal or command prompt.
# Remember to run "pip install boto3" Python and the Boto3 library on your computer to run the script successfully.
