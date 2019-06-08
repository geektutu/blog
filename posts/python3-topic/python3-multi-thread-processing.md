---
title: Python模块-多线程与多进程
date: 2017-08-21 10:51:24
description: 本文介绍Python的多线程与多进程的知识。
tags:
- Python
- 多进程
---

## 前置知识

### 操作系统

#### 任务调度

- 时间片

> 大部分操作系统的任务调度是采用时间片轮转的抢占式调度方式， 也就是说一个任务执行一小段时间后强制暂停去执行下一个任务， 每个任务轮流执行。 任务执行的一小段时间叫做时间片

- 运行状态

> 任务正在执行时的状态叫运行状态

- 就绪状态

> 任务执行一段时间后强制暂停去执行下一个任务， 被暂停的任务就处于就绪状态等待下一个属于它的时间片的到来。 

- 并发

> 这样每个任务都能得到执行， 由于CPU的执行效率非常高， 时间片非常短， 在各个任务之间快速地切换， 给人的感觉就是多个任务在“同时进行”， 即并发。 

- 并发的本质

> 并发的本质， 是任务切片串行的结果， 而非真正的并行。 

 `注：理解并发与并行，串行与并行` 

#### 进程

- 程序与进程

> 计算机的核心是CPU， 它承担了所有的计算任务； 而操作系统是计算机的管理者， 它负责任务的调度、 资源的分配和管理， 程序是运行于操作系统之上的。 

> 进程一般由程序、 数据集合和进程控制块三部分组成。 程序控制块(Program Control Block， 简称**PCB**)， 包含进程的描述信息和控制信息， 是进程存在的唯一标志。 

- 进程具有的特征： 
    - 动态性： 进程是程序的一次执行过程， 是临时的， 有生命期的， 是动态产生， 动态消亡的； 
    - 并发性： 任何进程都可以同其他进程一起并发执行； 
    - 独立性： 进程是系统进行资源分配和调度的一个独立单位； 
    - 结构性： 进程由程序、 数据和进程控制块三部分组成。 

#### 线程

- 出现原因

> 随着计算机的发展， 对CPU的要求越来越高， 进程之间的切换开销较大， 无法满足越来越复杂的程序的要求。 

- 线程是什么

> 线程是程序执行中一个单一的顺序控制流程， 是程序执行流的最小单元， 是处理器调度和分派的基本单位。 

- 进程与线程的关系

> 一个进程可以有一个或多个线程， 各个线程之间共享程序的内存空间(也就是所在进程的内存空间)。 

#### I/O密集与CPU密集

- I/O密集型应用
- CPU密集型应用

## 多进程与多线程简明教程

### 多进程

```python
import multiprocessing
import time
 
def worker_1(interval):
    print("worker_1")
    time.sleep(interval)
    print("end worker_1")
 
def worker_2(interval):
    print("worker_2")
    time.sleep(interval)
    print("end worker_2")
 
def worker_3(interval):
    print("worker_3")
    time.sleep(interval)
    print("end worker_3")
 
if __name__ == "__main__":
    p1 = multiprocessing.Process(target = worker_1, args = (2,))
    p2 = multiprocessing.Process(target = worker_2, args = (3,))
    p3 = multiprocessing.Process(target = worker_3, args = (4,))
 
    p1.start()
    p2.start()
    p3.start()
 
    print("The number of CPU is:" + str(multiprocessing.cpu_count()))
    for p in multiprocessing.active_children():
        print("child   p.name:" + p.name + "\tp.id" + str(p.pid))
    print("END!!!!!!!!!!!!!!!!!")

# The number of CPU is:8
# worker_1
# child   p.name:Process-3        p.id11829
# child   p.name:Process-2        p.id11828
# child   p.name:Process-1        p.id11827
# END!!!!!!!!!!!!!!!!!
# worker_2
# worker_3
# end worker_1
# end worker_2
# end worker_3
```

- deamon

> 主进程结束， 子进程随之结束

```python
import multiprocessing
import time
 
def worker(interval):
    print("work start:{0}".format(time.ctime()))
    time.sleep(interval)
    print("work end:{0}".format(time.ctime()))
 
if __name__ == "__main__":
    p = multiprocessing.Process(target = worker, args = (3,))
    p.daemon = True # 添加了daemon属性
    p.start()
    print("end!")

# end!
```

```
import multiprocessing
import time

def worker(interval):
    print("work start:{0}".format(time.ctime()))
time.sleep(interval)
print("work end:{0}".format(time.ctime()))

if __name__ == "__main__":
    p = multiprocessing.Process(target = worker, args = (3, ))
p.start()
print("end!")

# end!#work start: Sun Jul 2 15: 53: 45 2017# work end: Sun Jul 2 15: 53: 48 2017
```

