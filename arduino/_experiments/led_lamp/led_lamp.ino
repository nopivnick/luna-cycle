const int lampUserA = 8;
const int lampUserB = 9;

void setup() {
  Serial.begin(115200);
  pinMode(lampUserA, OUTPUT);
  pinMode(lampUserB, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) { // If there's data in the serial buffer ...
    char input = Serial.read(); // read it and assign it to a variable.
    if (input == 'A') {
      digitalWrite(lampUserA, HIGH);
    }
    if (input == 'a') {
      digitalWrite(lampUserA, LOW);
    }
    if (input == 'B') {
      digitalWrite(lampUserB, HIGH);
    }
    if (input == 'b') {
      digitalWrite(lampUserB, LOW);
    }
  }
}
