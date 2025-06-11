

export const getActiveMenu = (location: string, navigationLinkData: string) => {
    return location === navigationLinkData ||
    location.slice(0, location.indexOf('/', 1)) ===
    navigationLinkData ||
    (location.slice(0, location.indexOf('/', 1)) ===
        '/applicant' &&
        navigationLinkData === '/') ||  location.slice(0, location.indexOf('/', 1)) ===  navigationLinkData.slice(0, navigationLinkData.indexOf('/', 1))

}
