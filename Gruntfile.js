module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			app: '.',

			src: '<%= project.app %>/src',
			src_static: '<%= project.src %>/static',
			src_static_css: '<%= project.src_static %>/css',
			src_static_js: '<%= project.src_static %>/js',
			src_static_files: '<%= project.src_static %>/files',
			src_static_third_party: '<%= project.src_static %>/third_party',
			src_static_img: '<%= project.src_static %>/img',
			src_static_fonts: '<%= project.src_static %>/fonts',
			src_jade: '<%= project.src %>/jade',
			src_sass: '<%= project.src %>/sass',
			src_templates: '<%= project.src %>/templates',

			dist: '<%= project.app %>',
			dist_static: '<%= project.dist %>/static',
			dist_static_css: '<%= project.dist_static %>/css',
			dist_static_js: '<%= project.dist_static %>/js',
			dist_static_files: '<%= project.dist_static %>/files',
			dist_static_third_party: '<%= project.dist_static %>/third_party',
			dist_static_img: '<%= project.dist_static %>/img',
			dist_static_fonts: '<%= project.dist_static %>/fonts',
			dist_templates: '<%= project.dist %>/templates',
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
						'<%= project.dist_static_files %>',
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
			},
			dist_templates: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src_templates %>',
						src: '**',
						dest: '<%= project.dist_templates %>',
					},
				]
			},
			dist_files: {
				files: [
					{
						expand: true,
						cwd: '<%= project.src_static_files %>/',
						src: '**',
						dest: '<%= project.dist_static_files %>/',
						filter: 'isFile',
						flatten: false
					}
				]
			},
			others: {
				files: [
					{
						expand: true,
						src: [
							'<%= project.src %>/favicon.ico',
							'<%= project.src %>/humans.txt',
							'<%= project.src %>/robots.txt'
						],
						dest: '<%= project.dist %>/',
						filter: 'isFile',
						flatten: true
					},
				]
			},
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

		postcss: {
			options: {
				// map: true,
				processors: [
					require('autoprefixer')({
						// browsers: [
						//   '> 5%',
						//   '> 10% in BR',
						//   'last 10 Chrome versions',
						//   'last 7 Firefox versions',
						//   'last 7 Opera versions',
						//   'ie >= 10',
						//   'Edge > 0',
						//   'ie_mob >= 10',
						//   'Safari >= 5',
						//   ]
						browsers: ['last 10 versions', 'ie >= 9']
					}),
				]
			},
			dist: {
				src: ['<%= project.src_static_css %>/*.css', '!<%= project.src_static_css %>/*.min.css']
			}
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
						'<%= project.src_static_third_party %>/angular-sanitize/angular-sanitize.min.js',
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
			options: {
				interrupt: true,
			},
			scss: {
				files: ['<%= project.src_sass %>/*.scss'],
				tasks: ['sass'],
			},
			postcss: {
				files: ['<%= project.src_static_css %>/*.css', '!<%= project.src_static_css %>/*.min.css'],
				tasks: ['postcss'],
				options: {
					interval: 1000,
					interrupt: true,
					spawn: false
				},
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
	grunt.loadNpmTasks('grunt-postcss');


	grunt.registerTask('default', ['clean:dist']);

	grunt.registerTask('dev', [
		'cssmin:dev',
		'newer:uglify:dev',
		'jade:dev',
		'newer:sass',
		'newer:uglify:dev_third_party_angular',
		'newer:uglify:dev_third_party',
		'newer:copy:dev_fonts',
		'concurrent:tasks'
	]);

	grunt.registerTask('dist', [
		'mkdir',
		'jade:dist',
		'postcss:dist',
		'cssmin:dist',
		'copy:dist_js',
		'copy:dist_img',
		'copy:dist_fonts',
		'copy:dist_templates',
		'copy:dist_files',
		'copy:others',
		'processhtml:dist',
		'http-server:dist'
	]);
	//grunt.registerTask('dist_page', ['dist', 'copy:dist_to_app', 'clean:dist' ]);
};