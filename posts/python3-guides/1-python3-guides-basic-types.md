# 1-输入输出与基本数据类型

`Python` `教程`

## 输入和输出
- input
- print(普通输出，格式化输出%s,%d等)
    - %d 整数
    - %f 浮点数
    - %s 字符串
    - %x 十六进制整数
```python
name = input('please enter your name: ')
print('hello,', name)
```
```python
>>> money = 10000
>>> print('Hi, %s, you have $%d.' % ('Tom', money))
Hi, Tom, you have $10000.
```
```
>>> '%2d-%02d' % (3, 1)
' 3-01'
>>> '%.2f' % 3.1415926
'3.14'
```
## 数据类型和变量
- 整数
```
Python可以处理任意大小的整数，例如：1，100，-8080，0
十六进制：0xff00，0xa5b4c3d2，等等。
```
- 浮点数
```
1.23，3.14，-9.01
1.2e-5
```
- 字符串
    - 单引号'或双引号"括起来的任意文本，'abc'，"xyz"
    - 如果字符串内部既包含'又包含"？用转义字符\， 'I\'m \"OK\"!'，转义字符\可以转义很多字符，比如\n表示换行，\t表示制表符，字符\本身也要转义，所以\\表示的字符就是\。
    - 不转义，r标志

```python
>>> print("I'm 18 years old") #双引号内含单引号
I'm 18 years old
>>> print('my name is "Tom" ')#单引号内含双引号
my name is "Tom" 
>>> print('I\'m 18')#转义字符
I'm 18
>>> print('\\\t\\')#转义字符
\       \
>>> print(r'\\\t\\')#r标志字符不转义
\\\t\\
```
- 布尔值
```
True False
逻辑运算符号 and or not
与Java，C语言中的 &&,||,!作用相同
```
```python
>>> 5 > 3 or 1 > 3
True
>>> 3 < 4 and 4 < 5
True
>>> 3 < 4 and 4 > 5
False
>>> not False
True
```
```python
// 布尔值常常用于条件判断
if age >= 18:
    print('adult')
else:
    print('kid')
```
```python
age = 12
if age >= 18:
    print('adult')
elif age >= 10:
    print('age: ', age)
    print('teenager')
else:
    print('kid')
```
- 空值
```
None
```
- 变量
```python
x = 8
赋值 x = x + 2 # 把x+2 赋值给 x
除法 x = 10 / 3 # x => 3.333333
整除 x = 10 // 3 # x => 3
```
- 字符串
    - ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符
    ```python
    >>> ord('A')
    65
    >>> chr(66)
    'B'
    ```

    - len()函数计算的是str的字符数
    ```python
    >>> len("abcd")
    4
    ```
    - []取某一位字符的值
    ```python
    >>> a = "abcd"
    >>> a[0]
    'a'
    >>> a[1]
    'b'
    ```
## 扩展知识
- ASCII码
- 位运算与逻辑运算

## 作业
1. 一天有多少秒？请用小时 * 60 * 60的形式计算出。结果复制给一个变量，最后用print输出。
2. 输入天数n，输出有多少秒，例如输入2，输出172800
3. 输入分钟数，输出代表多少天。结果保留2位小数，例如输入720，输出0.50
4. 输入一串长度不超过100的字符，计算出字符的长度，要求输出格式为三位数，例如输入 abcde，输出 005