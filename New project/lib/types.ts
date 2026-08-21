export type Category = "Income" | "Housing" | "Utilities" | "Food" | "Shopping" | "Transport" | "Entertainment" | "Transfer" | "Health" | "Other";

export type Transaction = {
  id: string; date: string; merchant: string; amount: number; category: Category;
  kind: "debit" | "credit"; engagementDays?: number;
};

export type SubscriptionStatus = "active" | "price increased" | "possibly unused" | "duplicate" | "learning";
export type Subscription = {
  id: string; canonical: string; members: Transaction[]; confidence: number; frequency: "weekly" | "monthly" | "quarterly" | "yearly";
  averageAmount: number; lastCharged: string; nextExpected: string; annualized: number; status: SubscriptionStatus;
  engagementDays: number; duplicateLikelihood: number; priceIncrease: boolean; description: string; classification?: "Essential" | "Shared expense" | "Subscription" | "Review later";
};

export type Anomaly = { transaction: Transaction; score: number; reasons: string[]; categoryMedian: number; merchantNovelty: number };
