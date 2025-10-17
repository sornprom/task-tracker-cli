import { resolveCommand } from '../resolve-command';

describe('resolveCommand', () => {
    it('should resolve command aliases', () => {
        expect(resolveCommand('a')).toBe('add');
        expect(resolveCommand('add')).toBe('add');
        expect(resolveCommand('ls')).toBe('list');
        expect(resolveCommand('list')).toBe('list');
        expect(resolveCommand('u')).toBe('update');
        expect(resolveCommand('update')).toBe('update');
        expect(resolveCommand('del')).toBe('delete');
        expect(resolveCommand('delete')).toBe('delete');
        expect(resolveCommand('mip')).toBe('mark-in-progress');
        expect(resolveCommand('mark-in-progress')).toBe('mark-in-progress');
        expect(resolveCommand('md')).toBe('mark-done');
        expect(resolveCommand('mark-done')).toBe('mark-done');
    });

    it('should return undefined for unknown commands', () => {
        expect(resolveCommand('unknown')).toBeUndefined();
        expect(resolveCommand('')).toBeUndefined();
        expect(resolveCommand(undefined)).toBeUndefined();
    });
});