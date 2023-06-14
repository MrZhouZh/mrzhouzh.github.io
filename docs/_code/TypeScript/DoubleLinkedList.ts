interface DoubleLinkedListNode<T> {
  value: T;
  previous?: DoubleLinkedListNode<T>;
  next?: DoubleLinkedListNode<T>;
}

class DoubleLinkedList<T> {
  private head?: DoubleLinkedListNode<T>;
  private tail?: DoubleLinkedListNode<T>;

  public isEmpty(): boolean {
    return this.head === undefined;
  }

  public push(value: T): void {
    const node: DoubleLinkedListNode<T> = { value };
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
  }

  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.tail!.value;
    if (this.head === this.tail) {
      this.head = undefined; // List is now empty
      this.tail = undefined;
    } else {
      this.tail = this.tail!.previous;
      this.tail!.next = undefined;
    }

    return value;
  }

  public forEach(callback: (value: T, index: number) => void): void {
    let node = this.head;
    let i = 0;
    while (node !== undefined) {
      callback(node.value, i);
      node = node.next;
      i++;
    }
  }
}
