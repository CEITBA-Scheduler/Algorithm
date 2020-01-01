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
    "use strict";

    // First verification is by superposition.
    // This is an exclusive condition!

    // MAXSUPERPOSITION limits the amount of superposition between two and only two subjects. EXCLUSIVE CONDITION!
    const MAXSUPERPOSITION = 1.0; // in hours

    let totalSuperposition = 0.0;
    let numberOfSuperpositions = 0;
    for (let i in combination.subjects)
    {
        for (let j=i+1; j < combination.subjects.length; j++) // loop avoids redundant superpositions between subjects
        {
            for (let currentTime1 of combination.subjects[i].commissionTimes)
            {
                for (let currentTime2 of combination.subjects[j].commissionTimes)
                {
                    let superposition = getSuperposition(currentTime1,currentTime2)
                    if (superposition>0.0)
                    {
                        totalSuperposition += superposition;
                        numberOfSuperpositions++;
                        if (superposition > MAXSUPERPOSITION)
                        {
                            return false // Our combination is too superposed
                        }
                    }
                }
            }
        }
    }
    // Next verification is our non-exclusive priorities
    // First we assign a priorities property to combination if it does not already have one
    if (!combination.hasOwnProperty("priorities")) {combination.priorities = [];} // property check

    for (let index in priorities)
    {
        let currentPriority = priorities[index];
        switch (currentPriority.type) {
            case PriorityType.COMMISSION:
                for (let currentCommission of combination.subjects)
                {
                    if (currentCommission.name !== currentPriority.relatedSubject || currentCommission.commissionName !== currentPriority.value)
                    {
                        continue;
                    }
                    combination.priorities.push(index);
                    break;
                }
                break;
            case PriorityType.PROFESSOR:
                for (let currentCommission of combination.subjects)
                {
                    if (currentCommission.name === currentPriority.relatedSubject)
                    {
                        for (let currentTeacher of currentCommission.teachers)
                        {
                            if (currentTeacher !== currentPriority.value)
                            {
                                continue;
                            }
                            combination.priorities.push(index);
                            break;
                        }
                    }
                    break;
                }
                break;
            case PriorityType.FREEDAY:
                let isFreeDay = true; // All days are freeDays until proven otherwise
                for (let currentCommission of combination.subjects)
                {
                    for (let currentTime of currentCommission.commissionTimes)
                    {
                        if (currentTime.day === currentPriority.value)
                        {
                            isFreeDay = false; // If we find a schedule on our freeday it is NOT a priority
                            break;
                        }
                    }
                    if (!isFreeDay){break;} // This line is to optimize code. Not entirely necessary
                }
                if (isFreeDay)
                {
                    combination.priorities.push(index);
                }
                break;
            case PriorityType.BUSYTIME:
                let isBusyCombination = false; // All combinations comply with busyTime until proven otherwise
                for (let currentCommission of combination.subjects)
                {
                    for (let currentTime of currentCommission.commissionTimes)
                    {
                        let superposition = getSuperposition(currentTime, currentPriority.value);
                        if (superposition > 0.0)
                        {
                            isBusyCombination = true; // Combination does not comply with priority
                            break;
                        }
                    }
                    if (isBusyCombination) {break;} // optimization. Can be removed
                }
                if (!isBusyCombination) // If we do not find commissions on busyTime, we add priority
                {
                    combination.priorities.push(index);
                }
                break;
            case PriorityType.SUPERPOSITION:
                console.log("Not yet implemented!")  // TODO!
                break;
        }
    }
    return true;
}

/**
 * Checks time superposition between two or more schedules and returns an array whose
 * elements are the amount of superposed hours for each incident.
 * @param {...Objects}    schedules (THIS COULD BE ARRAY TOO)
 * @returns {Array}       superpositions   If empty then no superpositions detected
 */
var findSuperpositions = function(...schedules) {
    return [];
}

/**
 * Checks time superposition between two schedules and returns
 * amount of superposed hours. Requires 24 hour scheme.
 * @param {Object}    schedule1       Both must have hourTo and hourFrom properties
 * @param {Object}    schedule2
 * @returns {Number}  superposition   If 0 then no superposition detected
 */
