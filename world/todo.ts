// Migration placeholders. A condition or effect the Markdown described in free
// text that hasn't been modelled yet. The note keeps the original wording so
// it can be found and typed later: grep for `todo(` / `todoEffect(`.
//
// A todo condition always holds and a todo effect does nothing, so the move
// stays usable (and on the graph) until it is modelled properly.

// Takes no arguments, so it fits both a player condition (`when`) and a
// world-only one (`trigger`).
export const todo = (_note: string): (() => boolean) => () => true;
// Takes no arguments, so it fits both a player effect and a world-only one.
export const todoEffect = (_note: string): (() => void) => () => {};
