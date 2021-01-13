const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');

// Copy into dist folder for production
if (mix.inProduction()) {
	// App
	mix.copyDirectory('app', 'dist/guild/app');
    mix.copyDirectory('bootstrap', 'dist/guild/bootstrap');
	mix.copyDirectory('config', 'dist/guild/config');
	mix.copyDirectory('database', 'dist/guild/database');
	mix.copyDirectory('resources', 'dist/guild/resources');
	mix.copyDirectory('routes', 'dist/guild/routes');
    mix.copyDirectory('storage', 'dist/guild/storage');
	mix.copyDirectory('tests', 'dist/guild/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/guild.angelin.dev/css');
	mix.copyDirectory('public/js', 'dist/guild.angelin.dev/js');
}
