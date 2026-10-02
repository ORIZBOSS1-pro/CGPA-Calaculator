/* ==========================================
   SECTION 1: GPA CALCULATOR SCRIPT
========================================== */
const maxCourses = 11;
let currentCourse = 1;
let totalUnits = 0;
let totalPoints = 0;

function processStep(isFinalCourse) {
  const gradeVal = parseFloat(document.getElementById('gradeInput').value);
  const unitVal = parseFloat(document.getElementById('unitInput').value);

  if (isNaN(gradeVal) || isNaN(unitVal)) {
    alert("Please fill in both the Grade Point and Unit Credit.");
    return;
  }

  totalUnits += unitVal;
  totalPoints += (gradeVal * unitVal);

  document.getElementById('gradeInput').value = '';
  document.getElementById('unitInput').value = '';

  if (isFinalCourse || currentCourse >= maxCourses) {
    showResults();
  } else {
    currentCourse++;
    document.getElementById('courseTitle').innerText = `Course ${currentCourse}`;
    document.getElementById('progressTracker').innerText = `Step ${currentCourse}`;

    if (currentCourse === maxCourses) {
      document.getElementById('nextBtn').style.display = 'none';
    }

    document.getElementById('gradeInput').focus();
  }
}

function getClassDivision(gpa) {
  if (gpa >= 4.5) return "First Class Division";
  if (gpa >= 3.5) return "Second Class (Upper Division)";
  if (gpa >= 2.5) return "Second Class (Lower Division)";
  if (gpa >= 1.5) return "Third Class Division";
  return "Pass / Fail";
}

function showResults() {
  if (totalUnits === 0) {
    alert("Total units cannot be 0.");
    return;
  }

  const gpa = totalPoints / totalUnits;

  document.getElementById('displayCourses').innerText = currentCourse;
  document.getElementById('displayTU').innerText = totalUnits;
  document.getElementById('displayTPU').innerText = totalPoints;
  document.getElementById('displayGPA').innerText = gpa.toFixed(2);
  document.getElementById('displayClass').innerText = getClassDivision(gpa);

  document.getElementById('calculatorBox').style.display = 'none';
  document.getElementById('resultCard').style.display = 'block';
}

function resetCalculator() {
  currentCourse = 1;
  totalUnits = 0;
  totalPoints = 0;

  document.getElementById('courseTitle').innerText = `Course 1`;
  document.getElementById('progressTracker').innerText = `Step 1`;
  document.getElementById('nextBtn').style.display = 'block';
  
  document.getElementById('calculatorBox').style.display = 'block';
  document.getElementById('resultCard').style.display = 'none';
}

/* ==========================================
   SECTION 2: CGPA CALCULATOR SCRIPT
========================================== */
let sessionCount = 2;

function addSessionRow() {
  sessionCount++;
  const container = document.getElementById('sessionContainer');
  const row = document.createElement('div');
  row.className = 'session-row';
  row.innerHTML = `
    <input type="number" class="session-gpa" placeholder="Session ${sessionCount} GPA" step="0.01" min="0" max="5">
    <input type="number" class="session-unit" placeholder="Units" min="1">
  `;
  container.appendChild(row);
}

function calculateCGPA() {
  const gpaInputs = document.querySelectorAll('.session-gpa');
  const unitInputs = document.querySelectorAll('.session-unit');

  let overallPoints = 0;
  let overallUnits = 0;
  let activeSessions = 0;

  for (let i = 0; i < gpaInputs.length; i++) {
    const gpa = parseFloat(gpaInputs[i].value);
    const units = parseFloat(unitInputs[i].value);

    if (!isNaN(gpa) && !isNaN(units) && units > 0) {
      overallPoints += (gpa * units);
      overallUnits += units;
      activeSessions++;
    }
  }

  if (activeSessions === 0 || overallUnits === 0) {
    alert("Please enter a valid GPA and Unit value for at least one session.");
    return;
  }

  const cgpa = overallPoints / overallUnits;

  document.getElementById('displayTotalSessions').innerText = activeSessions;
  document.getElementById('displayOverallUnits').innerText = overallUnits;
  document.getElementById('displayCGPA').innerText = cgpa.toFixed(2);
  document.getElementById('displayCGPAClass').innerText = getClassDivision(cgpa);

  document.getElementById('cgpaResultCard').style.display = 'block';
}
