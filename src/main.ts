class Lemonade {
  flavor: string;
  price: number;

  constructor(flavor: string, price: number) {
    this.flavor = flavor;
    this.price = price;
  }
}

type InventoryItem =
  | "cups"
  | "spoons"
  | "straws"
  | "sugar"
  | "syrups"
  | "lemons"
  | "ice";

class Inventory {
  private items: Record<InventoryItem, number>;

  constructor() {
    this.items = {
      cups: 0,
      spoons: 0,
      straws: 0,
      sugar: 0,
      syrups: 0,
      lemons: 0,
      ice: 0,
    };
  }

  add(item: InventoryItem, quantity: number): void {
    this.items[item] += quantity;
  }

  remove(item: InventoryItem, quantity: number): boolean {
    if (this.items[item] < quantity) {
        return false;
    }
    this.items[item] -= quantity;
    return true;
  }

  has(item: InventoryItem, quantity: number): boolean {
    return this.items[item] >= quantity;
  }

  snapshot(): Record<InventoryItem, number> {
    return { ...this.items };
  }
}

class LemonadeStand {
  inventory: Inventory;
  balance: number;
  sold: Lemonade[];
  day: number;

  constructor() {
    this.inventory = new Inventory();
    this.balance = 0;
    this.sold = [];
    this.day = 1;
  }

  // Try to sell one cup of lemonade
  sell(lemonade: Lemonade): boolean {
    if (
      this.inventory.has("cups", 1) &&
      this.inventory.has("lemons", 1) &&
      this.inventory.has("sugar", 1)
    ) {
      this.inventory.remove("cups", 1);
      this.inventory.remove("lemons", 1);
      this.inventory.remove("sugar", 1);

      this.balance += lemonade.price;
      this.sold.push(lemonade);
      return true;
    }
    return false;
  }

  // Run one full day of sales
  runDay(lemonade: Lemonade): void {
    console.log(`\n=== Day ${this.day} ===`);

    let soldToday = 0;
    while (this.sell(lemonade)) {
      soldToday++;
    }

    console.log(`Sold ${soldToday} cups of lemonade today.`);
    console.log("Inventory left:", this.inventory.snapshot());
    console.log("Balance: $" + this.balance.toFixed(2));

    this.day++;
  }

  getProfit(): number {
    return this.balance;
  }
}

class Externals {
    
}

const stand = new LemonadeStand();

// Stock up inventory
stand.inventory.add("cups", 5);
stand.inventory.add("lemons", 5);
stand.inventory.add("sugar", 5);

// Create lemonade type
const classic = new Lemonade("Classic Lemonade", 2.0);

// Run two days
stand.runDay(classic);
stand.runDay(classic);
stand.runDay(classic);
stand.runDay(classic);
stand.runDay(classic);
stand.runDay(classic);
stand.runDay(classic);

console.log("Total profit:", stand.getProfit());
