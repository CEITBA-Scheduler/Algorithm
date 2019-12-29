/**
 * Searchs all possible combinations of schedules based on the given
 * subjects and their possible time tables.
 * @param   {Subject Object}        subjects    User's subjects
 * @param   {Callable}              verifier    Priority and Criteria verifier callback
 * @param   {Array of Combination}  combinations     
 * @returns {Array of Combination}      
 */
var searchCombinations = function(subjects, verifier, combinations)
{
    // TODO!
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
