
(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      app: 'app',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'ng2-translate': 'npm:ng2-translate/bundles/index.js',
      'ng2-toastr': 'npm:ng2-toastr',
      'moment': "npm:moment",
      'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js'
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-toastr': {
        main: './ng2-toastr.js',
        defaultExtension: 'js'
      },
      'moment': {
        main: 'moment.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);

