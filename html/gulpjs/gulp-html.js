import { src, dest } from 'gulp';

// HTML packages
import fileinclude from 'gulp-file-include';

const path = './src/pages/';
const pages = [
	path + "index.html",
	path + "events.html",
	path + "about-us.html",
	path + "start-fundraiser.html",
	path + "contact-us.html",
	path + "browse-fundraisers.html",
	path + "fundraiser-details.html",
	path + "profile.html",
	path + "fundraisers.html",
	path + "donations.html",
	path + "refer.html"
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
