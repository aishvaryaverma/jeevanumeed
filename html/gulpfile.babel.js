import { watch, series, parallel } from 'gulp';
import del from 'del';
import { styles, stylesProd } from './gulpjs/gulp-styles';
import { scripts, stylesTest, scriptsProd } from './gulpjs/gulp-scripts';
import { htmlInclude } from './gulpjs/gulp-html';
// import { compressImg } from './gulpjs/gulp-imgmin';

//  Not all tasks need to use streams, a gulpfile is just another node program
//  and you can use all packages available on npm, but it must return either a
//  Promise, a Stream or take a callback and call it

// Paths
export const paths = {
    styles: {
        src: './src/scss/**/*.scss',
        dest: './build/css/'
    },
    scripts: {
        src: './src/js/**/*.js',
        dest: './build/js/'
    },
    html: {
        src: './src/pages',
        dest: './build/'
    },
    // img: {
    //     src: './src/img/**/*',
    //     dest: './build/img'
    // }
};

// You can use multiple globbing patterns as you would with `gulp.src`,
// for example if you are using del 2.0 or above, return its promise
export const clean = () => del([
    'build/css/style.min.css',
    'build/css/style.min.css.map',
    'build/js/app.min.js',
    'build/js/app.min.js.map',
    'build/**/*.html',
    'build/*.html',
    // 'build/img/**/*',
    // 'build/img/*'
]);

// FOR WATCHING FILES
const watchFiles = series(
    series(htmlInclude, styles, scripts), // compressImg

    function watching() {
        watch(paths.styles.src, styles);
        watch(paths.scripts.src, scripts);
        watch(paths.html.src + '/**/*.html', htmlInclude);
        // watch(paths.img.src, compressImg);
    }
);
export { styles };
export { watchFiles as watch };
export { htmlInclude as html };
// export { compressImg as image };

// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
export const build = series(clean, parallel(htmlInclude, stylesProd, scriptsProd)); // compressImg

// Define default task that can be called by just running `gulp` from cli
export default build;
