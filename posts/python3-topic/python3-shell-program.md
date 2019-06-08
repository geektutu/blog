---
title: Python模块-命令行(shell)编程
date: 2017-08-21 10:51:24
description: 本文介绍如何使用python进行命令行编程。
tags:
- Python
- shell
---


## 像shell脚本一样运行

- 查看解释器路径

```bash
$ which python3
/usr/local/bin/python3
```

- py文件第一行

```bash
#!/usr/local/bin/python3
```

- 可执行权限

```bash
$ chmod u+x xxx.py
$ ./xxx.py
```

## [os模块](https://docs.python.org/3.1/library/os.html)

> os模块负责程序与操作系统的交互，提供了访问操作系统底层的接口。

- os.path

```python
os.path.isdir(name) # 判断是不是一个目录
os.path.isfile(name) # 判断是不是一个文件
os.path.exists(name) # 判断是否存在文件或目录
os.path.getsize(name) # 获得文件大小，目录返回0
os.path.abspath(name) # 获得绝对路径
os.path.normpath(path) # 规范path字符串表示
os.path.split(name) # 分割文件名与目录
os.path.splitext() # 分离文件名与扩展名
os.path.join(path,name) # 连接目录与文件名或目录
os.path.basename(path) # 返回文件名
os.path.dirname(path) # 返回文件路径 

```

- os.walk

```python
os.walk(dir_name)
# 返回一个生成器
# 每个元素为元组 (dirpath，dirnames，filenames)
```

- os.system
> 用来执行shell命令

```python
# 解释器环境
>>> os.system('ls')
Applications Downloads Movies Public
```

```python
#!/usr/bin/python3
# test.py
import os

os.system('ls')

# ./test.py
# 没有任何输出
```

- os.popen

```python
#!/usr/local/bin/python3
# test.py

import os

result = os.popen("ls -al").read()
print(result)
```

- 其他

```python
os.listdir(dirname) # 列出dirname下的目录和文件
os.getcwd()：# 获得当前工作目录
os.curdir # 返回当前目录（'.')
os.chdir(dirname) # 改变工作目录到dirname
os.remove(name) # 删除文件
os.rename(src, dst) # 重命名文件
os.mkdir(dirname) # 创建目录
os.rmdir(dirname) # 删除目录
```

## [sys模块](https://docs.python.org/3.1/library/sys.html)

> sys模块负责程序与python解释器的交互，提供了一系列的函数和变量，用于操控python的运行时环境。

```python
sys.argv # 命令行参数
sys.exit(n) # 退出，0代表正常
sys.platform # 操作系统平台名称
```

```python
import sys

print(sys.argv)

# $ python3 test.py 123
# ['test.py', '123']
```

## 具体例子

### 重定向/管道/文件接受输入

