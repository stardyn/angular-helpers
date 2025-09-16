# @stardyn/angular-helpers

Angular Helper Utilities Package - Collection of useful pipes, directives, validators and utility classes for Angular applications. Provides formatting services, date utilities, validation helpers, and security utilities for Turkish and international applications.

## Features

- **Format Service**: Comprehensive formatting for numbers, currencies, dates, durations, and text
- **Date Utilities**: Advanced date manipulation and formatting with moment.js integration
- **Custom Pipes**: Date pipes, epoch date pipes, and format pipes
- **Validators**: Form validation utilities including password matching
- **Security Utilities**: Encryption, hashing, and CAPTCHA-like authentication
- **Number Utilities**: Turkish currency formatting and number manipulation
- **String Utilities**: Text processing and validation
- **Dictionary Utilities**: Object manipulation and key extraction
- **Random Generators**: UUID and random string generation
- **TypeScript Support**: Full TypeScript support with type definitions
- **Standalone Components**: Modern Angular standalone directive and pipe support

## Installation

```bash
npm install @stardyn/angular-helpers
```

## Quick Start

### Import in Angular Module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomDatePipe, FormatPipe, FormatDirective } from '@stardyn/angular-helpers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CustomDatePipe,
    FormatPipe,
    FormatDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Standalone Component Usage

```typescript
import { Component } from '@angular/core';
import { CustomDatePipe, FormatPipe, FormatDirective } from '@stardyn/angular-helpers';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CustomDatePipe, FormatPipe, FormatDirective],
  template: `
    <div>
      <p>Date: {{ currentDate | customDate:'DD/MM/YYYY HH:mm' }}</p>
      <p>Price: {{ price | format:'tr-currency:=0,0.00|₺@right' }}</p>
      <p [format-value]="amount" format="number:=0,0.00|TL@right"></p>
    </div>
  `
})
export class ExampleComponent {
  currentDate = new Date();
  price = 1234.56;
  amount = 9876.54;
}
```

## API Reference

### Format Service

```typescript
import { FormatService } from '@stardyn/angular-helpers';

// Number formatting
FormatService.format(1234.56, 'number:=0,0.00'); // "1,234.56"

// Turkish currency formatting
FormatService.format(1234.56, 'tr-currency:=0,0.00|₺@right'); // "1.234,56 ₺"

// Duration formatting
FormatService.format(3661, 'duration:=video'); // "1:01:01"

// Text formatting
FormatService.format('hello world', 'text:=capitalize'); // "Hello World"

// Percentage formatting
FormatService.format(0.1234, 'percentage:=0.00%'); // "12.34%"
```

### Date Utilities

```typescript
import { Dates } from '@stardyn/angular-helpers';

// Epoch to string conversion
Dates.fromEpochToString(1640995200, 'DD/MM/YYYY'); // "01/01/2022"

// Date to Unix timestamp
const unixTime = Dates.dataToUnix(new Date());

// Format any date
Dates.formatDate(new Date(), 'DD-MM-YYYY HH:mm:ss');

// Quarter calculation
Dates.getQuarter(3, 2023); // 1 (Q1)
```

### Number Utilities

```typescript
import { Nums } from '@stardyn/angular-helpers';

// Turkish currency formatting
Nums.formatTurkishCurrency(1234.56); // "1.234,56"

// Number rounding and formatting
Nums.numberFloorFormat(123.456, 2); // 123.46

// Percentage calculation
Nums.calcPercentage(100, 20); // 120

// Number validation
Nums.isNegative(-123); // true
```

### Security Utilities

```typescript
import { SecureUtil } from '@stardyn/angular-helpers';

// MD5 hashing
SecureUtil.Md5Upper('password'); // "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8"

// SHA256 hashing
SecureUtil.sha256('text'); 

// AES encryption/decryption
const encrypted = SecureUtil.encryptAES('data', 'key');
const decrypted = SecureUtil.decryptAES(encrypted, 'key');

// CAPTCHA-like hash generation
SecureUtil.createCaptchaHash('password', 'publicKey', 'partialSecret');
```

### String Utilities

```typescript
import { StringUtil } from '@stardyn/angular-helpers';

// Boolean to Turkish yes/no
StringUtil.yesNo(true); // "Evet"
StringUtil.yesNo(false); // "Hayır"

// Remove invalid characters
StringUtil.removeInvalidChars('test@#$%'); // "test----"
```

### Dictionary Utilities

```typescript
import { Dicts } from '@stardyn/angular-helpers';

const data = { NAME: 'John', age: 30 };

// Case-insensitive get
Dicts.get(data, 'name'); // 'John'
Dicts.getOrDefault(data, 'missing', 'default'); // 'default'

// Array manipulation
Dicts.insert([1, 2, 3], 1, 'new'); // [1, 'new', 2, 3]

// Get all keys from nested object
Dicts.GetKeys(complexObject); // ['key1', 'nested.key2', 'array.0.prop']
```

### Random Generators

```typescript
import { Randoms } from '@stardyn/angular-helpers';

// Random string generation
Randoms.randomString(10); // "aB3kL9mN2p"

// UUID v4 generation
Randoms.uuidv4(); // "123e4567-e89b-12d3-a456-426614174000"
```

