**REST API Automation Tool**

This is a tool for creating a basic rest api with your own name and fields.

Usage:

`python3 automate.py <file-extension> <name-of-route-and-model> <field1> <field2> ...`

Example use:

Making a basic REST model/route named 'transactions' with the fields: 'id', 'name', 'company'
using expressjs 

`python3 automate.py js transactions id name company`

Currently supported languages/frameworks are:

* javascript/expressjs