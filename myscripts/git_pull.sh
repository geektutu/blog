#!/bin/bash
set -eou pipefail

root=$(cd $(dirname $0)/..; pwd)

pull() {
    repo="$1"
    dest="$2"
    echo "update $dest"
    if [ -d "$dest" ]; then
        git -C "$dest" pull
    else
        git clone "https://github.com/$repo" "$dest"
    fi;
}

cd $root
pull geektutu/hexo-theme-geektutu themes/geektutu
pull geektutu/7days-golang posts/7days-golang
pull geektutu/7days-python posts/7days-python
pull geektutu/interview-questions posts/interview-questions
pull geektutu/tensorflow2-docs-zh posts/tensorflow2-docs-zh