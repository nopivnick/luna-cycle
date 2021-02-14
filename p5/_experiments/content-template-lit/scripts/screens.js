function setupScreen0(tone) {
  const snips = {
    s1: {
      bliss: 'Delicate and otherworldly',
      blah: 'Large and clumsy',
      bad: 'Grotesque and shabby'
    },
    s2: {
      bliss: 'palm',
      blah: 'hand',
      bad: 'fist'
    },
    s3: {
      bliss: 'flaunt',
      blah: 'park',
      bad: 'foist'
    },
    s4: {
      bliss: 'marveled at',
      blah: 'pondered',
      bad: 'pitied'
    },
    s5: {
      bliss: 'pristine',
      blah: 'frayed',
      bad: 'torn'
    },
    s6: {
      bliss: 'demure',
      blah: 'shabby',
      bad: 'battered'
    },
    s7: {
      bliss: 'awkward reticence',
      blah: 'familiar disinterest',
      bad: 'forlorn resentment'
    },
    s8: {
      bliss: 'new found lovers',
      blah: 'steadfast partners',
      bad: 'lifelong counterparts'
    }
  }

  return [

    `They come while I write.`,

    `Actias luna.`,

    `${snips.s1[tone]}, big as your ${snips.s2[tone]}, they ${snips.s3[tone]} themselves on the window closest to the light and pitter-patter against the glass with lime-green wings of paper and dust.`,

    `Do you remember?`,

    `That night we ${snips.s4[tone]} them, ${snips.s5[tone]} and ${snips.s6[tone]}, facing opposite directions with the ${snips.s7[tone]} of ${snips.s8[tone]}.`

  ]

}

function setupScreen0HTML(tone) {
  const snips = {
    s1: {
      bliss: 'Delicate and otherworldly',
      blah: 'Large and clumsy',
      bad: 'Grotesque and shabby'
    },
    s2: {
      bliss: 'palm',
      blah: 'hand',
      bad: 'fist'
    },
    s3: {
      bliss: 'flaunt',
      blah: 'park',
      bad: 'foist'
    },
    s4: {
      bliss: 'marveled at',
      blah: 'pondered',
      bad: 'pitied'
    },
    s5: {
      bliss: 'pristine',
      blah: 'frayed',
      bad: 'torn'
    },
    s6: {
      bliss: 'demure',
      blah: 'shabby',
      bad: 'battered'
    },
    s7: {
      bliss: 'awkward reticence',
      blah: 'familiar disinterest',
      bad: 'forlorn resentment'
    },
    s8: {
      bliss: 'new found lovers',
      blah: 'steadfast partners',
      bad: 'lifelong counterparts'
    }
  }

  return [

    `<p>
    They come while I write.
    </p>`,

    `<p>
    Actias luna.
    </p>`,

    `<p>
    ${snips.s1[tone]}, big as your ${snips.s2[tone]}, they ${snips.s3[tone]} themselves on the window closest to the light and pitter-patter against the glass with lime-green wings of paper and dust.
    </p>`,

    `<p class="messages message message-sent">
    Do you remember?
    </p>`,

    `<p>
    That night we ${snips.s4[tone]} them, ${snips.s5[tone]} and ${snips.s6[tone]}, facing opposite directions with the ${snips.s7[tone]} of ${snips.s8[tone]}.
    </p>`

  ].join('')

}

function setupScreen1HTML(tone) {
  const snips = {
    s0: {
      bliss: "thrilling",
      blah: "eerie",
      bad: "irksome"
    }
  }
  return [

    `<p>
    I've just closed the laptop lid when the screen on my phone grows bright.
    </p>`,

    `<p>
    It's ${snips.s0[tone]} how you always seem to know.
    </p>`

  ].join('')
}

