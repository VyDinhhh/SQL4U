import httpService from './httpService';

const apiEndPoint = "/tutorial";

// get all tutorials 
export function getTutorials() {
    return httpService.get(apiEndPoint);
}

// get specific tutorial with id
export function getTutorial(id) {
    return httpService.get(apiEndPoint + '/' + id);
}

// save tutorial
export async function saveTutorial(tutorial, content) {
    // update
    if (tutorial._id) {
        const body = { ...tutorial };
        delete body._id;
        if (body.contents) delete body.contents;
        if (content.header && content.detail) body.content = content;
        return httpService.put(apiEndPoint + "/" + tutorial._id, body)
    }
    // add
    const { data } = await httpService.post(apiEndPoint, tutorial)
    return { data, method: "add" };
}

// delete content of a project
// content :{header, detail}
export function deleteContent(tutorialId, contentId) {
    return httpService.put(apiEndPoint + "/content/" + tutorialId, { id: contentId });
}


export function deleteTutorial(tutorialId) {
    return httpService.delete(apiEndPoint + "/" + tutorialId)
}