import { argv } from 'node:process';
import { crawlPage } from './crawl.js';

function main() {
    if (argv.length !== 3) {
        console.log("Wrong number of arguments");
        return;
    } else {
        console.log("Crawler starts crawling...");
        let pages = crawlPage(argv[2]);
        console.log(JSON.stringify(pages));
        
    };
}

main()
