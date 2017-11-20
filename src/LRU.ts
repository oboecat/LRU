import { INode } from './INode';

export class LRU<Key, Value> {
  public readonly capacity: number;
  private map: Map<Key, INode<Key, Value>> = new Map();
  private mostRecent: INode<Key, Value> | null;
  private leastRecent: INode<Key, Value> | null;

  constructor(capacity = 500) {
    this.capacity = capacity;
    this.mostRecent = null;
    this.leastRecent = null;
  }

  set(key: Key, value: Value) {
    if (this.map.size === 0) {
      this.mostRecent = {
        key: key,
        data: value,
        prev: null,
        next: null,
      };
      this.leastRecent = this.mostRecent;
      this.map.set(key, this.mostRecent);
    }

    const chosenOne: any = this.map.get(key);
    if (chosenOne) {
      this.dereferenceNode(chosenOne);
    }

    this.updateMostRecent(key, value);

    if (this.map.size > this.capacity) {
      this.kick();
    }
  }

  get(key: Key): Value | null {
    const chosenOne: any = this.map.get(key);

    if (!chosenOne) {
      return null;
    }

    const value = chosenOne.data;
    this.dereferenceNode(chosenOne);
    this.updateMostRecent(key, value);

    return value;
  }

  private kick() {
    this.map.delete(this.updateLeastRecent());
  }

  private dereferenceNode(node: INode<Key, Value>): void {
    const nextNode = node.next;
    const prevNode = node.prev;

    if (prevNode) {
      prevNode.next = nextNode;
    }
    if (nextNode) {
      nextNode.prev = prevNode;
    }
  }

  private updateMostRecent(key: Key, value: Value) {
    const oldRecent = this.mostRecent as INode<Key, Value>;

    if ((this.leastRecent as INode<Key, Value>).key === key) {
      this.updateLeastRecent();
    }

    if (oldRecent.key === key) {
      oldRecent.data = value;
      return;
    }

    const newRecent: INode<Key, Value> = {
      key: key,
      data: value,
      prev: oldRecent,
      next: null,
    };

    oldRecent.next = newRecent;
    this.mostRecent = newRecent;
    this.map.set(key, newRecent);
  }

  private updateLeastRecent(): Key {
    const oldLeastRecent = this.leastRecent as INode<Key, Value>;
    const newLeastRecent = oldLeastRecent.next;

    if (newLeastRecent) {
      newLeastRecent.prev = null;
      this.leastRecent = newLeastRecent;
    }

    return oldLeastRecent.key;
  }
}
