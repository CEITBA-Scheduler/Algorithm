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


// Makes array of commissions selected by user.
var getSelectedSubjects = function(userSubjectCodeSelection)
{
    let userSelection = [];
    for (let commission of COMMISSIONS)
    {
        if ( userSubjectCodeSelection.includes(commission.subjectCode) )
        {
            userSelection.push(commission);
        }
    }
    return userSelection
};