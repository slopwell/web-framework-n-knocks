# /usr/bin/bash
source "$(dirname "$0")/core.sh"

method="GET"
port="3000"
path="/aws-services?category=compute"

http_request "$method" "$port" "$path" || exit 1
