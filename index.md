# Kampania — Bieszczady 1967

A tabletop RPG oneshot set in 1960s Bieszczady, Poland.

## Navigation

### [Characters](characters/)

{% assign items = site.pages | where: "dir", "/characters/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Locations](locations/)

{% assign items = site.pages | where: "dir", "/locations/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Events](events/)

{% assign items = site.pages | where: "dir", "/events/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Clues](clues/clues.md)

### [Story Facts](story-facts/)

{% assign items = site.pages | where: "dir", "/story-facts/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Historical Context](historical%20context/)

{% assign items = site.pages | where: "dir", "/historical context/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Inspirations](inspirations/)

{% assign items = site.pages | where: "dir", "/inspirations/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### [Items](items/)

{% assign items = site.pages | where: "dir", "/items/" | sort: "name" %}{% for p in items %}{% unless p.name == "index.md" or p.name == "_template.md" %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endunless %}{% endfor %}
### Reference

- [Actions & Opportunities](actions-and-opportunities.md)