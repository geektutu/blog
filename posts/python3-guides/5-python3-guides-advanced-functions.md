# 5-代码结构之函数进阶

`Python` `教程`

## 一等公民
> From Wikipedia:In computer science, a programming language is said to have first-class functions if it treats functions as first-class citizens. Specifically, this means the language supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures.

> Python中一切皆对象，函数能像对象一样使用

- 函数能作为参数
```python
def hello(name):
    print('hello, %s' % name)

def bye(name):
    print('bye, %s' % name)

def greeting(method, name):
    method(name)

greeting(hello, 'Tom') # hello, Tom
greeting(bye, 'Jack') # bye, Jack
```
```python
def for_each(num_list, func):
    for i, value in enumerate(num_list):
        func(value, i, num_list)

def cal_cube_and_update(value, index, num_list):
    if index % 2 == 0:
        value = value ** 3
    else:
        value = value * -1
    num_list[index] = value
    print('num_list[%d]: %d' % (index, value))

_list = [i for i in range(5)]
for_each(_list, cal_cube_and_update)

# num_list[0]: 0
# num_list[1]: -1
# num_list[2]: 8
# num_list[3]: -3
# num_list[4]: 64
```
- 函数能作为返回值
```python
def hello(name):
    print('hello, %s' % name)

def bye(name):
    print('bye, %s' % name)

def get_method(type):
    if type == 'hello':
        return hello
    else:
        return bye

get_method('hello')('Tom') # hello, Tom
get_method('bye')('Jack') # bye, Jack
```
- 赋值给变量
```python
>>> a = list
>>> num_list = a()
>>> num_list.append(10)
>>> num_list.extend([1,100])
>>> num_list
[10, 1, 100]
```
- 存储在数据结构中
```python
def hello(name):
    print('hello, %s' % name)

def bye(name):
    print('bye, %s' % name)

method_dict = {
    'hello_method': hello,
    'bye_method': bye
}

method_dict['hello_method']('Tom') # hello, Tom
method_dict['bye_method']('Jack') # bye, Jack
```
## 内部函数
```python
def outer(a, b):
    def inner(c, d):
        return c + d
    return inner(a, b)

outer(4, 7) # 11
```
```python
def knights(saying):
    def inner(quote):
        return "We are the knights who say: '%s'" % quote
    return inner(saying)

knights('Ni!')
# "We are the knights who say: 'Ni!'"
```
> 需要在函数内部多次执行复杂的任务时，内部函数是非常有用的，避免了循环和代码的堆叠重复，提高了代码的可读性。

## 闭包
> 内部函数可以看做一个闭包，闭包是可以由另外一个函数动态生成的函数，并且可以改变和存储函数外创建的变量的值。
> 满足三个条件
> - 必须是一个嵌套的函数。
> - 闭包必须返回嵌套函数。
> - 嵌套函数必须引用一个外部的非全局的局部自由变量。

```python
def knights(saying):
    def inner():
        return "We are the knights who say: '%s'" % saying
    return inner

a = knights('Ni!')
b = knights('Hi!')
print(a())
print(b())
```
```python
# 封装私有变量
def hello_counter (name):
    count = 0
    def counter():
        nonlocal count
        count += 1
        print('Hello, %s, 第%d次调用' % (name, count))
    return counter

hello = hello_counter('Tom')
hello()
hello()
hello() 
```
```python
# 延迟绑定
def cal(num_list):
    def cal_sum():
        result = 0
        for item in num_list:
            result += item
        return result
    return cal_sum

a = cal([1, 2, 3])
b = cal([1, 2, 3])
print(a == b)
print(a())
print(b())
```
```python
# 简化参数
def make_pow(n):
    def _pow(x):
        return pow(x, n)
    return _pow

pow2 = make_pow(2)
pow3 = make_pow(3)

print(pow2(5)) # 25
print(pow3(7)) # 343
```

- 链接：[函数式编程](https://github.com/kachayev/fn.py)

## 装饰器
> 装饰器实质是一个函数，它把函数作为输入并且返回另一个函数。在装饰器中，通常使用以下技巧：
> - *args 和 **kwargs
> - 闭包
> - 作为参数的函数

```python
def document_it(func):
    def new_function(*args, **kwargs):
        print('Running function:', func.__name__)
        print('Positional arguments:', args)
        print('Keyword arguments:', kwargs)
        result = func(*args, **kwargs)
        print('Result:', result)
        return result
    return new_function

def add_ints(a, b):
    return a + b

# 手工赋值使用装饰器
add_ints(3, 5)
cooler_add_ints = document_it(add_ints) 
cooler_add_ints(3, 5)
```
```python
# 使用@符号
def document_it(func):
    def new_function(*args, **kwargs):
        print('Running function:', func.__name__)
        print('Positional arguments:', args)
        print('Keyword arguments:', kwargs)
        result = func(*args, **kwargs)
        print('Result:', result)
        return result
    return new_function

@document_it
def add_ints(a, b):
    return a + b

add_ints(3, 5)
```
```python
def document_it(func):
    def new_function(*args, **kwargs):
        print('Running function:', func.__name__)
        print('Positional arguments:', args)
        print('Keyword arguments:', kwargs)
        result = func(*args, **kwargs)
        print('Result:', result)
        return result
    return new_function

def square_it(func):
    def new_function(*args, **kwargs):
        result = func(*args, **kwargs)
        print("square_it:", result)
        return result * result
    return new_function

@document_it
@square_it
def add_ints(a, b):
    print("add_ints:", a, b)
    return a + b

add_ints(2, 4)
# Running function: new_function
# Positional arguments: (2, 4)
# Keyword arguments: {}
# add_ints: 2 4
# square_it: 6
```
## 命名空间和作用域
- global
```python
num_list = [1, 2, 3, 4]

def print_local_num_list():
    num_list = [1, 2]
    print(num_list)

def print_global_num_list():
    global num_list
    print(num_list)

print_local_num_list()
print_global_num_list()
# print(globals())
```
