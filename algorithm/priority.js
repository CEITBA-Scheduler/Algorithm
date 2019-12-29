class Priority 
{
    constructor(type, weight, isExclusive, value)
    {
        this.type = type;
        this.weight = weight;
        this.isExclusive = isExclusive;
        this.value = value;
    }
}


const PriorityType = {
    NONE: "none",
    COMMISSION: "commission",
    PROFESSOR: "professor",
    LOCATION: "location",
    BUSYTIME: "busytime",
    FREEDAY: "freeday",
    SUPERPOSITION: "superposition"
}
