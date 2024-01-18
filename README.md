# Bangumi Blog Markdown Desktop

浏览器插件版本[点这里](https://github.com/furtherun/bangumi-blog-markdown)。

本地版首先通过npm安装需要的依赖包，安装完成后即可调用`md2bb.js`进行转换。

```cmd
npm i html-escaper commonmark
```

提供两个使用案例[字符串转换](./test-example.js)和[文件转换](./test-article.js)。

```js
import { BBCodeRenderer } from './src/md2bb.js';
import { Parser } from 'commonmark';

var reader = new Parser();
var parsed = reader.parse("# Write Bangumi Blog by Markdown!");

var writer = new BBCodeRenderer();
var result = writer.render(parsed);

console.log(result);
```

在命令行js文件所在目录执行`node test-example.js`，可以看到结果`[b][size=24]Write Bangumi Blog by Markdown![/size][/b]`。

```js
import { BBCodeRenderer } from './src/md2bb.js';
import { Parser } from 'commonmark';
import fs from 'fs';

var markdown = fs.readFileSync('./test/article.md', 'utf8');

var reader = new Parser();
var parsed = reader.parse(markdown);

// 推荐softbreak设置为''（空字符串），可以将markdown中不同行的文本看作一个段落，
// 更接近markdown本身编译后的效果。
// var writer = new BBCodeRenderer();
var writer = new BBCodeRenderer({softbreak: ''});
var result = writer.render(parsed);

// 将结果写入到一个文本文件中
fs.writeFileSync('./test/article.bb.md', result, 'utf8');
console.log(result);
```

在命令行js文件所在目录执行`node test-article.js`，转换后的文件写入到[article.bb.md](test/article.bb.md)中。

## 相关链接

- [markdown端预览效果](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.md)
- [bbcode的预览效果](https://bgm.tv/blog/330695)
- [markdown文本源码](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.md)
- [bbcode转换结果](https://github.com/furtherun/bangumi-blog-markdown-desktop/blob/main/test/article.bb.md)

## 参考项目

- [markdown-to-bbcode](https://github.com/ddormer/markdown-to-bbcode)
- [commonmark.js](https://github.com/commonmark/commonmark.js)
- [html-escaper](https://github.com/WebReflection/html-escaper)