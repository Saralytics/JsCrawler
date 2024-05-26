import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

test('test1', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('test2', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('test3', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('empty url', () => {
    expect(normalizeURL("")).toBe("Invalid URL");
});

test('Url missing protocol', () => {
    expect(normalizeURL("blog.boot.dev")).toBe("Invalid URL");
});

test('Wrong input type', () => {
    expect(normalizeURL(12345)).toBe("Invalid URL");
});

test('URL with query parameters', ()=> {
    expect(normalizeURL("https://blog.boot.dev/path/?query=123")).toBe("blog.boot.dev/path");
});


test('URL with fragments', ()=> {
    expect(normalizeURL("https://blog.boot.dev/path/#section")).toBe("blog.boot.dev/path");
});

// Root Path
test('Root path', () => {
    expect(normalizeURL("https://blog.boot.dev/")).toBe("blog.boot.dev/");
});

// URLs with Uppercase Characters
test('Uppercase characters in URL', () => {
    expect(normalizeURL("https://BLOG.BOOT.DEV/PATH/")).toBe("blog.boot.dev/PATH");
});


const htmlBodyA = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
</body>
</html>
`;
const baseURLA = "https://blog.boot.dev";
test('absolute url with no path', () => {
    expect(getURLsFromHTML(htmlBodyA, baseURLA)).toStrictEqual(["https://blog.boot.dev"]);
});

const htmlBodyB = `<html>
<body>
    <a href="https://blog.boot.dev/path"><span>Go to Boot.dev</span></a>
</body>
</html>
`;
const baseURLB = "https://blog.boot.dev";
test('absolute url with path', () => {
    expect(getURLsFromHTML(htmlBodyB, baseURLB)).toStrictEqual(["https://blog.boot.dev/path"]);
});

const htmlBodyC = `<html>
<body>
    <a href="path"><span>Go to Boot.dev</span></a>
</body>
</html>
`;
const baseURLC = "https://blog.boot.dev";
test('relative url with no leading slash', () => {
    expect(getURLsFromHTML(htmlBodyC, baseURLC)).toStrictEqual(["https://blog.boot.dev/path"]);
});

const htmlBodyD = `<html>
<body>
    <a href="/about.html"><span>About</span></a>
    <a href="contact.html"><span>Contact</span></a>
</body>
</html>
`;
const baseURLD = "https://example.com";
test('multiple relative urls', () => {
    expect(getURLsFromHTML(htmlBodyD, baseURLD)).toStrictEqual([
        "https://example.com/about.html",
        "https://example.com/contact.html"
    ]);
});


const htmlBodyE = `<html>
<body>
    <p href="/about.html"><span>About</span></p>
    <p href="contact.html"><span>Contact</span></p>
</body>
</html>
`;
const baseURLE = "https://example.com";

test('No urls founc', () => {
    expect(getURLsFromHTML(htmlBodyE, baseURLE)).toStrictEqual([
       
    ]);
});


const WrongBaseURL = "";

test('Wrong Base url', () => {
    expect(getURLsFromHTML(htmlBodyD, WrongBaseURL)).toStrictEqual("Invalid URL");
});
