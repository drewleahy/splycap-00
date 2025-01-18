export interface InvestmentFocus {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  role: string;
  location: string;
  imageUrl?: string;
}

export interface PastInvestment {
  id: string;
  name: string;
  logo: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  order: number;
}