#!/bin/bash
file=$1
VERCEL_TOKEN=$2
VERCEL_ORG_ID=$3
PROJECT_ID=$4
env=$5

# Read the content of .env.local into variables
while IFS= read -r line; do
    # Check if the line is not empty or a comment
    if [[ ! $line =~ ^\s*# && ! -z $line ]]; then
    #echo $line
        # Split the line by the equal sign
        key=$(echo "$line" | cut -d'=' -f1)
        value=$(echo "$line" | cut -d'=' -f2-)
        echo "Key : $key"
        echo "Value : $value"
        VERCEL_ORG_ID=$VERCEL_ORG_ID VERCEL_PROJECT_ID=$PROJECT_ID vercel env rm  $key $env --token $VERCEL_TOKEN --yes
        echo $value | VERCEL_ORG_ID=$VERCEL_ORG_ID VERCEL_PROJECT_ID=$PROJECT_ID vercel env add $key $env --token $VERCEL_TOKEN --yes

    fi
done < $file

