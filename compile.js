import fs from 'fs'
import markdownIt from "./markdown-it/markdown-it.js";

let md = new markdownIt('commonmark')//.use(makrdownItMark);
let attrs = (item) => {
	let attrs = item.attrs;
	if (!attrs) return "";
	return Object.fromEntries(attrs);
};

async function eat(tree) {
	let ret = [];
	if (!tree) return "";
	while (tree.length > 0) {
		let item = tree.shift();
		if (item.nesting === 1) {
			let at = attrs(item);
			let ignore = false;

			if (at.href) {
				// check if href is md
				let href = at.href
				let split = href.split('.')
				let ext = split.pop()
				if (ext == 'md') at.href = split.join('.')+'.html'
			}

			let entries = Object.entries
			let at_string =
				// convert attribute (in object form)
				// to an html stringified attribute form
				entries(at)
					.map(([key, value]) => `${key} = "${value}"`)
					.join(" ");

			if (!ignore) {
				let children = await eat(tree);
				children = Array.isArray(children) ? children.join("") : children;
				ret.push(`<${item.tag}${at_string ? " "+at_string: ''}> ${children} </${item.tag}>`);
			}
		}

		if (item.nesting === 0) {
			if (!item.children || item.children.length === 0) {
				let p = item.type === "softbreak"
					? "<br></br>"
					: item.type === "fence"
						? `<xmp>${item.content}</xmp>`
						: item.content;
				ret.push(p);
			} else {
				let children = await eat(item.children);
				children = Array.isArray(children) ? children.join("") : children;
				ret.push(children);
			}
		}

		if (item.nesting === -1) break;
	}
	return ret;
}

let safe_parse = (content) => {
	try {
		return md.parse(content, { html: true });
	} catch (e) {
		return undefined;
	}
};

const MD = async (content) => {

	// if (content.includes('# How templater work')) debug_print = true
	// else debug_print = false

	let tree, body;
	tree = safe_parse(content);

	// if (debug_print) {
	// 	fs.writeFileSync("templater.md", content)
	// 	let templater = fs.readFileSync("./templater.md", { encoding: "utf-8" })
	// 	tree = safe_parse(templater);
	// 	console.log(tree)
	// }

	// else {
	// }

	if (tree) body = await eat(tree);
	else body = content;

		//console.log('body', body)
		//	console.log("content:", content)

	return body;
};

let html = body => `
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/styles/style.css">
</head> 
<body>
	${body}
</body>
`
let transform = async (path) => {
 let file = fs.readFileSync("./"+path, {encoding:'utf-8'})
 let content = await MD(file);
	let split = path.split('.')
	let ext = split.pop()
	let htmlpath = split.join(".")+'.html'
	fs.writeFileSync(htmlpath, html(content.join("\n")))
}

let files = fs.readdirSync('./', {recursive: true})
files.forEach(path => {
	if (path.includes('.git')) return
	if (path.includes('markdown-it')) return

	
	let split = path.split('.')
	let ext = split.pop()
	if (ext == 'md') transform(path)

	console.log(path)
})

// let content = await MD(file);
