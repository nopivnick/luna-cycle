#include <Encoder.h>

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder ENCODER(2, 3); // Interrupt pins on the UNO are 2 & 3

//const int ENCODER_BUTTON = 4;
//int encoderButtonState = 0;

void setup() {
  Serial.begin(115200);
//  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.println("Basic Encoder Test:");
}

long previousEncoder = -999;

void loop() {
  long encoder = ENCODER.read();
  long tempEncoder = (encoder / 4);
  if (tempEncoder != previousEncoder) {
    previousEncoder = tempEncoder;
    Serial.println(tempEncoder);
  }
  if (Serial.available() > 0) {
    char input = Serial.read();
    if (input == 'r') {
      ENCODER.write(0);
    }
  }
}
