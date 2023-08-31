const Constant = {
  statusCode: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHRIZED_ACCESS: 401,
    API_NOT_FOUND: 404,
    DATA_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  customerType: {
    B2B_CUSTOMER: 0,
    B2C_CUSTOMER: 1,
    INVALID_CUSTOMER: 2,
  },
  successMessage: {
    DELETED_SUCCESSFULLY: "Deleted Successfully",
    GALLERY_UPLOADED_SUCCESSFULLY: "Gallery Uploaded Successfully",
    GALLERY_UPLOADED_FAILED: "Failed to Upload Gallery",
    SUCCESSFULL: "Successfull",
    CONTACT_SENT_SUCCESSFULLY: "Submitted Successfully",
    BLOG_POSTED_SUCCESSFULLY: "Post Submitted Successfully",
    INVALID_PROPERTY_ID: "Property Id does not exist",
    CUSTOMER_REGISTRATION_SUCCESSFULLY: "Customer Registered Successfully",
    USER_CREATED_SUCCESSFULLY: "User Created  Successfully",
    ADMIN_LOGIN_CREATED: "Successfully login ",
    PASSWORD_CHANGE: "Password change Successfully",
    CREATED_ROLE: "Successfully created Role",
    FAIL: "Fail",
    USER_CREATED_SUCCESSFULLY: "User Created  Successfully",
    RESIGTRATION_SUBMITTED_SUCCESSFULLY: "Resgistraion Submitted Successfully"
   
  },
  errorMessage: {
    INVALID_BLOG_ID: "Invalid Blog Id",
    INVALID_PROPERTY_ID: "Invalid Property Id",
    INVALID_PROJECT_ID: "Invalid Project Id",
    INVALID_USER_PASSWORD: "Invalid Password",
    INVALID_EMAIL_ID: "Email Does Not Exist ",
    INVALID_USER_CRENDENTIAL: "Invalid user credentials",
    LOGIN_SUCCESSFULL: "Successfully Logged-In",
    EMPTY_DATA: "Data not found",
    EMAIL_ID_ALREADY_EXISTS: "Email Id Already Exists",
    INVALID_IMAGE_ID: "Invalid Image Id",
    INVALID_IMAGE_TYPE: "Invalid Image Type",
    EMPTY_GALLERY: "Gallery is Empty",
    EMPTY_PROJECT_LIST: "Project List is Empty",
    IMAGE_FILE_REQUIRED: "Image File Required",
    PROJECT_IMAGE_FILE_REQUIRED: "Project Image File Required",
    PROJECT_IMAGE_FILE_REQUIRED: "Project Image File Required",
    ARCHITECTURE_IMAGE_FILE_REQUIRED: "Architecture Image File Required",
    PROJECT_PDF_REQUIRED: "Project PDF Required",
    NO_PROJECT_DETAILS: "No Project Details for this id",
    NO_BLOG_DETAILS: "No Blog Details for this id",
    NO_PROJECT_TO_DELETE: "No Project to Delete for this id",
    DATA_NOT_FOUND: "Data not Found",
  },
  emailcount: {
    COUNT: 0,
    EXIST: 1,
  },
  updateCount: {
    COUNT: 0,
    EXIST: 1,
  },
  apiVersion: {
    VERSION1: "v1",
  },
  roleCount: {
    COUNT: 0,
    EXIST: 1,
  },
  statusCount: {
    COUNT: 0,
    EXIST: 1,
  },
  orderIdCount: {
    COUNT: 0,
    EXIST: 1,
  },
  sort: {
    A_Z: 1,
    Z_A: 2,
    low_high: 3,
    high_low: 4,
  },
};

module.exports = Constant;
