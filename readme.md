# What is this?
This is going to be a repository to publish our research and resources. It is for ourselves to look back to as reference as well as anyone who could benefit from it.


# Spec for this website
Let's begin with what is required.

### Pages
- An index page. (with about and all pages listed)
- Pages for categories
  - Technologies: Reactivity, DOM, Lisp, Are.na API, sqlite
  - Applications: How technologies are used: [Are.na API + sqlite] = Are.na Offline
- Playground: Import files from the repository, edit in codemirror and test out in an iframe. 

### SSG Structure
- Pages can be written in MD files. 
- Assets such as other JS files, CSS, images all can be relative to this MD file. 
- Perhaps a Lib folder where all importables can be.
- A site generator script can read all MD files, and transform them to html. 
- Code blocks in MD files will be turned into codemirror instances. 
  - If the code block has attribute that allows it to be runnable it can be run in an iframe beside the block. Else it's just a codeblock.

# Good References
> Good References of publishing code

[Parinfer](https://shaunlebron.github.io/parinfer/)

The gifs/visualisations are super helpful in order to understand the concepts and stuf. Outline helps with navigation and giving an understanding of where you are in the document. The typing animation is pretty fun too, + its an interactive demo...

[p5.js](https://p5js.org/tutorials/repeating-with-loops/)

Live edit and run. I like when there's specific examples that you can edit and re-run. I think you learn best when you see what happens when you change values. Also distinguishes runnable vs not runnable code by not having a play button. Runnable code runs by default, it can be rerun once you change stuff.
