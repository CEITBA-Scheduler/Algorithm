
let weeknames = [
    {
        value: 0,
        aliases: ["domingo","sunday"]
    },{
        value: 1,
        aliases: ["lunes","monday"]
    },{
        value: 2,
        aliases: ["martes","tuesday"]
    },{
        value: 3,
        aliases: ["miércoles","wednesday","miercoles"]
    },{
        value: 4,
        aliases: ["jueves","thursday"]
    },{
        value: 5,
        aliases: ["viernes","friday"]
    },{
        value: 6,
        aliases: ["sábado","saturday","sabado"]
    },
];

/**
 * Object with property value:number from 0 to 6 representing day of the week.
 * @Object
 */
export class weekday {
    constructor(input) {
        for (let weekday of weeknames)
        {
            for (let alias of weekday.aliases)
            {
                let weekIndex = alias.indexOf(input.toLowerCase());
                if (weekIndex>-1)
                {
                    this.value = weekday.value;
                }
            }
        }
    }
    /**
     * Takes a string token for language and returns lower case name of weekday in said language.
     * @param lang          string token, "en" for english, "es" for spanish
     * @returns {string}
     */
    name(lang) {
        lang = lang.trim();
        let name = "";
        switch (lang.toLowerCase()) {
            case "es":
                name = weeknames[this.value].aliases[0];
                break;
            case "en":
                name = weeknames[this.value].aliases[1];
                break;
        }
        return name
    }
    /**
     * Takes a string token for language and returns capitalized name of weekday in said language.
     * @param lang          string token, "en" for english, "es" for spanish
     * @returns {string}
     */
    Name(lang) {
        return capitalizeFirstLetter(this.name(lang));
    }
}

let capitalizeFirstLetter = function(phrase)
{
    return phrase.replace(/^\w/, c => c.toUpperCase());
};

// Example of uses:
// let day = new weekday("TUESDAY");
//>> day.value = 2
//>> day.Name("es") = "Martes"

// let day = new weekday("lunes");
//>> day.value = 1
//>> day.Name("es") = "Lunes"

