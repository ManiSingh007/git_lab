
<template>
  <div class="login-container">
    <div class="edit-form">
      <h4>Login</h4>

      <form @submit.prevent="login">
        <div>
          <label for="studentId">Student ID:</label>
          <input
            id="studentId"
            v-model="studentLoginRequest.studentId"
            type="text"
            required
          />
        </div>

        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="studentLoginRequest.password"
            type="password"
            required
          />
        </div>

        <div class="button-group">
          <button type="submit">Login</button>
          <button
            type="button"
            class="create-btn"
            @click="openCreateModal"
          >
            Create
          </button>
        </div>
      </form>

      <p v-if="message" class="error-message">
        {{ message }}
      </p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card">
        <h4>Create Student Account</h4>

        <form @submit.prevent="submitRegistration">
          <div>
            <label for="newStudentId">Student ID:</label>
            <input
              id="newStudentId"
              v-model="newStudent.studentId"
              required
            />
          </div>

          <div>
            <label for="newPassword">Password:</label>
            <input
              id="newPassword"
              v-model="newStudent.password"
              type="password"
              required
            />
          </div>

          <div>
            <label for="studentName">Full Name:</label>
            <input
              id="studentName"
              v-model="newStudent.name"
              required
            />
          </div>

          <div>
            <label for="studentEmail">Email:</label>
            <input
              id="studentEmail"
              v-model="newStudent.email"
              type="email"
              required
            />
          </div>

          <div class="button-group">
            <button type="submit" class="submit-btn">
              Submit
            </button>
            <button
              type="button"
              class="cancel-btn"
              @click="closeCreateModal"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "../services/LoginService";

export default {
  name: "StudentLogin",

  data() {
    return {
      studentLoginRequest: {
        studentId: "",
        password: ""
      },

      message: "",
      showModal: false,

      newStudent: {
        studentId: "",
        password: "",
        name: "",
        email: ""
      }
    };
  },

  methods: {
    login() {
      LoginService.login(this.studentLoginRequest)
        .then(response => {
          const student = response.data;

          localStorage.setItem("sid", student.id);
          alert("Success!");
        })
        .catch(error => {
          this.message =
            error.response?.data?.message ||
            "Login failed. Check the server or credentials.";

          console.error(error);
        });
    },

    openCreateModal() {
      this.showModal = true;
    },

    closeCreateModal() {
      this.showModal = false;
      this.newStudent = {
        studentId: "",
        password: "",
        name: "",
        email: ""
      };
    },

    submitRegistration() {
      console.log(
        "Submitting new student data:",
        this.newStudent
      );

      alert("Demo only: registration API is not connected.");
      this.closeCreateModal();
    }
  },

  mounted() {
    this.message = "";
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;

  /* Correct CSS comment syntax */
  background-image: url('../assets/Koala.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
}

.edit-form {
  max-width: 320px;
  width: 100%;
  padding: 25px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.edit-form div,
.modal-card div {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.edit-form label,
.modal-card label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.edit-form input,
.modal-card input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.button-group button {
  flex: 1;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.create-btn {
  background-color: #e0e0e0;
  border: 1px solid #ccc;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 16px;
  box-sizing: border-box;
}

.modal-card {
  max-width: 360px;
  width: 100%;
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.error-message {
  color: red;
  overflow-wrap: anywhere;
}
</style>
