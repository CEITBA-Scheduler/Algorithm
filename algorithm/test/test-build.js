// Purpose of this file is to be run automatically and debugged by Pato's IDE

// Primer Cuatrimestre Mecánica
var userSubjectCodeSelection = [
    "93.17", // Matemática I
    "31.08", // Sistemas de representación
    "12.01", // Química I
    "93.18", // Álgebra Lineal
    "94.21", // Formación General I
];

// Primer Cuatrimestre Industrial
var industrialSubjectCodeSelection = [
    "93.17", // Matemática I
    "31.08", // Sistemas de representación
    "12.01", // Química I
    "93.18", // Álgebra Lineal
    "71.55", // Informática General
];

var materiasJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/development/algorithm/test/materias.json";
const COMMISSIONS = fixSchedules(getJSON(materiasJsonURL));
var userSel = getSelectedSubjects(userSubjectCodeSelection)

var comb = schedulerAlgorithm(subjects, userSelection, priorities);
console.log(comb)

