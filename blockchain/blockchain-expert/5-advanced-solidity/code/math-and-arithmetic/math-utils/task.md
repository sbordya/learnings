# Math Utils

Write a smart contract named `MathUtils` that contains the following functions.

- `floor(int value)`: returns the `value` rounded down to the nearest ten (10). Positive and negative values should both round towards 0. For example, `-97` should round to `-90` and `101` should round to `100`.
- `ceil(int value)`: returns the `value` rounded up to the nearest ten (10). Positive and negative values should both round away from 0. For example, `-97` should round to `-100` and `101` should round to `110`.
- `average(int[] memory values, bool down)`: returns the average of a sequence of numbers. If `down` is `true` return the average rounded down to the nearest ten (10), otherwise return the average rounded up to the nearest ten (10). The average of an empty array is zero.
