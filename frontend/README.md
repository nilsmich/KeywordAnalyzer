## ToDo's
* JS functions (Load more buttons, Load Images)
* How to deal with protected pages? Token? Cookies?
* Fonts --> not supportat at the moment, but may be working in ISO setup
* CSS import without manuel work?
* Icons --> see console
GET http://localhost:3000/Images/Shop/Icons/chevron-down.svg 404 (Not Found)
loading@2x.gif:1 GET http://localhost:3000/Images/Shop/galaxus/loading@2x.gif 404 (Not Found)
loading-white@2x.gif:1 GET http://localhost:3000/Images/Shop/galaxus/loading-white@2x.gif 404 (Not Found)


## How to use it?
### Install it and run:
```bash
yarn
yarn dev
```

### two options for implementation
1. copy ...monolith-wrapper\components\monolithWrapper into ISO project as a component
2. make this project to an NPM package


### Migrate Monolith Page to ISO Wrapper
1. create new page in the ISO project
2. in that page: call ```<MonolithWrapper url={'http://localhost:3000/api/monolith'} portal={Portal.galaxus} />```
3. change the path to the Monolith Route to call the HTML from there

Precirements: The Monolith page should only contain the inner HTML but no <html> tag, Header or Document Type

## Deploy Monolith in the future
### CSS
1. Monolith Deploy of all CSS files
2. copy the minified versions into the digitec/galaxus.modules.scss files 
3. deploy this component

### HTML
1. Deploy Monolith
