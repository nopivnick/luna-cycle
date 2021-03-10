#include <Encoder.h>

// Best Performance: both pins have interrupt capability
// Good Performance: only the first pin has interrupt capability
// Low Performance:  neither pin has interrupt capability

Encoder encoderUserA(2, 3); // Interrupt pins on the UNO are 2 & 3

long counter = 0;

void setup() {
  Serial.begin(115200);
  pinMode(
}

void loop() {

}
