const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');

// Copy into dist folder for production
if (mix.inProduction()) {
	// App
	mix.copyDirectory('app', 'dist/src/app');
    mix.copyDirectory('bootstrap', 'dist/src/bootstrap');
	mix.copyDirectory('config', 'dist/src/config');
	mix.copyDirectory('database', 'dist/src/database');
	mix.copyDirectory('resources', 'dist/src/resources');
	mix.copyDirectory('routes', 'dist/src/routes');
    mix.copyDirectory('storage', 'dist/src/storage');
	mix.copyDirectory('tests', 'dist/src/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/public/css');
	mix.copyDirectory('public/js', 'dist/public/js');
}
