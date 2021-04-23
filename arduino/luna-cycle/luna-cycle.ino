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

Adafruit_MPR121 MPR121 = Adafruit_MPR121();

const long capPlateInterval = 1000;
unsigned long prevCapTouchPlateUserA = 0;
unsigned long prevCapTouchPlateUserB = 0;

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 & 3

const long encoderPulseInterval = 1000;
unsigned long prevEncoderPulse = 0;

long encoder = 0;
long previousEncoder = 0;
int encoderDivisor = 3;

unsigned long timeStamp = 0;
unsigned long previousTimeStamp = 0;

bool isSpinning = false;

// a JSON object to hold the data to send:
JSONVar input;

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
  input["encoder"] = encoder;
  input["previousEncoder"] = previousEncoder;
  input["isUserA_touchingPlate"] = false;
  input["isUserB_touchingPlate"] = false;
  input["isSpinning"] = false;
  input["isSpinningFwd"] = false;
  input["isSpinningBkwd"] = false;
}

void loop() {
  timeStamp = millis();
  updatePlates();
  updateEncoder();
  sendInput();
}

void updatePlates() {
  if (MPR121.touched() & (1 << 0)) { // If capacitive sensor 0 is touched ...
    prevCapTouchPlateUserA = timeStamp;
  }
  input["isUserA_touchingPlate"] = timeStamp - prevCapTouchPlateUserA <= capPlateInterval;
  if (MPR121.touched() & (1 << 1)) { // If capacitive sensor 1 is touched ...
    prevCapTouchPlateUserB = timeStamp;
  }
  input["isUserB_touchingPlate"] = timeStamp - prevCapTouchPlateUserB <= capPlateInterval;
}

void updateEncoder() {
  encoder = ENCODER.read();
  encoder = round((encoder / 4) / encoderDivisor); // adjust encoder resolution // TODO: Consider reading encoder on CHANGE instead?
  if (encoder != previousEncoder) {
    prevEncoderPulse = timeStamp;
    input["encoder"] = encoder;
    input["previousEncoder"] = previousEncoder;
    input["isSpinningFwd"] = encoder > previousEncoder;
    input["isSpinningBkwd"] = encoder < previousEncoder;
    previousEncoder = encoder;
  }
//  previousEncoder = encoder;
  if (timeStamp - prevEncoderPulse <= encoderPulseInterval) { // TODO: this is true at boot!
    isSpinning = true; // TODO: how not to flip this boolean until after 1 interval from boot?
    input["isSpinning"] = isSpinning;
  } else {
    isSpinning = false;
    input["isSpinning"] = isSpinning;
    bool isSpinningFwd = false;
    input["isSpinningFwd"] = isSpinningFwd;
    bool isSpinningBkwd = false;
    input["isSpinningBkwd"] = isSpinningBkwd;
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

void sendInput() {
  Serial.println(input);
}
