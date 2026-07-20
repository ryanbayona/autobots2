#!/usr/bin/env bash

count=0
LOG="my2.log"

projects=(
  chromium
  #firefox
  #webkit
  #mobile-safari
  #ms-edge
)

while true; do
    start=$(date '+%Y-%m-%d %H:%M:%S')

    echo "==================================================" 

    status=0

    for project in "${projects[@]}"; do
        echo "--- Running project: $project ---"

        if ! npx playwright test \
            tests/isaw.spec.ts \
            --project="$project" \
            --reporter=line
        then
            status=$?
            echo "--- $project FAILED (exit=$status) ---" 
            break
        fi

        echo "--- $project PASSED ---"
    done

    ((count++))
    end=$(date '+%Y-%m-%d %H:%M:%S')

    echo "END:   $end | Iteration: $count | Exit: $status" 

    echo "Iteration: $count (exit=$status)"
    sleep 1
    #if (( count >= 20 )) || (( status != 0 )); then
    #    echo "Sleeping 60 seconds..."
    #    sleep 60
    #    count=0
    #else 
    #    sleep 5
    #fi
done