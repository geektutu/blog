---
title: 深入理解Python-3.__str__和__repr__的区别
date: 2018-09-19 10:51:24
tags:
- Python
- 深入理解Python
catagories:
- Python专题
---

> - 本文整理自[Stackoverflow - \_\_str\_\_ 和 \_\_repr\_\_的区别](https://stackoverflow.com/questions/1436703/difference-between-str-and-repr)
> - 更多请关注[Github - StackOverflow上票数最高的100个Python问题](https://geekcircle.org/stackoverflow-python-top-qa/)

`__str__`和`__repr__`都是基于对象状态返回字符串的特殊方法。

如果缺少`__str__`，`__repr__`提供备份行为，即如果缺少`__str__`，`__str__`的行为与`__repr__`一致。

因此，首先应该实现`__repr__`，通常可根据它返回的字符串重新实例化为等价对象，例如，可以使用`eval`或者在Python shell中逐个字符键入来得到等价对象。

这之后，如果有必要，可以实现`__str__`作为用户可读的实例描述。

## `__str__`的用处

当打印一个对象，或者对象作为`format`，`str.format`的参数时，如果`__str__`方法定义了，`__str__`就会被执行，否则，执行`__repr__`。

## `__repr__`的用处

内置函数`repr`会调用`__repr__`，当你在Python shell中计算一个表达式时，表达式返回的对象在shell中显示为`__repr__`返回的字符串。

如果只能实现其中一个，那应该实现`__repr__`，因为`__str__`可以回退到`__repr__`。

以下是`repr`函数的内置帮助。

```python
repr(...)
    repr(object) -> string

    Return the canonical string representation of the object.
    For most object types, eval(repr(object)) == object.
```

也就是说，对于大部分对象，可以使用`eval(repr(object))`创建一个等价的对象。但是这并不是Python的默认实现。

## `__repr__`的默认实现

`__repr__`的默认实现([C Python source](https://hg.python.org/cpython/file/2.7/Objects/object.c#l377)) 类似这样：

```python
def __repr__(self):
    return '<{0}.{1} object at {2}>'.format(
      self.__module__, type(self).__name__, hex(id(self)))
```

默认打印出模块名，类名和内存中的十六进制的位置，例如：

```python
<__main__.Foo object at 0x7f80665abdd0>
```

## 以`datetime`为例

以`datatime`对象为例，首先导入`datetime`模块。

```python
import datetime
```

如果在shell中调用`datetime.now`，可以看到datetime的`__repr__`生成的字符串，利用这个字符串可以重新创建出等价对象：

```python
>>> datetime.datetime.now()
datetime.datetime(2015, 1, 24, 20, 5, 36, 491180)
```

如果打印datetime对象，可看到适合人阅读的（ISO表示）格式，这是由datetime的`__str__`实现的：

```python
>>> print(datetime.datetime.now())
2015-01-24 20:05:44.977951
```

利用`__repr__`的信息重新创建出一个对象是非常容易的，然后打印它，我们将得到和上面示例一样的输出：

```python
>>> the_past = datetime.datetime(2015, 1, 24, 20, 5, 36, 491180)
>>> print(the_past)
2015-01-24 20:05:36.491180
```

## 如何实现

`__repr__`是如何实现的。以datetime对象的`__repr__`（[Python source](https://hg.python.org/cpython/file/3.4/Lib/datetime.py#l1570)）为例。很复杂，因为需要重建对象的所有属性。

```python
def __repr__(self):
    """Convert to formal string, for repr()."""
    L = [self._year, self._month, self._day, # These are never zero
         self._hour, self._minute, self._second, self._microsecond]
    if L[-1] == 0:
        del L[-1]
    if L[-1] == 0:
        del L[-1]
    s = ", ".join(map(str, L))
    s = "%s(%s)" % ('datetime.' + self.__class__.__name__, s)
    if self._tzinfo is not None:
        assert s[-1:] == ")"
        s = s[:-1] + ", tzinfo=%r" % self._tzinfo + ")"
    return s
```

如果你想让对象可读性更强，接下来可以实现`__str__`了。下面的示例是datetime对象实现`__str__`的代码，非常简单，因为可直接调用转换为ISO格式的函数。

```python
def __str__(self):
    "Convert to string, for str()."
    return self.isoformat(sep=' ')
```

## 设`__repr__`=`__str__`？

反模式。`__repr__`是`__str__`的回退行为，`__repr__`是为了方便开发者定位问题的，正确的做法是先实现`__repr__`，再考虑实现`__str__`。

仅且仅当需要对象的文本表示的时候，才需要实现`__str__`。

## 结论

为你实现的所有对象定义`__repr__`，这样你或者其他开发者有了重建这个对象的示例。

当需要人可阅读的字符串表示的时候，定义`__str__`。