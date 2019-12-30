// Priority Types
const PriorityType = {
    NONE: "none",
    COMMISSION: "commission",
    PROFESSOR: "professor",
    LOCATION: "location",
    BUSYTIME: "busytime",
    FREEDAY: "freeday",
    SUPERPOSITION: "superposition"
}


/**
 * Searchs all possible combinations of schedules based on the given
 * subjects and their possible time tables.
 * @param   {Subject Object}        subjects    User's subjects
 * @param   {Callable}              verifier    Priority and Criteria verifier callback
 * @param   {Combination}           combination     
 * @returns {Array of Combination}      
 */
var searchCombinations = function(subjects, verifier, combination = undefined)
{
    // When the function is first called, no combination has been generated, so
    // I need to create a default instance of this object
    if (combination === undefined)
    {
        combination = {
            weight: NaN,
            priorities: [],
            subjects: []
        };
    }

    // Checking if we still have more subjects to continue with the tree of
    // possible combinations
    if (subjects.length > 0)
    {
        // Pops a subject from the list of subjects and iterates over all possible
        // commissions creating for each a new possible combination on the tree
        var combinations = [];
        let nodeSubject = subjects.pop();
        let nodeCommissions = nodeSubject.commissions;

        for (let nodeCommission of nodeCommissions)
        {
            var newCombination = JSON.parse(JSON.stringify(combination));
            newCombination.subjects.push(
                {
                    name: nodeSubject.name,
                    commissionName: nodeCommission.commissionName,
                    teachers: nodeCommission.teachers,
                    commissionTimes: nodeCommission.commissionTimes
                }
            );

            // Get the new possible combinations for each commission case and concatenates them
            // with the current result of combinations
            var recursiveCombinations = searchCombinations(subjects.slice(), verifier, newCombination);
            combinations = combinations.concat(recursiveCombinations);
        }

        // Returns the possible combinations
        return combinations;
    }
    else
    {
        // When there are not subjects left, we have to check if the current combination created
        // is valid according to the criteria or priorities taken by the algorithm user...
        return verifier(combination) ? [combination] : [];
    }
}

/**
 *  Computes the ordering weight for a given combination based on the user's priorities
 *  and criteria selected.
 * @param   {Combination}           combination     Combination Bbject
 * @param   {Array of Priority}     priorities      Array of user's priorities
 * @param   {Number}
 */
var computeWeight = function(combination, priorities)
{
    return 0;       // TODO!
}

/**
 * Determines whether a combination verifies the criteria and priorities of the user or not,
 * and sets a internal weight calculated by the computeWeight function.
 * @param   {Combination}           combination     Combination Object
 * @param   {Array of Priority}     priorities      Array of user's priorities
 * @param   {Boolean}
 */
var verifiesPriorities = function(combination, priorities)
{
    return true;    // TODO!
}

/**
 * Computes all the possible combinations with the given subjects and their schedules,
 * ordering the solutions by the resulting weight computed from the priorities.
 * @param   {Array of Subject}          subjects            Array of all subjects
 * @param   {Array of Selections}       selectedSubjects    Array of the selections made by the user
 * @param   {Array of Priority}         priorities          Array of the user's priorities
 * @param   {Array of Combination}
 */
var schedulerAlgorithm = function(subjects, selectedSubjects, priorities)
{
    // TODO!
}
