class Subject 
{
    constructor(name, code, search, commissions, priority)
    {
        this.name = name;
        this.code = code;
        this.search = search;
        this.commissions = commissions;
    }
}


class Timeblock
{
    constructor(building, day, start, end)
    {
        this.building = building;
        this.day = day;
        this.start = start;
        this.end = end;
    }
}


class Commission 
{
    constructor(name, enrolledStudents, professors, schedule) 
    {
        this.name = name;
        this.professors = professors;
        this.schedule = schedule;
    }
}