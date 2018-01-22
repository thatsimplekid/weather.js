Sample incoming data stream:

0 = e0
1 = 2
2 = 46
3 = 81
4 = 3
5 = 0
6 = df
7 = 87

I have converted this data to binary, as shown in the following list, N.B: the bit-order is flipped when the data is received by the STRMON/STRMOFF commands, i.e. with the bit pattern abcdefgh, a is the least significant bit, and h is the most. Because of this, the low order nibble is abcd, and the high order is efgh.

0 = 11100000 
1 = 00000010
2 = 01000110
3 = 10000001
4 = 00000011
5 = 00000000
6 = 11011111
7 = 10000111

0 = |ID|ID|ID|BATT|
1 = |WIND SPEED (mph)|
2 = |WIND DIR (255/360)|

Calculate wind angle (deg)
if(byte2==0) dir=360;
else dir= 9+byte2*342.0/255.0;

I will reference bits and nibbles in a grid type pattern, with the least significant bit of the first byte being 0A, and the most significant bit of the last byte being 7H

#Byte 0
---

Byte 0 is a basic header. Bits a, b, and c are the transmitter ID which is settable via dip switches inside the Tx unit.
Bit d in the low order nibble is the battery status. It is set to 0 when there is no issue, or 1 when there is a low battery voltage.

#Byte 1
---

Byte 1 is the wind speed as detected by the stations anemomenter (in mph). It is just a simple binary transmission of a decimal number (>255mph winds and you won't be worrying about the speed...) e.g. 0x1e would indicate wind speeds of 30mph.

#Byte 2
---

Byte 2 indicated the direction in which the wind is blowing. The value is from 0-255 and there is a dead zone around 0 (north). It can be translated into degrees, taking note of this offset by using the following arithmetic:

windDirection = 9 + Byte2 * 342.0 / 255

#Byte 6
---

#Byte 7
---