---
title: Property binding
description: What's the logic behind property binding
createdAt: '01/20/2023'

slug: property-binding
tags: ['Design Principles','Property Binding']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'design'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '01/20/2023'
---

# Property Binding

The component properties can be:

- default value
- required
- type : String, Boolean, Number, Array, Object
- access: Read, Write
- name

# Rules

if they are required then ignore default value


# Validation Rules

When an item has required properties, check the property has a value or it is binded.

If the item property has Write access generate the event handler and the handler function 

Handler function 'componentName+componentId' 

When binding an item property validate the item property type matches the component property/variable type.
