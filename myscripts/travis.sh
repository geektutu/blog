#!/bin/bash

set -eou pipefail

root=$(cd $(dirname $0)/..; pwd)

echo "down qiniu"
cd $root/myscripts
rm -f qshell*
wget http://devtools.qiniu.com/qshell-linux-x86-v2.4.1.zip
unzip qshell-linux-x86-v2.4.1.zip
mv ./qshell-linux-x86-v2.4.1 qshell
export PATH=$root/myscripts:$PATH
./qshell account ${QQ_AccessKey} ${QQ_SecretKey} ${QQ_Name}

echo "github comment"
yarn comment

cd $root
echo "hexo build"
yarn build

echo "upload qiniu"
yarn qiniu