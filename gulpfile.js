const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Пути
const paths = {
    scssEntry: 'scss/resume.scss',
    js: 'js/**/*.js',
    html: '*.html',
    img: 'img/**/*',

    bootstrap: {
        css: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        js: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    },
    fontawesome: {
        css: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        webfonts: 'node_modules/@fortawesome/fontawesome-free/webfonts/*'
    },
    jquery: {
        js: 'node_modules/jquery/dist/jquery.min.js'
    },

    dist: {
        root: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img',
        vendor: 'dist/vendor'
    }
};

// Стили (основные)
function styles() {
    return src(paths.scssEntry)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(rename('resume.css'))
        .pipe(dest(paths.dist.css))
        .pipe(browserSync.stream()); // нужно для обновления CSS в браузере
}

// Bootstrap
function bootstrapCopy() {
    src(paths.bootstrap.css)
        .pipe(dest(`${paths.dist.vendor}/bootstrap/css/`));
    return src(paths.bootstrap.js)
        .pipe(dest(`${paths.dist.vendor}/bootstrap/js/`));
    // browserSync.stream() убран – не нужен для статики
}

// FontAwesome
function fontawesomeCopy() {
    src(paths.fontawesome.css)
        .pipe(dest(`${paths.dist.vendor}/fontawesome-free/css/`));
    return src(paths.fontawesome.webfonts)
        .pipe(dest(`${paths.dist.vendor}/fontawesome-free/webfonts/`));
    // browserSync.stream() убран
}

// jQuery
function jqueryCopy() {
    return src(paths.jquery.js)
        .pipe(dest(`${paths.dist.vendor}/jquery/`));
}

// Пользовательские скрипты
function scripts() {
    return src(paths.js)
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.dist.js))
        .pipe(browserSync.stream());
}

// HTML
function html() {
    return src(paths.html)
        .pipe(dest(paths.dist.root))
        .pipe(browserSync.stream());
}

// Картинки
function images() {
    return src(paths.img)
        .pipe(dest(paths.dist.img));
    // browserSync.stream() убран
}

// Сервер
function serve() {
    browserSync.init({
        server: { baseDir: paths.dist.root },
        port: 3000,
        open: true,
        notify: false
    });

    watch('scss/**/*.scss', styles);
    watch(paths.js, scripts);
    watch(paths.html, html);
    watch(paths.img, images);
    // Если вы меняете vendor-файлы вручную – добавьте вотчер, но обычно не нужно
}

// Сборка
const build = parallel(
    styles,
    scripts,
    html,
    images,
    bootstrapCopy,
    fontawesomeCopy,
    jqueryCopy
);

const dev = series(build, serve);

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.bootstrap = bootstrapCopy;
exports.fontawesome = fontawesomeCopy;
exports.jquery = jqueryCopy;
exports.build = build;
exports.dev = dev;
exports.default = dev;