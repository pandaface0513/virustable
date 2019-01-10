from django import template

register = template.Library()

@register.filter(name='getItem')
def getItem(obj, key):
    return obj.get(key)

@register.filter(name='getPriorityColor')
def getPriorityColor(value):
        if value == "malicious":
            return "#CC3300"
        elif value == "high-risk":
            return "#FF9966"
        elif value == "medium-risk":
            return "#FFCC00"
        elif value == "low-risk":
            return "#99CC33"
        elif value == "clean":
            return "#339900"