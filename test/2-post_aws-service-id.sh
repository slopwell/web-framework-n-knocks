# /usr/bin/bash
source "$(dirname "$0")/core.sh"

method="POST"
port="3000"
path="/aws-service-id"
body='{"name": "ecs", "category": "compute", "description": "Elastic Container Service"}'

url="http://localhost:${port}/api${path}"

echo "Testing: $method $url (expecting $expected_status)"


status=$(curl -X "$method" "$url" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d "$body" \
  -o /dev/null \
  -w '%{http_code}\n' \
  -s)


