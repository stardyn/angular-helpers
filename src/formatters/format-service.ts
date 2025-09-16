import numeral from "numeral";
import {Nums} from "../helpers/nums";

// Type definitions for better type safety
interface DurationUnits {
    long: {
        day: string;
        hour: string;
        minute: string;
        second: string;
    };
    short: {
        day: string;
        hour: string;
        minute: string;
        second: string;
    };
}

interface ParsedFormat {
    type: string;
    format: string;
    unit: string;
    position: string;
}

interface TimeComponents {
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export type DurationFormat = 'video' | 'short' | 'long' | 'countdown' | 'process' | 'elapsed' | 'progress';
export type TextFormat = 'uppercase' | 'lowercase' | 'capitalize' | 'sentence' | 'title';
export type FormatType = 'date' | 'number' | 'currency' | 'tr-currency' | 'percentage' | 'duration' | 'text';
export type UnitPosition = '@left' | '@right';

export class FormatService {
    /**
     * Duration units in Turkish
     */
    private static readonly durationUnits: DurationUnits = {
        long: {
            day: 'gün',
            hour: 'saat',
            minute: 'dakika',
            second: 'saniye'
        },
        short: {
            day: 'g',
            hour: 'sa',
            minute: 'dk',
            second: 'sn'
        }
    };

    /**
     * Adds unit to value
     * @param value - Main value
     * @param unit - Unit to add
     * @param position - Unit position (@left or @right)
     * @returns String with unit added
     */
    static addUnit(value: string, unit: string, position: UnitPosition): string {
        if (!unit) {
            return value;
        }
        return position === '@left' ? `${unit} ${value}` : `${value} ${unit}`;
    }

    /**
     * Formats duration in seconds to specified format
     * @param seconds - Duration in seconds
     * @param format - Format type
     * @returns Formatted duration string
     */
    static formatDuration(seconds: number, format: DurationFormat): string {
        const times: TimeComponents = {
            day: Math.floor(seconds / 86400),
            hour: Math.floor((seconds % 86400) / 3600),
            minute: Math.floor((seconds % 3600) / 60),
            second: Math.floor(seconds % 60)
        };

        switch (format) {
            case 'video': {
                const h = times.hour.toString().padStart(2, '0');
                const m = times.minute.toString().padStart(2, '0');
                const s = times.second.toString().padStart(2, '0');
                return times.hour > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
            }
            case 'short': {
                const parts: string[] = [];
                if (times.day > 0) {
                    parts.push(`${times.day}${this.durationUnits.short.day}`);
                }
                if (times.hour > 0) {
                    parts.push(`${times.hour}${this.durationUnits.short.hour}`);
                }
                if (times.minute > 0) {
                    parts.push(`${times.minute}${this.durationUnits.short.minute}`);
                }
                if (times.second > 0) {
                    parts.push(`${times.second}${this.durationUnits.short.second}`);
                }
                return parts.join(' ') || `0${this.durationUnits.short.second}`;
            }
            case 'long': {
                const parts: string[] = [];
                if (times.day > 0) {
                    parts.push(`${times.day} ${this.durationUnits.long.day}`);
                }
                if (times.hour > 0) {
                    parts.push(`${times.hour} ${this.durationUnits.long.hour}`);
                }
                if (times.minute > 0) {
                    parts.push(`${times.minute} ${this.durationUnits.long.minute}`);
                }
                if (times.second > 0) {
                    parts.push(`${times.second} ${this.durationUnits.long.second}`);
                }
                return parts.join(' ') || `0 ${this.durationUnits.long.second}`;
            }
            case 'countdown': {
                const parts: string[] = [];
                if (times.day > 0) {
                    parts.push(`${times.day}g`);
                }
                if (times.hour > 0) {
                    parts.push(`${times.hour}s`);
                }
                parts.push(times.minute.toString().padStart(2, '0'));
                parts.push(times.second.toString().padStart(2, '0'));
                return parts.join(':');
            }
            case 'process': {
                if (seconds < 60) {
                    return `${seconds} saniye`;
                } else if (seconds < 3600) {
                    return `${times.minute} dakika ${times.second} saniye`;
                } else {
                    return `${times.hour} saat ${times.minute} dakika`;
                }
            }
            case 'elapsed': {
                if (seconds < 60) {
                    return 'az önce';
                } else if (seconds < 3600) {
                    return `${times.minute} dakika`;
                } else if (seconds < 86400) {
                    return `${times.hour} saat`;
                } else {
                    return `${times.day} gün`;
                }
            }
            case 'progress': {
                if (seconds < 60) {
                    return `${seconds} saniye`;
                } else if (seconds < 3600) {
                    return `${times.minute}:${times.second.toString().padStart(2, '0')}`;
                } else {
                    return `${times.hour}:${times.minute.toString().padStart(2, '0')}`;
                }
            }
            default:
                return `${seconds} saniye`;
        }
    }

