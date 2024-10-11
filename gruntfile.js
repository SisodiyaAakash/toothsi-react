module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'src/assets/styling/main.css': 'src/assets/styling/main.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/assets/styling',
          src: ['*.css', '!*.min.css'],
          dest: 'src/assets/styling',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/assets/styling/**/*.scss'], // Watch all SCSS files
        tasks: ['sass', 'cssmin']
      },
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
};
