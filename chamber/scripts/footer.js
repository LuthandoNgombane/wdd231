// LN - Update Footer
export function updateFooter() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement !== null) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement !== null) {
        lastModifiedElement.textContent = document.lastModified;
    }
}