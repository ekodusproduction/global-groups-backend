const ProjectModel = require("../models/ProjectModel")



const getAllProjectServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getAllProjectList(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getAllCommercialProjectServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getAllCommercialProject(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const getAllResedentialProjectServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getAllResedentialProject(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getCommercialProjectByIdServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getCommercialPropertyById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const getResedentialProjectByIdServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getResendtialPropertyById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getProjectBasicDetailsByIdServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getProjectBasicDetailsById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const getProjectDetailsByIdServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getProjectDetailsById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}



const createProjectServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.createProject(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const updateProjectServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.updateProject(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}



const getAllProjectDropDownService = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getAllProjectDropDownList(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteProjectService = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.deleteProjectById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const createProjectHiglightServices = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.createProjectHighlights(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const getAllProjectCountByStatusService = async (request) => {
  return new Promise((resolve, reject) => {
    ProjectModel.getAllProjectCountByStatus(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  getAllCommercialProjectServices,
  getCommercialProjectByIdServices,
  getAllResedentialProjectServices,
  getResedentialProjectByIdServices,
  createProjectServices,
  getAllProjectServices,
  getProjectDetailsByIdServices,
  getAllProjectDropDownService,
  updateProjectServices,
  deleteProjectService,
  createProjectHiglightServices,
  getProjectBasicDetailsByIdServices,
  getAllProjectCountByStatusService
}
