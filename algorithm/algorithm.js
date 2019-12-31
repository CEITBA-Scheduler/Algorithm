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
 * @param   {Combination}               combination         Combination Object
 * @param   {Array of Priority}         priorities          Array of user's priorities
 * @param   {Array of SelectedSubjects} selectedSubjects    Selected Subjects with their name and weight
 * @param   {Callable}                  transform           Callback
 * @return   {Number}
 */
var computeWeight = function(combination, priorities, selectedSubjects, transform)
{
    // Execute the weight algorithm based on the given data an calculates the weight
    var weight = weightAlgorithm(priorities, combination.priorities, selectedSubjects, transform);

    // Saves the weight in the combination object
    combination.weight = weight;
}

/**
 * Calculates the corresponding weight for a combination with the given priorities
 * according to the user's priority and subject selection.
 * @param {Array of Priority}           priorities 
 * @param {Array of Priority's index}   combinationPriorities 
 * @param {Array of SelectedSubjects}   subjects 
 * @param {Callable}                    transform
 * @return {Number} Combination's weight
 */
var weightAlgorithm = function(priorities, combinationPriorities, subjects, transform)
{
    // 1°, calculate the base value for each priority amount
    let base = priorities.length * transform(priorities.length) * transform(subjects.length);

    // 2°, calculate the starting value for the amount of priorities of the combination
    let weight = base * combinationPriorities.length;

    // 3°, calculate the indexed value inside the range for the given amount of priorities
    let indexedWeight = 0;
    for (let index of combinationPriorities)
    {
        let currentPriority = priorities[index];
        if (currentPriority.relatedSubject === null || currentPriority.relatedSubject === undefined)
        {
            indexedWeight += transform(currentPriority.weight);
        }
        else
        {
            let currentSubject = subjects.find(subject => subject.name == currentPriority.relatedSubject);
            indexedWeight += ( transform(currentPriority.weight) * transform(currentSubject.weight) );
        }
        
    }

    // 4°, return the resulting value
    return weight + indexedWeight;
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
    // 1°, validate the format of the parameters and if something goes wrong, raise some message to notify the problem

    // 2°, run the combination algorithm to obtain all possible schedules and classify them by the criteria and priorities

    // 3°, compute for every combination its weight

    // 4°, run an ordering algorithm based on the previously calculated weight

    // 5°, return the result
}
