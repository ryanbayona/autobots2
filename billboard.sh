#!/usr/bin/env bash

count=0

commands=(
  "npx playwright test tests/billboard.spec.ts --reporter=line --project=chromium --project=firefox --workers=2"
)

while true; do
    start=$(date '+%Y-%m-%d %H:%M:%S')

    echo "=================================================="
    echo "START: $start | Iteration: $((count + 1))"

    mapfile -t shuffled < <(printf "%s\n" "${commands[@]}" | shuf)

    for cmd in "${shuffled[@]}"; do
        echo ">>> Running: $cmd"
        eval "$cmd" || true

        # Random sleep between 0.5 and 5.0 seconds
        sleep $(awk 'BEGIN{srand(); printf "%.2f\n", 0.5 + rand()*4.5}')
    done

    ((count++))

    end=$(date '+%Y-%m-%d %H:%M:%S')
    echo "END: $end | Iteration: $count"

    # Random sleep between 5 and 30 seconds
    #sleep $((RANDOM % 26 + 5))
done