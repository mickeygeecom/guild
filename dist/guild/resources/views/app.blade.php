<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>{{ $guild->where('name', 'name')->first()->value }}</title>
    </head>
    <body class="{{ $guild->where('name', 'faction')->first()?->value ?? 'horde' }}">
        <main id="app"></main>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
