interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
  }
}

class ComplexCommand implements Command {
  private receiver: Receiver;

  private a: string;
  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
    console.log(`ComplexCommandL Complex stuff should be done by a receiver object.`);
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a})`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b})`);
  }
}

class Invoker {
  private onStart!: Command;
  private onFinish!: Command;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setonFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log(`Invoker: Does anybody want something done before I begin?`);

    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log(`Invoker: ...doing something really important...`);
    
    console.log(`Invoker: Does anybody want something done after I finish?`);
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: Command) {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setonFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();

// output:
// Invoker: Does anybody want something done before I begin?
// SimpleCommand: See, I can do simple things like printing (Say Hi!)
// Invoker: ...doing something really important...
// Invoker: Does anybody want something done after I finish?
// ComplexCommand: Complex stuff should be done by a receiver object.
// Receiver: Working on (Send email)
// Receiver: Also working on (Save report)

