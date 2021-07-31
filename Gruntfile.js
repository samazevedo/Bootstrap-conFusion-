'use strict';

module.exports = function(grunt) {
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },
        copy: {
            html: {
                files: [ 
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot:true,
                    cwd:'node_modules/font-awesome',
                    src:['fonts/*.*'],
                    dest: 'dist'
                }]
            }

        },
        clean: {
            build: {
                src: ['dsit/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                    // enable dynamic expansion
                    cwd:'./',                        //src matches are relative to this path
                    src: ['img/*.png,jpg,gif'],    //actual patterns to match
                    dest: 'dist/'                  // destination path prefix
                }]
            }

        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                steps: {
                    css:['cssmin'],
                    js:['uglify']
                },
                post: {
                    css: [{
                        name: 'cssmin',
                        createConfig: function (context, block) {
                            var generated = context.options.generated;
                            generated.options = {
                                keepSpecialComments: 0, rebase: false
                            };
                        }
                    }]
                }
            }

        },

        // concat
        concat: {
            options: {
                separator: ';'
            },

            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                // filerev: release hashes(md5) all assets (images, js and css)
                // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        // Usemin
        // replaces all assets with their revved version in  html and css files.
        // options.assetDirs contains the directories for fiding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin: {          // task
            dist: {         // target
                options: {  // target options
                    collapseWhitespace: true
                },
                files: { // directory of files
                    // 'destination': 'source'
                    'dist/index.html': 'dist/index.html',
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask:true,
                    server: {
                        basDir: "./"
                    }
                }
            }
        },
        

    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.resgiterTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};