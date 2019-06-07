---
title: 深入理解Python-2.什么是装饰器（decorators）
date: 2018-07-22 10:51:24
description: 深入理解Python系列第2篇文章，整理自Stackoverflow，介绍什么是装饰器（decorators）。
tags:
- Python
- 深入理解Python
catagories:
- Python专题
---


> - 本文整理自[Stackoverflow - 如何实现链式调用的装饰器？](https://stackoverflow.com/questions/739654/how-to-make-a-chain-of-function-decorators)
> - 可查看[官方文档在这里 -装饰器的使用](https://docs.python.org/3/reference/compound_stmts.html#function)
> - 更多请关注[Github - StackOverflow上票数最高的100个Python问题](https://geekcircle.org/stackoverflow-python-top-qa/)

## 1）装饰器基础

### Python中函数也是对象

为了理解装饰器，你必须先理解Python中函数也是对象，这很重要。接下用个简单的例子来解释。

```python
def shout(word="yes"):
    return word.capitalize() + "!"

print(shout())
# 输出: 'Yes!'

# 作为一个对象，你也能像其他对象一样把一个函数赋值给一个变量。
scream = shout

# 注意，这里并没有使用括号：没有调用shout
# 仅仅是把shout赋值给scream，这意味着接下来可以调用scream

print(scream())
# 输出: 'Yes!'

# 不仅如此，你还可以删除shout,
# 这个函数仍然可以通过scream访问到。

del shout
try:
    print(shout())
except NameError, e:
    print(e)
    # 输出: "name 'shout' is not defined"

print(scream())
# 输出: 'Yes!'
```

记住这一点，我们很快会用到。

在Python中函数的另一个重要的特性是它们可以再另一个函数中声明。

```python
def talk():

    # 在 "talk" 中可以随意定义一个函数...
    def whisper(word="yes"):
        return word.lower() + "..."

    # ... 而且可以理解调用
    print(whisper())

# 每次调用 “talk”，内部声明的 "whisper" 也会被调用。
talk()
# 输出: "yes..."

# 但是在 "talk" 之外，"whisper" 并不存在:

try:
    print(whisper())
except NameError, e:
    print(e)
    # 输出 : "name 'whisper' is not defined"*
    # Python的函数是对象，就像函数内部定义的其他普通对象一样。
```

### 函数引用

接下来就比较有趣了。

你已经知道了函数是对象，因此函数：

- 可以被赋值给一个变量。
- 可以在另一个函数中定义。

这也意味着，**一个函数可以`返回`另一个函数。**

```python
def getTalk(kind="shout"):

    # 随意定义函数
    def shout(word="yes"):
        return word.capitalize()+"!"

    def whisper(word="yes") :
        return word.lower()+"...";

    # 我们返回其中之一。
    if kind == "shout":
        # 不使用 "()", 即不调用这个函数，仅返回函数对象。
        return shout  
    else:
        return whisper

# 返回一个函数，并将它赋值给一个变量。
talk = getTalk()

# 接下来你可以看到“talk”是一个函数对象。
print(talk)
# 输出: <function shout at 0xb7ea817c>

# 这个对象是被 “getTalk” 函数返回的。
print(talk())
# 输出: Yes!

# 你甚至可以直接在返回时调用。
print(getTalk("whisper")())
# 输出: yes...
```

不仅如此，如果你能返回一个函数，你也能将其作为一个参数传递：

```python
def doSomethingBefore(func):
    print("I do something before then I call the function you gave me")
    print(func())

doSomethingBefore(scream)
# 输出:
# I do something before then I call the function you gave me
# Yes!
```

你已经掌握了需要理解装饰器一切基础概念了。正如你所见，装饰器就是函数的“包装”，这意味着装饰器 **让你能够在它装饰的函数前后，去执行另外的一些代码**，而不修改函数本身。

## 2）手工装饰

如何手工装饰函数呢？

```python
# 一个装饰器接收另一个函数作为参数。
def my_shiny_new_decorator(a_function_to_decorate):

    # 函数内部，定义了另一个函数来包装（wrapper）原函数，
    # 因此能够在原函数前后执行一些代码。
    def the_wrapper_around_the_original_function():

        # 想在原函数前执行的代码
        print("Before the function runs")

        # 使用括号调用原函数
        a_function_to_decorate()

        # 想在原函数后执行的代码
        print("After the function runs")

    # 在这里，装饰函数并没有执行。我们仅仅是返回我们刚创建的包装函数。
    # 这个包装函数包含了原函数以及想在原函数前后执行的代码，一起准备就绪。
    return the_wrapper_around_the_original_function

# 现在创建一个普通的函数。
def a_stand_alone_function():
    print("I am a stand alone function, don't you dare modify me")

a_stand_alone_function()
# 输出: I am a stand alone function, don't you dare modify me

# 好了，你可以装饰它扩展它的行为
# 只需要把它传给装饰器，就可以用任何代码去动态地包装它，并返回一个等待调用的函数。

a_stand_alone_function_decorated = my_shiny_new_decorator(a_stand_alone_function)
a_stand_alone_function_decorated()

# 输出:
# Before the function runs
# I am a stand alone function, don't you dare modify me
# After the function runs
```

现在，你很可能想，调用 `a_stand_alone_function_decorated`来代替调用`a_stand_alone_function`。那很简单，仅需要使用 `my_shiny_new_decorator`返回的函数对象覆盖`a_stand_alone_function`的值即可。

```python
a_stand_alone_function = my_shiny_new_decorator(a_stand_alone_function)
a_stand_alone_function()
# 输出:
# Before the function runs
# I am a stand alone function, don't you dare modify me
# After the function runs

# 这就是装饰器所做的事情！
```

## 3）解密装饰器

使用装饰器改写之前的例子。

```python
@my_shiny_new_decorator
def another_stand_alone_function():
    print("Leave me alone")

another_stand_alone_function()  
# 输出:  
# Before the function runs
# Leave me alone
# After the function runs
```

这很简单，`@decorator` 相当于是这个赋值表达式的简写。

```python
another_stand_alone_function = my_shiny_new_decorator(another_stand_alone_function)
```

装饰器仅仅是[装饰器模式](https://en.wikipedia.org/wiki/Decorator_pattern)的Pythonic实现。Python中内置了很多经典的设计模式简化开发（例如迭代器模式）。

当前，你也可以叠加装饰器：

```python
def bread(func):
    def wrapper():
        print("</''''''\>")
        func()
        print("<\______/>")
    return wrapper

def ingredients(func):
    def wrapper():
        print("#tomatoes#")
        func()
        print("~salad~")
    return wrapper

def sandwich(food="--ham--"):
    print(food)

sandwich()
# 输出: --ham--
sandwich = bread(ingredients(sandwich))
sandwich()
# 输出:
# </''''''\>
# #tomatoes#
# --ham--
# ~salad~
# <\______/>
```

使用Python的装饰器语法：

```python
@bread
@ingredients
def sandwich(food="--ham--"):
    print(food)

sandwich()
#outputs:
# </''''''\>
# #tomatoes#
# --ham--
# ~salad~
# <\______/>
```

装饰器的顺序会影响最终的结果：

```python
@ingredients
@bread
def strange_sandwich(food="--ham--"):
    print(food)

strange_sandwich()
# 输出:
# #tomatoes#
# </''''''\>
# --ham--
# <\______/>
# ~salad~
```

接下来介绍装饰器更高级的用法。

## 4）装饰器进阶

### 给被装饰函数传参数

```python
# 给包装函数传递参数

def a_decorator_passing_arguments(function_to_decorate):
    def a_wrapper_accepting_arguments(arg1, arg2):
        print("I got args! Look: {0}, {1}".format(arg1, arg2))
        function_to_decorate(arg1, arg2)
    return a_wrapper_accepting_arguments

# 调用装饰器返回的函数, 其实就是在调用包装函数, 将参数传递给包装函数，包装函数再传递给被装饰的函数。

@a_decorator_passing_arguments
def print_full_name(first_name, last_name):
    print("My name is {0} {1}".format(first_name, last_name))

print_full_name("Peter", "Venkman")
# 输出:
# I got args! Look: Peter Venkman
# My name is Peter Venkman
```

### 装饰对象方法

在Python中方法和函数其实是一样的，唯一的区别在于对象方法期待第一个参数是对当前对象（`self`）的引用。

这就意味着，你也能用相同的方法给给方法添加装饰器，仅需要将`self`考虑在内。

```python
def method_friendly_decorator(method_to_decorate):
    def wrapper(self, lie):
        lie = lie - 3 # very friendly, decrease age even more :-)
        return method_to_decorate(self, lie)
    return wrapper


class Lucy(object):

    def __init__(self):
        self.age = 32

    @method_friendly_decorator
    def sayYourAge(self, lie):
        print("I am {0}, what did you think?".format(self.age + lie))

l = Lucy()
l.sayYourAge(-3)
# 输出: I am 26, what did you think?
```

如果你想创建通用的装饰器，可以应用于任何函数或者方法，不管它的参数是什么，需要使用`*args`, `**kwargs`。

```python
def a_decorator_passing_arbitrary_arguments(function_to_decorate):
    # 包装函数接受任何参数
    def a_wrapper_accepting_arbitrary_arguments(*args, **kwargs):
        print("Do I have args?:")
        print(args)
        print(kwargs)
        # 不熟悉 *args 和 **kwargs，pack，unpack
        # 请查看 http://www.saltycrane.com/blog/2008/01/how-to-use-args-and-kwargs-in-python/
        function_to_decorate(*args, **kwargs)
    return a_wrapper_accepting_arbitrary_arguments

@a_decorator_passing_arbitrary_arguments
def function_with_no_argument():
    print("Python is cool, no argument here.")

function_with_no_argument()
# 输出：
# Do I have args?:
# ()
# {}
# Python is cool, no argument here.

@a_decorator_passing_arbitrary_arguments
def function_with_arguments(a, b, c):
    print(a, b, c)

function_with_arguments(1,2,3)
# 输出：
# Do I have args?:
# (1, 2, 3)
# {}
# 1 2 3

@a_decorator_passing_arbitrary_arguments
def function_with_named_arguments(a, b, c, platypus="Why not ?"):
    print("Do {0}, {1} and {2} like platypus? {3}".format(a, b, c, platypus))

function_with_named_arguments("Bill", "Linus", "Steve", platypus="Indeed!")
# 输出：
# Do I have args ? :
# ('Bill', 'Linus', 'Steve')
# {'platypus': 'Indeed!'}
# Do Bill, Linus and Steve like platypus? Indeed!

class Mary(object):

    def __init__(self):
        self.age = 31

    @a_decorator_passing_arbitrary_arguments
    def sayYourAge(self, lie=-3): # You can now add a default value
        print("I am {0}, what did you think?".format(self.age + lie))

m = Mary()
m.sayYourAge()
# outputs
# Do I have args?:
# (<__main__.Mary object at 0xb7d303ac>,)
# {}
# I am 28, what did you think?
```

### 给装饰器传参数

如何给装饰器本身传参数呢？

这可能有点别扭，因为一个装饰器必须接受一个函数作为参数。因此，你不能够将传递给被装饰函数的参数直接传给装饰器。

解决这个问题之前，我们看个小示例。

```python
# 装饰器是普通的函数
def my_decorator(func):
    print("I am an ordinary function")
    def wrapper():
        print("I am function returned by the decorator")
        func()
    return wrapper

# 因此，你可以不需要“@”来调用它

def lazy_function():
    print("zzzzzzzz")

decorated_function = my_decorator(lazy_function)
# 输出: I am an ordinary function

# 输出: I am an ordinary function，仅仅是因为你调用了它，没啥特别的。

@my_decorator
def lazy_function():
    print("zzzzzzzz")

# 输出: I am an ordinary function
```

2种用法效果一致，“`my_decorator`”都被调用了。也就是说，当你`@my_decorator`，你是在告诉Python，调用@标志的这个函数。

这很重要，你给的这个标签能够直接指向装饰器。

更进一步：

```python
def decorator_maker():

    print("由我来创建装饰器，我只会在调用我来创建装饰器时调用一次。")

    def my_decorator(func):

        print("我是一个装饰器，每次装饰函数时，我都会调用一次。")

        def wrapped():
            print("我是包装函数，当调用被装饰函数时，我也被调用了，作为包装函数，我返回被包装函数对象。")
            return func()

        print("作为一个装饰器，我返回包装函数。")

        return wrapped

    print("作为装饰器制造者，我返回一个装饰器。")
    return my_decorator

# 创建一个装饰器
new_decorator = decorator_maker()
# 输出
# 由我来创建装饰器，我只会在调用我来创建装饰器时调用一次。
# 作为装饰器制造者，我返回一个装饰器。

# 接下来装饰一个函数
def decorated_function():
    print("我是被装饰的函数")

decorated_function = new_decorator(decorated_function)
# 输出:
# 我是一个装饰器，每次装饰函数时，我都会调用一次。
# 作为一个装饰器，我返回包装函数。

# 调用被装饰函数:
decorated_function()
# 输出:
# 我是包装函数，当调用被装饰函数时，我也被调用了，作为包装函数，我返回被包装函数对象。
# 我是被装饰的函数
```

跳过中间变量，完成相同的事情。

```python
def decorated_function():
    print("我是被装饰的函数")

decorated_function = decorator_maker()(decorated_function)
# 输出:
# 由我来创建装饰器，我只会在调用我来创建装饰器时调用一次。
# 作为装饰器制造者，我返回一个装饰器。
# 我是一个装饰器，每次装饰函数时，我都会调用一次。
# 作为一个装饰器，我返回包装函数。

# 最终:
decorated_function()
# 输出:
# 我是包装函数，当调用被装饰函数时，我也被调用了，作为包装函数，我返回被包装函数对象。
# 我是被装饰的函数
```

更简洁一点

```python
@decorator_maker()
def decorated_function():
    print("I am the decorated function.")
# 输出:
# 由我来创建装饰器，我只会在调用我来创建装饰器时调用一次。
# 作为装饰器制造者，我返回一个装饰器。
# 我是一个装饰器，每次装饰函数时，我都会调用一次。
# 作为一个装饰器，我返回包装函数。

# 最终:
decorated_function()
# 输出:
# 我是包装函数，当调用被装饰函数时，我也被调用了，作为包装函数，我返回被包装函数对象。
# 我是被装饰的函数
```

看到了吗？我们使用“`@`”语法时，进行了函数调用。

回到如果给装饰器传参，如果我们使用函数去生成装饰器，我们可以给这个函数传参，不是吗？

```python
def decorator_maker_with_arguments(decorator_arg1, decorator_arg2):

    print("我创建了装饰器，我接收参数: {0}, {1}".format(decorator_arg1, decorator_arg2))

    def my_decorator(func):
        # 了解闭包
        # 参考https://stackoverflow.com/questions/13857/can-you-explain-closures-as-they-relate-to-python
        print("我是装饰器，给我传了参数: {0}, {1}".format(decorator_arg1, decorator_arg2))

        # Don't confuse decorator arguments and function arguments!
        def wrapped(function_arg1, function_arg2) :
            print("我是包装函数，我能访问所有的变量\n"
                  "\t- 来自装饰器的: {0} {1}\n"
                  "\t- 来自函数调用的: {2} {3}\n"
                  "我能把它们装递给被装饰函数"
                  .format(decorator_arg1, decorator_arg2,
                        function_arg1, function_arg2))
            return func(function_arg1, function_arg2)

        return wrapped

    return my_decorator

@decorator_maker_with_arguments("Leonard", "Sheldon")
def decorated_function_with_arguments(function_arg1, function_arg2):
    print("我是被包装函数，仅仅知道自己的参数: {0}"
           " {1}".format(function_arg1, function_arg2))

decorated_function_with_arguments("Rajesh", "Howard")
# 输出:
# 我创建了装饰器，我接收参数:: Leonard, Sheldon
# 我是装饰器，给我传了参数: Leonard, Sheldon
# 我是包装函数，我能访问所有的变量
#    - 来自装饰器的: Leonard Sheldon
#    - 来自函数调用的: Rajesh Howard
# 我能把它们装递给被装饰函数
# 我是被包装函数，仅仅知道自己的参数: Rajesh Howard
```

这就是包含参数的装饰器，参数也能被设置为变量。

```python
c1 = "Penny"
c2 = "Leslie"

@decorator_maker_with_arguments("Leonard", c1)
def decorated_function_with_arguments(function_arg1, function_arg2):
    print("我是被包装函数，仅仅知道自己的参数:"
           " {0} {1}".format(function_arg1, function_arg2))

decorated_function_with_arguments(c2, "Howard")
```

如你所见，用这种方式你能传递参数给装饰器。你甚至能使用`*args`，`**kwargs`，但是记住，装饰器只被 **调用一次**，仅仅当Python导入这个脚本的时候。之后你不能动态地设置参数。当你"import x"时，**这个函数已经被装饰了**，因此不能变了。

### 装饰一个装饰器

- 无参装饰器

```python
def parent_decorator(child_decorator):
    """这个函数将被当作一个装饰器，用来装饰另一个装饰器: child_decorator。"""

    # 创建一个装饰器（装饰器的参数是一个函数）。
    def wrapper(func):
        print('我是父装饰器')
        # 返回传入装饰器的运行结果（装饰器的返回值是一个函数）
        return child_decorator(func)

    return wrapper

@parent_decorator
def child_decorator(func):
    def wrapper(args):
        print('我是子装饰器')
        func(args)

    return wrapper

@child_decorator
def print_hello(name):
    print('我是', name)


print_hello('极客兔兔 https://geektutu.com')

# 输出：
# 我是父装饰器
# 我是子装饰器
# 我是 极客兔兔 https://geektutu.com
```

- 接受任意参数的装饰器

接下里将给出一些代码片段，允许传入任何参数来创建装饰器。为了接受函数，我们使用了另一个函数来创建装饰器。

如果我们使用另一个函数来包装这个装饰器，那么这个包装函数就成为了装饰了这个装饰器的新的装饰器。

接下来，举个例子来演示如何装饰一个装饰器。

```python
def decorator_with_args(decorator_to_enhance):
    """这个函数将被当作一个装饰器，用来装饰另一个装饰器。允许接受任意的参数。"""

    # 使用和上面例子相同的方法来传递参数，创建装饰器
    def decorator_maker(*args, **kwargs):

        # 创建一个装饰器（装饰器的参数是一个函数），但是保留了maker传入的参数。
        def decorator_wrapper(func):

            # 返回传入装饰器的运行结果（装饰器的返回值是一个函数）
            # 传入的装饰器的声明必须是 decorator(func, *args, **kwargs)
            return decorator_to_enhance(func, *args, **kwargs)

        return decorator_wrapper

    return decorator_maker
```

这样使用

```python

# 创建一个装饰器，并用 @decorator_with_args 装饰它
# 装饰器的声明是 "decorator(func, *args, **kwargs)"，
# 需与decorator_with_args中保持一致。
@decorator_with_args
def decorated_decorator(func, *args, **kwargs):
    def wrapper(function_arg1, function_arg2):
        print("Decorated with {0} {1}".format(args, kwargs))
        return func(function_arg1, function_arg2)
    return wrapper

# 装饰目标函数
@decorated_decorator(42, 404, 1024)
def decorated_function(function_arg1, function_arg2):
    print("Hello {0} {1}".format(function_arg1, function_arg2))

decorated_function("Universe and", "everything")
# 输出:
# Decorated with (42, 404, 1024) {}
# Hello Universe and everything
```

## 5）装饰器的最佳实践

装饰器在Python2.4中被引入，装饰器会让函数调用变慢，你需要知道这一点。

**你不能够取消对一个函数的装饰**（有一些方法可以创建能被移除的装饰器，但是没人使用），因此，一旦一个函数被装饰了，那么所有使用这个函数的地方都被装饰了。

装饰器包装函数，可能会让调试变得困难。（对于Python >= 2.5的版本，会容易一些，原因如下）。

`functools`这个模块，在Python 2.5中引入，包含了`functools.wraps()`函数，这个函数将会把被装饰函数的名称、模块和docstring复制到它的装饰器中。(事实上，`functools.wraps()`也是一个装饰器，☺)

```python
# 为了调试，堆栈将打印出函数名。
def foo():
    print("foo")

print(foo.__name__)

# 输出: foo

# 用了装饰后，变得复杂了
def bar(func):
    def wrapper():
        print("bar")
        return func()
    return wrapper

@bar
def foo():
    print("foo")

print(foo.__name__)
# 输出: wrapper

# "functools" 能解决这个问题

import functools

def bar(func):
    # "wrapper"包装了"func"
    # 神奇的事情在这~
    @functools.wraps(func)
    def wrapper():
        print("bar")
        return func()
    return wrapper

@bar
def foo():
    print("foo")

print(foo.__name__)
# 输出: foo
```

## 6）装饰器用来做什么？

**现在最大的问题**，装饰器用来做什么？

看起来很酷，很强大，但是实用才是王道。当然，这有无数种可能性。经典的用法是用来扩展不能修改的外部库导入的函数的行为，或者为了调试。

你可以扩展好几个函数的行为，像这样：

```python
def benchmark(func):
    """
    打印花费多少时间的装饰器
    """
    import time
    def wrapper(*args, **kwargs):
        t = time.clock()
        res = func(*args, **kwargs)
        print("{0} {1}".format(func.__name__, time.clock()-t))
        return res
    return wrapper


def logging(func):
    """
    打印脚本活动的装饰器
    """
    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)
        print("{0} {1} {2}".format(func.__name__, args, kwargs))
        return res
    return wrapper


def counter(func):
    """
    打印函数被调用次数的装饰器
    """
    def wrapper(*args, **kwargs):
        wrapper.count = wrapper.count + 1
        res = func(*args, **kwargs)
        print("{0} has been used: {1}x".format(func.__name__, wrapper.count))
        return res
    wrapper.count = 0
    return wrapper

@counter
@benchmark
@logging
def reverse_string(string):
    return str(reversed(string))

print(reverse_string("Able was I ere I saw Elba"))
print(reverse_string("A man, a plan, a canoe, pasta, heros, rajahs, a coloratura, maps, snipe, percale, macaroni, a gag, a banana bag, a tan, a tag, a banana bag again (or a camel), a crepe, pins, Spam, a rut, a Rolo, cash, a jar, sore hats, a peon, a canal: Panama!"))

# 输出:
# reverse_string ('Able was I ere I saw Elba',) {}
# wrapper 0.0
# wrapper has been used: 1x
# ablE was I ere I saw elbA
# reverse_string ('A man, a plan, a canoe, pasta, heros, rajahs, a coloratura, maps, snipe, percale, macaroni, a gag, a banana bag, a tan, a tag, a banana bag again (or a camel), a crepe, pins, Spam, a rut, a Rolo, cash, a jar, sore hats, a peon, a canal: Panama!',) {}
# wrapper 0.0
# wrapper has been used: 2x
# !amanaP :lanac a ,noep a ,stah eros ,raj a ,hsac ,oloR a ,tur a ,mapS ,snip ,eperc a ,)lemac a ro( niaga gab ananab a ,gat a ,nat a ,gab ananab a ,gag a ,inoracam ,elacrep ,epins ,spam ,arutaroloc a ,shajar ,soreh ,atsap ,eonac a ,nalp a ,nam A
```

当前，装饰器的好处还在于如果能够正确使用，可避免重复代码。

```python
@counter
@benchmark
@logging
def get_random_futurama_quote():
    from urllib import urlopen
    result = urlopen("http://subfusion.net/cgi-bin/quote.pl?quote=futurama").read()
    try:
        value = result.split("<br><b><hr><br>")[1].split("<br><br><hr>")[0]
        return value.strip()
    except:
        return "No, I'm ... doesn't!"


print(get_random_futurama_quote())
print(get_random_futurama_quote())

# outputs:
# get_random_futurama_quote () {}
# wrapper 0.02
# wrapper has been used: 1x
# The laws of science be a harsh mistress.
# get_random_futurama_quote () {}
# wrapper 0.01
# wrapper has been used: 2x
# Curse you, merciful Poseidon!
```

Python 内置了很多装饰器： `property`, `staticmethod`，等。

Django使用装饰器来管理缓存，视图权限。

集成内部异步调用。

装饰器的使用远不止这些。