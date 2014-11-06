/**
 * my gulpfile
 */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    bowerFiles = require('main-bower-files'),
    runSequence = require('run-sequence'),
    pagespeed = require('psi'),

    AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

// Lint Javascript
gulp.task('jshint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(reload({ stream: true, once: true }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({ title: 'images' }));
});

// Copy All Files At The Root Level (app)
// gulp.task('copy', function () {
//     return gulp.src([
//         'app/*',
//         '!app/*.html',
//         'node_modules/apache-server-configs/dist/.htaccess'
//     ], {
//         dot: true
//     }).pipe(gulp.dest('dist'))
//         .pipe($.size({title: 'copy'}));
// });

// Copy basic
gulp.task('copy', function () {
    // src/docsディレクトリのコピー
    gulp.src('src/docs/**')
        .pipe(gulp.dest('dist/docs'));

    // src/htmlディレクトリのコピー
    gulp.src('src/html/**')
        .pipe(gulp.dest('dist/html'));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
    gulp.src(['src/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({ title: 'fonts' }));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'src/scss/*.scss',
        'src/scss/**/*.scss',
        'src/scss/components/components.scss'
    ])
        .pipe($.changed('styles', { extension: '.scss' }))
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .on('error', console.error.bind(console))
        .pipe($.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
        .pipe(gulp.dest('.tmp/scss'))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size({ title: 'styles' }));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
    var assets = $.useref.assets({ searchPath: '{.tmp, src}' });

    return gulp.src('src/{,**/}*.html')
        .pipe(assets)
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify({ preserveComments: 'some' })))
        // Remove Any Unused CSS
        // Note: If not using the Style Guide, you can delete it from
        // the next line to only include styles your project uses.
        .pipe($.if('*.css', $.uncss({
            html: [
                'src/index.html',
                'src/styleguide.html'
            ],
            // CSS Selectors for UnCSS to ignore
            ignore: [
                /.navdrawer-container.open/,
                /.app-bar.open/
            ]
        })))
        // Concatenate And Minify Styles
        // In case you are still using useref build blocks
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        // Update Production Style Guide Paths
        .pipe($.replace('components/components.css', 'components/main.min.css'))
        // Minify Any HTML
        .pipe($.if('*.html', $.minifyHtml()))
        // Output Files
        .pipe(gulp.dest('dist'))
        .pipe($.size({ title: 'html' }));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('coffee', function() {
    return gulp.src(['src/coffee/*.coffee'])
        .pipe($.coffee({ bare: true }))
        .pipe(gulp.dest('src/js'))
        .pipe($.size({ title: 'coffee' }))
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('src/img/sprite/*.png')
        .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            padding: 5
        }));
    spriteData.img.pipe(gulp.dest('dist/img'));
    spriteData.css.pipe(gulp.dest('dist/scss'));

});


// var root = 'src',
//     config = {
//         'path' : {
//             'htdocs': root,
//             'scss': root + '/scss',
//             'sprite': root + '/sprite',
//             'image': root + '/img'
//         }
//     };
//
// gulp.task('watch', function() {
//     gulp.watch(config.path.sprite + '/**/*.png', function(arg) {
//         var filePath = arg.path.match(/^(.+\/)(.+?)(\/.+?\..+?)$/);
//         var spriteData = gulp.src(filePath[1] + filePath[2] + '/*.png')
//             .pipe(plumber)
//             .pipe($.spritesmith({
//                 imgName: filePath[2] + '.png',
//                 cssName: filePath[2] + '.scss'
//             }));
//         spriteData.img.pipe(gulp.dest(config.path.image));
//         spriteData.css.pipe(gulp.dest(config.path.sass));
//     })
// });

gulp.task('bower', function() {
    var jsFilter = $.filter('**/*.js'),
        cssFilter = $.filter('**/*.css');

    return gulp.src(bowerFiles())
        .pipe(jsFilter)
        .pipe($.uglify({ preserveComments: 'some' }))
        .pipe($.concat('lib.min.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(gulp.dest('src/css'));
});


// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['src']
    });

    gulp.watch(['src/**/*.html'], reload);
    gulp.watch(['src/scss/**/*.{scss, css}'], ['styles', reload]);
    gulp.watch(['src/js/*.js'], ['jshint']);
    gulp.watch(['src/img/**/*'], reload);
    gulp.watch(['src/**/*.js'], ['jshint', reload]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://example.com',
    strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

// --------------------------------------------------------
// TODO: continue
// --------------------------------------------------------
// compass
// csscomb


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('bs-reload', function() {
    reload();
})
//
//
//
// // commands
// gulp.task('default', ['browser-sync'], function() {
//     gulp.watch('src/html/*.html', ['bs-reload']);
// });
gulp.task('deploy', [], function() { });
