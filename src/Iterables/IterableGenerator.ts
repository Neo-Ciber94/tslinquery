import { IterableQueryBase } from "../QueryableBase";
import {
  IterableIterator,
  iteratorDone,
  iteratorResult,
} from "./IterableIterator";

export class IterableGenerator<T> implements IterableIterator<T> {
  private readonly generator: (index: number, prev?: T) => T;
  private readonly seed?: T;
  private readonly length: number;
  private index: number = 0;
  private prev?: T;

  constructor(
    length: number,
    generator: (index: number, prev?: T) => T,
    seed?: T
  ) {
    if (length < 0) {
      throw new Error("length cannot be 0");
    }

    this.generator = generator;
    this.length = length;
    this.seed = seed;
    this.prev = seed;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new IterableGenerator(this.length, this.generator, this.seed);
  }

  next(): IteratorResult<T, any> {
    if (this.index < this.length) {
      const next = this.generator(this.index, this.prev);
      this.prev = next;
      this.index += 1;
      return iteratorResult(next);
    }

    return iteratorDone();
  }
}