- join

> 阻塞当前进程， 直到调用join方法的那个进程执行完， 再继续执行当前进程

```python
import multiprocessing
import time
 
def worker_1(interval):
    print("worker_1")
    time.sleep(interval)
    print("end worker_1")
 
if __name__ == "__main__":
    p1 = multiprocessing.Process(target = worker_1, args = (2,))
    p1.start()
    # p1.join() 
    print("main end!")

# main end!
# worker_1
# end worker_1
```

- 通信

> 进程之前需要传递参数， 数据不能直接获取

```python
import multiprocessing as mp

def washer(dishes, output):
    for dish in dishes:
        print('Washing', dish, 'dish') 
        output.put(dish)

def dryer(input):
    while True:
        dish = input.get() 
        print('Drying', dish, 'dish')
        input.task_done()

dish_queue = mp.JoinableQueue()
dryer_proc = mp.Process(target=dryer, args=(dish_queue,))
dryer_proc.daemon = True
dryer_proc.start()

dishes = ['salad', 'bread', 'entree', 'dessert'] 
washer(dishes, dish_queue)
dish_queue.join()

# Washing salad dish
# Washing bread dish
# Washing entree dish
# Washing dessert dish
# Drying salad dish
# Drying bread dish
# Drying entree dish
# Drying dessert dish
```

### 多线程

> 线程运行在进程内部， 可以访问进程的所有内容。 

- 示例一

```python
import threading
import time
 
def target():
    print('%s is running' % threading.current_thread().name)
    time.sleep(1)
    print('%s is ended' % threading.current_thread().name)
 
print('%s is running' % threading.current_thread().name)
t = threading.Thread(target=target)
t.start()
t.join()
print('%s is ended' % threading.current_thread().name)

# MainThread is running
# Thread-1 is running
# Thread-1 is ended
# MainThread is ended
```

- 示例二

```python
import threading
import queue
import time

def washer(dishes, dish_queue):
    for dish in dishes:
        print("Washing", dish)
        time.sleep(2)
        dish_queue.put(dish)

def dryer(dish_queue):
    while True:
        dish = dish_queue.get()
        print ("Drying", dish)
        time.sleep(10)
        dish_queue.task_done()

dish_queue = queue.Queue()

for n in range(2):
    dryer_thread = threading.Thread(target=dryer, args=(dish_queue,))
    dryer_thread.start()
dishes = ['salad', 'bread', 'entree', 'desert'] 
washer(dishes, dish_queue)
dish_queue.join()

# Washing salad
# Washing bread
# Drying salad
# Washing entree
# Drying bread
# Washing desert
# Drying entree
# Drying desert
```

- 线程是轻量级的

> 与进程相比较

- 线程安全问题与锁的机制

> 只对全局变量读， 不会出现问题， 但是对全局变量进行写操作， 则会出现问题。 

```python
import threading, time

class MyThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
    def run(self):
        global n, lock
        time.sleep(1)
        print(n , self.name)
        n += 1
            
if "__main__" == __name__:
    n = 1
    ThreadList = []
    for i in range(1, 200):
        t = MyThread()
        ThreadList.append(t)
    for t in ThreadList:
        t.start()
    for t in ThreadList:
        t.join()

# 128 Thread-153
# 129 Thread-165
# 129 Thread-173
# 129 Thread-196
# 129 Thread-157
# 129 Thread-188
# 129 Thread-148
# 问题：n最后只有129，多个线程内部输出了同一个n值
```

```python
import threading, time

class MyThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
    def run(self):
        global n, lock
        time.sleep(1)
        if lock.acquire():
            print(n , self.name)
            n += 1
            lock.release()
            
if "__main__" == __name__:
    n = 1
    ThreadList = []
    lock = threading.Lock()
    for i in range(1, 200):
        t = MyThread()
        ThreadList.append(t)
    for t in ThreadList:
        t.start()
    for t in ThreadList:
        t.join()

# 1 Thread-1
# 2 Thread-42
# 3 Thread-6
# 4 Thread-7
# 5 Thread-3
# 6 Thread-8
# 7 Thread-9
# 8 Thread-10
```

## 总结

- 线程适合解决I/O问题

> 如果代码是IO密集型， 多线程可以明显提高效率。 例如制作爬虫， 绝大多数时间爬虫是在等待socket返回数据。 某个线程等待IO的时候其他线程可以继续执行。 

> 如果代码需要读入多个文件， 在等待其他文件读入的同时， 另一个线程可以处理已经读好的问价。 

- 使用进程等来处理CPU问题。 

