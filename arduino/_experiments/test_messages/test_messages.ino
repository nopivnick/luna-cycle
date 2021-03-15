int pauseDuration = 100;

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("start");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.print("tick++"); // NOTE: if Serial.println() the string includes the /r when it gets to the browser
  Serial.println();
  digitalWrite(LED_BUILTIN, LOW);
  delay(pauseDuration);
}
