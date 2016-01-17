// amngular2 and dependencies
import "reflect-metadata";
import "es6-shim";
import  "angular2/bundles/angular2-polyfills.js";
import 'rxjs';
import {bootstrap} from 'angular2/platform/browser';

import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';


bootstrap(AppComponent, [HTTP_PROVIDERS]);

