# 3-代码结构之循环与推导式

`Python` `教程`

## 注释
- \#，单行注释
```python
# print a number
# this is a test
a = 17
print(a)
```
- ''' 三个单引号，块注释
```python
'''
this is a test
print a number
'''
a = 17
print(a)
```

## 逻辑与缩进
```python
while True:
    a = input()
    if (int(a) > 5):
        print('a > 5')
    else:
        print('a < 5')
        print('belongs to else block')
    print('belongs to while block')
```
## 使用\连接
```python
a = 'Hello' + \
    '  ' + \
    'World'
print(a)
```
## 条件语句
- if elif else
```python
# 逻辑与代码块依靠缩进
>>> a = 9
>>> b = 101
>>> if a > 10:
...     print('a > 10')
... else:
...     if b > 100:
...         print('b > 100')
...     else:
...         print('b < 100')
b > 100
```
## 循环
### for循环
- in解构赋值
- continue回到循环开头
- break结束循环
```python
lang_list = ['html', 'js', 'css', 'python']

# 方法1
for item in lang_list:
    print(item)
# 方法2
for i in range(len(lang_list)):
    print(lang_list[i])
# 方法3
for i, val in enumerate(lang_list):
    print (i, ' ', val)
# 0   html
# 1   js
# 2   css
# 3   python
```
```
>>> a = [['a', 'b'], ['c', 'd']]
>>> for first, second in a:
...     print(first, ' ', second)
... 
a   b
c   d
```
```
# 字典
>>> for key, value in a.items():
...     print(key, ' ', value)
... 
b   2
a   1
```
```python
>>> while True:
...     a = int(input())
...     if (a % 2 == 0):
...         print(a)
...     else:
...         break
```
### while 循环
- break结束循环
- continue回到循环开始
```python
>>> a = ['a', 'b', 'c']
>>> current = 0
>>> while current < len(a):
...     print(a[current])
...     current += 1
... 
a
b
c
```
```
>>> a = [1, 3, 5, 7, 8, 9]
>>> while(cur < len(a)):
...     if (a[cur] % 2 == 0):
...         print(a[cur])
...         break
...     else:
...         cur += 1
8
```

## 练习
1. 输入任意几个数字，输出这几个数字的和
2. 输入任意几个数字，输出出现次数最多的数字
3. 输入任意几个数字，去除重复数字
4. 输入任意几个数字和目标数字，找出和恰好等于目标数字的两个数
5. 判断输入的括号能否正常匹配，例如([{}{}])是正常匹配的，但([)]则不能正常匹配

## 推导式
### 列表推导式
#### 从1到5生成一个整数列表
- 普通方法
```python
# 目标 num_list => [1, 2, 3, 4, 5]
# 方法一
num_list = []
num_list.append(1)
num_list.append(2)
num_list.append(3)
num_list.append(4)
num_list.append(5)

# 方法二
num_list = []
for num in range(1, 6):
    num_list.append(num)

# 方法三
num_list = list(range(1, 6))
```
- 列表推导方式
```python
# [expression for item in iterable]
>>> num_list = [num for num in range(1,6)]
>>> num_list
[1, 2, 3, 4, 5]
>>> num_list = [num / 100 for num in range(1,6)]
>>> num_list
[0.01, 0.02, 0.03, 0.04, 0.05]
```
- 列表推导方式，带条件
```python
# [expression for item in iterable if condition]
# 练习：使用for循环实现
num_list = [num for num in range(1,6) if num % 2 == 1]
```
#### 多重for循环
- 普通方法
```python
rows = range(1,4)
cols = range(1,3)
for row in rows:
    for col in cols:
        print(row, col)
1 1 
1 2 
2 1 
2 2 
3 1 
3 2
```
- 列表推导方法
```python
rows = range(1, 4)
cols = range(1, 3)
cells = [(row, col) for row in rows for col in cols]
for row, col in cells:
    print(row, col)
```
### 字典推导式
```python
# { key_expression : value_expression for expression in iterable }
word = 'hello'
letter_counts = {letter + '_1': word.count(letter) for letter in word}
print(letter_counts)
# {'h_1': 1, 'o_1': 1, 'l_1': 2, 'e_1': 1}
```
```python
student = [('name', 'Tom'), ('age', 18)]
student = {item[0]: item[1] for item in student}
# {'name': 'Tom', 'age': 18}
```
### 集合推导式
- 和列表类似
### 生成器推导式
- 没有`元组`推导式
```python
number_thing = (number for number in range(1, 6))
type(number_thing) # => <class 'generotor'>
```
```python
'''
一个生成器只能运行一次，生成器仅在运行中产生值，不会保存下来，再次使用时，已被擦除
'''
>>> for number in number_thing:
...     print(number)
1
2 
3 
4 
5
>>> try_again = list(number_thing)
>>> try_again
[]
```


