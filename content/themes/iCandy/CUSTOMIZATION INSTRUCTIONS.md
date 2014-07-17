# Hello

Thank you for purchasing my theme, I hope you like it :)

## How to customize this theme

There are a few things you might want to know:

1. Add comments feature
2. Customize styles
3. Pick from one of the provided header images
4. Change/Hide/Show Social Media links
5. Change/Enable/Disable navigation menu for pages
6. Hide/Show site search feature

### 1. Add comments feature

In the `post.hbs` file look for `{{! COMMENTS }}`, the included comments system
is provided by [Disqus](https://disqus.com/), if you wish to use another service
you will have to replace this section with code sniped provided by your
service provider.

You need to know your `disqus_shortname`, and replace the shortname in the theme
with your own account's shortname.

More information on [Disqus.com](https://demospecificidea.disqus.com/admin/universalcode/).

### 2.Customize styles

You may override any CSS style with your own custom style by
modifying the `/assets/css/CUSTOM.css` file. This file is loaded last, therefore
any styling you provide here will overwrite other styles. This is the preferred
way to customize your style.

When updates to the theme are provided you should *backup* the `CUSTOM.css` file
before making the upgrade.

You may also look at the `SETTINGS.css` file and see in it that you can alter
certain theme features.

### 3. Pick from one of the provided header images

You can upload your own header image, or select one of the free header images in
the `images` folder. PSD files are also provided if you wish to edit them.

### 4. Change/Hide/Show Social Media links

To hide the social media links from showing you can open the
`/assets/css/SETTINGS.css` file and see the `.site-footer.social-links` section
for more details.

To add your own social media links and icons you should open the
`/partials/social-links.hbs` file and modify the relevant links.

To add new links, copy and paste the relevant sections, and look at the
[FontAwesome](http://fortawesome.github.io/Font-Awesome/) site for the name of
your preferred social media company.

### 5. Change/Enable/Disable navigation menu for pages

To disable the navigation menu you should look at the `/assets/css/SETTINGS.css`
file and find the `#navigation` sections for more details.

In order to make the existing `About` and `Contact` links to work with your blog,
you should create a *contact* _page_ as well as a *about* _page_, note: _pages_
are different than posts.

If the title of the page is _Contact_, the url will be
`http://your-blog.com/contact` and the same goes for _About_ page.

To add more links, change order of links, or change icons for the menu links,
please see the `/partial/navigation.hbs` file, where you will have to edit the
*HTML* to your liking. See [FontAwesome](http://fortawesome.github.io/Font-Awesome/)
for custom icons.

### 6. Hide/Show site search feature

To hide the search feature you may look at the `assets/css/SETTINGS.css` file
and find the `.search` section for more details.
