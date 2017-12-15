// Requirements
var watch = require('node-watch');
var sass = require('node-sass');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
var handlebars = require('handlebars');

function compileSass(options = {}) {
    // set default options
    options = Object.assign({
        style: 'expanded'
    }, options);

    // render the result
    var result = sass.renderSync({
        file: options.src,
        outputStyle: options.style
    });

    // write the result to file
    mkdirp(getDirName(options.dest), function(err) {
        if (err) return cb(err);
        fs.writeFile(options.dest, result.css);
    });

    // log successful compilation to terminal
    console.log(' ' + options.dest + ' built.');
};

console.log('Watching for CSS changes...');
watch('src/styles', { recursive: true }, () => {
    // Expanded
    compileSass({
        src : 'src/styles/grid.scss',
        dest: 'css/grid.css'
    });

    // Minified
    compileSass({
        src : 'src/styles/grid.scss',
        dest: 'css/grid.min.css',
        style: 'compressed'
    });

    handlebars.compile('index.html');
})