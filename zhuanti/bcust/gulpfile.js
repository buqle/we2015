// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss'); //可以不用但一定要写啊啊啊啊
//var px2rem = require('postcss-px2rem');


var bem = require('postcss-bem');
var nested = require('postcss-nested');
var alias = require('postcss-alias'); //定义自己简写的属性

var crip = require('postcss-crip');//别人定义好的速写属性 https://github.com/johnie/crip-css-properties


var magician = require('postcss-font-magician');
var triangle = require('postcss-triangle');
var circle = require('postcss-circle');
var linkColors = require('postcss-all-link-colors');
var center = require('postcss-center'); //居中
var clearfix = require('postcss-clearfix');
var position = require('postcss-position'); //一行定位
var size = require('postcss-size'); //简写宽高
var verthorz = require('postcss-verthorz');
var colorShort = require('postcss-color-short');


var precss = require('precss');


// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});



gulp.task('css', function () {
    var processors = [precss,bem({style: 'bem'}),nested,/*px2rem({remUnit: 75}),*/alias, crip, magician, triangle, circle, linkColors, center, clearfix, position, size, verthorz, colorShort];
    return gulp.src('./src/*stylee.css') .pipe(postcss(processors)) .pipe(gulp.dest('./dest'));
});




// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});