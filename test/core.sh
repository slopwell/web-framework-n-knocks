http_request() {
  local method="$1"
  local port="$2"
  local path="$3"
  local expected_status=200

  local url="http://localhost:${port}/api${path}"
  local status

  echo "Testing: $method $url (expecting $expected_status)"

  curl -X "$method" "$url" \
       -H "accept: application/json" | jq

  status=$(curl -X "$method" "$url" \
    -H "accept: application/json" \
    -o /dev/null \
    -w '%{http_code}\n' \
    -s)

  if [ "$status" -eq "$expected_status" ]; then
    echo "$method $path check passed: $status"
    return 0
  else
    echo "$method $path check failed: expected $expected_status, got $status"
    return 1
  fi
}
