import { validate } from '../validate';

describe('validate', () => {
    describe('isValidDateFormat', () => {
        it('should return true for valid date formats', () => {
            expect(validate.isValidDateFormat('18/10/2025')).toBe(true);
            expect(validate.isValidDateFormat('01/01/2024')).toBe(true);
        });

        it('should return false for invalid date formats', () => {
            expect(validate.isValidDateFormat('2025-10-18')).toBe(false);
            expect(validate.isValidDateFormat('18-10-2025')).toBe(false);
            expect(validate.isValidDateFormat('18/10/25')).toBe(false);
            expect(validate.isValidDateFormat('not a date')).toBe(false);
        });
    });

    describe('isAllowStatus', () => {
        it('should return true for allowed statuses', () => {
            expect(validate.isAllowStatus('todo')).toBe(true);
            expect(validate.isAllowStatus('in-progress')).toBe(true);
            expect(validate.isAllowStatus('done')).toBe(true);
        });

        it('should return false for disallowed statuses', () => {
            expect(validate.isAllowStatus('pending')).toBe(false);
            expect(validate.isAllowStatus('random')).toBe(false);
            expect(validate.isAllowStatus('')).toBe(false);
        });
    });
});