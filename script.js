
// Create form dynamically
var form = document.createElement('form');
form.id = 'myForm';
document.body.appendChild(form);

// Add form fields
var fields = ['firstName', 'lastName', 'address', 'pincode', 'gender', 'food', 'state', 'country'];

fields.forEach(function (fieldName) {
    var label = document.createElement('label');
    label.setAttribute('for', fieldName);
    label.appendChild(document.createTextNode(fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ':'));
    form.appendChild(label);

    var input;

    if (fieldName === 'gender') {
        // Create radio buttons for gender
        var maleRadio = document.createElement('input');
        maleRadio.type = 'radio';
        maleRadio.name = 'gender';
        maleRadio.value = 'Male';
        form.appendChild(maleRadio);
        form.appendChild(document.createTextNode('Male'));

        var femaleRadio = document.createElement('input');
        femaleRadio.type = 'radio';
        femaleRadio.name = 'gender';
        femaleRadio.value = 'Female';
        form.appendChild(femaleRadio);
        form.appendChild(document.createTextNode('Female'));

        var otherRadio = document.createElement('input');
        otherRadio.type = 'radio';
        otherRadio.name = 'gender';
        otherRadio.value = 'Other';
        form.appendChild(otherRadio);
        form.appendChild(document.createTextNode('Other'));
    } else if (fieldName === 'food') {
        // Create checkboxes for food options
        var foodChoices = ['chicken', 'dosa', 'seafood', 'meals', 'pizza'];

        foodChoices.forEach(function (choice) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'food';
            checkbox.value = choice;
            form.appendChild(checkbox);
            form.appendChild(document.createTextNode(choice));
        });
    } else {
        // Create regular text input fields
        input = document.createElement('input');
        input.type = 'text';
        input.id = fieldName;
        input.name = fieldName;
        if (['firstName', 'lastName', 'address', 'pincode', 'state', 'country'].includes(fieldName)) {
            input.required = true;
        }
        form.appendChild(input);
    }

    form.appendChild(document.createElement('br'));
});

// Add submit button
var submitButton = document.createElement('button');
submitButton.type = 'button';
submitButton.appendChild(document.createTextNode('Submit'));
submitButton.onclick = validateAndAddRecord;
form.appendChild(submitButton);

// Create table dynamically
var table = document.createElement('table');
table.id = 'dataTable';
document.body.appendChild(table);

// Add table header
var tableHeader = table.createTHead();
var headerRow = tableHeader.insertRow(0);
fields.forEach(function (fieldName) {
    headerRow.insertCell(fields.indexOf(fieldName)).appendChild(document.createTextNode(fieldName.charAt(0).toUpperCase() + fieldName.slice(1)));
});

// Function to validate and add record to the table
function validateAndAddRecord() {
    // Validate required fields
    var requiredFields = ['firstName', 'lastName', 'address', 'pincode', 'state', 'country'];
    var missingFields = requiredFields.filter(function (fieldName) {
        return !document.getElementById(fieldName).value;
    });

    if (missingFields.length > 0) {
        alert('Please fill in all mandatory fields: ' + missingFields.join(', '));
        return;
    }

    // Validate gender selection
    var selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedGender) {
        alert('Please select a gender.');
        return;
    }

    // Validate food selection
    var selectedFood = document.querySelectorAll('input[name="food"]:checked');
    if (selectedFood.length < 2) {
        alert('Please select at least 2 food options.');
        return;
    }

    // If validation passes, proceed to add record
    addRecord();
}

// Function to add record to the table
function addRecord() {
    var newRow = table.insertRow(table.rows.length);

    fields.forEach(function (fieldName) {
        var cell = newRow.insertCell(fields.indexOf(fieldName));
        var value;

        if (fieldName === 'gender') {
            // Get the selected gender value
            value = document.querySelector('input[name="gender"]:checked').value;
        } else if (fieldName === 'food') {
            // Get selected food options
            var checkboxes = document.querySelectorAll('input[name="food"]:checked');
            value = Array.from(checkboxes).map(function (checkbox) {
                return checkbox.value;
            }).join(', ');
        } else {
            // Get value from regular text input fields
            value = document.getElementById(fieldName).value;
        }

        cell.appendChild(document.createTextNode(value));
    });

    form.reset(); // Clear form fields
}
