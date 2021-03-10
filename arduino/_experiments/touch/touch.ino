

#include <Wire.h>
#include "Adafruit_MPR121.h"

#ifndef _BV
#define _BV(bit) (1 << (bit))
#endif

// You can have up to 4 on one i2c bus but one is enough for testing!
Adafruit_MPR121 touchSensor = Adafruit_MPR121();

// Keeps track of the last pins touched
// so we know when buttons are 'released'
uint16_t lastTouched = 0;
uint16_t currTouched = 0;

const int plateUserA = 1;
const int plateUserB = 2;

const int paddleUserA = 3;
const int paddleUserB = 4;

bool isPlatesReady = false;
bool isPaddlesReady = false;
bool isReady = false;

void setup() {
  Serial.begin(115200);

  while (!Serial) { // needed to keep leonardo/micro from starting too fast!
    delay(10);
  }

  Serial.println("Adafruit MPR121 Capacitive Touch sensor test");

  // Default address is 0x5A, if tied to 3.3V its 0x5B
  // If tied to SDA its 0x5C and if SCL then 0x5D
  if (!touchSensor.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
    while (1);
  }
  Serial.println("MPR121 found!");
}

void loop() {
  // Get the currently touched pads
  currTouched = touchSensor.touched();

  for (uint8_t i = 0; i < 12; i++) {
    // it if *is* touched and *wasnt* touched before, alert!
    if ((currTouched & _BV(i)) && !(lastTouched & _BV(i)) ) {
      Serial.print(i); Serial.println(" touched");
    }
    // if it *was* touched and now *isnt*, alert!
    if (!(currTouched & _BV(i)) && (lastTouched & _BV(i)) ) {
      Serial.print(i); Serial.println(" released");
    }
  }

  // reset our state
  lastTouched = currTouched;

  // comment out this line for detailed data from the sensor!
  return;

  // debugging info, what
  Serial.print("\t\t\t\t\t\t\t\t\t\t\t\t\t 0x"); Serial.println(touchSensor.touched(), HEX);
  Serial.print("Filt: ");
  for (uint8_t i = 0; i < 12; i++) {
    Serial.print(touchSensor.filteredData(i)); Serial.print("\t");
  }
  Serial.println();
  Serial.print("Base: ");
  for (uint8_t i = 0; i < 12; i++) {
    Serial.print(touchSensor.baselineData(i)); Serial.print("\t");
  }
  Serial.println();

  // put a delay so it isn't overwhelming
  delay(100); // TODO: delays are bad for interrupts?
}

void updatePlates() {
  if (touchSensor.touched() & (1 << paddleUserA) & (1 << paddleUserB)) { // TODO: please explain '&' and '<<'
    isPlatesReady = true;
    Serial.println("isPlatesReady is " + isPlatesReady);
  } else if (touchSensor.touched() & (!(1 << paddleUserA) & (1 << paddleUserB)) || ((1 << paddleUserA) & !(1 << paddleUserB)) { 
    isPlatesReady = false
    Serial.println("isPlatesReady is " + isPlatesReady);
    Serial.println("Only 1 of 2 plates are touched.");
  } else {
    isPlatesReady = false;
    Serial.println("isPlatesReady is " + isPlatesReady);
  }
}

void updatePaddles() {
  if (touchSensor.touched() & (1 << plateUserA) & (1 << plateUserB)) { // TODO: please explain '&' and '<<'
    isPaddlesReady = true;
    Serial.println("isPaddlesReady is " + isPaddlesReady);
  } else if (touchSensor.touched() & (!(1 << plateUserA) & (1 << plateUserB)) || ((1 << plateUserA) & !(1 << plateUserB)) { 
    isPaddlesReady = false
    Serial.println("isPaddlesReady is " + isPaddlesReady);
    Serial.println("Only 1 of 2 plates are touched.");
  } else {
    isPaddlesReady = false;
    Serial.println("isPaddlesReady is " + isPaddlesReady);
  }
}

void updateState () {
  isReady = isPlatesReady && isPaddlesReady;
}
