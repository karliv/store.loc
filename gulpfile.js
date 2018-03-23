var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browsersync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    del           = require('del'),
    notify        = require("gulp-notify");

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
        'app/js/source/Container.js',
        'app/js/source/Goods.js',
        'app/js/source/Basket.js',
        'app/js/source/BasketList.js',
		'app/js/source/common.js'
		])
	.pipe(concat('scripts.min.js'))
    //.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'sass', 'js'], function() {

    var buildHTML = gulp.src('app/*.html').pipe(gulp.dest('dist/'));
    
	var buildCss = gulp.src('app/css/main.min.css').pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src(['app/.htaccess']).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    
	var buildJs = gulp.src('app/js/scripts.min.js').pipe(gulp.dest('dist/js'));

	var buildJson = gulp.src('app/json/**/*').pipe(gulp.dest('dist/json'));

	var buildImg = gulp.src('app/img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/js/**/*.js'], ['js']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);