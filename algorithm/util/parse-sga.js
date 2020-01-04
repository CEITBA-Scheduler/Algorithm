var planJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/master/SGAjson/planM09.json";
var materiasJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/development/algorithm/test/materias.json";

// Returns object as specified by json file. URL points to raw text json file.
var getJSON = function (url)
{
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    request.responseText;
    return JSON.parse(request.responseText);
};

// Converts schedules to floats and eliminates useless properties. USAGE: const COMMISSIONS = fixSchedules(getJSON(materiasJsonURL));
var fixSchedules = function(commissions)
{
    for (let i in commissions.courseCommissions.courseCommission)
    {
        let listita = commissions.courseCommissions.courseCommission[i].courseCommissionTimes;
        if ( !Array.isArray(commissions.courseCommissions.courseCommission[i].courseCommissionTimes) && listita !== undefined )
        {
            listita = [listita];
        }
        for (let j in listita)
        {
            if (listita.length < 2)
            {
                let from = commissions.courseCommissions.courseCommission[i].courseCommissionTimes.hourFrom.split(":");
                let to = commissions.courseCommissions.courseCommission[i].courseCommissionTimes.hourTo.split(":");
                commissions.courseCommissions.courseCommission[i].courseCommissionTimes.hourFrom = parseFloat(from[0]) + parseFloat(from[1])/60.0;
                commissions.courseCommissions.courseCommission[i].courseCommissionTimes.hourTo = parseFloat(to[0]) + parseFloat(to[1])/60.0;
            } else
            {
                let from = commissions.courseCommissions.courseCommission[i].courseCommissionTimes[j].hourFrom.split(":");
                let to = commissions.courseCommissions.courseCommission[i].courseCommissionTimes[j].hourTo.split(":");
                commissions.courseCommissions.courseCommission[i].courseCommissionTimes[j].hourFrom = parseFloat(from[0]) + parseFloat(from[1])/60.0;
                commissions.courseCommissions.courseCommission[i].courseCommissionTimes[j].hourTo = parseFloat(to[0]) + parseFloat(to[1])/60.0;
            }
        }
    }
    return commissions.courseCommissions.courseCommission
};

/*
usersel = [
    {
        name : "Fisica",
        commissions: [
            COM,
            COM,
        ],
    }, {
        name: "Matematica",
        commissions : [
            COM,
            COM,
        ],
    },
];
 */
class subject {
    constructor(name,subjectCode) {
        this.name = name;
        this.subjectCode = subjectCode;
        this.commissions = [];
    }
}

// Makes array of subjects selected by user.
var getSelectedSubjects = function(userSubjectCodeSelection, commissions)
{
    let selectedSubjects = new Array(userSubjectCodeSelection.length);
    for (let commission of commissions)
    {
        let subjectIndex = userSubjectCodeSelection.findIndex(x => x.subjectCode === commission.subjectCode);
        if ( subjectIndex>-1 )
        {
            if (selectedSubjects[subjectIndex]===undefined)
            {
                selectedSubjects[subjectIndex] = new subject(commission.subjectName, commission.subjectCode);
            }
            selectedSubjects[subjectIndex].commissions.push(commission);
        }
    }
    return selectedSubjects;
};

// Converts array of commissions to array of subjects
var commissionsToSubjects = function (commissions)
{
    let subjects = [];
    let subjectCodes = [];
    for (let commission of commissions)
    {
        let subjectIndex = subjectCodes.findIndex(x => x === commission.subjectCode);
        if ( subjectIndex === -1 )
        {
            subjectCodes.push(commission.subjectCode);
            subjects.push( new subject(commission.subjectName, commission.subjectCode) );
            subjects[subjects.length-1].commissions.push(commission);
        } else {
            subjects[subjectIndex].commissions.push(commission);
        }

    }
    return subjects;
};