# 2-Python容器

`Python` `教程`

## 列表(list)和元组(tuple)
- python中的2种序列结构，可包含0或多个任意元素
- 字符串也是序列，但字符串只能包含字符
- 列表可变，元组不可变
- [] 或list()创建列表，使用()或tuple()创建元组
```python
>>> empty_list = []
>>> empty_list = list()
# 强制类型转换
>>> list('Tom') 
['T', 'o', 'm']
>>> a_tuple = (15, 'fire', ['a', 'b']) 
>>> list(a_tuple)
[15, 'fire', ['a', 'b']]
```
- split，字符串分割为列表
```python
>>> date = '1906--08--09'
>>> date.split('--')
['1906', '08', '09']
>>> date.split('-')
['1906', '', '08', '', '09']
```
- []下标获取元素，0-表示从前开始，-1表示从最后开始
```python
>>> a = ['one', 'two', ['a', 'b']]
>>> a[0]
'one'
>>> a[2][1]
'b'
>>> a[-1][0]
'a'
>>> a[-2]
'two'
```
- []修改元素
```python
>>> a = ['one', 'two', ['a', 'b']]
>>> a[0] = 100
>>> a
[100, 'two', ['a', 'b']]
```
```python
# 元组不可修改
>>> a_tuple = ('one', 'two', ['a', 'b'])
>>> a_tuple[-1][1] = 'c'
>>> a_tuple
('one', 'two', ['a', 'c'])
>>> a_tuple[0] = 100
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```
- 切片 [start, end, step]
```python
>>> a = [11, 12, 13, 14, 15]
>>> a[2:3]
[13]
>>> a[2:4]
[13, 14]
>>> a[2:4:2]
[13]
>>> a[::2]
[11, 13, 15]
>>> a[::-1]
[15, 14, 13, 12, 11]
>>> a[0:len(a):1]
[11, 12, 13, 14, 15]
>>> a[5:1:-1]
[15, 14, 13]
```
- append 添加
```python
>>> a
[11, 12, 13, 14, 15]
>>> a.append(100)
>>> a
[11, 12, 13, 14, 15, 100]
>>> a.append([1, 2])
>>> a
[11, 12, 13, 14, 15, 100, [1, 2]]
```
- extend 或 += 合并2个列表
```python
>>> a
[1, 2, 3]
>>> b = [9, 10]
>>> c = a + b
>>> c
[1, 2, 3, 9, 10]
>>> a
[1, 2, 3]
>>> b
[9, 10]
>>> a += b
>>> a
[1, 2, 3, 9, 10]
```
- del 删除指定位置元素
```python
>>> a
[1, 2, 3, 9, 10, 9, 10]
>>> del a[2]
>>> a
[1, 2, 9, 10, 9, 10]
```
- insert 在指定位置插入元素
```python
>>> a = [1, 2, 9, 10, 9, 10]
>>> a.insert(0, 100)
>>> a
[100, 1, 2, 9, 10, 9, 10]
```
- remove 删除具有指定值的元素
```python
>>> a
[1, 2, 9, 10, 9, 10]
>>> a.remove(10)
[1, 2, 9, 9, 10]
```
- pop 删除并返回指定位置元素，可构造队列和栈
```python
>>> a = [1,2,3,4]
>>> a.pop()
4
>>> a
[1, 2, 3]
>>> a.pop(0)
1
>>> a
[2, 3]
>>> a.append(100)
>>> a
[2, 3, 100]
```
- index 特定值的位置
```python
>>> a = [1, 2, 3, 2, 10]
>>> a.index(2)
1
```
- in 判断值是否存在
```python
>>> a
[1, 2, 3]
>>> a.index(3)
2
>>> 1 in a
True
```
```python
a = ['Tom', 'Jack']
name = input('请输入名字')
if name in a:
    print('获奖了')
else:
    print('没获奖')
```
- count 统计某个值出现的次数
```python
>>> a = [1, 1, 1, 3]
>>> a.count(1)
3
```

## 字典
- 字典即键-值对（key-value）
- 使用{}或dict()创建字典
```
>>> a = {'name': 'Tom', 'birthday': '1996/05/01'}
>>> a
{'birthday': '1996/05/01', 'name': 'Tom'}
# 双值子序列转换为字典
>>> seq = [['name','Tom'], ['birthday', '1996/05/01']]
>>> dict(seq)
{'birthday': '1996/05/01', 'name': 'Tom'}
>>> seq = ['ab', 'cd'] 
>>> dict(seq)
{'c': 'd', 'a': 'b'}
```
- 使用[key]添加或修改元素
- del 删除指定键的元素
```python
>>> a_dict = {'a': 1, 'b': 2}
>>> a_dict['a'] = 100
>>> a_dict['c'] = 999
>>> del a_dict['b']
>>> a_dict
{'c': 999, 'a': 100}
```
- clear 清空所有
- in 判断是否存在
```python
>>> b
{'name': 'Tom', 'c': 'd', 'age': 18}
>>> 'name' in b
True
>>> 'number' in b
False
```
- []或get获取元素
```
# 使用 []获取不存在的键的值时会报错
# 可以在获取值前用in判断是否存在
# 也可以，使用get方法，不存在时，返回None
>>> a_dict = {'a': 1, 'b': 2}
>>> a_dict['c']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'c'
>>> a_dict.get('c')
>>> a_dict.get('c') == None
True
```
- keys,values,items
```python
>>> a_dict = {'a': 1, 'b': 2, 'c': 3}
>>> a_dict.keys()
dict_keys(['b', 'c', 'a'])
>>> a_dict.values()
dict_values([2, 3, 1])
>>> a_dict.items()
dict_items([('b', 2), ('c', 3), ('a', 1)])
>>> list(a_dict.keys())
['b', 'c', 'a']
```
```python
>>> a = {'a': 'b', 'c': 'd'}
>>> b = a.keys()
>>> b
dict_keys(['c', 'a'])
>>> b[0] = 'Tom'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'dict_keys' object does not support item assignment
>>> b = list(b)
>>> b[0] = 'Tom'
>>> b
['Tom', 'a']
```
- copy，复制字典
```python
>>> a
{'c': 'd', 'a': 'b'}
>>> a2 = a
>>> a2['c'] = 'z'
>>> a2
{'c': 'z', 'a': 'b'}
>>> a
{'c': 'z', 'a': 'b'}
```
> 注： 引用

## 集合
- 集合中没有重复值
- 使用set()创建
```python
>>> set()
set()
>>> set('abbcccccd')
{'b', 'c', 'd', 'a'}
>>> set({'a' : 1, 'b' : 2})
{'b', 'a'}
>>> set([1, 1, 1, 2, 3, 4, 4])
{1, 2, 3, 4}
```
```python
>>> a = set()
>>> a.add(2)
>>> a.add(4)
>>> a
{2, 4}
>>> a.add(2)
>>> a
{2, 4}
```
- 交集，并集，差集
```python
>>> a = {1, 2}
>>> b = {2, 3}
>>> a & b
{2}
>>> a.intersection(b)
{2}
>>> a | b
{1, 2, 3}
>>> a.union(b)
{1, 2, 3}
>>> a - b
{1}
>>> a.difference(b) # 出现在a，但b中没有出现
{1}
```