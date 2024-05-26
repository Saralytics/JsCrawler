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

export { normalizeURL };