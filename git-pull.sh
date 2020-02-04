#!/bin/bash
set -eou pipefail

cur=$PWD

pull(){
    if [ -d $1/.git ]; then
        echo "Pull $1" && git -C $1 pull
    fi
}

# geektutu-blog
pull $cur

# geektutu theme
pull $cur/themes/geektutu

# geektutu posts
for item in $(ls -d $cur/posts/*/)
do
    pull $item
done