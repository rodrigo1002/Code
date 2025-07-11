import boto3
from datetime import datetime, timedelta

# Configure your time period here
end_date = datetime.today().date()
start_date = end_date - timedelta(days=7)

# Example instance types to filter on
instance_types_filter = ['t3.micro', 't3.small']

# Initialize Boto3 clients
ec2_client = boto3.client('ec2')
ce_client = boto3.client('ce')

# Fetch EC2 instance data
instances = ec2_client.describe_instances()

# Fetch cost data
cost_data = ce_client.get_cost_and_usage(
    TimePeriod={
        'Start': str(start_date),
        'End': str(end_date)
    },
    Granularity='DAILY',
    Metrics=['AmortizedCost'],
    Filter={
        'Dimensions': {
            'Key': 'INSTANCE_TYPE',
            'Values': instance_types_filter
        }
    },
    GroupBy=[
        {
            'Type': 'DIMENSION',
            'Key': 'INSTANCE_TYPE'
        }
    ]
)

# Process and analyze cost data
cost_by_instance = {}

for result_by_time in cost_data['ResultsByTime']:
    groups = result_by_time.get('Groups', [])
    for group in groups:
        instance_type = group['Keys'][0]
        amount = group['Metrics']['AmortizedCost']['Amount']
        cost_by_instance[instance_type] = cost_by_instance.get(instance_type, 0) + float(amount)

# Generate cost reports
for instance_type, cost in cost_by_instance.items():
    print(f"Instance Type: {instance_type}, Cost: ${cost:.2f}")

# Add logic for alerts, optimization recommendations, and reporting
