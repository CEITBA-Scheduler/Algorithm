var planJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/master/SGAjson/planM09.json";
var materiasJsonURL = "https://raw.githubusercontent.com/CEITBA-Scheduler/Algorithm/master/SGAjson/materias.json";

var getJSON = function (url)
{
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    request.responseText;
    return JSON.parse(request.responseText);

};

var fixSchedules = function(commissions)
{
    for (let i in commissions.courseCommissions.courseCommission)
    {
        let listita = commissions.courseCommissions.courseCommission[i].courseCommissionTimes;
        if ( !Array.isArray(commissions.courseCommissions.courseCommission[i].courseCommissionTimes) )
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
    return commissions
};

var MATERIAS = getJSON(materiasJsonURL);

const MAT = fixSchedules(MATERIAS);



var fisica = {
    name: "Fisica",
    commissions: [
        {
            commissionName: "A",
            teachers: [
                "Rinaldi"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Miercoles",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                }
            ]
        },
        {
            commissionName: "B",
            teachers: [
                "Medus"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 10.00,
                    hourTo: 12.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 14.00,
                    hourTo: 16.00
                }
            ]
        },
        {
            commissionName: "C",
            teachers: [
                "Dellelis"
            ],
            commissionTimes: [
                {
                    day: "Martes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Sabados",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                }
            ]
        }
    ]
};

var matematica = {
    name: "Matematica",
    commissions: [
        {
            commissionName: "A",
            teachers: [
                "Rinaldi"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 8.0,
                    hourTo: 10.0
                },
                {
                    day: "Miercoles",
                    building: "Puerto Madero",
                    hourFrom: 8.0,
                    hourTo: 10.0
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 8.0,
                    hourTo: 10.00
                }
            ]
        },
        {
            commissionName: "B",
            teachers: [
                "Medus"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 10.00,
                    hourTo: 12.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 14.00,
                    hourTo: 16.00
                }
            ]
        },
        {
            commissionName: "C",
            teachers: [
                "Dellelis"
            ],
            commissionTimes: [
                {
                    day: "Martes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Sabados",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                }
            ]
        }
    ]
};

var programacion = {
    name: "Programacion",
    commissions: [
        {
            commissionName: "A",
            teachers: [
                "Rinaldi"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Miercoles",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                }
            ]
        },
        {
            commissionName: "B",
            teachers: [
                "Medus"
            ],
            commissionTimes: [
                {
                    day: "Lunes",
                    building: "Puerto Madero",
                    hourFrom: 10.00,
                    hourTo: 12.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Viernes",
                    building: "Puerto Madero",
                    hourFrom: 14.00,
                    hourTo: 16.00
                }
            ]
        },
        {
            commissionName: "C",
            teachers: [
                "Dellelis"
            ],
            commissionTimes: [
                {
                    day: "Martes",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Jueves",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                },
                {
                    day: "Sabados",
                    building: "Puerto Madero",
                    hourFrom: 8.00,
                    hourTo: 10.00
                }
            ]
        }
    ]
};

var subjects = [
    fisica,
    matematica,
    programacion
];