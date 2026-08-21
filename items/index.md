# Items

{% assign items = site.pages | where: "dir", "/items/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}