module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			app: '.',

			src: '<%= project.app %>/src',
			src_static: '<%= project.src %>/static',
			src_static_css: '<%= project.src_static %>/css',
			src_static_js: '<%= project.src_static %>/js',
			src_static_third_party: '<%= project.src_static %>/third_party',
			src_static_img: '<%= project.src_static %>/img',
			src_static_fonts: '<%= project.src_static %>/fonts',
			src_jade: '<%= project.src %>/jade',
			src_sass: '<%= project.src %>/sass',

			dist: '<%= project.app %>',
			dist_static: '<%= project.dist %>/static',
			dist_static_css: '<%= project.dist_static %>/css',
			dist_static_js: '<%= project.dist_static %>/js',
			dist_static_third_party: '<%= project.dist_static %>/third_party',
			dist_static_img: '<%= project.dist_static %>/img',
			dist_static_fonts: '<%= project.dist_static %>/fonts',
		},

		tag: {
			banner: '/*!\n' +
					' * @author <%= pkg.author %>\n' +
					' */\n'
		},

		mkdir: {
			all: {
				options: {
					create: [
						'<%= project.dist %>',
						'<%= project.dist_static %>',
						'<%= project.dist_static_css %>',
						'<%= project.dist_static_js %>',
						'<%= project.dist_static_third_party %>',
						'<%= project.dist_static_img %>',
						'<%= project.dist_static_fonts %>',
					]
				}
			}
		},

		'http-server': {
			dev: {
				root: '<%= project.src %>',
            	port: 8081,
            	host: "localhost",
			},
			dist: {
				root: '<%= project.dist %>',
            	port: 8082,
            	host: "localhost",
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
			},
			tasks: ['http-server:dev', 'watch']
		},

		copy: {
			options: {
				timestamp: true
			},
			dist_to_app: {
				expand: true,
				cwd: '<%= project.dist %>',
				src: '**',
				dest: '<%= project.app %>',
			},
			//dev
			dev_fonts: {
				files: [
					{
						expand: true,
						src: ['<%= project.src_static_third_party %>/font-awesome/fonts/*.*'],
						dest: '<%= project.src_static_fonts %>/',
						filter: 'isFile',
						flatten: true
					}
				]
			},
			//dist
			dist_js: {
				files: [
					{ // scripts.js
						expand: true,
						src: ['<%= project.src_static_js %>/scripts.min.js', '<%= project.src_static_js %>/scripts.min.js.map'],
						dest: '<%= project.dist_static_js %>/',
						filter: 'isFile',
						flatten: true
					},
					{ // angular js
						expand: true,
						src: ['<%= project.src_static_third_party %>/angular-bundle.min.js', '<%= project.src_static_third_party %>/angular-bundle.min.js.map'],
						dest: '<%= project.dist_static_third_party %>/',
						filter: 'isFile',
						flatten: true
					},
					{ // plugins
						expand: true,
						src: ['<%= project.src_static_third_party %>/plugins.min.js', '<%= project.src_static_third_party %>/plugins.min.js.map'],
						dest: '<%= project.dist_static_third_party %>/',
						filter: 'isFile',
						flatten: true
					},
				]
			},
			dist_img: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src_static_img %>',
						src: '**',
						dest: '<%= project.dist_static_img %>',
					},
				]
			},
			dist_fonts: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src_static_fonts %>',
						src: '**',
						dest: '<%= project.dist_static_fonts %>',
					},
				]
			}
		},


		cssmin: {
			dev: {
				options: {
					report: 'gzip',
				},
				files: [{
					expand: true,
					cwd: '<%= project.src_static_css %>',
					src: ['*.css', '!*.min.css'],
					dest: '<%= project.src_static_css %>',
					ext: '.min.css'
				}]
			},
			dist: {
				options: {
					report: 'gzip',
				},
				files: [{
					expand: true,
					cwd: '<%= project.src_static_css %>',
					src: ['*.css', '!*.min.css'],
					dest: '<%= project.dist_static_css %>',
					ext: '.min.css'
				}]
			}
		},


		jade: {
			dev: {
				options: {
					pretty: true,
					data: {debug: true}
				},
				files: {
					'<%= project.src %>/index.html': ['<%= project.src_jade %>/index.jade']
				}
			},
			dist: {
				files: {
					'<%= project.dist %>/index.html': ['<%= project.src_jade %>/index.jade']
				}
			}
		},


		sass: {
			dev: {
				options: {
					style: 'nested',
					trace: true
				}, 
				files: {
					'<%= project.src_static_css %>/styles.css': ['<%= project.src_sass %>/styles.scss'],
					'<%= project.src_static_css %>/plugins.css': ['<%= project.src_sass %>/plugins.scss'],
				}
			},
		},


		uglify: {
			options: {
				banner: '<%= tag.banner %>',
				compress: true,
				mangle: false,
				except: ['JQuery', 'Backbone'],
				preserveComments: 'some',
				sourceMap: true,
				report: 'gzip'
			},
			dev_third_party_angular: {
				files: {
					'<%= project.src_static_third_party %>/angular-bundle.min.js': [
						'<%= project.src_static_third_party %>/angular/angular.min.js',
						'<%= project.src_static_third_party %>/angular-animate/angular-animate.min.js',
						'<%= project.src_static_third_party %>/angular-aria/angular-aria.min.js',
						'<%= project.src_static_third_party %>/angular-material/angular-material.min.js',
						'<%= project.src_static_third_party %>/angular-messages/angular-messages.min.js',
					],
				}
			},
			dev_third_party: {
				files: {
					'<%= project.src_static_third_party %>/plugins.min.js': [
						'<%= project.src_static_third_party %>/jquery/dist/jquery.min.js',
					],
				}
			},
			dev: {
				files: {
					'<%= project.src_static_js %>/scripts.min.js': [
						'<%= project.src_static_js %>/module.js',
						'<%= project.src_static_js %>/*.js',
						'!<%= project.src_static_js %>/*.min.js'
					]
				}
			}
		},

		clean: {
			options: {
				'no-write': false,
			},
			dist: ['<%= project.dist %>', '!<%= project.app %>', '!<%= project.src %>']
		},

		watch: {
			scss: {
				files: ['<%= project.src_sass %>/*.scss'],
				tasks: ['sass'],
			},
			jade: {
				files: ['<%= project.src_jade %>/index.jade', '<%= project.src_jade %>/*.html'],
				tasks: ['jade:dev']
			},
			js: {
				files: ['<%= project.src_static_js %>/*.js', '!<%= project.src_static_js %>/*.min.js'],
				tasks: ['uglify:dev']
			}
		},

		processhtml: {
			dist: {
				options: {
					process: true,
					data: {
						title: 'My app',
						message: 'This is production distribution'
					}
				},
				files: {
					'<%= project.dist %>/index.html': ['<%= project.dist %>/index.html']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-concurrent');


	grunt.registerTask('default', ['clean:dist']);

	grunt.registerTask('dev', [
		'cssmin:dev',
		'newer:uglify:dev',
		'jade:dev',
		'sass',
		'newer:uglify:dev_third_party_angular',
		'newer:uglify:dev_third_party',
		'newer:copy:dev_fonts',
		'concurrent:tasks'
	]);

	grunt.registerTask('dist', [
		'mkdir',
		'jade:dist',
		'cssmin:dist',
		'copy:dist_js',
		'copy:dist_img',
		'copy:dist_fonts',
		'processhtml:dist',
		'http-server:dist'
	]);
	//grunt.registerTask('dist_page', ['dist', 'copy:dist_to_app', 'clean:dist' ]);
};