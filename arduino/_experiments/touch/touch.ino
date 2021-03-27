#include <Wire.h>
#include "Adafruit_MPR121.h"

#ifndef _BV
#define _BV(bit) (1 << (bit))
#endif

Adafruit_MPR121 MPR121 = Adafruit_MPR121();

// Keeps track of the last pins touched
// so we know when buttons are 'released'
uint16_t touchState = 0;
uint16_t prevTouchState = 0;

const long capPlateInterval = 1000;
unsigned long prevCapTouchPlateUserA = 0;
unsigned long prevCapTouchPlateUserB = 0;

unsigned long timeStamp = 0;
unsigned long previousTimeStamp = 0;

bool isUserA_touchingPlate = false;
bool isUserB_touchingPlate = false;
bool isAandB_touchingPlates = false;
bool isGoTime = false;

void setup() {
  Serial.begin(115200);

  while (!Serial) { // needed to keep leonardo/micro from starting too fast!
    delay(10);
  }

  Serial.println("Adafruit MPR121 Capacitive Touch sensor test");

  // Default address is 0x5A, if tied to 3.3V its 0x5B
  // If tied to SDA its 0x5C and if SCL then 0x5D
  if (!MPR121.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
    while (1);
  }
  Serial.println("MPR121 found!");
}

void loop() {
  timeStamp = millis();
  updateMPR121();
  updatePlates();
  updateState();
}

void updateMPR121() {
  touchState = MPR121.touched(); // Get the currently touched pads
  for (uint8_t i = 0; i < 12; i++) {
    // it if *is* touched and *wasnt* touched before, alert!
    if ((touchState & _BV(i)) && !(prevTouchState & _BV(i)) ) {
      Serial.print(i); Serial.println(" touched");
    }
    // if it *was* touched and now *isnt*, alert!
    if (!(touchState & _BV(i)) && (prevTouchState & _BV(i)) ) {
      Serial.print(i); Serial.println(" released");
    }
  }
  prevTouchState = touchState; // Reset state
}

void updatePlates() {
  if (MPR121.touched() & (1 << 0)) { // If capacitive sensor 0 is touched ...
    prevCapTouchPlateUserA = timeStamp;
    //    Serial.println(prevCapTouchPlateUserA);
  }
  if (timeStamp - prevCapTouchPlateUserA <= capPlateInterval) { // ... and it's been less than a certain interval ...
    isUserA_touchingPlate = true; // ... user A is considered to be touching their plate.
//    Serial.print("isUserA_touchingPlate is ");
//    Serial.println(isUserA_touchingPlate);
  } else {
    isUserA_touchingPlate = false;
//    Serial.print("isUserA_touchingPlate is ");
//    Serial.println(isUserA_touchingPlate);
  }
  if (MPR121.touched() & (1 << 1)) { // If capacitive sensor 1 is touched ...
    prevCapTouchPlateUserB = timeStamp;
    //    Serial.println(prevCapTouchPlateUserB);
  }
  if (timeStamp - prevCapTouchPlateUserB <= capPlateInterval) { // ... and it's been less than a certain interval ...
    isUserB_touchingPlate = true; // ... user B is considered to be touching their plate.
    //    Serial.print("isUserB_touchingPlate is ");
    //    Serial.println(isUserB_touchingPlate);
  } else {
    isUserB_touchingPlate = false;
    //    Serial.print("isUserB_touchingPlate is ");
    //    Serial.println(isUserB_touchingPlate);
  }
  if (isUserA_touchingPlate && isUserB_touchingPlate) {
    isAandB_touchingPlates = true;
    //    Serial.println("Both plates are touched!");
  } else {
    isAandB_touchingPlates = false;
  }
}

void updateState() {
  isGoTime = isAandB_touchingPlates;
  if (isGoTime) {
    Serial.println("GO!");
  } else if (!isGoTime) {
    Serial.println("NO!");
  }
}
