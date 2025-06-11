export function getAllArray(obj: any) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (!Array.isArray(value)) {
                delete obj[key];
            }
        }
    }
    return obj
}