module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			app: './',

			src: '<%= project.app %>src',
			src_static: '<%= project.src %>/static',
			src_static_css: '<%= project.src_static %>/css',
			src_static_js: '<%= project.src_static %>/js',
			src_static_js_third_party: '<%= project.src_static_js %>/third_party',
			src_static_img: '<%= project.src_static %>/img',
			src_jade: '<%= project.src %>/jade',
			src_sass: '<%= project.src %>/sass',

			dist: '<%= project.app %>dist',
			dist_static: '<%= project.dist %>/static',
			dist_static_css: '<%= project.dist_static %>/css',
			dist_static_js: '<%= project.dist_static %>/js',
			dist_static_js_third_party: '<%= project.dist_static_js %>/third_party',
			dist_static_img: '<%= project.dist_static %>/img',
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
						'<%= project.dist_static_js_third_party %>',
						'<%= project.dist_static_img %>',
					]
				}
			}
		},

		copy: {
			options: {
				timestamp: true
			},
			dev: {

			},
			dist_css: {
				files: [
					{
						expand: true,
						src: ['<%= project.src_static_css %>/*.min.css'],
						dest: '<%= project.dist_static_css %>/',
						filter: 'isFile',
						flatten: true
					}
				]
			},
			dist_html: {
				files: [
					{
						expand: true,
						src: ['<%= project.src %>/index.html'],
						dest: '<%= project.dist %>/',
						filter: 'isFile',
						flatten: true
					}
				]	
			},
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
						src: ['<%= project.src_static_js_third_party %>/angular-bundle.min.js', '<%= project.src_static_js_third_party %>/angular-bundle.min.js.map'],
						dest: '<%= project.dist_static_js_third_party %>/',
						filter: 'isFile',
						flatten: true
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
					dest: '<%= project.src_static_css %>',
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
					'<%= project.src %>/index.html': ['<%= project.src_jade %>/index.jade']
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
					'<%= project.src_static_css %>/styles.css': '<%= project.src_sass %>/styles.scss'
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
					'<%= project.src_static_js_third_party %>/angular-bundle.min.js': [
						'<%= project.src_static_js_third_party %>/angular/angular.min.js',
						'<%= project.src_static_js_third_party %>/angular-animate/angular-animate.min.js',
						'<%= project.src_static_js_third_party %>/angular-aria/angular-aria.min.js',
						'<%= project.src_static_js_third_party %>/angular-material/angular-material.min.js',
						'<%= project.src_static_js_third_party %>/angular-messages/angular-messages.min.js',
					],
				}
			},
			dev_third_party: {
				files: {

				}
			},
			dev: {
				files: {
					'<%= project.src_static_js %>/scripts.min.js': [
						'<%= project.src_static_js %>/*.js',
						'!<%= project.src_static_js %>/*.min.js'
					]
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('dev', ['sass:dev', 'newer:jade:dev', 'cssmin:dev', 'newer:uglify:dev', 'newer:uglify:dev_third_party_angular']);
	grunt.registerTask('default', []);
	grunt.registerTask('dist', ['mkdir', 'jade:dist', 'cssmin:dist', 'copy:dist_css', 'copy:dist_html', 'copy:dist_js']);

};