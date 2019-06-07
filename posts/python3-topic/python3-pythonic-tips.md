---
title: Python专题-让你的代码更Pythonic
date: 2017-09-02 10:51:24
tags:
- Python
- Pythonic
catagories:
- Python专题
---

Python是一门非常灵活的语言，很多语法是其他语言不具备的，特别是对于从C、Java等语言转向Python的人来说，很容易按照C、Java等语言的写法来写Python，对于初学者来说，如果对Python语言的理解不够透彻，就会写出很冗余的代码来。

这篇文章，主要介绍几个简单技巧，让你在写**Python**代码，更**Pythonic**。

## 变量交换
- Pythonic写法
```python
a, b = b, a
```
- 普通写法
```python
tmp = a;
a = b;
b = tmp;
```
## 循环遍历区间元素
```python
# 生成器与列表更加节省内存
# range(start, end, step)
# [start, end) 包含开头不包含结尾
for i in range(1, 1000, 2) # python3
for i in range(6) # python3
for i in xrange(6) #python2
```
> 在Python2中，有`range`和`xrange`2种写法，xrange是生成器写法，更节省内存。Python3中的`range`等价于Python2中的`xrange`。

> 生成器，只有在使用时才会动态生成，而且只能使用1次，比如range(1000000)，Python2中会在内存中生成1百万个元素的列表，而在Python3不会生成列表，而是生成器，占用很小的内存。

> **如何你还在使用Python2，建议用`xrange`代替`range`**
- Java的写法
```java
for(int i = start; i < end; i += step) {
    // ....
}
```

- 生成器扩展
```python
# 定义一个生成器
odd = (num for num in range(10) if num % 2 == 1)
for num in odd:
    print(num)
```
```python
# 定义一个生成器
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1

>>> type(fib(3)) 
<generator object fib at 0x10e610728>
>>> for num in fib(3):
...     print(num)
... 
1
1
2
```
```python
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield 3
    print('step 3')
    yield 5

gen = odd()

print(next(gen))
print(next(gen))
print(next(gen))
```
## 索引
- Pythonic写法
```python
num_list = [1, 4, 9]
for i, val in enumerate(num_list):
    print(i, '-->', val)
```
- 普通写法
```python
num_list = [1, 4, 9]
for i in range(len(num_list))
    print(i, '-->', num_list[i])
```

> 显然，Pythonic写法更加直观，优雅。

## 字符串拼接
- Pythonic写法
```python
names = ['Tom', 'Jack', 'Sam']
','.join(names) 
```
- 普通写法
```
names = 'Tom' + 'Jack' + 'Sam'
```
> 每次+操作都会产生新字符串，造成内存浪费，而join，整个过程中只会产生一个字符串对象

## 文件打开与关闭
- Pythonic写法
```python
# 写法二
with open('a.txt') as f:
    data = f.read()
```
- 普通写法
```python
f = open('a.txt')
try:
    data = f.read()
finally:
    f.close()
```

> 使用with，Python将自动管理文件流的打开与关闭，无需手动操作。

## 列表操作
- Pythonic写法
```python
from collections import deque


names = deque(['c', 'd', 'e'])
names.popleft()
names.appendleft('b')
names.append('f')

# names => deque(['b', 'd', 'e', 'f'])
```
- 普通写法
```
names = list['c', 'd', 'e']
names.pop(0)
names.insert(0, 'b')
names.append('f')
```
> list也可以用`pop(0)`来删除第一个元素，但是list在内存中是顺序存储的，删除第一个元素，会导致之后的所有元素都会前移，效率很低，插入类似。

> 开头如果有大量的删除和插入操作，避免使用list。

## 解构赋值
- Pythonic写法
```python
student = ['Tom', 18, 'male']
name, age, gender = student
print(name, age, gender)
# Tom 18 male

num_list = [100, 19, 20, 98]
first, *left_num_list, last = num_list
print(first, left_num_list, last)
# 100 [19, 20] 98
```
```python
student = [['Tom', (98, 96, 100)], ['Jack', (98, 96, 100)]]

for name, (first, second, third) in student:
    print(name, first, second, third)
```
```python
student = {
    'name': 'Tom',
    'age': 18
}

# python3
for k, v in student.items():
    print('k', '-->', v)

# python2
for k, v in student.iteritems():
    print('k', '-->', v)
```

> 字典也类似，在Python2中，字典的`items`方法将返回列表，当字典比较大时，这样会很耗内存。而`iteritems`方法返回的是生成器。

> Python3中，没有`iteritems`，`items`等价于Python2的`iteritems`。

> 如果在使用Python2，请用`iteritems`代替`items`

## 推导式
- Pythonic写法
```python
# 生成1-100的奇数
odd = [i for i in range(1, 100) if i % 2 == 1]

# 集合a，b分别去一个数，找出和大于100的所有组合
result = [(x, y) for x in a_set for y in b_set if x + y > 100]
```
- 普通写法
```python
# 生成1-100的奇数
result = []
for i in range(100):
    if i % 2 == 1:
        result.append(i)
        
# 集合a，b分别去一个数，找出和大于100的所有组合
result = []
for x in a_set:
    for y in b_set:
        if x + y > 100:
        result.append((x, y))
```
> 更多有关生成器与推导式的写法，见[循环与推导式](http://imtuzi.com/post/3-python3-guides-basic-structure.html)