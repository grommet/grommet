/**
 * Merges two or more class name strings, filtering out falsy values.
 * Used by all migrated components to combine VE recipe output with
 * consumer-supplied className props.
 *
 * @param {...(string | false | null | undefined)} args - Class name arguments
 * @returns {string} Combined class names
 */
export const cx = (...args) => args.filter(Boolean).join(' ');
