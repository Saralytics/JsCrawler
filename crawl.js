import { JSDOM } from 'jsdom';


function normalizeURL(inputURL) {
    try {
        
        const url = new URL(inputURL); 
        
        const domain = url.hostname;
        let path = url.pathname;
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0,-1);
        }

        return `${domain}${path}`;

    } catch(err) {
        return "Invalid URL"
    }
    
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchorElements = dom.window.document.querySelectorAll('a')
    
    let urls = [];

    for (let anchorElement of anchorElements) {
        const href = anchorElement.getAttribute('href');
        if (href) {
            try {
                if (!href.startsWith("http")) {
                    const absoluteURL = new URL(href, baseURL).href;
                    urls.push(absoluteURL);
                } else {
                    urls.push(href);
                }
            } catch(err) {
                return "Invalid URL"
            }   
        }
    }
    return urls;
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    console.log(`Start crawlPage with currentURL: ${currentURL}, pages: ${JSON.stringify(pages)}`);
    if (!currentURL.startsWith(baseURL)) {
        console.log('base case 1');
        return pages;
    };

    let url = normalizeURL(currentURL);
    console.log(url);
    if(pages[url]){
        console.log('base case 2');
        pages[url] ++;
        return pages;
    } else {
        console.log('Added a new url');
        pages[url] = 1;
        console.log(`pages length ${pages.length}`);
    }

    let response;
    try {
        response = await fetch(currentURL);
    } catch (err) {
        console.log(`Could not fetch ULR: ${currentURL}`);
        return pages;
    }

    if (response.status >= 400){
        console.log(`Failed to fetch URL: ${currentURL} - status: ${response.status}`);
        return pages;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return pages;
    }
    console.log('getting html body')
    let htmlBody = await response.text();
    let newURLs = getURLsFromHTML(htmlBody, baseURL);
    
    console.log(`new urls ${newURLs}`)
    console.log(`pages before: ${pages.length}`)
    for (let newURL of newURLs) {
        pages = await crawlPage(baseURL, newURL, pages);
        console.log(`pages after: ${pages.length}`)
    }
    
    return pages;
}

export { normalizeURL, getURLsFromHTML , crawlPage};