/**************************************************************************/
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (2)
#define PN532_MOSI (3)
#define PN532_SS   (4)
#define PN532_MISO (5)

// If using the breakout or shield with I2C, define just the pins connected
// to the IRQ and reset lines.  Use the values below (2, 3) for the shield!
#define PN532_IRQ   (2)
#define PN532_RESET (3)  // Not connected by default on the NFC Shield

// Uncomment just _one_ line below depending on how your breakout or shield
// is connected to the Arduino:

// Use this line for a breakout with a software SPI connection (recommended):
//Adafruit_PN532 nfc(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);

// Use this line for a breakout with a hardware SPI connection.  Note that
// the PN532 SCK, MOSI, and MISO pins need to be connected to the Arduino's
// hardware SPI SCK, MOSI, and MISO pins.  On an Arduino Uno these are
// SCK = 13, MOSI = 11, MISO = 12.  The SS line can be any digital IO pin.
//Adafruit_PN532 nfc(PN532_SS);

// Or use this line for a breakout or shield with an I2C connection:
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
  //Serial.println("Hello!");

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  //Serial.println("***");
  //Serial.println(versiondata);
  //Serial.println("***");
  if (! versiondata) {
    //Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
  //Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  //Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  //Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  // configure board to read RFID tags
  nfc.SAMConfig();
  
  //Serial.println("Waiting for an ISO14443A Card ...");

}


void loop(void) {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength; 
  
  uint8_t inp = Serial.read();
  if(inp != 82){
    delay(1000);
    return;
  }
  // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
    
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
 
  if (success) {
    // Display some basic information about the card
    //Serial.println("Found an ISO14443A card");
    //Serial.print("  UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    //Serial.print("  UID Value: ");
    //nfc.PrintHex(uid, uidLength);
    //Serial.println("");
    
    if (uidLength == 4)
    {
      // We probably have a Mifare Classic card ... 
      //Serial.println("Seems to be a Mifare Classic card (4 byte UID)");
	  
      // Now we need to try to authenticate it for read/write access
      // Try with the factory default KeyA: 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF
      //Serial.println("Trying to authenticate block 4 with default KEYA value");
      uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };
	  
	  // Start with block 4 (the first block of sector 1) since sector 0
	  // contains the manufacturer data and it's probably better just
	  // to leave it alone unless you know what you're doing
      success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 4, 0, keya);

      /*if(success){
        uint8_t mifareclassic_WriteDataBlock (uint8_t blockNumber, uint8_t * data);
        Serial.println("Write data? (Y/N)\n");
        char input = Serial.read();
        uint8_t bufferInput[8];
        if(input == 'Y'){
          uint8_t blockNumber = 4;
          Serial.println("Data to write (max 8 bytes): \n");
          Serial.readBytesUntil('\n', bufferInput, 9);
          for(int i = 0; i<8; i++){
             uint8_t* val = bufferInput[i];
            mifareclassic_WriteDataBlock (blockNumber, val);
            blockNumber++;
          }
          
        }
      }*/
	  
      if (success)
      {
        //Serial.println("Sector 1 (Blocks 4..7) has been authenticated");
        uint8_t data[16];
        uint8_t data2[16];

        /*
        // If you want to write something to block 4 to test with, uncomment
		    // the following line and this text should be read back in a minute
        String blockdata_string = "chriskoetsch";
        String blockdata_string2 = "29648331";

        int blockdata_int = blockdata_string.length() + 1;
        int blockdata_int2 = blockdata_string2.length() + 1;
        
        char blockdata_char[blockdata_int];
        char blockdata_char2[blockdata_int2];
        
        
        blockdata_string.toCharArray(blockdata_char, blockdata_int);
        char blockdata[16] = {00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00};
          
        blockdata_string2.toCharArray(blockdata_char2, blockdata_int2);
        char blockdata2[16] = {00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00};   
        
        for(int i=0; i<sizeof blockdata_char; i++)
        {
          blockdata[i] = blockdata_char[i];
        }       

        for(int j=0; j<sizeof blockdata_char2; j++)
        {
          blockdata2[j] = blockdata_char2[j];
        }      
        
        memcpy(data, blockdata, sizeof data);
        memcpy(data2, blockdata2, sizeof data2);
        
        success = nfc.mifareclassic_WriteDataBlock (4, data);
        success = nfc.mifareclassic_WriteDataBlock (5, data2);
        */
        
        // Try to read the contents of blocks 4 & 5
        success = nfc.mifareclassic_ReadDataBlock(4, data);
        success = nfc.mifareclassic_ReadDataBlock(5, data2);
        
        if (success)
        {
          // Data seems to have been read ... spit it out
          //Serial.println("Reading Blocks 4 & 5:");
          nfc.PrintChar(data, 16);
          nfc.PrintChar(data2, 16);
          //Serial.println("");
		  
          // Wait a bit before reading the card again
          delay(1000);
        }
        else
        {
          //Serial.println("Ooops ... unable to read the requested block.  Try another key?");
        }
      }
      else
      {
        //Serial.println("Ooops ... authentication failed: Try another key?");
      }
    }

    /*
    if (uidLength == 7)
    {
      // We probably have a Mifare Ultralight card ...
      Serial.println("Seems to be a Mifare Ultralight tag (7 byte UID)");
	  
      // Try to read the first general-purpose user page (#4)
      Serial.println("Reading page 4");
      uint8_t data[32];
      success = nfc.mifareultralight_ReadPage (4, data);
      if (success)
      {
        // Data seems to have been read ... spit it out
        nfc.PrintHexChar(data, 4);
        Serial.println("");
		
        // Wait a bit before reading the card again
        delay(1000);
      }
      else
      {
        Serial.println("Ooops ... unable to read the requested page!?");
      }
    }*/
  }
}

