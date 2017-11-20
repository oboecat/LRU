export interface INode<Key, Value> {
  key: Key;
  data: Value;
  prev: INode<Key, Value> | null;
  next: INode<Key, Value> | null;
}