var getSuperposition = function(schedule1, schedule2) {
    if (schedule1.day !== schedule2.day) // first check is day coincide
    {
        return 0.0
    }

    let duration1 = schedule1.hourTo - schedule1.hourFrom; // these variables shorten ternary expressions
    let duration2 = schedule2.hourTo - schedule2.hourFrom;
    if (schedule1.hourFrom >= schedule2.hourFrom && schedule1.hourFrom < schedule2.hourTo )
    {
       return schedule1.hourTo <= schedule2.hourTo ? duration1 : duration1 - schedule1.hourTo + schedule2.hourTo ;
    }
    if (schedule2.hourFrom >= schedule1.hourFrom && schedule2.hourFrom < schedule1.hourTo )
    {
        return schedule2.hourTo <= schedule1.hourTo ? duration2 : duration2 - schedule2.hourTo + schedule1.hourTo ;
    }
    return 0.0
}

/**
 * Orders an array with the quick sort algorithm, and because it can be used to order an array
 * with numbers, a function is provided to determine how to get the corresponding weight of each element
 * when its an array of objects.
 * @param {Array of Object} array 
 * @param {Index}           left 
 * @param {Index}           right
 * @param {Callable}        get         Determines how to get the weight from the current element
 * @param {Callable}        condition   Determines the condition of swaping when creating the partition
 * @returns {Ordered array}
 */
var quicksort = function(array, left, right, get = function(element) { return element; }, condition = function(current, pivot) { return current > pivot; })
{
    var swap = function(array, one, two)
    {
        let auxiliar = array[one];
        array[one] = array[two];
        array[two] = auxiliar;
    }
    
    var partition = function(array, left, right, pivot)
    {
        let partitionIndex = pivot;
        let pivotValue = get(array[pivot]);
        for (let i = left ; i <= right ; i++)
        {
            let currentValue = get(array[i]);
            if ( condition(currentValue, pivotValue) )
            {
                while (partitionIndex > i)
                {
                    partitionIndex -= 1;
                    let swapingValue = get(array[partitionIndex]);
                    if ( !condition(swapingValue, pivotValue) )
                    {
                        swap(array, i, partitionIndex);
                        break;
                    }
                }

                if (partitionIndex <= i)
                {
                    swap(array, pivot, partitionIndex);
                    break;
                }
            }
        }

        return partitionIndex;
    }

    if (left < right)
    {
        // Choose a pivot value and creates both partitions of the array, ordering with the given condition
        let partitionIndex = partition(array, left, right, right);

        // Swaps the partition and the pivot values and calls recursively to the quicksort function on both partitions
        quicksort(array, left, partitionIndex - 1, get, condition);
        quicksort(array, partitionIndex + 1, right, get, condition);
    }

    return array;
}

/**
 * Validates the format of the subject returning true if everything is ok. When there is an error,
 * an error message should be sent to the console with its description.
 * @param  {Array of Subject} subjects
 * @return {Boolean} 
 */
var validateSubjects = function(subjects)
{
    // TODO!
}

/**
 * Validates the format of the selected subject returning true if everything is ok. When there is an error,
 * an error message should be sent to the console with its description.
 * @param {Array of Subject}            subjects 
 * @param {Array of SelectedSubject}    selectedSubjects 
 * @param {Boolean}
 */
var validateSelectedSubjects = function(subjects, selectedSubjects)
{
    // TODO!
}

/**
 * Validates the format of the priorities returning true if everything is ok. When there is an error,
 * an error message should be sent to the console with its description.
 * @param {Array of Subject}    subjects 
 * @param {Array of Priorities} priorities 
 */
var validatePriorities = function(subjects, priorities)
{
    // TODO!
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
    if( validateSubjects(subjects) && validatePriorities(subjects, priorities) && validateSelectedSubjects(subjects, selectedSubjects) )
    {
        return null;
    }
    else
    {
        // 2°, run the combination algorithm to obtain all possible schedules and classify them by the criteria and priorities
        let chosenSubjects = [];
        for (let selectedSubject of selectedSubjects)
        {
            let subject = subjects.find(subject => subject.name == selectedSubject.name);
            chosenSubjects.push(subject);
        }
        let verifier = function(combination) { return verifiesPriorities(combination, priorities); }
        let combinations = searchCombinations(chosenSubjects, verifier);

        // 3°, compute for every combination its weight, starting with a simple linear transformation... could be changed!
        let transformation = function(value)
        {
            const SLOPE = 10;
            return value * SLOPE;
        }

        for (let combination of combinations)
        {
            computeWeight(combination, priorities, selectedSubjects, transformation);
        }

        // 4°, run an ordering algorithm based on the previously calculated weight
        combinations = quicksort(
            combinations, 
            0, combinations.length - 1, 
            function(combination) { return combination.weight; }, 
            function(current, pivot) { return current < pivot; }
        );

        // 5°, return the result
        return combinations;
    }
}


