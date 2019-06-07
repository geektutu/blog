# 4-代码结构之函数

`Python` `教程`

`什么是函数？命名的用于区分的代码段`
## 调用函数
1. [内建函数](https://docs.python.org/3/library/functions.html)，不需要导入，直接使用。
    ```
    name = input('please input your name')
    print('hello, %s' % name )
    ```
1. 如何调用，知道名称和参数
    ```python
    >>> abs(-100)
    100
    >>> min(3, 1, 2)
    1
    >>> max(5, 9 ,100, -100)
    100
    ```
    - **名称**，和变量一致，必须使用字母和下划线开头，仅包含数字、字母和下划线
    - **参数**，x = 3中，x是变量，在y =
    3x + 5中，x是参数。对于函数也是一样。多数情况下，过程必须包含有关调用环境的一些信息。执行重复或共享任务的过程对每次调用使用不同的信息。此信息包含每次调用过程时传递给它的变量、常量和表达式。

## 定义函数
### 格式
- def，函数名，带有参数的圆括号，最后紧跟一个冒号:，函数体需要缩进
    ```python
    # 没有参数的函数
    def do_nothing():
        pass
    ```
### 参数
- 形参和实参
    - 形参与实参个数与类型匹配
    ```python
    # 类型匹配
    >>> abs('a')
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: bad operand type for abs(): 'str'
    # 数量匹配
    >>> abs(1, 2)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: abs() takes exactly one argument (2 given)
    ```
    - type的使用
    ```
    >>> type('1234354')
    <class 'str'>
    >>> type(1232)
    <class 'int'>
    >>> type(1232.897)
    <class 'float'>
    >>> type(None)
    <class 'NoneType'>
    >>> type(False)
    <class 'bool'>
    >>> type({'a': 1})
    <class 'dict'>
    >>> type((1, 2))
    <class 'tuple'>
    ```
- 数量 0或多个
```python
def print_hello():
    print('hello')
def print_hello_name(name):
    print('hello %s' % name)
```
- 位置参数，即按顺序复制
```python
def format_date(year, month, day):
    print("%d-%02d-%02d" % (year, month, day))
    
format_date(1994, 3, 1) # => 1994-03-01
format_date(3, 1994, 1) # => 3-1994-01
```
- 关键字参数
```python
def format_date(year, month, day):
    print("%d-%02d-%02d" % (year, month, day))
    
format_date(month = 3, year = 1994, day = 1)
```
- 默认参数

    - 如果一个函数的参数中含有默认参数，则这个默认参数后的所有参数都必须是默认参数
    ```python
    def format_date(year = 2007, month, day):
        print("%d-%02d-%02d" % (year, month, day))
    # SyntaxError: non-default argument follows default argument
    ```
    ```python
    def format_date(year, month, day = 1):
        print("%d-%02d-%02d" % (year, month, day))
    
    format_date(1994, 3) # 1994-03-01    
    format_date(year = 1994, month = 3) # 1994-03-01
    format_date(month = 3, day = 1, year = 1996) # 1994-03-01
    format_date(1994, 3, 5) # 1994-03-05
    ```
    - 避免将可变数据类型作为默认参数值
    ```python
    >>> def buggy(arg, result=[]):
    ...     result.append(arg)
    ...     print(result)
    ...
    >>> buggy('a')
    ['a']
    >>> buggy('b') # expect ['b'], but ['a', 'b']
    ```
    ```python
    >>> def works(arg):
    ...     result = []
    ...     result.append(arg) 
    ...     return result
    ...
    >>> works('a')
    ['a']
    >>> works('b')
    ['b']
    ```
- 使用 * 收集位置参数
```python
>>> def print_args(*args):
...     print('Positional argument tuple:', args) 
...
```
```python
>>> def print_more(required1, required2, *args):
...     print('Need this one:', required1)
...     print('Need this one too:', required2)
...     print('All the rest:', args)
...
>>> print_more('cap', 'gloves', 'scarf', 'monocle', 'mustache wax') 
Need this one: cap
Need this one too: gloves
All the rest: ('scarf', 'monocle', 'mustache wax')
```
```python
# 求输入正数的最大值
def _max(*num):
    tmp = 0
    for i in num:
        if i > tmp:
            tmp = i
    return tmp
```
- 使用 ** 收集关键字参数
```python
>>> def print_kwargs(**kwargs):
...     print('Keyword arguments:', kwargs) ...
>>> print_kwargs(wine='mer', entree='mut', dessert='mac')
Keyword arguments: {'dessert': 'mac', 'wine': 'mer', 'entree': 'mut'}
```
### 文档字符串
```python
def format_date(year, month, day = 1):
    '''
    format date, split by char -
    default value for day is 1
    '''
    print("%d-%02d-%02d" % (year, month, day))
    
help(format_date)
print(format_date.__doc__) 
```
```python
# help(print)
print(...)
    print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
    
    Prints the values to a stream, or to sys.stdout by default.
    Optional keyword arguments:
    file:  a file-like object (stream); defaults to the current sys.stdout.
    sep:   string inserted between values, default a space.
    end:   string appended after the last value, default a newline.
    flush: whether to forcibly flush the stream.
```
### 返回值
- 默认返回值为None
```python
# 默认返回None
def print_hello():
    print("Hello!")

print_hello() == None
# Hello!
# True
```
- 自定义返回值
```python
def print_hello():
    print("Hello!")
    return 1

print_hello() == None
# Hello!
# False
```
- 多个返回值
```python
# 计算商和余数
def cal(dividend, divisor):
    return dividend // divisor, dividend % divisor
    
a, b = cal(52, 10)
print(a, b) # => 5 2
```
- 随时返回
```python
def judge_age(age):
    return age
    if age >= 18:
        return "adult"
    else:
        return "kid"
    print("current age: ", age)

result = judge_age(20)
result2 = judge_age(10)
print(result)
print(result2)
```
## 小结
- 定义函数时，需要确定函数名和参数个数；
- 如果有必要，可以先对参数的数据类型做检查；
- 函数体内部可以用return随时返回函数结果；
- 函数执行完毕也没有return语句时，自动return None。
- 函数可以同时返回多个值，但其实就是一个tuple。

## 作业
1. 给定2个列表，2个列表中各取出一个数，输出所有可能的有序二元组合，例如列表a是 [1, 2, 3]，列表b是 [2, 3]，结果是[[1, 2], [1, 3], [2, 2], [2, 3],[3, 2], [3, 3]
2. 给定2个列表，2个列表中各取出一个数，输出所有可能的无序二元组合，例如列表a是 [1, 2, 3]，列表b是 [2, 3]，结果是[[1, 2], [1, 3], [2, 2], [2, 3], [3, 3]
3. 使用列表推导生成1到100的偶数列表
4. 使用字典推导生成1到10的字典，键为1到10，值为键的平方，即{1 : 1, 2 : 4, ... , 10 : 100}
5. 实现求最大值和最小值得函数，要求参数输入不限个数。
6. 实现一个函数equal，判断任意个数的数字和是否等于特定数字，返回True或False，比如equal(10, 1, 2, 3, 4)返回True
7. 求最长的无重复字符的子串，"abcabcbb" -> "abc", "bbbbb" -> "b",  "pwwkew" -> "wke"