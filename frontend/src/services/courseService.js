import httpService from "./httpService";

const apiEndPoint = "/course";

export function getCourses() {
  return httpService.get(apiEndPoint);
}

export function getCourse(id) {
  return httpService.get(apiEndPoint + "/" + id);
}

//add new course
export async function addNewCourse(course) {
  return await httpService.post(apiEndPoint, course);
}

// edit course
export function saveCourse(course) {
  if (course._id) {
    const body = { ...course };
    delete body._id;
    // dont send projects + tutorials to api
    // it has another func for updating those.
    if (body.projects) delete body.projects;
    if (body.tutorials) delete body.tutorials;
    return httpService.put(apiEndPoint + "/" + course._id, body);
  }
  return httpService.post(apiEndPoint, course);
}

// delete course
export function deleteCourse(id) {
  return httpService.delete(apiEndPoint + "/" + id);
}

// add a new project to course
export function addProject(courseId, projectId) {
  return httpService.put(apiEndPoint + "/project/" + courseId, {
    id: projectId,
  });
}

export function deleteProject(courseId, projectId) {
  return httpService.put(apiEndPoint + "/deleteProject/" + courseId, {
    id: projectId,
  });
}

// add a new tutorial to course
export function addTutorial(courseId, tutorialId) {
  return httpService.put(apiEndPoint + "/tutorial/" + courseId, {
    id: tutorialId,
  });
}

export function deleteTutorial(courseId, tutorialId) {
  return httpService.put(apiEndPoint + "/deleteTutorial/" + courseId, {
    id: tutorialId,
  });
}
