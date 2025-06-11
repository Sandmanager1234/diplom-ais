export function removeEmptyValues(object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            if (value === null || value === undefined || value === 0 || value === '' || key === "id") {
                delete object[key];
            }
        }
    }
    return object
}