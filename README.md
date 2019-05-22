# joi-json-rest
A Confidence-based JSON Format and compiler for Joi. Magically transforms JSON into REST-ready Joi schemas.

The purpose of this project is to provided an opinionated format that makes it easy to define shared schemas between HTTP Verbs (PUT, GET, POST, etc) from a single file. If you have any other use for JSON to JOI, I highly encourage that you check out: https://github.com/lightsofapollo/joi-to-json-schema

## The Format


## Examples
```
{
  "$filter": "method",
  "$base": {
    "id": {
      "type": "number",
      "description": "The id of the Organization"
    },
    "name": {
      "type": "string",
      "min": 1,
      "description": "The name of the Organization"
    },
    "description": {
      "type": "string",
      "allow": ["", null],
      "description": "The description of the Organization"
    },
    "parent_id": {
      "type": "any",
      "allow": null,
      "description": "The parent id of the Organization containing this Organization"
    },
    "workspaces": {
      "type": "array",
      "description": "An array of items",
      "items": [{
        "type": "object",
        "keys": {
          "id": {
            "type": "number",
            "description": "The workspace id"
          }
        }
      }]
    },
    "orgs": {
      "type": "array",
      "description": "An array of items",
      "items": [{
        "type": "object",
        "keys": {
          "id": {
            "type": "number",
            "description": "The organization id"
          }
        }
      }]
    }
  },
  "POST": {
    "name": {
      "required": true
    },
    "parent_id": {
      "required": true
    }
  },
  "PUT": {
    "id": {
      "required": true
    },
    "name": {
      "required": true
    },
    "description": {
      "required": true
    },
    "parent_id": {
      "required": true
    },
    "workspaces": {
      "required": true
    },
    "orgs": {
      "required": true
    }
  },
  "$default": {
  }
}

```
