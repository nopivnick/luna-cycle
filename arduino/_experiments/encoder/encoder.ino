#include <Encoder.h>

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 & 3

const long encoderPulseInterval = 1000;
unsigned long prevEncoderPulse = 0;

long encoder = -999;
long previousEncoder = -999;

unsigned long timeStamp = 0;
unsigned long previousTimeStamp = 0;

bool isSpinning = false;
bool isSpinningFwd = false;
bool isSpinningBkwd = false;
bool isGoTime = false;

void setup() {
  Serial.begin(115200);
  //  Serial.flush();
  //  delay(10);
  //  timeStamp = millis();
  //  prevEncoderPulse = millis();
  Serial.print(isSpinning);
  Serial.print(" ");
  Serial.println(isGoTime);
}

void loop() {
  timeStamp = millis();
  updateEncoder();
  updateState();
}

void updateEncoder() {
  encoder = ENCODER.read();
  long tempEncoder = (encoder / 4); // TODO: should this just be encoder = (encoder / 4)?
//  Serial.print(tempEncoder);
//  Serial.print(" ");
//  Serial.println(previousEncoder);
  if (tempEncoder != previousEncoder) {
    Serial.println(tempEncoder);
    prevEncoderPulse = timeStamp;
    if (tempEncoder > previousEncoder) {
      bool isSpinningFwd = true;
      bool isSpinningBkwd = false;
    } else if (tempEncoder < previousEncoder) {
      bool isSpinningFwd = false;
      bool isSpinningBkwd = true;
    }
    previousEncoder = tempEncoder;
  }
  if (timeStamp - prevEncoderPulse <= encoderPulseInterval) { // TODO: this is true at boot!
    isSpinning = true; // TODO: how not to flip this boolean until after 1 interval from boot?
    //    Serial.println("SPINNING!");
  } else {
    isSpinning = false;
    bool isSpinningFwd = false;
    bool isSpinningBkwd = false;
    //    Serial.println("NOT SPINNING!");
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

void updateState() {
  Serial.print(isSpinning);
  Serial.print(" ");
  Serial.println(isGoTime);
  isGoTime = isSpinning;
  if (isGoTime == true) {
    Serial.println("GO!");
  } else if (!isGoTime) {
    Serial.println("NO!");
  }
}
