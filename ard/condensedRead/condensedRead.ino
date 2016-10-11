/**************************************************************************/
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>
// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (2)
#define PN532_MOSI (3)
#define PN532_SS   (4)
#define PN532_MISO (5)

#define PN532_IRQ   (2)
#define PN532_RESET (3)  

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);
#if defined(ARDUINO_ARCH_SAMD)
// for Zero, output on USB Serial console, remove line below if using programming port to program the Zero!
// also change #define in Adafruit_PN532.cpp library file
   #define Serial SerialUSB
#endif
void setup(void) {
  #ifndef ESP8266
    while (!Serial); // for Leonardo/Micro/Zero
  #endif
  Serial.begin(115200);
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    while (1); // halt
  }
  nfc.SAMConfig();
  pinMode(7, INPUT_PULLUP);
  pinMode(8, OUTPUT);
  digitalWrite(8, LOW);
}
void loop(void) {
  uint8_t success = 0;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  
  int timer = 0;
  if(digitalRead(7) == LOW){
    digitalWrite(8, HIGH);
    //Serial.println("button");  
    while(!success){
      success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength, 3000);
      if(!success)
        break;
    }
    if (success) {
      
      if (uidLength == 4)
      {
        uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };
      
        success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 4, 0, keya);
        
        if (success)
        {
          //Serial.println("Sector 1 (Blocks 4..7) has been authenticated");
          uint8_t data[16];
          uint8_t data2[16];
  
          
          // Try to read the contents of blocks 4 & 5
          success = nfc.mifareclassic_ReadDataBlock(4, data);
          boolean success2 = nfc.mifareclassic_ReadDataBlock(5, data2);
          //success = nfc.mifareclassic_ReadDataBlock(5, data2);
          
          if (success && success2)
          {
            //nfc.PrintChar(data, 16);
            nfc.PrintChar(data2, 16);
            
            // Wait a bit before reading the card again
            delay(1000);
          }
        }
      }
    }
    digitalWrite(8, LOW);
  }
}

