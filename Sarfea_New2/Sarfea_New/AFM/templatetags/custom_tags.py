from django import template

register = template.Library()

@register.simple_tag
def update_widget_attrs(field, attrs):
    field.widget.attrs.update(attrs)
    return field
