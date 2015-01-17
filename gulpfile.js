// save in root directory as gulpfile.js
var gulp     	 = require('gulp'),
	browserSync  = require('browser-sync'),
	uglify       = require('gulp-uglify'),
	sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	concat       = require('gulp-concat'),
	jshint       = require('gulp-jshint'),
	minifycss    = require('gulp-minify-css'),
	imagemin     = require('gulp-imagemin'),
	cache        = require('gulp-cache'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	notify       = require('gulp-notify'),
	reload       = browserSync.reload;

var paths = {
	html: 'src/**/*.html',
	styles: 'src/assets/sass/**/*.scss',
	scripts: 'src/assets/js/**/*.js',
	images: 'src/assets/images/**/*',
	app_root: 'app'
}

gulp.task('default', ['clean'], function(){
	gulp.start('html','styles','scripts','images','watch','serve');
	
});

gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: ['./'+ paths.app_root]
		}
	});

	// gulp.watch(['app/**/*.html', 'app/**/*.css', 'app/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('html', function(){
	return gulp.src( paths.html )
		.pipe( gulp.dest(paths.app_root +'/') )
		.pipe( reload({stream:true}) )
		.pipe( notify('HTML task complete') );
});

gulp.task('styles', function(){
	return gulp.src( paths.styles )
		.pipe( sourcemaps.init() )
			.pipe( sass() )
			.pipe( autoprefixer('> 5%, last 2 versions') )
			.pipe( concat('styles.css') )
		.pipe( sourcemaps.write('./source-maps') )
		.pipe( gulp.dest(paths.app_root +'/assets/css') )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( minifycss() )
		.pipe( gulp.dest(paths.app_root +'/assets/css') )
		.pipe( reload({stream:true}) )
		.pipe( notify('STYLES task complete') );
});

gulp.task('scripts', function(){
	return gulp.src( paths.scripts )
		.pipe( jshint() )
		.pipe( jshint.reporter('default') )
		.pipe( concat('scripts.js') )
		.pipe( gulp.dest(paths.app_root +'/assets/js') )
		.pipe( rename({suffix: '.min' }) )
		.pipe( uglify() )
		.pipe( gulp.dest(paths.app_root +'/assets/js') )
		.pipe( reload({stream:true}) )
		.pipe( notify('SCRIPTS task complete') );
});

gulp.task('images', function(){
	return gulp.src(paths.images +'.{gif,jpg,jpeg,png,svg}')
		.pipe( cache( imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }) ) )
		.pipe( gulp.dest( paths.app_root +'/assets/img') )
		.pipe( reload({stream:true}) )
		.pipe( notify('IMAGES task complete') );
});

gulp.task('watch', function(){
	gulp.watch( paths.html, ['html'] );
	gulp.watch( paths.styles,  ['styles']  );
	gulp.watch( paths.scripts, ['scripts'] );
	gulp.watch( paths.images,  ['images']  );
});

gulp.task('clean', function(cb){
	del([paths.app_root], cb)
});