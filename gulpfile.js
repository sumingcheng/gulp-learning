import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import cleanCSS from 'gulp-clean-css'
import browserSync from 'browser-sync'
import rename from 'gulp-rename' // 重命名插件
import sass from 'gulp-sass' // 编译 SASS 插件
import autoprefixer from 'gulp-autoprefixer' // 自动添加 CSS 前缀插件

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

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('automation/*.js').on('change', browserSync.reload)
})

gulp.task('hot', gulp.parallel('server', 'watch'))

/*
* 对项目进行打包
* */


gulp.task('scripts', function () {
  return gulp.src([
    'src/a.js', // 第一步，选择需要打包的文件
    'src/b.js'
  ])
  .pipe(concat('bundle.js')) // 第二步，合并文件并重命名
  .pipe(uglify()) // 第三步，压缩 JavaScript 代码
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('out/js/')) // 第四步，将打包好的文件输出到 out/js/ 目录下
})

gulp.task('styles', function () {
  return gulp.src(['src/a.css', 'src/b.css'])
  .pipe(autoprefixer()) //自动添加 CSS 前缀
  .pipe(rename({ suffix: '.min' })) //重命名文件
  .pipe(concat('cancat.css')) // 合并文件并重命名
  .pipe(gulp.dest('out/css/')) // 将打包好的文件输出到 out/css/ 目录下
})

gulp.task('build', gulp.series('scripts', 'styles')) // 定义默认任务，依赖于 scripts 和 styles 任务
