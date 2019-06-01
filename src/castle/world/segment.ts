export abstract class Segment {
  constructor (public readonly id: string) { }

  public abstract get isCompletable (): boolean
}