### Form Validators

```typescript
import { Validations } from '@stardyn/angular-helpers';
import { FormBuilder, FormGroup } from '@angular/forms';

const form: FormGroup = this.fb.group({
  password: [''],
  confirmPassword: ['']
}, {
  validators: Validations.MatchValidator('password', 'confirmPassword')
});
```

### Custom Pipes

#### CustomDatePipe

```typescript
// In template
{{ date | customDate:'DD/MM/YYYY HH:mm:ss' }}
{{ date | customDate }} // Uses default format
```

#### EpochDatePipe

```typescript
// In template
{{ epochTimestamp | epochDate:'DD/MM/YYYY' }}
{{ epochTimestamp | epochDate }} // Uses default format
```

#### FormatPipe

```typescript
// In template
{{ value | format:'number:=0,0.00' }}
{{ price | format:'tr-currency:=0,0.00|₺@right' }}
{{ duration | format:'duration:=video' }}
```

### Format Directive

```typescript
// In template
<span [format-value]="price" format="tr-currency:=0,0.00|₺@right"></span>
<div [format-value]="date" format="date:=DD/MM/YYYY"></div>
```

## Format String Syntax

Format strings follow the pattern: `type:=format|unit@position`

### Format Types

- `number` - Number formatting using numeral.js
- `currency` - Standard currency formatting
- `tr-currency` - Turkish currency formatting (swaps dots and commas)
- `percentage` - Percentage formatting
- `duration` - Time duration formatting
- `text` - Text case formatting
- `date` - Date formatting

### Duration Formats

- `video` - MM:SS or HH:MM:SS format
- `short` - 2g 3sa 45dk format
- `long` - 2 gün 3 saat 45 dakika format
- `countdown` - 2g:3s:45:30 format
- `process` - Human readable process time
- `elapsed` - Human readable elapsed time
- `progress` - Progress indicator format

### Text Formats

- `uppercase` - UPPERCASE TEXT
- `lowercase` - lowercase text
- `capitalize` - Capitalize Each Word
- `sentence` - Sentence case
- `title` - Title Case (excludes Turkish articles)

### Unit Positioning

- `@left` - Unit on the left: "₺ 1.234,56"
- `@right` - Unit on the right: "1.234,56 ₺"

## Dependencies

### Peer Dependencies

- `@angular/core` >= 16.0.0
- `@angular/common` >= 16.0.0
- `@angular/forms` >= 16.0.0

### Runtime Dependencies

- `lodash` - Object manipulation utilities
- `moment` - Date manipulation and formatting
- `numeral` - Number formatting
- `crypto-js` - Encryption and hashing
- `ts-md5` - MD5 hashing

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { 
  DurationFormat, 
  TextFormat, 
  FormatType, 
  UnitPosition 
} from '@stardyn/angular-helpers';

const format: DurationFormat = 'video';
const textFormat: TextFormat = 'capitalize';
```

## Browser Support

- Modern browsers supporting ES2020
- Angular 16+ applications
- TypeScript 5.0+

## Performance

- Tree-shakable exports
- Minimal bundle impact
- Optimized for production builds
- No runtime dependencies on Angular internals (except for pipes/directives)

## Examples

### Complete Component Example

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  CustomDatePipe, 
  FormatPipe, 
  FormatDirective,
  Validations,
  Nums,
  Dates,
  StringUtil 
} from '@stardyn/angular-helpers';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CustomDatePipe, FormatPipe, FormatDirective],
  template: `
    <div class="demo-container">
      <h2>Format Examples</h2>
      
      <div class="format-examples">
        <p>Current Date: {{ currentDate | customDate:'DD/MM/YYYY HH:mm' }}</p>
        <p>Price: {{ price | format:'tr-currency:=0,0.00|₺@right' }}</p>
        <p>Duration: {{ duration | format:'duration:=video' }}</p>
        <p>Percentage: {{ percentage | format:'percentage:=0.00%' }}</p>
        <p [format-value]="largeNumber" format="number:=0,0|adet@right"></p>
      </div>

      <div class="utility-examples">
        <p>Is Approved: {{ StringUtil.yesNo(isApproved) }}</p>
        <p>Quarter: Q{{ currentQuarter }}</p>
        <p>Formatted Turkish Currency: {{ turkishPrice }}</p>
      </div>
    </div>
  `
})
export class DemoComponent {
  currentDate = new Date();
  price = 1234.56;
  duration = 3661; // 1 hour, 1 minute, 1 second
  percentage = 0.1234;
  largeNumber = 1000000;
  isApproved = true;
  
  StringUtil = StringUtil;
  
  constructor(private fb: FormBuilder) {
    // Calculate current quarter
    this.currentQuarter = Dates.getQuarter(
      new Date().getMonth() + 1, 
      new Date().getFullYear()
    );
    
    // Format Turkish currency
    this.turkishPrice = Nums.formatTurkishCurrency(this.price, '0,0.00');
  }
}
```

## License

MIT License - see LICENSE file for details.

## Repository

https://github.com/stardyn/angular-helpers