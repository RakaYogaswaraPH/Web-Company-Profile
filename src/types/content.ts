export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface CompanyOffice {
  readonly title: string;
  readonly line1: string;
  readonly line2: string;
  readonly cityPostal?: string;
}

export interface CompanySocial {
  readonly platform: string;
  readonly url: string;
  readonly label: string;
}

export interface CompanyStat {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

export interface ServiceItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverable: string;
}

export interface ValuePillar {
  readonly title: string;
  readonly description: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly description: string;
  readonly url: string;
  readonly phone: string;
  readonly email: string;
  readonly whatsapp: string;
  readonly offices: readonly CompanyOffice[];
  readonly socials: readonly CompanySocial[];
  readonly navItems: readonly NavItem[];
}
