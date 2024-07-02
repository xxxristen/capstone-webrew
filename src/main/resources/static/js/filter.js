var checkboxes, teaCheckBox, teaWareCheckBox, accessoryCheckBox, teaFormatBoxes;
let widthOutput;
let constantSelections = [];

function reportWindowSize() {
    widthOutput = window.innerWidth;
    getElements();
}
window.addEventListener('resize', () => {
    reportWindowSize();
});

// Get initial viewport to get the respective elements
reportWindowSize();

function getElements() {
    if (widthOutput < 576) {
        checkboxes = document.querySelectorAll('input[name="filterSelectionMobile"]');
        teaCheckBox = document.getElementById("typeCheckTeaMobile");
        teaWareCheckBox = document.getElementById("typeCheckTeawareMobile");
        accessoryCheckBox = document.getElementById("typeCheckAccessoryMobile");
        teaFormatBoxes = document.querySelectorAll("#formatCheckLooseMobile, #formatCheckPowderMobile, #formatCheckTeaBagMobile");
        applySelections(constantSelections);
    }
    else {
        checkboxes = document.querySelectorAll('input[name="filterSelection"]');
        teaCheckBox = document.getElementById("typeCheckTea");
        teaWareCheckBox = document.getElementById("typeCheckTeaware");
        accessoryCheckBox = document.getElementById("typeCheckAccessory");
        teaFormatBoxes = document.querySelectorAll("#formatCheckLoose, #formatCheckPowder, #formatCheckTeaBag");
        applySelections(constantSelections);
    }
}

function toggleFilter(checkbox) {
    const filter = document.getElementById("filter_tab");
    if (checkbox.checked === true) {
        filter.style.display = "block";
    }
    else {
        filter.style.display = "none";
    }
}

function applySelections(arr) {
    if (arr.length > 0) {
        for (const selectionCheckbox of checkboxes) {
            if (!arr.includes("Tea") && selectionCheckbox.id.includes("formatCheck")) {
                selectionCheckbox.disabled = true;
            }
            else if (arr.includes("Tea") && selectionCheckbox.id.includes("formatCheck")) {
                selectionCheckbox.disabled = false;
            }
            if (arr.includes(selectionCheckbox.value)) {
                selectionCheckbox.checked = true;
            }
            else {
                selectionCheckbox.checked = false;
            }
        }
    }
}

// Function to clear all checked boxes
function clearAllSelections() {
    checkboxes.forEach(box => {
        box.checked = false;
    })
    teaFormatBoxes.forEach(checkBox => {
        checkBox.disabled = true;
    })
}

// Function to get all the checked values
function getAllSelections() {
    const checkedBoxes = [];
    checkboxes.forEach(box => {
        if (box.checked) {
            checkedBoxes.push(box.value);
        }
    });
    constantSelections = checkedBoxes;
    return checkedBoxes;
}

// Listen for changes to filter selections
checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        getAllSelections();
    });
});

// Event listener on "Tea" checkbox
teaCheckBox.addEventListener('change', () => {
    teaFormatBoxes.forEach(checkBox => {
        if (!teaCheckBox.checked) {
            checkBox.checked = false;
            checkBox.disabled = true;
        }
        else {
            checkBox.disabled = false;
        }
    })
})

// Checking the respective checkboxes on load
document.addEventListener('DOMContentLoaded', function () {
    const url = document.location.search;
    let urlParams = new URLSearchParams(url);
    let type = urlParams.get("type");
    switch (type) {
        case "Tea":
            clearAllSelections();
            teaCheckBox.checked = true;
            teaFormatBoxes.forEach(checkBox => {
                checkBox.disabled = false;
            });
            break;
        case "Teaware":
            clearAllSelections();
            teaWareCheckBox.checked = true;
            break;
        case "Accessory":
            clearAllSelections();
            accessoryCheckBox.checked = true;
            break;
        default:
            clearAllSelections();
            break;
    }
});
