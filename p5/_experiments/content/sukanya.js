const BLISS = 'bliss'
const BLAH = 'blah'
const BAD = 'bad'

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function scene1(mood) {
  const variables = {
    v1: { bliss: 'Delicate and otherworldly', blah: 'Large and clumsy', bad: 'Grotesque and shabby'},
    v2: { bliss: 'palm', blah: 'hand', bad: 'fist' },
    v3: { bliss: 'flaunt', blah: 'park', bad: 'foist'},
    v4: { bliss: 'marveled at', blah: 'pondered', 'bad': 'pitied'},
    v5: { bliss: 'pristine', blah: 'frayed', 'bad': 'torn'},
    v6: { bliss: 'demure', blah: 'shabby', 'bad': 'battered'},
    v7: { bliss: 'awkward reticence', blah: 'familiar disinterest', 'bad': 'forlorn resentment'},
    v8: { bliss: 'new found lovers', blah: 'steadfast partners', 'bad': 'lifelong counterparts'}
  }
  
  return [
    `They come while I write.`,
    
    `Actias luna.`,
    
    `${variables.v1[mood]}, big as your ${variables.v2[mood]}, they ${variables.v3[mood]} themselves on the window closest to the light 
    and pitter-patter against the glass with lime-green wings of paper and dust.`,
    
    `Do you remember?`,
    
    `That night we ${variables.v4[mood]} them, ${variables.v5[mood]} and ${variables.v6[mood]}, facing opposite directions with the ${variables.v7[mood]} of ${variables.v8[mood]}.`
  ]

}

console.log( scene1(BLISS) )

console.log( scene1(BLAH) )

console.log( scene1(BAD) )


function scene1WithHTML(mood) {
  const variables = {
    v1: { bliss: 'Delicate and otherworldly', blah: 'Large and clumsy', bad: 'Grotesque and shabby'},
    v2: { bliss: 'palm', blah: 'hand', bad: 'fist' },
    v3: { bliss: 'flaunt', blah: 'park', bad: 'foist'},
    v4: { bliss: 'marveled at', blah: 'pondered', 'bad': 'pitied'},
    v5: { bliss: 'pristine', blah: 'frayed', 'bad': 'torn'},
    v6: { bliss: 'demure', blah: 'shabby', 'bad': 'battered'},
    v7: { bliss: 'awkward reticence', blah: 'familiar disinterest', 'bad': 'forlorn resentment'},
    v8: { bliss: 'new found lovers', blah: 'steadfast partners', 'bad': 'lifelong counterparts'}
  }
  
  return [
    `<p>They come while I write.</p>`,
    
    `<p>Actias luna.</p>`,
    
    `<p>${variables.v1[mood]}, big as your ${variables.v2[mood]}, they ${variables.v3[mood]} themselves on the window closest to the light 
    and pitter-patter against the glass with lime-green wings of paper and dust.</p>`,
    
    `<p>Do you remember?</p>`,
    
    `<p>That night we ${variables.v4[mood]} them, ${variables.v5[mood]} and ${variables.v6[mood]}, facing opposite directions with the ${variables.v7[mood]} of ${variables.v8[mood]}.</p>`
  ].join('')

}

document.getElementById('scene1').innerHTML = scene1WithHTML(BLAH)