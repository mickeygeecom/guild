<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta content="csrf-token" _token="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Guild</title>
    </head>
    <body>
        <main id="app"></main>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
