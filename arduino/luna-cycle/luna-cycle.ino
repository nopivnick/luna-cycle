/*
  Attribution:
  - https://github.com/tigoe/html-for-conndev/blob/main/serialport/ArduinoSendJSON/ArduinoSendJSON.ino
*/

#include "Adafruit_MPR121.h"
#include <Arduino_JSON.h>
#include <Encoder.h>
#include <Wire.h>

// Set input pins:
const int POT_PADDLE_USER_A = A0;
const int POT_PADDLE_USER_B = A1;
const int LED_PLATE_USER_A = 6;
const int LED_PLATE_USER_B = 7;
const int LED_PADDLE_USER_A = 8;
const int LED_PADDLE_USER_B = 9;
const int LED_LAMP_USER_A = 10;
const int LED_LAMP_USER_B = 11;

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

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 & 3

const long encoderPulseInterval = 1000;
unsigned long prevEncoderPulse = 0;
int encoderResolution = 10;

long encoder = 0;
long previousEncoder = 0;

unsigned long timeStamp = 0;
unsigned long previousTimeStamp = 0;

bool isUserA_touchingPlate = false;
bool isUserB_touchingPlate = false;
bool isAandB_touchingPlates = false;

bool isSpinning = false;
bool isSpinningFwd = false;
bool isSpinningBkwd = false;

bool isGoTime = false;

bool isTouchStrict = false;
bool isSpinStrict = true;

// a JSON object to hold the data to send:
JSONVar state;

void setup() {
  Serial.begin(115200);

  while (!Serial) { // needed to keep leonardo/micro from starting too fast!
    delay(10);
  }

  // Default MPR121 address is 0x5A, if tied to 3.3V its 0x5B
  // If tied to SDA its 0x5C and if SCL then 0x5D
  if (!MPR121.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
    while (1);
  }
  Serial.println("MPR121 found!");

  // initialize values in JSON object:
  state["encoder"] = encoder;
  state["previousEncoder"] = previousEncoder;

  state["isUserA_touchingPlate"] = isUserA_touchingPlate;
  state["isUserB_touchingPlate"] = isUserB_touchingPlate;
  state["isAandB_touchingPlates"] = isAandB_touchingPlates;

  state["isSpinning"] = isSpinning;
  state["isSpinningFwd"] = isSpinningFwd;
  state["isSpinningBkwd"] = isSpinningBkwd;

  //  state["isGoTime"] = isGoTime;
}

void loop() {
  timeStamp = millis();
  updateMPR121();
  updatePlates();
  updateEncoder();
  //  updateStatus();
  sendState();
}

void updateMPR121() {
  touchState = MPR121.touched(); // Get the currently touched pads
  for (uint8_t i = 0; i < 12; i++) {
    // it if *is* touched and *wasnt* touched before, alert!
    if ((touchState & _BV(i)) && !(prevTouchState & _BV(i)) ) {
      //      Serial.print(i); Serial.println(" touched");
    }
    // if it *was* touched and now *isnt*, alert!
    if (!(touchState & _BV(i)) && (prevTouchState & _BV(i)) ) {
      //      Serial.print(i); Serial.println(" released");
    }
  }
  prevTouchState = touchState; // Reset state
}

void updatePlates() {
  if (MPR121.touched() & (1 << 0)) { // If capacitive sensor 0 is touched ...
    prevCapTouchPlateUserA = timeStamp;
  }
  if (timeStamp - prevCapTouchPlateUserA <= capPlateInterval) { // ... and it's been less than a certain interval ...
    isUserA_touchingPlate = true; // ... user A is considered to be touching their plate.
    state["isUserA_touchingPlate"] = isUserA_touchingPlate;
  } else {
    isUserA_touchingPlate = false;
    state["isUserA_touchingPlate"] = isUserA_touchingPlate;
  }
  if (MPR121.touched() & (1 << 1)) { // If capacitive sensor 1 is touched ...
    prevCapTouchPlateUserB = timeStamp;
  }
  if (timeStamp - prevCapTouchPlateUserB <= capPlateInterval) { // ... and it's been less than a certain interval ...
    isUserB_touchingPlate = true; // ... user B is considered to be touching their plate.
    state["isUserB_touchingPlate"] = isUserB_touchingPlate;
  } else {
    isUserB_touchingPlate = false;
    state["isUserB_touchingPlate"] = isUserB_touchingPlate;
  }
  if (isUserA_touchingPlate && isUserB_touchingPlate) {
    isAandB_touchingPlates = true;
    state["isAandB_touchingPlates"] = isAandB_touchingPlates;
  } else {
    isAandB_touchingPlates = false;
    state["isAandB_touchingPlates"] = isAandB_touchingPlates;
  }
}

void updateEncoder() {
  encoder = ENCODER.read();
  encoder = (encoder / 4); // TODO: Consider reading encoder on CHANGE instead?
  if (encoder != previousEncoder) {
    prevEncoderPulse = timeStamp;
    if (encoder > previousEncoder) {
      bool isSpinningFwd = true;
      state["isSpinningFwd"] = isSpinningFwd;
      bool isSpinningBkwd = false;
      state["isSpinningBkwd"] = isSpinningBkwd;
    } else if (encoder < previousEncoder) {
      bool isSpinningFwd = false;
      state["isSpinningFwd"] = isSpinningFwd;
      bool isSpinningBkwd = true;
      state["isSpinningBkwd"] = isSpinningBkwd;
    }
    state["encoder"] = encoder;
    state["previousEncoder"] = previousEncoder;
    previousEncoder = encoder;
  }
  long encoderPulseIntervalStrict;
  if (isSpinStrict) {
    encoderPulseIntervalStrict = 100;
  } else {
    encoderPulseIntervalStrict = encoderPulseInterval;
  }
  //    Serial.print("isSpinStrict: "); Serial.println(isSpinStrict);
  //    Serial.print(isSpinningFwd); Serial.println(isSpinningBkwd);
  if (timeStamp - prevEncoderPulse <= encoderPulseIntervalStrict) { // TODO: this is true at boot!
    isSpinning = true; // TODO: how not to flip this boolean until after 1 interval from boot?
    state["isSpinning"] = isSpinning;
  } else {
    isSpinning = false;
    state["isSpinning"] = isSpinning;
    bool isSpinningFwd = false;
    state["isSpinningFwd"] = isSpinningFwd;
    bool isSpinningBkwd = false;
    state["isSpinningBkwd"] = isSpinningBkwd;
  }


  resetEncoder();
}

void resetEncoder() {
  if (Serial.available() > 0) {
    char input = Serial.read();
    if (input == 'r') {
      ENCODER.write(0);
    }
  }
}

void updateStatus() {
  isGoTime = isSpinning; // 1 Player w/ spinning
  isGoTime = isSpinning && isUserA_touchingPlate; // 1 Player w/ spinning + touch
  //  isGoTime = isAandB_touchingPlates && isSpinning; // 2 player
  if (isGoTime) {
  } else if (!isGoTime) {
  }
  state["isGoTime"] = isGoTime;
}

void sendState() {
  Serial.println(state);
}
