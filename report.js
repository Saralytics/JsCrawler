
function sortPages(pages) {
    const sorted = Object.fromEntries(Object.entries(pages).sort(
        ([,a], [,b]) => b-a
    )
    )
    return sorted;
}

function printReport(pages) {
    console.log("REPORT IS STARTING...");

    Object.entries(pages).forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`);
    });
}

export { sortPages, printReport };