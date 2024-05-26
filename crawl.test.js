import { test, expect } from "@jest/globals";
import { normalizeURL  } from "./crawl";

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
