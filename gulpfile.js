import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import cleanCSS from 'gulp-clean-css'

// 定义一个名为 "js" 的任务
gulp.task('js', () => {
  // 从 "fileHandling/" 目录下选取所有 .js 文件来作为输入
  return gulp.src('fileHandling/*.js')
  // 使用 gulp-concat 插件将所有的 .js 文件合并成一个名为 "scripts.js" 的文件
  .pipe(concat('scripts.js'))
  // 使用 gulp-uglify 插件来压缩 JavaScript 代码
  .pipe(uglify())
  // 输出压缩后的 "scripts.js" 文件到 "dist/js/" 目录下
  .pipe(gulp.dest('dist/js/'))
})

gulp.task('css', () => {
  return gulp.src('fileHandling/*.css')
  .pipe(concat('styles.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/css/'))
})
// 执行后，会发现 dist/js/scripts.js 和 dist/css/styles.css 文件已经生成了
// 但是，这两个文件都是压缩过的，不方便查看
gulp.task('default', gulp.series('js', 'css'))


// 压缩图片
// import imagemin from 'gulp-imagemin'
// import image from 'gulp-image'

// .pipe() 方法通常用于将一个或多个 gulp 插件链接在一起，将文件流传递给下一个插件进行处理
// gulp.task('img', () =>
//     gulp.src('img/*.jpg')
//     .pipe(image())
//     .pipe(gulp.dest('dist/img'))
// )


/*
* 自动化任务
* 监听js文件变化，自动刷新浏览器
* */
import browserSync from 'browser-sync'

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('automation/*.js').on('change', browserSync.reload);
});

gulp.task('hot', gulp.parallel('server', 'watch'));


