var priorities = [
    {
        type: "professor",
        weight: 3,
        relatedSubjectCode: "93.41", // Fisica I
        isExclusive: false,
        value: "R. Dellelis",
    },
    {
        type: "commission",
        weight: 1,
        relatedSubjectCode: "93.41", // Fisica I
        isExclusive: false,
        value: "A",
    },
    {
        type: "freeday",
        weight: 2,
        relatedSubjectCode: null,
        isExclusive: false,
        value: "Lunes",
    },
    {
        type: "busytime",
        weight: 2,
        relatedSubjectCode: null,
        isExclusive: false,
        value: {
            day:"Lunes", // con mayusculas o minusculas?
            hourFrom: 8.,
            hourTo: 11.5,
        },
    },
    {
        type: "location",
        weight: 2,
        relatedSubjectCode: null, //Mejor si se setea por clase o general?
        isExclusive: false,
        value: "Madero"
    },
];


var combinationPriorities = [0, 1];

var transform = function(value)
{
    return value * 10;
}