- [fileinput](https://docs.python.org/3.4/library/fileinput.html)模块

```python
#!/usr/bin/env python3
import fileinput

with fileinput.input() as f_input:
    for line in f_input:
        print(line, end='')
```

```
$ ls | ./test.py          # Prints a directory listing to stdout.
$ ./test.py /etc/passwd   # Reads /etc/passwd to stdout.
$ ./test.py < /etc/passwd # Reads /etc/passwd to stdout.
```

### 脚本报错

```python
import sys

sys.stderr.write('It failed!\n')
raise SystemExit(1)
# 或
raise SystemExit('It failed!')
```

### 命令行选项

> sys.argv只能按照顺序传递参数

- [argparse](https://docs.python.org/3/howto/argparse.html)模块

```python
import argparse

parser = argparse.ArgumentParser(description='Example with long option names')
parser.add_argument('--noarg', action="store_true", default=False,
                    help="set a boolean value")
parser.add_argument('--witharg', action="store", dest="witharg")
parser.add_argument('--witharg2', action="store", dest="witharg2", type=int)

args = parser.parse_args()

# $ ./test.py -h
# usage: test.py [-h] [--noarg] [--witharg WITHARG] [--witharg2 WITHARG2]

# Example with long option names

# optional arguments:
#   -h, --help           show this help message and exit
#   --noarg              set a boolean value
#   --witharg WITHARG
#   --witharg2 WITHARG2
```

### 密码提示

- [getpass](https://docs.python.org/3.4/library/getpass.html)模块

```python
import getpass

user = getpass.getuser() #自动获取当前用户名
# input("username: ") 
passwd = getpass.getpass()

print(user)
print(passwd)
```

### 执行外部shell命令

```python
# ['cmd', 'arg1', 'arg2', ...]
import subprocess

out_bytes = subprocess.check_output(['netstat','-a'])
out_text = out_bytes.decode('utf-8')
print(out_text)
```

```python
# 'cmd string', shell=True
# 复杂命令，例如管道等更适用
import subprocess

out_bytes = subprocess.check_output('grep python | wc > out', 
    shell=True)
```

### 复制、移动、删除文件(夹)

- os.path
- [shutil](https://docs.python.org/3.4/library/shutil.html)模块

### 通过文件名查找文件

```python
import os
import sys

def findfile(start, name):
    for relpath, dirs, files in os.walk(start):
        if name in files:
            full_path = os.path.join(relpath, name)
            print(os.path.normpath(os.path.abspath(full_path)))

if __name__ == '__main__':
    findfile(sys.argv[1], sys.argv[2])
```

### 时间与日期

- [datetime](https://docs.python.org/3.4/library/datetime.html)模块

```python
>>> import datetime
>>> today = datetime.date.today()
>>> today + datetime.timedelta(days=1)
datetime.date(2017, 7, 9)
>>> now = datetime.datetime.now() 
>>> now.second
56
>>> now.microsecond
591835
>>> now.month
7
```

```python
from datetime import datetime

theDate = '2016-08-09'
dateObj = datetime.strptime(theDate,'%Y-%m-%d')
dateStr = datetime.strftime(dateObj,'%m/%d/%Y')
```

### 配置文件

- [configparser](https://docs.python.org/3.4/library/configparser.html)模块读取.ini配置文件

```
# 配置文件样例
[debug]
log_errors=true
show_warnings=False

[server]
port: 8080
nworkers: 32
``` 

### 日志

- [logging](https://docs.python.org/3.4/library/logging.html)模块

### 限制内存和CPU使用量

- [signal](https://docs.python.org/3.4/library/signal.html)模块
- [resource](https://docs.python.org/3.4/library/resource.html)模块

## 综合示例

> 读取日志信息，存入数据库。多线程执行插入操作。500为步长，500条数据插入后 commit一次。测试过程中，共计30w条数据，耗时2.52s（测试主机，Mac Pro，I7 4核 16G）

```python
#!/usr/local/bin/python3

import pymysql
import os
import sys
import threading
import queue
import datetime


class MysqlUtil:
    def __init__(self, host="127.0.0.1", username="***", 
                 password="***", db_name="***"):
        self.host = host
        self.username = username
        self.password = password
        self.db_name = db_name

    def __str__(self):
        return 'this is mysql database connection management'

    def get_mysql_con(self):
        try:
            db = pymysql.connect(self.host, self.username, 
                                 self.password, self.db_name)
        except Exception as e:
            print("连接失败")
            raise SystemError(e)
        return db

    def close_mysql_con(self, db):
        db.close()

    def search_fields_by_date(self, fields=("*"), created_time="2017-07-08"):
        db = self.get_mysql_con()
        cursor = db.cursor()
        sql = 'SELECT %s FROM WHERE CREATED_TIME LIKE "%s%"' \
              % (','.join(fields), created_time)
        cursor.execute(sql)
        search_list = cursor.fetchall()
        cursor.close()
        return search_list

    def insert_log(self, created_time, level, msg):
        '''
        插入一条日志记录
        :param created_time: 日志时间
        :param level: 日志级别
        :param msg: 具体信息
        :return: None
        '''
        db = self.get_mysql_con()
        cursor = db.cursor()
        sql = 'INSERT INTO LOG (CREATED_TIME, LEVEL, MSG) ' \
              'values ("%s","%s","%s")'
        try:
            cursor.execute(sql, (created_time, level, msg))
            db.commit()
        except:
            db.rollback()
        finally:
            cursor.close()

    def insert_logs(self, logs):
        '''
        一次插入多条日志记录
        :param logs: 多条日志记录
        :return: None
        '''

        db = self.get_mysql_con()
        cursor = db.cursor()
        values = []
        for log in logs:
            escape_log = [db.escape_string(field) for field in log]
            values.append('("' + '","'.join(escape_log) + '")')
        sql = 'INSERT INTO LOG (CREATED_TIME, LEVEL, MSG) ' \
              'values %s' % ','.join(values)
        try:
            cursor.execute(sql)
            db.commit()
        except Exception as e:
            db.rollback()
            raise e
        finally:
            cursor.close()


def walk_dir(root_dir, msg_queue, step):
    '''
    :param root_dir: 扫描的日志根目录
    :param msg_queue: 同步队列
    :param step: 步长
    :return: None
    '''
    for (dirpath, dirnames, filenames) in os.walk(root_dir):
        full_paths = (os.path.join(dirpath, name) 
                      for name in filenames if name.endswith(".txt"))
        logs = []
        for path in full_paths:
            print(path)
            with open(path, encoding="utf-8") as f:
                for line in f:
                    if len(line) > 30:
                        logs.append(line)
                    if len(logs) >= step:
                        msg_queue.put(logs)
                        logs = []
        if len(logs) > 0:
            msg_queue.put(logs)


def start_insert_thread(dbUtil, msg_queue):
    while not msg_queue.empty():
        logs = msg_queue.get()
        values = [(log[:23], log[25:30].strip(), 
                   log[30:].strip()) for log in logs]
        dbUtil.insert_logs(values)


if __name__ == "__main__":
    log_dir = sys.argv[1]
    dbUtil = MysqlUtil(username="***", password="***", db_name="***")
    step = 500
    msg_queue = queue.Queue()

    time_start = datetime.datetime.now()
    walk_dir(log_dir, msg_queue, step)
    t_list = []
    for index in range(4):
        t_list.append(threading.Thread(target=start_insert_thread, 
                                       args=(dbUtil, msg_queue)))

    for t in t_list:
        t.setDaemon(True)
        t.start()

    for t in t_list:
        t.join()

    print(datetime.datetime.now() - time_start)
```
