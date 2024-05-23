// update.js
document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(".edit-button");
  const updateForm = document.getElementById("update-form");
  const studentNameInput = document.getElementById("studentName");
  const studentIdInput = document.getElementById("studentId");
  const gpaInput = document.getElementById("gpa");
  const dobInput = document.getElementById("dob");
  const genderInput = document.getElementById("gender");
  const levelInput = document.getElementById("level");
  const statusInput = document.getElementById("status");
  const departmentInput = document.getElementById("department");
  const emailInput = document.getElementById("email");
  const mobileInput = document.getElementById("mobile");

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const studentId = button.getAttribute("data-student-id");
      getStudentData(studentId)
        .then(function (data) {
          studentNameInput.value = data.name;
          studentIdInput.value = data.ID;
          gpaInput.value = data.GPA;
          dobInput.value = data.birthDate;
          genderInput.value = data.gender;
          levelInput.value = data.level;
          statusInput.value = data.status;
          departmentInput.value = data.department;
          emailInput.value = data.email;
          mobileInput.value = data.mobilePhone;
          updateForm.style.display = "block";
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    });
  });        
    function getStudentData(studentId) {
        return fetch("/get_student_data/" + studentId + "/").then(function (response) {
          return response.json();
        });
    }
  
   // Add an event listener to the update form for the submit event
  updateForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the updated data from the form inputs
    const updatedData = {
      name: studentNameInput.value,
      ID: studentIdInput.value,
      GPA: parseFloat(gpaInput.value),
      birthDate: dobInput.value,
      gender: genderInput.value,
      level: parseInt(levelInput.value),
      status: statusInput.value,
      department: departmentInput.value,
      email: emailInput.value,
      mobilePhone: mobileInput.value,
    };
  
    // Send a PUT request to update the student data
    updateStudentData(updatedData)
      .then(function (response) {
        // Handle the response from the server
        if (response.ok) {
          // Successful update
          console.log("Student data updated successfully");
          updateForm.style.display = "none"; // Hide the update form
          window.location.reload(); // Refresh the page to reflect the updated data
        } else {
          // Failed update
          console.log("Failed to update student data");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  });
  
  // Function to send the updated student data to the server
  function updateStudentData(updatedData) {
    const studentId = updatedData.ID;
  
    return fetch(`/update_student/${studentId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Include the CSRF token
      },
      body: JSON.stringify(updatedData), // Convert the data to JSON
    });
  }
  
  // Function to get the CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() : "";
  }
  // Delete Button Event Listener
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const studentId = button.getAttribute("data-student-id");
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      deleteStudentData(studentId)
        .then(function (response) {
          if (response.ok) {
            console.log("Student deleted successfully");
            window.location.reload();
          } else {
            console.log("Failed to delete student");
          }
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    }
  });
  });
  
  // Function to delete a student
  function deleteStudentData(studentId) {
  return fetch(`/delete_student/${studentId}/`, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
  }
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function () {
    const searchId = document.getElementById("search-id").value;
    searchStudent(searchId)
      .then(function (data) {
        if (data) {
          displayStudent(data); // Display the searched student in the table
        } else {
          console.log("No student found with the provided ID");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  });
  
function searchStudent(studentId) {
    return fetch(`/get_student_data/${studentId}/`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to search for student");
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  }
 // Remove updateForm and related input elements at the top
 function displayStudent(studentData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear existing table rows
  
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${studentData.name}</td>
  <td>${studentData.ID}</td>
  <td>${studentData.GPA}</td>
  <td>${studentData.birthDate}</td>
  <td>${studentData.gender}</td>
  <td>${studentData.level}</td>
  <td>${studentData.status}</td>
  <td>${studentData.department}</td>
  <td>${studentData.email}</td>
  <td>${studentData.mobilePhone}</td>
  <td><button class="edit-button" data-student-id="${studentData.ID}">Edit</button></td>
  <td><button class="delete-button" data-student-id="${studentData.ID}">Delete</button></td>
  `;
  
  tableBody.appendChild(newRow);
 
  // Add event listeners to the new buttons
  addEventListeners(newRow);
  }
  function addEventListeners(row) {
    // Get the edit and delete buttons from the row
    const editButton = row.querySelector(".edit-button");
    const deleteButton = row.querySelector(".delete-button");
  
    // Add the same event listeners as before
    editButton.addEventListener("click", function () {
      const studentId = editButton.getAttribute("data-student-id");
      getStudentData(studentId)
        .then(function (data) {
          studentNameInput.value = data.name;
          studentIdInput.value = data.ID;
          gpaInput.value = data.GPA;
          dobInput.value = data.birthDate;
          genderInput.value = data.gender;
          levelInput.value = data.level;
          statusInput.value = data.status;
          departmentInput.value = data.department;
          emailInput.value = data.email;
          mobileInput.value = data.mobilePhone;
          updateForm.style.display = "block";
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    });
  
    deleteButton.addEventListener("click", function () {
      const studentId = deleteButton.getAttribute("data-student-id");
      const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
      );
      if (confirmDelete) {
        deleteStudentData(studentId)
          .then(function (response) {
            if (response.ok) {
              console.log("Student deleted successfully");
              window.location.reload();
            } else {
              console.log("Failed to delete student");
            }
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
      }
    });
  } 
  });