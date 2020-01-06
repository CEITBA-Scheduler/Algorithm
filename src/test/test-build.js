// Purpose of this file is to be run automatically and debugged by Pato's IDE

let weeknames = [
    {
        value: 0,
        aliases: ["domingo","sunday"]
    },{
        value: 1,
        aliases: ["lunes","monday"]
    },{
        value: 2,
        aliases: ["martes","tuesday"]
    },{
        value: 3,
        aliases: ["miércoles","wednesday","miercoles"]
    },{
        value: 4,
        aliases: ["jueves","thursday"]
    },{
        value: 5,
        aliases: ["viernes","friday"]
    },{
        value: 6,
        aliases: ["sábado","saturday","sabado"]
    },
];

// Primer Cuatrimestre Mecánica

var mechanicSubjectCodeSelection = [
    {
        subjectCode: "31.08", // Sistemas de representación
        weight: 5
    }, {
        subjectCode: "93.17", // Matemática I
        weight: 4
    },{
        subjectCode: "93.18", // Álgebra Lineal
        weight: 1
    }, {
        subjectCode: "12.01", // Química I
        weight: 2
    }, {
        subjectCode: "94.21", // Formación General I
        weight: 3
    },
];

// Primer Cuatrimestre Industrial
var industrialSubjectCodeSelection = [
    {
        subjectCode: "31.08", // Sistemas de representación
        weight: 4
    },{
        subjectCode: "93.17", // Matemática I
        weight: 5
    }, {
        subjectCode: "93.18", // Álgebra Lineal
        weight: 3
    }, {
        subjectCode: "12.01", // Química I
        weight: 2
    }, {
        subjectCode: "71.55", // Informática General
        weight: 1
    },
];

var testSubjectCodeSelection = [
    {
        subjectCode: "31.08", // Sistemas de representación
        weight: 4
    }, {
        subjectCode: "94.21", // Formación General I
        weight: 3
    }, {
        subjectCode: "12.01", // Química I
        weight: 2
    }, {
        subjectCode: "93.18", // Álgebra Lineal
        weight: 3
    },
];

var materiasJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/development/algorithm/test/materias.json";
const COMMISSIONS = fixSchedules(getJSON(materiasJsonURL));
const SUBJECTS = commissionsToSubjects(COMMISSIONS);

var userSel = getSelectedSubjects(testSubjectCodeSelection, COMMISSIONS);
// old way
// var comb = schedulerAlgorithm(subjects, userSelection, priorities);
// new way
const comb = schedulerAlgorithm(SUBJECTS, userSel, priorities);

console.log(comb)

