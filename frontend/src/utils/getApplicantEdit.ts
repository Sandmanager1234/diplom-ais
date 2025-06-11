import {getAllObjects} from "./getAllObjects";
import {removeEmptyValues} from "./removeEmptyValues";
import {getAllArray} from "./getAllArray";
import {deleteUnEditDocument} from "./deleteUnEditDocument";
import {ApplicantCard} from "services/resumesApi/models";

export function getApplicantEdit(data:ApplicantCard){
    let postBody = {
        ...getAllObjects({
            ...removeEmptyValues(
                data
            )
        })
    }
    const masDate = getAllArray({...data})
    for (const masDateKey in masDate) {
        for (const i in data[masDateKey]) {
            if (masDateKey === 'education') {
                if (Object.keys(removeEmptyValues({...data[masDateKey][i]})).length > 1) {
                    if (postBody[masDateKey])
                        postBody = {
                            ...postBody,
                            [masDateKey]: [...postBody[masDateKey], {...removeEmptyValues({...data[masDateKey][i]})}]
                        }
                    else {
                        postBody = {
                            ...postBody,
                            [masDateKey]: [{...removeEmptyValues({...data[masDateKey][i]})}]
                        }
                    }
                }
            } else if (masDateKey === 'attachments') {
                if (postBody[masDateKey])
                    postBody = {
                        ...postBody,
                        [masDateKey]: [...postBody[masDateKey], {...deleteUnEditDocument({...data[masDateKey][i]})}]
                    }
                else {
                    postBody = {
                        ...postBody,
                        [masDateKey]: [{...deleteUnEditDocument({...data[masDateKey][i]})}]
                    }
                }
            } else {
                if (Object.keys(removeEmptyValues({...data[masDateKey][i]})).length) {
                    if (postBody[masDateKey])
                        postBody = {
                            ...postBody,
                            [masDateKey]: [...postBody[masDateKey], {...removeEmptyValues({...data[masDateKey][i]})}]
                        }
                    else {
                        postBody = {
                            ...postBody,
                            [masDateKey]: [{...removeEmptyValues({...data[masDateKey][i]})}]
                        }
                    }
                }
            }

        }
    }
    return postBody
}