# 6-Python盒子

`Python` `教程`

## 独立程序
```python
# test1.py
def print_something():
    print("This standalone program works!")
    
print_something()
```
```python
# test2.py
def print_something():
    print("This standalone program works!")
    
if __name__ == "__main__":
    print_something()
```
## 命令行参数
```python
# test.py
import sys
print('Program arguments:',sys.argv)
```
```
$ python test.py
Program arguments: ['test.py']
$ python test.py tra la la
Program arguments: ['test.py', 'tra', 'la', 'la']
```
## 模块和import语句
> - 下一阶段，在多个文件间创建和使用Python代码
> - 一个文件，一个模块

- 普通导入
```python
import tkinter
top = tkinter.Tk()
top.mainloop()
```
- 使用别名导入模块
```python
import tkinter as tk
top = tk.Tk()
top.mainloop()
```
- 导模模块一部分
```python
import tkinter
from tkinter import Listbox
# from tkinter import *
top = tkinter.Tk()
li     = ['javascript','python','java']
listb = Listbox(top)
for item in li:
    listb.insert(0, item)
listb.pack()
top.mainloop()
```
```python
from tkinter import Listbox, Tk
top = Tk()
li     = ['javascript','python','java']
listb = Listbox(top)
for item in li:
    listb.insert(0, item)
listb.pack()
top.mainloop()
```
- 函数内导入
```python
def get_description():
    import random
    possibilities = ['rain', 'snow', 'sleet', fog', 'sun', 'who knows'] 
    return random.choice(possibilities)
```
> 如果导入的代码被使用多次，考虑函数外导入，如果导入的代码只用一次，考虑函数内导入，但是也可以把所有导入放到文件开头，依赖关系更清晰。

- 导入模块的搜索路径
> - 按顺序搜索，首先搜索当前路径
> - 再搜索安装路径
> - 搜索到就结束，否则会报错
```python
import sys
for place in sys.path:
    print(place)
# /Users/gzdaijie/Desktop/python
# /usr/local/Cellar/python3/.../python35.zip
# /usr/local/Cellar/python3/.../python3.5
# /usr/local/Cellar/python3/.../python3.5/plat-darwin
# /usr/local/Cellar/python3/.../python3.5/lib-dynload
# /usr/local/lib/python3.5/site-packages
```
```python
# random.py
def choice(_list):
    print('this is a custom random module')
    return _list[0]

if __name__ == "__main__":
    test_list = [1, 2, 3, 4, 5]
    print('-' * 5, choice(test_list), '-' * 5)


# test.py
import random

if __name__ == "__main__":
    lang_list = ['python', 'java', 'c', 'javascript']
    print(random.choice(lang_list))
```
```
$ python test.py
this is a custom random module
python
$ python random.py
this is a custom random module
----- 1 -----
```

## 包
> 多个模块组织成文件层次

```
|--root/
  |--utils/  
    |--date.py
    |--random.py
    |--__init__.py(内容可为空)
  |--test.py
```
```python
# utils就被称为包
# test.py
from utils import date, random

if __name__ == "__main__":
    lang_list = ['python', 'java', 'c', 'javascript']
    print(random.choice(lang_list))
    print(date.format('1996-5-3'))

# utils/random.py
def choice(_list):
    print('this is a custom random module')
    return _list[0]

if __name__ == "__main__":
    test_list = [1, 2, 3, 4, 5]
    print('-' * 5, choice(test_list), '-' * 5)

# utils/date.py
def format(date_str):
    date = date_str.split('-')
    return '%d%02d%02d' % (int(date[0]), int(date[1]), int(date[2]))
```
```python
#utils/index.py，可为空，什么也不写
# 写成如下
from . import date
from . import random

# test.py可直接调用
import utils

if __name__ == "__main__":
    lang_list = ['python', 'java', 'c', 'javascript']
    print(utils.random.choice(lang_list))
    print(utils.date.format('1996-5-3'))
```
## Python标准库和第三方库
### 标准库
> 不用下载，直接可用
- deque（栈和队列）
- re（正则）
- ...

### 第三方库
> pip下载安装
- pip search（搜索）
- pip install（安装）