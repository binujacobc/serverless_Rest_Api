import json
import requests

import boto3

dynamodb = boto3.resource('dynamodb')
dynamodbTableName = 'product-inventory'
table = dynamodb.Table(dynamodbTableName)

postMethod = 'POST'
getMethod = 'GET'
postPath = '/insert'
getPath = '/list'

def lambda_handler(event, context):
    try:
        httpMethod = event['httpMethod']
        path = event['path']

        if httpMethod == getMethod and path == getPath:
            response = table.scan()
            #result = response['Items']
            return {
                'statusCode': 200,
                'headers': {},
                'body': json.dumps(response['Items'])
            }

        if httpMethod == postMethod and path == postPath:
            body = json.loads(event['body'])
            print(body)
            table.put_item(Item=(json.loads(event['body'])))
            return {
                'statusCode': 200,
                'headers': {},
                'body': 'Success'
            }
            
    except requests.RequestException as e:
         # Send some context about this error to Lambda Logss
         print(e)
         return {
                'statusCode': 400,
                'headers': {},
                'body': 'Error'
            }
         raise e


