/*
   libraries
*/


/*
   Hall sensor stuff
*/
//bool plateSpinning = false;       // boolean to store whether or not the plate is rotating
//bool hallSensorTypeLatch = false; // boolean to store whether or not the hall effect sensor is a latch type
//bool hallSensorTypeSwitch = true; // boolean to store whether or not the hall effect sensor is a switch type
//int hallSensorStatus;             // variable to read the hall effect sensor state
int countCrankCurrent = 0;          // variable to store how many times the hall effect sensor changes

// Interrupt stuff from Arduino Reference site
//const byte ledPin = 13;           // pin with built-in LED on the MKR ZERO
//const int hallSensorPin = 2;      // pin number w/ interrupt for hall effect sensor input
//volatile byte state = LOW;        // volatile is needed when using (in this case external) interrupts

// Allegro A1220LUA-T stuff via SparkFun Adventures in Science @ https://www.sparkfun.com/news/2438
const int hallSensorPin = 2;        // pin number w/ interrupt for hall effect sensor input
unsigned long hallSensorTicks = 0;
unsigned long hallSensorTicksOld;

/*
   Potentiometer stuff
*/
const int potPin = A0;              // pin for the potentiometer
int potValue = 0;                   // variable to store the potentiometer value


void setup() {
  Serial.begin(9600);

  /*
     Hall sensor stuff
  */
  pinMode(LED_BUILTIN, OUTPUT);     // initialize digital pin LED_BUILTIN as an output to indicate every tick of the hall sensor
  // pinMode(ledPin, OUTPUT);       // use the onboard LED 
  pinMode(hallSensorPin, INPUT_PULLUP);

  // this interrupt uses FALLING with the Melexsis US5881 because it's a hall effect *switch*
  // place the *branded* face of the sensor toward the magnetic field
  // the sensor drops from HIGH → LOW when detecting the South pole of a magnet
  // attachInterrupt(digitalPinToInterrupt(hallSensorPin), countHallSensorTicks, FALLING);

  // this interrupt uses CHANGE with the Allegro A1220LUA-T because it's a hall effect *latch*
  // place the *branded* face of the sensor toward the magnetic field
  // the sensor alternates HIGH → LOW → HIGH → LOW when detecting North → South → North → South poles
  attachInterrupt(digitalPinToInterrupt(hallSensorPin), countHallSensorTicks, CHANGE);

  /*
     Rotary encoder button stuff
  */
  pinMode(rotaryButtonPin, INPUT);  // initialize the pushbutton pin as an input
  // pinMode(ledPin, OUTPUT);       // initialize the LED pin as an output
}


void loop() {

  /*
     Hall sensor stuff
  */
  // logic if using hall effect *switch* sensor (Melexsis US5881 unipolar)
  Serial.println(hallSensorTicks);
  delay(100);

  // logic if using hall effect *latch* sensor (Allegro A1220LUA-T)
  // blink the on-board LED when the hall effect sensor gets tripped
  // digitalWrite(ledPin, state);
  
  /*
     Potentiometer stuff
  */
  potValue = analogRead(A0);        // read the potentiometer value
}


void countHallSensorTicks() {
  hallSensorTicks++;
  // state = !state;
}
