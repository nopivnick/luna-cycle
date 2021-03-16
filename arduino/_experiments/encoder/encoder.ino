#include <Encoder.h>

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 & 3

void setup() {
  Serial.begin(115200);
}

const long encoderPulseInterval = 1000;
unsigned long prevEncoderPulse = 0;

long encoder = -999;
long previousEncoder = -999;

unsigned long timeStamp = 0;
unsigned long previousTimeStamp = 0;

bool isSpinning = false;
bool isGoTime = false;

void loop() {
  timeStamp = millis();
  updateEncoder();
  updateState();
}

void updateEncoder() {
  encoder = ENCODER.read();
  long tempEncoder = (encoder / 4);
  if (tempEncoder != previousEncoder) {
    Serial.println(tempEncoder);
    prevEncoderPulse = timeStamp;
    previousEncoder = tempEncoder;
  }
  if (timeStamp - prevEncoderPulse <= encoderPulseInterval) {
    isSpinning = true;
    //    Serial.println("SPINNING!");
  } else {
    isSpinning = false;
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
  isGoTime = isSpinning;
  if (isGoTime == true) {
    Serial.println("GO!");
  } else if (!isGoTime) {
    Serial.println("NO!");
  }
}
