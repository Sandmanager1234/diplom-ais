type TRecurciveConverter = {
  oldObject: any
  convertFunction: any
}

export const recursiveConverter = (
  oldObject,
  convertFunction
): TRecurciveConverter => {
  let newObject

  if (
    !oldObject ||
    typeof oldObject !== 'object' ||
    !Object.keys(oldObject).length
  ) {
    return oldObject
  }

  if (Array.isArray(oldObject)) {
    newObject = oldObject.map((element) =>
      recursiveConverter(element, convertFunction)
    )
  } else {
    newObject = {}
    Object.keys(oldObject).forEach((oldKey) => {
      const newKey = convertFunction(oldKey)
      newObject[newKey] = recursiveConverter(oldObject[oldKey], convertFunction)
    })
  }

  return newObject
}
