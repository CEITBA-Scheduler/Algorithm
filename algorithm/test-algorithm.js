var priorities = [
    {
        type: "professor",
        weight: 3,
        relatedSubject: "Fisica",
        isExclusive: false,
        value: "R. Dellelis",
    },
    {
        type: "commission",
        weight: 1,
        relatedSubject: "Fisica",
        isExclusive: false,
        value: "A",
    },
    {
        type: "freeday",
        weight: 2,
        relatedSubject: null,
        isExclusive: false,
        value: "Lunes",
    },
    {
        type: "busytime",
        weight: 2,
        relatedSubject: null,
        isExclusive: false,
        value: {
            day:"Miercoles",
            hourFrom: 8.,
            hourTo: 11.5,
        },
    }
];

var userSelection = [
    {
        name: "Fisica",
        weight: 1,
    }
];

var combinationPriorities = [0, 1];

var transform = function(value)
{
    return value * 10;
}

