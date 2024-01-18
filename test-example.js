import { BBCodeRenderer } from './src/md2bb.js';
import { Parser } from 'commonmark';

var reader = new Parser();
var parsed = reader.parse("# Write Bangumi Blog by Markdown!");

var writer = new BBCodeRenderer();
var result = writer.render(parsed);

console.log(result);