const WEEKNAMES = [
    {
        value: 0,
        aliases: ["domingo", "sunday"]
    },
    {
        value: 1,
        aliases: ["lunes", "monday"]
    },
    {
        value: 2,
        aliases: ["martes", "tuesday"]
    },
    {
        value: 3,
        aliases: ["miercoles", "wednesday", "miércoles"]
    },
    {
        value: 4,
        aliases: ["jueves", "thursday"]
    },
    {
        value: 5,
        aliases: ["viernes", "friday"]
    },
    {
        value: 6,
        aliases: ["sabado", "saturday", "sábado"]
    }
];

/**
 * Object with property value:number from 0 to 6 representing day of the week.
 * @Object
 */
export class Weekday {

    constructor(input) {
        switch(typeof(input))
        {
            case "number":
                var weeknameChosen = WEEKNAMES.find(weekname => weekname.value == input);
                
                this.value = weeknameChosen.value;
                this.aliases = weeknameChosen.aliases;
                break;
            case "string":
                for (let weekname of WEEKNAMES)
                {
                    for (let alias of weekname.aliases)
                    {
                        let weekIndex = alias.indexOf(input.toLowerCase());
                        if (weekIndex > -1)
                        {
                            this.value = weekname.value;
                            this.aliases = weekname.aliases;
                        }
                    }
                }
                break;
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
                name = this.aliases[0];
                break;
            case "en":
                name = this.aliases[1];
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
var day = null;

day = new Weekday("TUESDAY");
day.value = 2
console.log(day.Name("es"));

day = new Weekday("lunes");
day.value = 1;
console.log(day.Name("es"));

day = new Weekday(3);
day.value = 1;
console.log(day.Name("es"));
