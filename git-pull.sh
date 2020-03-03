#!/bin/bash
set -eou pipefail

pull(){
    dir=$1
    repo=$2
    if [ -d "$dir/$repo" ]; then
        echo "Pull $2" && git -C "$dir/$repo" pull
    else
        git -C "$dir" clone "https://github.com/geektutu/$2"
    fi;
}

pull . .
pull themes geektutu
# geektutu posts
pull posts 7days-golang
pull posts interview-questions
pull posts tensorflow2-docs-zh