import { src, dest } from 'gulp';

// HTML packages
import fileinclude from 'gulp-file-include';

const path = './src/pages/';
const pages = [
	path + "index.html",
	path + "events.html",
	path + "about-us.html",
	path + "becomepartner.html",
	path + "contact-us.html"
];

// FOR HTML PAGES
export const htmlInclude = () => {
    return src(pages)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(dest('build'))
}