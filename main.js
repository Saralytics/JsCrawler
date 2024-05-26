import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { sortPages, printReport } from './report.js';

async function main() {
    if (argv.length !== 3) {
        console.log("Wrong number of arguments");
        return;
    } else {
        console.log("Crawler starts crawling...");
        const baseURL = argv[2];
        let pages = await crawlPage(baseURL);

        const sortedPages = sortPages(pages);
        console.log(sortedPages);
        printReport(sortedPages);
        
    };
}

main()
