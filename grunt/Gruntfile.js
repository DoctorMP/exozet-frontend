module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
 
    uglify: { 
      options: {
        mangle: false
       , beautify: false
      },
      prod: { 
        files: { 
          '../js/min.js': [
            '../js/scripts/formValidator.js',
            '../js/scripts/formHandler.js',
            '../js/scripts/start.js'
          ] 
        } 
      }
    },
 
    watch: {
      scripts: {
        files: ['../js/**/*.js', 'Gruntfile.js'],
        tasks: ['uglify']
      },
    }
  });

  grunt.registerTask('default', ['watch']);
}; 
