# cg-scaffold
A basic scaffolding and my first attemt to build a gulp task runner from scratch.

The directory structure is as such...

    [src]
      index.html
      /assets
        /images
        /js
        /scss

All files in the asset's js and scss directories are concatinated and coppied into an app directory both minified and unminified. Images are optimized and copied over. And all html files are copied over as well. Then a local server is started to watch changes within the src directory, streaming any changes to the browser via the app directory. It's pretty exciting!

Here's how you use this...
- Clone the repo `$ git clone https://github.com/geirman/cg-scaffolding.git`
- Change directory into the cloned directory `$ cd cg-scaffolding`
- Run `$ npm install`
- Run `$ gulp`

At this point, you should have a local server running http://localhost:3000 serving the contents of the app directory. Any edits made within the src directory should be automatically propogated and streamed to the browser. As a bonus, an external URL should be setup which will allow other devices on your network to view the site (this was http://10.0.0.5:3000 for me)