function setupScreen2HTML(tone) {
  const snips = {
    s0: {
      bliss: "come effortlessly",
      blah: "feel tired",
      bad: "seem scripted"
    }
  }

  return [

    `<p>
    We speak in text.
    </p>`,

    `<p>
    And yet, you can't help but feel these words ${snips.s0[tone]} as you type them on the screen:
    </p>`,

    `<p class="messages message message-recd">
    Are you awake?
    </p>`,

    `<p class="messages message message-sent">
    Yes.
    </p>`

  ].join('')
}

function setupScreen3HTML(tone) {
  const snips = {
    s0: {
      bliss: "I don't yet know.",
      blah: "I'm no longer sure.",
      bad: "I prefer not to say."
    }
  }

  return [
    `<p>
    I confess I've been writing you.
    </p>`,

    `<p class="messages message message-recd">
    What have you written?
    </p>`,

    `<p>
    ${snips.s0[tone]}
    </p>`
  ].join('')
}

function setupScreen4HTML(tone) {
  const snips = {
    s0: {
      bliss: "Yes, of course.",
      blah: "Perhaps when it's done.",
      bad: "I think it best you don't."
    }
  }

  return [

    `<p>
    Though I'm fairly certain you meant specifically what about you.
    </p>`,

    `<p class= "messages message message-sent">
    Will I get to see it?
    </p>`,

    `<p>
    ${snips.s0[tone]}
    </p>`

  ].join('')
}

function setupScreen5HTML(tone) {
  const snips = {

  }

  return [

    `<p>
    You are so very far away.
    </p>`,

    `<p>
    I ask if you will come.
    </p>`

  ].join('')
}

function setupScreen6HTML(tone) {
  const snips = {

  }

  return [

    `<p class="messages message message-sent">
    Are you close?
    </p>`,

    `<p class="messages message message-recd">
    Not yet.
    </p>`,

    `<p>
    And so I wait and ask again.
    </p>`

  ].join('')
}

function setupScreen7HTML(tone) {
  const snips = {

  }

  return [

    `<p class="messages message message-sent">
    Are you close?
    </p>`,

    `<p class="messages message message-recd">
    Still not yet.
    </p>`,

    `<p>
    So I wait longer still.
    </p>`,

    `<p>
    Again I ask.
    </p>`

  ].join('')
}

function setupScreen8HTML(tone) {
  const snips = {
    s0: {
      bliss: "hold my breath",
      blah: "rouse myself",
      bad: "brace myself"
    }
  }

  return [

    `<p class="messages message message-sent">
    Are you close now?
    </p>`,

    `<p class="messages message message-recd">
    Yes, I'm close.
    </p>`,

    `<p>
    I ${snips.s0[tone]} and listen for the sound of your arrival.
    </p>`

  ].join('')
}

function setupScreen9HTML(tone) {
  const snips = {
    s0: {
      bliss: "Miraculous, daylight",
      blah: "Predictably, street light",
      bad: "Inevitably, lightning"
    },
    s1: {
      bliss: "horizon",
      blah: "driveway",
      bad: "horizon"
    },
    s2: {
      bliss: "The garble of birdsong. Auspicious. Emergent.",
      blah: "The call of coydogs. Shrill. Unnerving.",
      bad: "The grumble of thunder. Ominous. Imminent."
    },
    s3: {
      bliss: "space",
      blah: "moments",
      bad: "distance"
    },
    s4: {
      bliss: "grows smaller",
      blah: "grow fewer",
      bad: "grows larger"
    },
    s5: {
      bliss: "Warmer.",
      blah: "Shorter.",
      bad: "Colder."
    }
  }

  return [

    `<p>
    ${snips.s0[tone]} shows itself just beyond the ${snips.s1[tone]}.
    </p>`,

    `<p>
    ${snips.s2[tone]}
    </p>`,

    `<p>
    The ${snips.s3[tone]} between us ${snips.s4[tone]}.
    </p>`,

    `<p>
    ${snips.s5[tone]}
    </p>`

  ].join('')
}

function setupScreen10HTML(tone) {
  const snips = {

  }

  return [
    
    `<p>
    And you wonder whether it's possible to go on like this forever.
    </p>`
    
  ].join('')
}