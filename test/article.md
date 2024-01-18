# Bangumi日志，Markdown书写

本文提供一个使用Markdown书写Bangumi Blog的转换工具，
该工具实现从Markdown格式到Bangumi bbcode（下面简称bbcode）格式的转换，
并且能处理大部分常规markdown**文本**语法。

本工具是基于[commonmark.js](https://github.com/commonmark/commonmark.js)的markdown解析器进行开发，
目前commonmark并不支持一些热门、但不在[CommonMark Spec标准](https://spec.commonmark.org/)中的语法，
例如~~删除线~~，也不能处理html标签。
此外文本中不能出现bbcode的*关键字*（形如`[xxx]`和`[/xxx]`），虽然在markdown的视觉效果下只是普通文本，
但在转为bbcode后很可能造成无法挽回的损失。

该工具的目的是为了尽可能优雅地书写markdown时，又能保留bbcode中常用的特性。
也因此本工具做了一些***自定义的处理***，
从而兼顾保障本地markdown书写、阅读的体验和最终Blog的展示效果，
这些处理在下面会有详细说明，并使用`【】`标注出来。

没错，本文正是用该工具转换生成！这里给出这篇文章的[markdown端预览效果](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.md)和[bbcode的预览效果](https://bgm.tv/blog/330695)以及相应的代码[markdown源码](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.md)和[bbcode转换结果](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.bb.md)，
下面具体讲讲该工具支持的语法，并展示实际效果。

# Heading 1

一级标题，效果如上。

```md
# Heading 1
```
## Heading 2

二级标题，效果如上。

```md
## Heading 2
```

### Heading 3

三级标题，效果如上。

```md
### Heading 3
```

对比一下三种标题和正文的size，一级标题24，二级标题22，三级标题20，正文16，
标题效果的例子后面还会多次出现。

# 加粗字体

```md
**Bold Text**
```

**Bold Text**

# 斜体

```md
*Italic Text*
```

*Italic Text*

# 斜体且加粗

```md
***Bold and Italic Text***
```

***Bold and Italic Text***

# 删除线【自定义实现】

commonmark不支持删除线语法，这里自行实现。

## 一般情况

```md
~~我这次回来这里呢。 是为了再一次、倾听星星的声音呢~~
```

~~我这次回来这里呢。 是为了再一次、倾听星星的声音呢~~

## 出现波浪号~~但未配对

如果只是出现波浪号~~，但没有形成配对，那么就不会被删除。

```md
~Ciallo～(∠・ω< )⌒☆！~~
```

~Ciallo～(∠・ω< )⌒☆！~~

## 复杂情况，不考虑

较为复杂的情况，没有做太多考虑，只能各凭本事了。

```md
像这样~~和喜欢的人~~~一起……~~一面迎来早~~~晨一面喝着早晨的~~~咖啡曾是我的梦想啊。~~~~你看，不是有那~~种曲子么。那首~~曲子，我从以前就很喜欢了呢
```

像这样~~和喜欢的人~~~一起……~~一面迎来早~~~晨一面喝着早晨的~~~咖啡曾是我的梦想啊。~~~~你看，不是有那~~种曲子么。那首~~曲子，我从以前就很喜欢了呢

## 跨行的删除线【不支持】

最终的删除线不能跨越markdown的行，这一点要比markdown逊色些，下面是失败现场。

```md
~~愿得我心若明月，
独映暗夜迷途人。~~
```

~~愿得我心若明月，
独映暗夜迷途人。~~


# 下划线【自定义实现】

commonmark不支持下划线语法，这里只是对html的u标签简单替换成bbcode的u标签。

```md
欢迎光临星象馆，这里有<u>无论何时都不会消失，美丽的无穷光辉</u>，满天繁星正在等待您的到来。
```

欢迎光临星象馆，这里有<u>无论何时都不会消失，美丽的无穷光辉</u>，满天繁星正在等待您的到来。

# 分割线【自定义实现】

bbcode中没有解决方案，三种语法全部使用70个“-”进行替代。

## 分割线，不少于3个“-”

```md
---
```

---

## 分割线，不少于3个“*”

```md

********
```

********

## 分割线，不少于3个“_”

```md
_________________________
```

_________________________

# 链接

必须一提的是，本页的图片来自[Bangumi Logo page](https://bgm.tv/group/topic/19842)。

```md
[Bangumi Logo Page](https://bgm.tv/group/topic/19842)
```

# 图片

图片，bbcode的图片和html的图片处理区别较大，html的image alt固定放在标签中间不显示，
而commonmark一旦设置image alt似乎**不能删掉**。

所以计划把image alt显示在图片上方，某种意义上可以充当图片标题，image alt是可选项。

title是鼠标悬浮图片时的提示信息，**必须用双引号**包裹，也是可选项，
甚至在写本文前我都不知道有这个用法，不过在bbcode中直接舍弃。


```md
![alt](link "title")
```

如果图片链接失效，那么就只显示alt文本，上面的模板就是一个无效链接。

![alt](link "title")

## 图片，有alt、有title

title信息会直接删除，alt信息在Blog中显示在图片上方，充当“图片标题”。

```md
![Bangumi 看板娘](https://bgm.tv/img/rc3/bg_musume_2x.png "whoami")
```

![Bangumi 看板娘](https://bgm.tv/img/rc3/bg_musume_2x.png "whoami")

## 图片，无alt、无title

使用这种写法，Blog上的效果最接近markdown。

```md
![](https://bgm.tv/img/rc3/logo_2x.png)
```

![](https://bgm.tv/img/rc3/logo_2x.png)

## 挑战，给图片添加链接！

```md
[![image\_alt](https://bgm.tv/img/logo_rc1_2x.png)](https://bgm.tv/group/topic/19842)
```

这里还是多说一句，如果alt文本中有下划线，“_”需要转义。

没想到bbcode也可以将图片嵌入链接中！

[![image\_alt](https://bgm.tv/img/logo_rc1_2x.png)](https://bgm.tv/group/topic/19842)

## 本地图片自动上传【不支持】

bangumi用户上传的图片使用photo标签，前面的外链转换则使用的img标签。

为了避免不可挽回的隐私安全问题，本地图片上传还是由用户手动处理。~~（其实是技术上不会）~~

例如，这是一张已经删除掉的图片，但仍然可以被引用。

```js
insertPhoto('83732','ce/25/809078_NR0Wx.jpg')
// bbcode result
// [photo=83732]ce/25/809078_NR0Wx.jpg[/photo]
```

# 引用

```md
> …但是，我知道。
>
> 她其实很喜欢比基尼，比导航系统更加熟悉道路，
> 喜欢车辆，甚至拥有自己得驾照。
>
> 尽管总是面无表情，也很少会看我一样，
>
>
> 但偶尔，也会流露出那种好似好羞又好似倔强的神色……
```

> …但是，我知道。
>
> 她其实很喜欢比基尼，比导航系统更加熟悉道路，
> 喜欢车辆，甚至拥有自己得驾照。
>
> 尽管总是面无表情，也很少会看我一样，
>
>
> 但偶尔，也会流露出那种好似好羞又好似倔强的神色……

# 列表

需要注意的是，无序列表、有序列表在bbcode上无法区别，甚至和段落相比也区别不大，
这里给每个列表项前增加“`-`”进行区分。

## 无序列表

```
- 大卫在弹琴……
- 扫罗手中举枪……
- 扫罗将枪投出……
- 心想“我要将大卫钉在墙上”……
- 我要将大卫刺穿……
- 即使会再次被躲过……
```

- 大卫在弹琴……
- 扫罗手中举枪……
- 扫罗将枪投出……
- 心想“我要将大卫钉在墙上”……
- 我要将大卫刺穿……
- 即使会再次被躲过……

## 有序列表

```
1. 哈伊塔精灵
2. 雅努斯之匙
3. 白鸦之羽
4. 摩尔菲斯之石
5. 蛇身指套
```

1. 哈伊塔精灵
2. 雅努斯之匙
3. 白鸦之羽
4. 摩尔菲斯之石
5. 蛇身指套

## 多级列表【不支持】

多级列表显然是不支持的，尽量不要使用，~~TOC生成目录还是使用了~~。

```
- Cure
- Tiaf Bleu
- LeMU
    1. Ersteboden
    2. Zweitestock
    3. Drittestock
- blick winkel
```

- Cure
- Tiaf Bleu
- LeMU
    1. Ersteboden
    2. Zweitestock
    3. Drittestock
- blick winkel

# 代码

## 行内代码【自定义实现】

bbcode似乎没有`font`标签，因此这里采用改变字体颜色（crimson）的方式来表现行内代码。

This is `inline code` in the line，`var info_words = node.info ? node.info.split(/\s+/) : []`。

## 代码块

bbcode的`code`标签并不支持语言设置、语法高亮等，但为了markdown端可以有较好的阅读体验，
语言类型的保留是必要的，这里在进行转换时会自动扔掉代码语言类型，来实现bbcode的正确显示。

````markdown
```python
# 0721
print("11037")
```
````

python代码的效果如下，

```python
# 0721
print("11037")
```

再来对比一下js代码，会发现在bbcode中并没有区别。

````markdown
```js
// 9hours, 9persons, 9doors
console.log('The order, active... Punishment!')
```
````

js代码的效果如下，

```js
// 9hours, 9persons, 9doors
console.log('The order, active... Punishment!')
```

# bbcode中的Mask效果【自定义实现】

<u>请尽可能不要再mask中嵌套语法，可能会产生不可预料的后果。</u>

## 行内mask

行内mask只是进行简单的标签替换，<u>在markdown端并没有显示效果</u>，只作用在bbcode上。

```md
时间流逝吧<mask>，你是多么残酷</mask>。时间停止吧<mask>，你是多么美丽</mask>。
```
时间流逝吧<mask>，你是多么残酷</mask>。时间停止吧<mask>，你是多么美丽</mask>。

## 段落mask

<mask>
如果对**段落**使用mask标签，在bbcode中，可能会有一个mask的换行符，视觉效果可能不太好。
因此，如果打算对整个段落使用mask标签，那么建议使用html本身的details进行处理。
</mask>

目前该问题已经解决。

```md
有一天，察觉到自己一无所有。
<mask>
发现本以为堆满着幸福的口袋，其实**空无一物**。
</mask>
因为我没为在口袋里塞些什么而努力，所以是理所当然的。
```

有一天，察觉到自己一无所有。
<mask>
发现本以为堆满着幸福的口袋，其实**空无一物**。
</mask>
因为我没为在口袋里塞些什么而努力，所以是理所当然的。

## 段落mask，使用details标签【原创设计】

一般用法，用html details标签，mask整个段落。这种方式与mask标签的效果很相似，
但在markdown端会有“按钮”，可以点击展开或收起，如果想把“按钮”附带的问题删除、更换，
则需要进一步使用summary标签。

```md
在details段落前的文本。
<details>
这是没有summary标签的例子，Blog中没有“提示词”，markdown端有“按钮”。
</details>
在details段落后的文本。
```

在details段落前的文本。
<details>
这是没有summary标签的例子，Blog中没有“提示词”，markdown端有“按钮”。
</details>
在details段落后的文本。

### 使用summary标签作为“提示词”

进阶用法，用summary内容作为“提示词”，提示词使用醒目颜色（yellowgreen）标注，
后面紧接着的是mask处理的文本。

```md
<details>
<summary>《纸上的魔法使》</summary>
——啊，神呀。这是何等的悲剧。
能否恳请您把这出悲剧变成喜剧，变成一出任何人也能开怀大笑的愉快喜剧？
然后，若是您大发慈悲，求求实现我的恋情。是的，唯有一回我也乐意。
向神发誓，我赌上一生来爱你。
向神发誓，我求得偿夙愿。
</details>
```

<details>
<summary>《纸上的魔法使》</summary>
——啊，神呀。这是何等的悲剧。
能否恳请您把这出悲剧变成喜剧，变成一出任何人也能开怀大笑的愉快喜剧？
然后，若是您大发慈悲，求求实现我的恋情。是的，唯有一回我也乐意。
向神发誓，我赌上一生来爱你。
向神发誓，我求得偿夙愿。
</details>

### “提示词”单独一行

如果summary文本末尾有**不少于2个**空格，则会把“提示词”单独一行。
同样的，如果details文本的末尾有**不少于2个**空格，也会在bbcode中添加一个换行符。

<u>在details标签中的其他Markdown语法是不生效的。</u>

```md
<details>
<summary> 《WHITE ALBUM2 -introductory chapter-》   </summary>
为什么会变成这样呢……第一次有了喜欢的人。
有了能做一辈子朋友的人。两件快乐事情重合在一起。 
而这两份快乐，又给我带来更多的快乐。              
得到的，本该是像梦境一般幸福的时间……但是，为什么，会变成这样呢……    
</details>
```

<details>
<summary> 《WHITE ALBUM2 -introductory chapter-》   </summary>
为什么会变成这样呢……第一次有了喜欢的人。
有了能做一辈子朋友的人。两件快乐事情重合在一起。 
而这两份快乐，又给我带来更多的快乐。              
得到的，本该是像梦境一般幸福的时间……但是，为什么，会变成这样呢……    
</details>

# markdown注释

markdown注释，其实就是html注释，在解析时会直接忽略，不会出现在bbcode格式的文本中，
下面的代码在日志中不会显示出来。

```md
<!-- 哪怕这是毫无意义的行为，我也要不断呼喊下去。将一时的交错藏于内心，继续追寻交错的瞬间。
跨越无数个星期，只为说出：……下面没有了。 -->
```

<!-- 哪怕这是毫无意义的行为，我也要不断呼喊下去。将一时的交错藏于内心，继续追寻交错的瞬间。
跨越无数个星期，只为说出：……下面没有了。 -->

-----

# 参考

- [markdown-to-bbcode](https://github.com/ddormer/markdown-to-bbcode)：基于该项目的二次开发，专门适配Bangumi Blog
- [commonmark.js](https://github.com/commonmark/commonmark.js)：api文档参考
- [html-escaper](https://github.com/WebReflection/html-escaper)：html转义处理
- [CommonMark Spec](https://spec.commonmark.org/)：CommonMark Spec标准
- [存一些bangumi不常见的图](https://bgm.tv/group/topic/19842)：本文中的图片来自此页面
- [BBCode 标签指南](https://bangumi.tv/help/bbcode)：bangumi的基础bbcode参考

# 可能存在的问题

1. 换行比较难处理，换行有时缺少，有时多余，有些影响美观。
2. 一些复杂的嵌套没有考虑，可能会出现问题。