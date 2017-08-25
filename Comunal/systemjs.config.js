/// <reference path="node_modules/underscore/underscore.js" />
/// <reference path="node_modules/@angular/material/bundles/material.umd.js" />
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
        'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'ngx-loading': 'npm:ngx-loading',
      'ng2-bootstrap-modal': 'npm:ng2-bootstrap-modal',
      'angular-2-dropdown-multiselect': 'npm:angular-2-dropdown-multiselect',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'underscore': 'npm:underscore',
      'moment': 'npm:moment',
      'angular2-highcharts': 'npm:angular2-highcharts',
      'highcharts': 'npm:highcharts'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
          defaultExtension: 'js'
      },
      rxjs: {
          main: './Rx.js',
          defaultExtension: 'js'
      },
      'ng2-bootstrap-modal': {
          main: './index.js',
          defaultExtension: 'js'
      },
      'angular-2-dropdown-multiselect': {
          main: './index.js',
          defaultExtension: 'js'
      },
      'underscore': {
          main: './underscore.js',
          defaultExtension: 'js'
      },
      'moment': {
          main: './moment.js',
          defaultExtension: 'js'
      },
      'angular2-highcharts': {
          main: '/index.js',
          defaultExtension: 'js'
      },
      'highcharts': {
          main: '/highcharts.js',
          defaultExtension: 'js'
      },
      'ngx-loading': {
          main: '/index.js',
          defaultExtension: 'js'
      }
    }
  });
})(this);
