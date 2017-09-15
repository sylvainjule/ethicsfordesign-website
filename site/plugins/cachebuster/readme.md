# Kirby Cachebuster Plugin

This plugin will add modification timestamps to your css and js files, 
as long as they are embedded with the css() and js() helpers.

## Requirements

This plugin requires Kirby 2.3. Older Kirby 2 versions are supported by version 2.0.0 of this plugin.

Please note that this plugin doesn't add caching headers to your CSS and JS files.
To make proper use of this plugin, you need to add caching rules to your server configuration.

## Installation

To use this plugin, add the cachebuster.php to `site/plugins`. 
After that you must add rules to your htaccess file or your nginx configuration (see below).

Now you can activate the plugin with following line in your `config.php`.

```
c::set('cachebuster', true);
```

### htaccess rules for Apache

To make this plugin work on Apache you must add the following lines to your 
htaccess file:

```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)\.(\d+)\.(js|css)$ $1.$3 [L]
```

Place them directly after the RewriteBase definition.

### Nginx rewrite rules

For Nginx you can add the following to your virtual host setup:

```
location /assets {
  if (!-e $request_filename) {
    rewrite ^/(.+)\.(\d+)\.(js|css)$ /$1.$3 break;
  }
}
```

## Authors

Bastian Allgeier <bastian@getkirby.com> & Lukas Bestle <lukas@getkirby.com>