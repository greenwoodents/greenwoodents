// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings
<<<<<<< HEAD
var gulp = require('gulp');
require('pho-devstack')(gulp, {
  fileInsert: {
    enabled: true,
    '%% LIVERELOAD %%': 'src/partials/livereload.txt'
  }
});

// If needed, redefine tasks here
=======

var gulp = require('gulp');
var extend = require('node.extend');
var substituteConfig = require('./substitute-config');

var pho = require('pho-devstack')(gulp, {
  imagemin: {
    enabled: false
  },
  substituter: extend(true, substituteConfig, {
    // cdn: '/', // uncomment if you are using absolute paths
    livereload: function() {
      return "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>";
    }
  }),
  copy: ['images/sprites/**/*', 'humans.txt', 'bower_components/angular/**/*.{js,map}']
});

// If needed, redefine tasks here

>>>>>>> 36ad3c27f7bc6690decdd2f25c3abbc465148fef
