/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'js/lib/@angular/core/bundles/core.umd.js',
      '@angular/common': 'js/lib/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'js/lib/@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'js/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'js/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'js/lib/@angular/http/bundles/http.umd.js',
      '@angular/router': 'js/lib/@angular/router/bundles/router.umd.js',
      '@angular/forms': 'js/lib/@angular/forms/bundles/forms.umd.js',
      '@ngui/datetime-picker': 'js/lib/datetime-picker.umd.js',
      // other libraries
      'rxjs':                       'js/lib/rxjs',
      'angular2-in-memory-web-api': 'js/lib/angular2-in-memory-web-api',
      'moment': 'js/lib/moment.js',
      'jquery': 'js/lib/jquery.js',
      'symbol-observable': 'js/lib/symbol-observable',
      'ng2-bootstrap/ng2-bootstrap': 'js/lib/ngx-bootstrap.umd.js',
      'ng2-select': 'js/lib',
      'mydatepicker': 'js/lib/mydatepicker.umd.min.js',
      'ng2-recaptcha':'js/lib/ng2-recaptcha.js',
	  'angular2-modal': 'js/lib/angular2-modal.js',
      '@angular/animations': 'js/lib/@angular/animations/bundles/animations.umd.min.js',
      '@angular/animations/browser':'js/lib/@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'js/lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      'angular2-toaster': 'js/lib/angular2-toaster/bundles/angular2-toaster.umd.js',
      'ng2-bootstrap-modal': 'app/modal',
      'ng2-img-cropper': 'js/lib/ng2-img-cropper',
      'sockjs-client':'js/lib/sockjs.min.js',
      'stompjs':'js/lib/stomp.min.js',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      'symbol-observable': {
        main: './index.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-select': {
        defaultExtension: 'js',
        main: 'ng2-select.umd.js'
      },
      'ng2-bootstrap-modal': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'ng2-img-cropper': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
