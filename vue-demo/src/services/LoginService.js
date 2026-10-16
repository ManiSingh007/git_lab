
export default {
  login(credentials) {
    console.log("Login request:", credentials);

    // Temporary response because no backend API
    // has been connected to this demo project.
    return Promise.reject(
      new Error("Demo login: backend API is not connected.")
    );
  }
};
