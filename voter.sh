#!/usr/bin/env bash

count=0
LOG="my.log"

while true; do
    start=$(date '+%Y-%m-%d %H:%M:%S')

    echo "==================================================" | tee -a "$LOG"
    echo "START: $start | Iteration: $((count + 1))" | tee -a "$LOG"
    if npx playwright test \
        tests/ppop-poll.spec.ts \
        --project=chromium \
        --project=firefox \
        --project=webkit \
        --project=mobile-safari \
        --project=ms-edge \
        --reporter=line >>"$LOG" 2>&1
    then
        status=0
    else
        status=$?
    fi

    ((count++))
    end=$(date '+%Y-%m-%d %H:%M:%S')
    echo "END:   $end | Iteration: $count | Exit: $status" | tee -a "$LOG"

    echo "Iteration: $count (exit=$status)"
    sleep 5
    #if (( count >= 12 )) || (( status != 0 )); then
    if (( count >= 12 )); then
        echo "Sleeping 60 seconds..."
        sleep 60
        count=0      # Optional: restart the iteration count
    else
        sleep 5
    fi
done

