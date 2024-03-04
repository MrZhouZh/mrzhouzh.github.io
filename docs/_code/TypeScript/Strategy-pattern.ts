interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
 * The Context defines the interface of interest to clients.
 */
class StrategyContext {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic() {
    console.log(`Context: Sorting data using the strategy (not sure how it'll do it)`);
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));
  }
}

class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

const contextInstance = new StrategyContext(new ConcreteStrategyA());
console.log(`Client: Strategy is set to normal sorting.`);
contextInstance.doSomeBusinessLogic();

console.log('');

console.log(`Client: Strategy is set to reverse sorting.`);
contextInstance.setStrategy(new ConcreteStrategyB());
contextInstance.doSomeBusinessLogic();

// output:
// Client: Strategy is set to normal sorting.
// Context: Sorting data using the strategy (not sure how it'll do it)
// a, b, c, d, e

// Client: Strategy is set to reverse sorting.
// Context: Sorting data using the strategy (not sure how it'll do it)
// e, d, c, b, a
 

