/*
  Attribution:
  - https://github.com/tigoe/html-for-conndev/blob/main/serialport/ArduinoSendJSON/ArduinoSendJSON.ino
*/

#include <Encoder.h>
#include <Arduino_JSON.h>

// Set input pins:
const int POT_PADDLE_USER_A = A0;
const int POT_PADDLE_USER_B = A1;
const int LED_PLATE_USER_A = 6;
const int LED_PLATE_USER_B = 7;
const int LED_PADDLE_USER_A = 8;
const int LED_PADDLE_USER_B = 9;
const int LED_LAMP_USER_A = 10;
const int LED_LAMP_USER_B = 11;

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 &

// variables to hold encoder values and capacitive touch states:
const long encoderPulseInterval = 1000;
unsigned long prevEncoderPulse = 0;
int encoderResolution = 10;

long encoder = -999;
long previousEncoder = -999;

bool isUserA_touchingPlate = false;
bool isUserB_touchingPlate = false;
bool isAandB_touchingPlates = false;

bool isSpinning = false;
bool isSpinningFwd = false;
bool isSpinningBkwd = false;

bool isGoTime = false;

bool isStateChanged = false;

// a JSON object to hold the data to send:
JSONVar state;

void setup() {
  // initialize serial and set input pin modes:
  Serial.begin(115200);

  // initialize values in JSON object:
  state["encoder"] = encoder;
  state["previousEncoder"] = previousEncoder;

  state["isUserA_touchingPlate"] = isUserA_touchingPlate;
  state["isUserB_touchingPlate"] = isUserB_touchingPlate;
  state["isAandB_touchingPlates"] = isAandB_touchingPlates;

  state["isSpinning"] = isSpinning;
  state["isSpinningFwd"] = isSpinningFwd;
  state["isSpinningBkwd"] = isSpinningBkwd;

  state["isGoTime"] = isGoTime;
}

void loop() {
  updateEncoder();
  updateState();
}

void updateEncoder() {
  encoder = ENCODER.read();
  // if encoder has changed:
  if (abs(encoder - previousEncoder) > encoderResolution) {
    state["encoder"] = encoder;
    state["previousEncoder"] = previousEncoder;
    // save encoder value for comparison next time:
    previousEncoder = encoder;
    // set change flag so serial will send:
    isStateChanged = true;
  }
}

void updateState() {
  // if anything has changed, send new data to the server:
  if (isStateChanged) {
    Serial.println(state);
    // clear the change flag:
    isStateChanged = false;
  }
}
