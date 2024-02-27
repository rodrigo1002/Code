import boto3
import time

# Initialize Boto3 client
ec2_client = boto3.client('ec2')

def get_instances_with_tag(tag_key, tag_value):
    response = ec2_client.describe_instances(
        Filters=[
            {'Name': f'tag:{tag_key}', 'Values': [tag_value]}
        ]
    )
    instances = []
    for reservation in response['Reservations']:
        instances.extend([instance['InstanceId'] for instance in reservation['Instances']])
    return instances

def stop_instances(ids):
    response = ec2_client.stop_instances(InstanceIds=ids)
    return response

def start_instances(ids):
    response = ec2_client.start_instances(InstanceIds=ids)
    return response

def main():
    while True:
        current_time = time.localtime()
        hour = current_time.tm_hour
        
        if hour >= 21 or hour < 7:
            print("Stopping instances...")
            instance_ids_to_stop = get_instances_with_tag('EC2-Schedules', 'true')
            stop_response = stop_instances(instance_ids_to_stop)
            print("Stop response:", stop_response)
        elif hour >= 7 and hour < 21:
            print("Starting instances...")
            instance_ids_to_start = get_instances_with_tag('EC2-Schedules', 'true')
            start_response = start_instances(instance_ids_to_start)
            print("Start response:", start_response)
        
        # Sleep for 1 hour before checking the time again
        time.sleep(3600)  # 3600 seconds = 1 hour

if __name__ == '__main__':
    main()

    # To run execute pyton Stop EC2 Instances.py The script will run and fetch EC2 instance data and cost data from AWS. 
    # Remember to run "pip install boto3" Python and the Boto3 library on your computer to run the script successfully.
