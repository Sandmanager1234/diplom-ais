export function deleteUnEditDocument(object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            if (key === 'id' && value.length > 4) {
                return {[key]: value}
            } else if (value === null || value === undefined || value === 0 || value === '' || key === "id") {
                delete object[key];
            }
        }
    }
    return object
}