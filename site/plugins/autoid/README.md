# AutoID Plugin for Kirby CMS

![Screenshot](plugin-logo.png?raw=true)

AutoID is a plugin for [Kirby 2](http://getkirby.com/) wich generates unique ids (numeric or hash) for every page.

We love Kirby and its database-less nature. One drawback though is that you don't have unique page ids.

But sometimes this can be very helpful if you need to reference pages to each other or generally need a way to uniquely identify pages other than by name or url (which may change). This is why we developed this plugin.

![Screenshot](screenshot.png?raw=true)

**License:** [MIT](http://opensource.org/licenses/MIT)

## Installation

### Manually (Copy & Paste)

Add a `plugins` folder inside your `site` directory of your kirby installation, if not already existing.

Then download the zip file and copy all its contents into an `autoid` folder inside the `plugins` directory. Your folder structure should now look like this:

```yaml
site/
  plugins/
    autoid/
      autoid.php
      ...
```

### Git Submodule

Alternatively, you can add the plugin as a git submodule in order to make future updates of the plugin quick and easy.

```bash
$ cd your/project/directory
$ git submodule add https://github.com/helllicht/kirby-autoid.git site/plugins/autoid
```

## Usage

In your blueprint, add a new field and use `autoid` as the field name. This way the plugin knows on which field to act on. The fieldtype is up to you, but we highly recommend to make it read-only.

```yaml
fields:
  autoid:
    type: text
    readonly: true
```

*Configuration for a read-only field*

Now, the plugin creates a unique id for each new page created, which is stored inside the field. It also works with existing pages, all you need to do is to open the page in the panel and hit save once.

### Example Use Case

Let's say you want to have a field that allows you to add related projects to a project page. Normally you would query each sibling and reference them by their name/url/uid. But what if they names change? You would need to update each reference individually.

AutoIDs to the rescue! You can use the `autoid` field to uniquely reference the projects. This way even if the project names/urls change, the references won't break.

```yaml
fields:
  relatedprojects:
    label: Related Projects
    type: checkboxes
    options: query
      query:
        fetch: siblings
        value: '{{autoid}}'
        text: '{{title}}'
```

*Example Blueprint field*

## Options

### Field Name

Some of you might want to have a custom name for your autoid field. You can override the name inside the `site/config.php` file of your Kirby installation.

```php
c::set('autoid.name', 'yourcustomfieldname');
```

This allows you to use `yourcustomfieldname` as the field name for your autoid field.

### Type

If you're working in a larger team, you might run into problems using numeric ids. If more than one teammember creates content in their respective local repositories, pages will end up getting the same ids, which kind of defeats the purpose of this plugin.

So we built in a option to use unique md5 hashes instead. They are based on a microtimestamp + your session id. This way it's (nearly) impossible to generate the same hash again.

```php
c::set('autoid.type', 'hash');
```

This will also work when switching back and forth between the regular numeric id and the hashes. **Please note** that your existing ids won't change, so you might end up having both numeric *and* hashed ids.

---

Do you have feature suggestions or want to help improving the plugin? Feel free to contribute!

### Credits

[\#madebyhelllicht](http://helllicht.com) with ♥ in Groß-Gerau
