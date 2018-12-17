# `stratic-default-categories`

[Gulp][1] plugin to add default categories for [Stratic][2] posts

## Installation

    npm install stratic-default-categories

## Usage

The module exports a single function which will return a through stream. The function takes one argument, an array of strings representing categories to be added to all posts (unless specified otherwise).

You can omit defaults by putting them in the `noncategories`.

## Examples

Minimal `gulpfile.js` for this module to work:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-gray-matter');
var straticDateInPath = require('stratic-date-in-path');
var addsrc = require('gulp-add-src');
var straticPostsToIndex = require('stratic-posts-to-index');
var straticDefaultCategories = require('stratic-default-categories');

gulp.task('post-index', function() {
    gulp.src('*.md')
        .pipe(frontMatter())
        .pipe(straticDateInPath())
        .pipe(addsrc('src/blog/index.jade'))
        .pipe(straticPostsToIndex('index.jade'))
        .pipe(straticDefaultCategories(['category-name']));
});
```

Complete example `gulpfile.js`:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-gray-matter');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var straticDateInPath = require('stratic-date-in-path');
var addsrc = require('gulp-add-src');
var straticPostsToIndex = require('stratic-posts-to-index');
var straticDefaultCategories = require('stratic-default-categories');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

// Separate variable because in reality you'll probably want to pass this to multiple tasks
var categoryDefaults = ['category-name'];

gulp.task('post-index', function() {
    gulp.src('*.md')
        .pipe(frontMatter())
        .pipe(remark().use(remarkHtml))
        .pipe(straticDateInPath())
        .pipe(addsrc('src/blog/index.jade'))
        .pipe(straticPostsToIndex('index.jade'))
        .pipe(straticDefaultCategories(categoryDefaults))
        .pipe(jade({pretty: true, basedir: __dirname}))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('dist/blog'));
});
```

Example blog post (with YAML frontmatter) that omits the `category-name` category:

```yaml
---
title: "Post title"
time:
  epoch: 1000000000
  utcoffset: "UTC-0"
author: "AJ Jordan"
noncategories:
  - category-name
---

Here is a blog post!
```

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/straticjs/generator-stratic