    /**
     * Formats text in specified format
     * @param text - Text to format
     * @param format - Format type
     * @returns Formatted text
     */
    static formatText(text: string | number, format: TextFormat): string {
        const value = String(text);

        switch (format) {
            case 'uppercase':
                return value.toUpperCase();
            case 'lowercase':
                return value.toLowerCase();
            case 'capitalize':
                return value
                    .split(' ')
                    .map(word =>
                        word.charAt(0).toLocaleUpperCase('tr-TR') +
                        word.slice(1).toLocaleLowerCase('tr-TR')
                    )
                    .join(' ');
            case 'sentence':
                return value.charAt(0).toLocaleUpperCase('tr-TR') +
                    value.slice(1).toLocaleLowerCase('tr-TR');
            case 'title': {
                const excludedWords = ['ve', 'veya', 'ile', 'de', 'da', 'için'];
                return value
                    .split(' ')
                    .map((word, index) =>
                        excludedWords.includes(word.toLowerCase()) && index !== 0
                            ? word.toLowerCase()
                            : word.charAt(0).toLocaleUpperCase('tr-TR') +
                            word.slice(1).toLocaleLowerCase('tr-TR')
                    )
                    .join(' ');
            }
            default:
                return value;
        }
    }

    /**
     * Parses format string
     * @param formatString - Format string to parse (e.g. "number:=0,0.00|TL@right")
     * @returns Parsed format information
     */
    static parseFormatString(formatString: string): ParsedFormat {
        const [typeAndFormatAndPosition, unit = ''] = formatString.split('|');
        const [typeAndFormat, position = '@right'] = typeAndFormatAndPosition.split('@');
        const [type, format = ''] = typeAndFormat.split(':=');

        return {
            type: type.trim(),
            format: format.trim(),
            unit: unit.trim(),
            position: position.trim() as UnitPosition
        };
    }

    /**
     * Main format function - formats value according to specified format
     * @param value - Value to format
     * @param formatString - Format string
     * @returns Formatted value
     */
    static format(value: any, formatString: string): string {
        try {
            const { type, format, unit, position } = this.parseFormatString(formatString);
            let result: string;

            switch (type as FormatType) {
                case 'date':
                    result = new Date(value).toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    break;
                case 'number':
                    result = numeral(value).format(format || '0,0');
                    break;
                case 'currency':
                    result = numeral(value).format(format || '0,0.00');
                    break;
                case 'tr-currency':
                    result = Nums.formatTurkishCurrency(value, format || '0,0.00');
                    break;
                case 'percentage':
                    result = numeral(Number(value) / 100).format(format || '0.00%');
                    break;
                case 'duration':
                    result = this.formatDuration(Number(value), format as DurationFormat);
                    break;
                case 'text':
                    result = this.formatText(value, format as TextFormat);
                    break;
                default:
                    return String(value);
            }

            return this.addUnit(result, unit, position as UnitPosition);
        } catch (error) {
            console.error('Format error:', error);
            return String(value);
        }
    }
}