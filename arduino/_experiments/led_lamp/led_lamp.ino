const int LAMP_USER_A = 8;
const int LAMP_USER_B = 9;

bool isUserA_lampOn = false;
bool isUserB_lampOn = false;

void setup() {
  Serial.begin(115200);
  pinMode(lampUserA, OUTPUT);
  pinMode(lampUserB, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) { // If there's data in the serial buffer ...
    char input = Serial.read(); // ... read it and assign it to a variable.
    if (input == 'A') {
      digitalWrite(LAMP_USER_A, HIGH);
    }
    if (input == 'a') {
      digitalWrite(LAMP_USER_A, LOW);
    }
    if (input == 'B') {
      digitalWrite(LAMP_USER_B, HIGH);
    }
    if (input == 'b') {
      digitalWrite(LAMP_USER_B, LOW);
    }
  }
}
