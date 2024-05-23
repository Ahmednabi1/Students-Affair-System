function validateForm() {
    event.preventDefault();

    const name = document.getElementById("fname9").value;
    const email = document.getElementById("fname8").value;
    const id = document.getElementById("fname2").value;
    const dob = document.getElementById("dob").value;
    const mobile = document.getElementById("phone number").value;
    const gpa = document.getElementById("fname3").value;

    if (!isName(name)) {
        alert("Please enter a valid name!");
        return false;
    }
    
    if (!isEmail(email)) {
        alert("Please enter a valid email address!");
        return false;
    }
    
    if (!isID(id)) {
        alert("Please enter a valid ID (8 digits)!");
        return false;
    }
    
    if (!olderThan(dob, 18)) {
        alert("You must be at least 18 years old!");
        return false;
    }
    
    if (!isPhone(mobile)) {
        alert("Please enter a valid phone number!");
        return false;
    }

    if (!isGPA(gpa)) {
        alert("Please enter a valid GPA between 1 and 4!");
        return false;
    }
    
    return true;
}

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isPhone(mobile) {
    const re = /^01[0125][0-9]{8}$/;
    return re.test(String(mobile).toLowerCase());
}

function isName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(String(name).toLowerCase());
}

function isID(id) {
    const re = /^[0-9]{8}$/;
    return re.test(String(id));
}

function isGPA(gpa) {
    const re = /^[1-4](\.\d+)?$/;
    return re.test(String(gpa));
}

function olderThan(date, age) {
    const today = new Date();
    const birthDate = new Date(date);
    const ageDifMs = today - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= age;
}