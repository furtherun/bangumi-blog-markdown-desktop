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

fs.writeFileSync('./test/article.bb.md', result, 'utf8');
console.log(result);