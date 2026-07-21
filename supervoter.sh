#!/usr/bin/env bash

count=0


while true; do
    start=$(date '+%Y-%m-%d %H:%M:%S')

    echo "==================================================" 
    echo "START: $start | Iteration: $((count + 1))" 
    if npx playwright test \
        tests/proxies.spec.ts \
        --project=chromium \
        --reporter=line 
    then
        status=0
    else
        status=$?
    fi

    ((count++))
    end=$(date '+%Y-%m-%d %H:%M:%S')
    echo "END:   $end | Iteration: $count | Exit: $status" 

    echo "Iteration: $count (exit=$status)"
    sleep 10
    #if (( count >= 12 )) || (( status != 0 )); then
    #if (( count >= 12 )); then
    #    echo "Sleeping 60 seconds..."
    #    sleep 60
    #    count=0      # Optional: restart the iteration count
    #else
    #    sleep 5
    #fi
done

