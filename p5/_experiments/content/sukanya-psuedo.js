import lunaCycle from './lunaCycle.js.js'

let tone = {
    bliss: "bliss",
    blah: "blah",
    bad: "bad"
}

let name = {
    Happy: "noah",
    Sad: "dumbo",
    Blah: String.repeat("moo", 100)
}

let snippets = {
    name : {
        bliss: ["noah", "sukanya"],
        blah: "pooh",
        bad: ""
    },
    animal: {
        happy: "monkey",
        sad: "element",
    }
}

function getString(tone) {
    return `hi ${name}, you look like ${animal}`
}

function scene1(tone) {
    return `
        <p> ${choose( lunaCycle.name[tone]) } </p> <span> </span>
    `
}

let tone = "bliss";

var elements = scene1(tone);