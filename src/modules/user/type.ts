export type IUser = {
  id: number;
  telegram_id: string;
  telegramUser: string;
  dailyTradingVolume: { amount: number; currency: string };
  monthly_trading_vol: { amount: number; currency: string };
  min_tip: number;
  cashback_id: number;
  lastTradingAt: Date;
  last_login_at: Date;
};
