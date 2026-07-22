#!/usr/bin/env bash

while true; do
    start=$(date '+%Y-%m-%d %H:%M:%S')

    echo "=================================================="
    echo "START: $start | Iteration: $((count + 1))"
    npx playwright test tests/billboard.spec.ts --reporter=line --project=chromium --project=firefox --workers=2 || true
  
    ((count++))

    end=$(date '+%Y-%m-%d %H:%M:%S')
    echo "END: $end | Iteration: $count"

    # Random sleep between 5 and 30 seconds
    sleep 1
done