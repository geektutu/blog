---
title: Python模块-BeautifulSoup(bs4)解析HTML
date: 2017-08-21 10:51:24
description: 本文介绍python常用模块BeautifulSoup(bs4)的使用
tags:
- Python
- 爬虫
---

## 前置知识

### Chrome调试

- elements
- network

### HTML基础知识

- [标签](http://www.w3school.com.cn/tags/index.asp)
    - 闭合标签 div, p, label, body, head
    - 自闭合标签 input, br, hr, meta, img
- [属性](http://www.w3school.com.cn/tags/html_ref_standardattributes.asp)
    - id
    - name
    - style
    - class
    - value（针对input, select等）
    - href （针对a标签）

### JS基础知识

- DOM（文本对象模型）
- 方法
    - querySelector
    - querySelectorAll
    - getElementById
    - getElementsByName
    - getElementsByTagName
- 属性
    - textContent
    - innerText
    - innerHTML

## bs4简明教程

> Beautiful Soup提供一些简单的、 python式的函数用来处理导航、 搜索、 修改分析树等功能。 它是一个工具箱， 通过解析文档为用户提供需要抓取的数据， 因为简单， 所以不需要多少代码就可以写出一个完整的应用程序。 

Beautiful Soup自动将输入文档转换为Unicode编码， 输出文档转换为utf-8编码。 你不需要考虑编码方式。 

### 安装

```python
python3 -m pip install beautifulsoup4
```

- 解析器 
    - Python标准库 html.parser
    - 第三方库， lxml等

### 使用

#### 把html文本转为bs

```python
html = """
<html>
<head>
<title>Demo</title>
</head>
<body>
<p class="title" name="hello">
    <b>This is a demo</b>
</p>
<p class="story">
    This is a paragraph
    <a href="/section/1" class="para" id="link1"><!-- Tom --></a>,
    <a href="/section/2" class="para" id="link2">Jack</a> and
    <a href="/section/3" class="para" id="link3">Sam</a>
</p>
<p class="story">...</p>
"""
soup = BeautifulSoup(html, "html.parser")
# soup = BeautifulSoup(open('index.html'))
print(soup.prettify()) # 格式化输出
```

#### 主要的类

- BeautifulSoup

> BeautifulSoup对象表示的是一个文档的全部内容. 大部分时候, 可以把它当作 Tag 对象， 是一个特殊的Tag

```python
html = '<a href="/section/1">test</a>'
soup = BeautifulSoup(html, 'html.parser')
print(type(soup))
print(type(soup.name))
print(soup.name)
print(soup.attrs)

# <class 'bs4.BeautifulSoup'>
# <class 'str'>
# [document]
# {}
```

- Tag

> Tag即HTML标签

```html
<a href="/section/1" class="para" id="link1"><!-- Tom --></a>
<p class="title" name="hello">
    <b>This is a demo</b>
</p>
```

```python
soup.p.name
soup.p.attrs
soup.p['class']
soup.p.get('class')
soup.p['class'] = 'a_class' # 赋值修改
type(soup.p) # <class 'bs4.element.Tag'>
```

- NavigableString

> 标签内部文字

```python
soup.p.string

```

- Comment

> 特殊的内部文字， 注释

```python
if type(soup.a.string) == bs4.element.Comment:
    print(soup.a.string)
```

#### 遍历

- contents

```python
# 子节点以列表方式输出
soup.head.contents
```

- children

> 返回一个迭代器

- descendants 

> 所有子孙节点

- strings

> 多个内容

- stripped_strings 

> 去掉空格

- parent

> 父节点

```python
p.parent.name
```

- parents

> 全部父节点

```python
p = soup.head.p
for parent in p.parent:
    print(parent.name)
```

- next_sibling, previous_sibling

> 兄弟节点

- next_siblings, previous_siblings

> 全部兄弟节点

#### 属性搜索

- name

```python
'''
find_all(name, attrs, recursive, text, **kwargs)
'''
soup.find_all('b')
soup.find_all(['b', 'p'])
```

- func

```python
def has_class_but_no_id(tag):
    return tag.has_attr('class') and not tag.has_attr('id')
soup.find_all(has_class_but_no_id)
```

- keyword

```python
soup.find_all(id='link1')
soup.find_all(id='link2', href=re.compile('video'))
```

```python
data_soup.find_all(attrs={"data-foo": "value"})
# [<div data-foo="value">foo!</div>]
```

```python
# class避免和python关键字冲突
soup.find_all("a", class_="para")
```

- text

```python
soup.find_all(text="Jack")
soup.find_all(text=["Jack", "Tom", "Same"])
soup.find_all(text=re.compile("demo"))
```

- limit

```python
soup.find_all("a", limit=2)
```

- recursive

```python
soup.html.find_all("title")
soup.html.find_all("title", recursive=False)
```

- find_parents
- find_next_sibling(s)
- find_previous_sibling(s)

#### CSS选择器

- id

```python
print soup.select('#link1')
```

- '>'

```
print soup.select("head > title")
```

- class

```python
print soup.select(".title")
```

- 组合

```python
# p元素下，class包含para的元素
print soup.select('p .para')
# class包含para的p元素
print soup.select('p.para')
# class包含para和title的p元素
print soup.select('p.para.title')
```

- 属性

```python
print soup.select("a[href='/section/1']")
```

## 相关链接

- [Beautiful Soup 4.2.0文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)
- [ASCII, Unicode, UTF-8是什么](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
- [requests和bs4编码转换](http://www.jianshu.com/p/69401b84419e)
